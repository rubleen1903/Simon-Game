var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var level = 0;

var started = false;



$(document).keydown(function() {

    if (!started)

    {

        $("#level-title").text("Level " + level);

        nextSequence();

        started = true;

    }

});





function checkAnswer(currentLevel)

{

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel])

    {

        console.log("success!");

        console.log(userClickedPattern, gamePattern);

        if (userClickedPattern.length === gamePattern.length)

        {

            setTimeout(() =>

                {

                    nextSequence();

                    userClickedPattern = [];

                }, 1000)

        }



    } else

    {

        console.log("Wrong!");

        console.log(userClickedPattern, gamePattern);

        playsound("wrong");

        $("body").addClass("game-over").delay(200).queue(function()

            {

                $("body").removeClass("game-over").dequeue();

            })

        $("h1").text("Game Over, Press Any Key to Restart");



        startOver();

    }

}





function startOver()

{

    level = 0;

    gamePattern = [];

    started = false;

    userClickedPattern = [];

}





$(".btn").click(function()

    {

        var userChosenColour = $(this).attr("id");

        userClickedPattern.push(userChosenColour);



        playsound(userChosenColour);

        animatePress(userChosenColour);

        console.log(userChosenColour);

        checkAnswer((userClickedPattern.length) - 1)

    });





function nextSequence()

{

    ++level;

    $("h1").text("Level " + level);

    var randomNumber = Math.floor((Math.random() * 4));

    var randomChosenColour = buttonColors[randomNumber];

    gamePattern.push(randomChosenColour);



    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playsound(randomChosenColour);



}



function playsound(name)

{

    var sound = new Audio('sounds/' + name + '.mp3');

    sound.play();

}



function animatePress(currentColor)

{

    $("#" + currentColor).click(function()

        {

            $(this).addClass("pressed").delay(100).queue(function()

                {

                    $(this).removeClass("pressed").dequeue();

                })

        });

}