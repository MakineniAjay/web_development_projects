let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let level = 1;
let i = 0;
let started = false;

let playSound = (name)=>{
    let audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

let animatePress = (currentColour)=>{
    $("#"+currentColour).addClass("pressed");
    setTimeout(()=>{
        $("#"+currentColour).removeClass("pressed");
    },100);
}

let nextSequence = ()=>{
    let randomNumber = Math.random();
    randomNumber = Math.floor(randomNumber*4);

    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("h1").text("Level "+level);
    level += 1;
    i = 0;
    setTimeout(() => {
        $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomChosenColour);
    }, 800);

}

let checkAnswer = (colour)=>{
    if(colour === gamePattern[i]){
        i += 1;
        console.log("success "+ i);
        if(i===gamePattern.length){
            nextSequence();
        }
    }
    else{
        console.log("wrong");
        $("h1").html("GAME OVER<br><br>Press any Key to Start");
        playSound("wrong");
        gameOver();
    }
}

let gameOver = ()=>{
    console.log(over)
    level = 1;
    started = false;
    gamePattern = [];
}

$(document).keypress(function () { 
    if(!started){
        nextSequence();
        started = true;
    }
})


$(".btn").click(function () {
    if(started){
        let userChosenColour = $(this).attr("id");
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userChosenColour);
    }
});
