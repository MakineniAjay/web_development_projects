//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// mongoose.connect("mongodb+srv://ajaymakineni:Ajay_78098@cluster0.ohzjkkb.mongodb.net/todolistDB")
mongoose.connect("mongodb://localhost:27017/todolistDB")

const itemSchema = {
  name: String
};

const Item = mongoose.model("Item", itemSchema)

const item1 = new Item({
  name: "Welcome to your todolist!"
});
const item2 = new Item({
  name: "Hit the + button to add a new item"
});
const item3 = new Item({
  name: "<-- Hit this to delete a item"
});

const defaultItems = [item1,item2,item3];

const listSchema = {
  name:String,
  items: [itemSchema]
}

const List = mongoose.model("List", listSchema)

app.get("/", function(req, res) {
  
  Item.find({},function(err, content){
    if(content.length===0) {
      Item.insertMany(defaultItems, function(err){
        if(err){
          console.log(err);
        }
        else{
          console.log("Successful");
        }
        res.redirect("/");
      });
    }
    else{
      res.render("list", {listTitle: "Today", newListItems: content});
    }
  });
});

// app.get("/about", function(req, res){
//   res.render("about");
// });

app.get("/:customListName", function(req,res){
  const customListName =_.capitalize(req.params.customListName);
  // console.log(customListName);

List.findOne({name: customListName}, function(err, cont){
  if(!err){
    if(!cont){
      const list = new List({
        name: customListName,
        items: defaultItems
      });
      list.save();
      res.redirect("/" + customListName);
    }
    else if(cont.items.length===0){
      cont.items.push(...defaultItems);
      cont.save();
      res.redirect("/" + customListName);
    }
    else{
      res.render("list", {listTitle: cont.name, newListItems: cont.items})
    }
}
})


  
})

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listname = req.body.list;
  
  const item = new Item({
    name: itemName
  })

  if (listname === "Today") {
    item.save(function(err){
      if(!err){
        res.redirect("/");
      }
    });
  } else {
    List.findOne({name: listname}, function(err, contlist){
      contlist.items.push(item);
      contlist.save(function(err){
        if(!err){
          res.redirect("/" + listname);
        }
      });
    })
  }
});

app.post("/delete", function(req,res){
  const deleteitem = req.body.delete;
  const listname = req.body.listname;
  if(listname==="Today"){
    Item.deleteOne({_id:deleteitem}, function(err){
      if(!err){
        res.redirect("/")
      }
    })
    
  }
  else{
    List.findOneAndUpdate({name: listname}, {$pull:{items:{_id: deleteitem}}}, function(err, cont){
      if(!err){
        res.redirect("/"+listname);
      }
    })
  }
})

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

// app.get("/about", function(req, res){
//   res.render("about");
// });

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
