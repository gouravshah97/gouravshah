colorAvailable = ['green', 'red','white', 'yellow', 'blue','brown'];
var level = 0;
var isGameStarted = false;
colorSequence = [];
userInput = [];


function randomNumberGenerator() {
  var x = Math.random() * 6;
  var randomNumber = Math.floor(x);
  return randomNumber;
}

function colorGenerator() {
  level = level + 1;
  $('h1').text("Level " + level);
  chosenColor = colorAvailable[randomNumberGenerator()];
  colorSequence.push(chosenColor);
  $('#' + chosenColor).fadeOut(250).fadeIn(250);
  sound(chosenColor);


}

function sound(chosenColor) {
  var audio = new Audio("sounds/" + chosenColor + ".mp3");
  audio.play();
}

function addPressClass(chosenColor) {
  $('#' + chosenColor).addClass("pressed");

  setTimeout(function() {
    $('#' + chosenColor).removeClass("pressed");
  }, 100);
}

$(document).keypress(function() {
  gameStart();
})


$(document).click(function(event) {
  gameStart();
})

function gameStart() {
  if (isGameStarted !== true) {
    isGameStarted = true;
    colorSequence = [];
    userInput = [];
    level = 0;

    var audio = new Audio("sounds/start.mp3");
    audio.play();
    $('h1').text('Remember the Color Sequence and Press Accordingly !!!');
    setTimeout(function() {

      colorGenerator();

    }, 6000);


  }
}

$('.btn').click(function(event) {
  var id = event.target.id;


  addPressClass(id);
  userInput.push(id);
  checkAnswer(id);


})


function checkAnswer(id) {
  for (var i = 0; i < userInput.length; i++) {
    if (userInput[i] !== colorSequence[i]) {

      $("body").addClass("game-over");

      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 100);
      $('h1').text("Game Over. Press A key to replay");
      isGameStarted = false;
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();
      break;
    }else{
      sound(id);
    }
  }
  if (isGameStarted === true && userInput.length === colorSequence.length) {

    userInput = [];
    $("body").addClass("success");
    setTimeout(function() {
      $("body").removeClass("success");
    }, 100);

    setTimeout(function() {
      colorGenerator();
    }, 500);
  }
}
