var buttonColours = ["red", "blue", "green", "yellow"];
var gamepattern = [];
var userClickedPattern = [];
var flag = false;
var level = 0;

$(document).keypress(function () {
  if (!flag) {
    $("#level-title").text("level " + level);
    nextSequence();
    flag = true;
  }
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamepattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamepattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level = level + 1;
  $("#level-title").text("level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColours[randomNumber];
  gamepattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  },100);
}

function startOver(){
  level = 0;
  gamepattern = [];
  flag = false;
}