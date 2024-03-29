const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
require('dotenv').config();

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    secret:"hello friends",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());



mongoose.connect("mongodb://localhost:27017/userDB")

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId: String,
    secret: String
})

const secretSchema = {
    cont: String
}

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);
const Secret = mongoose.model("Secret", secretSchema);
const secr = new Secret({
    cont: "I have a secret"
})
// secr.save();
    

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    // console.log(profile);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get("/", function (req,res) {
    res.render("home");
})
app.get("/auth/google",
    passport.authenticate("google", {scope: ["profile"]})
);
app.get('/auth/google/secrets', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/secrets');
});

app.get("/login", function (req,res) {
    res.render("login");
})
app.get("/register", function (req,res) {
    res.render("register");
})
app.get("/secrets", function(req, res){
    // User.find({"secret": {$ne: null}}, function(err, foundUsers){
    //     if(err){
    //         console.log(err);;
    //     } else{
    //         if(foundUsers){
    //             res.render("secrets", {userwithSecrets: foundUsers});
    //         }
    //     }
    // })

    Secret.find({}, function(err, foundSecrets){
        res.render("secrets", {userwithSecrets: foundSecrets})
    })
});
app.get("/submit",function(req,res){
    if(req.isAuthenticated()){
        res.render("submit");
    } else{
        res.redirect("/login");
    }
})
app.get("/logout", function(req, res){
    req.logout(function(err) {
        if (err) { 
            console.log(err) 
        }
        else{
            res.redirect('/');
        }
      });
});

app.post("/submit", function(req, res){
    // const submittedSecret = req.body.secret;
    // console.log(req.user.id);
    // User.findById(req.user._id, function(err, foundUser){
    //     if(err){
    //         console.log(err);
    //     } else{
    //         if(foundUser){
    //             foundUser.secret = submittedSecret;
    //             foundUser.save(function(err){
    //                 if(!err){
    //                     res.redirect("/secrets");
    //                 }
    //             })
    //         }
    //     }
    // })
    const sec = new Secret({
        cont: req.body.secret
    })
    sec.save(function(err){
        if(!err){
            res.redirect("/secrets");
        }
    })
})
app.post("/register", function(req, res){
    User.register({username: req.body.username}, req.body.password, function(err, user){
        if(err){
            localStorage(err);
            res.redirect("/register");
        } else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secrets");
            });
        }
    })
    
})

app.post("/login", function(req, res){
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, function(err){
        if(err){
            console.log(err);
        } else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secrets");
            });
        }
    })
})

app.listen(3000, function(){
    console.log("Server running at port 3000");
});

