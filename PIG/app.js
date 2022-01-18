


var scores, roundScores, activePlayer, player1 = "",
  player2 = "";

function newGame() {


  player1 = document.querySelector('#name1').value;
  player2 = document.querySelector('#name2').value;



  if (player1.length <= 6 && player2.length <= 6 && player1.trim() !== "" && player2.trim() !== "") {
    window.location.href = "#";
    init();
  }



}

function popUp() {

  document.querySelector('#new').click();

}

function init() {
  scores = [0, 0];
  roundScores = 0;
  activePlayer = 0;
  document.querySelector('#score-0').textContent = 0;
  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#score-1').textContent = 0;
  document.querySelector('#current-1').textContent = 0;

  document.querySelector('.btn-roll').style.visibility = 'visible';
  document.querySelector('.btn-hold').style.visibility = 'visible';
  document.querySelector('.dice').style.visibility = 'visible';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('winner');



  document.querySelector('#name-0').textContent = player1;
  document.querySelector('#name-1').textContent = player2;


  renewPower();
  eventListners();




}

function randomNumber() {
  var n = Math.random() * 6;
  n = Math.floor(n) + 1;
  return n;
}

function rollDice() {

  var diceValue = randomNumber();

  document.querySelector('.dice').setAttribute('src', 'inverted-dice-' + diceValue + '.png');
  $('.dice').hide();
  $('.dice').fadeIn();

  if (diceValue === 1) {
    gotOne();
  } else {
    roundScores = roundScores + diceValue;
    document.querySelector('#current-' + activePlayer).textContent = roundScores;
  }
  return diceValue;
}

function gotOne() {
  roundScores = 0;
  document.querySelector('#current-' + activePlayer).textContent = roundScores;
  if (activePlayer === 0) {
    activePlayer = 1;
    document.querySelector('.pl1').style.visibility = 'hidden';
    document.querySelector('.pl2').style.visibility = 'visible';

  } else {
    activePlayer = 0;
    document.querySelector('.pl1').style.visibility = 'visible';
    document.querySelector('.pl2').style.visibility = 'hidden';

  }


  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');



}



function hold() {


  scores[activePlayer] = scores[activePlayer] + roundScores;
  document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

  roundScores = 0;
  document.querySelector('#current-' + activePlayer).textContent = roundScores;

  if (activePlayer === 0) {
    activePlayer = 1;

    document.querySelector('.pl1').style.visibility = 'hidden';
    document.querySelector('.pl2').style.visibility = 'visible';

  } else {
    activePlayer = 0;
    document.querySelector('.pl1').style.visibility = 'visible';
    document.querySelector('.pl2').style.visibility = 'hidden';

  }




  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');









  if (scores[0] >= 100) {
    document.querySelector('.player-0-panel').classList.add('winner');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('#name-0').textContent = "👑 " + player1 + " Wins !!";
    winner();

  } else if (scores[1] >= 100) {
    document.querySelector('.player-1-panel').classList.add('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('#name-1').textContent = "👑 " + player2 + " Wins !!";
    winner();

  }


}

function winner() {

  document.querySelector('.btn-roll').style.visibility = 'hidden';
  document.querySelector('.btn-hold').style.visibility = 'hidden';
  document.querySelector('.dice').style.visibility = 'hidden';
  if(document.querySelector('#player2-gamble')){
    document.querySelector('#player2-gamble').remove();
  }
  if(document.querySelector('#player1-gamble')){
    document.querySelector('#player1-gamble').remove();
  }
  if(document.querySelector('#player2-swap')){
    document.querySelector('#player2-swap').remove();
  }
  if(document.querySelector('#player1-swap')){
    document.querySelector('#player1-swap').remove();
  }
}

function gamble(id) {

  document.querySelector(id).remove();

  var activePlayerBefore = activePlayer;
  var initialScore = scores[activePlayer];
  var diceValue = rollDice();
  var activePlayerAfter = activePlayer;
  if (activePlayerBefore === activePlayerAfter) {

    if (diceValue % 2 === 0) {
      roundScores = roundScores + 4 * diceValue;


    } else {

      roundScores = roundScores - 4 * diceValue;
      if (roundScores < 0) {
        roundScores = 0;
      }


    }
    document.querySelector('#current-' + activePlayer).textContent = roundScores;

  }
}

function swap(id) {

  document.querySelector(id).remove();
  document.querySelector("#swap-button").click();

  var diceValue = randomNumber();

  document.querySelector('.duplicate').setAttribute('src', 'inverted-dice-' + diceValue + '.png');

  if (document.querySelector('.message')) {
    document.querySelector('.message').remove();
  }


  if (diceValue === 6) {
    document.querySelector('#swap-content').insertAdjacentHTML('beforeBegin', '<div class="message">JACKPOT !!! SCORES SWAPPED</div>');

    var temp = scores[0];
    scores[0] = scores[1];
    scores[1] = temp;

    document.querySelector('#score-0').textContent = scores[0];
    document.querySelector('#score-1').textContent = scores[1];

  } else {
    document.querySelector('#swap-content').insertAdjacentHTML('beforeBegin', '<div class="message">HARD LUCK !!!</h1></div>');
  }

}




function eventListners() {
  document.querySelector('.btn-roll').addEventListener('click', rollDice);
  document.querySelector('.btn-hold').addEventListener('click', hold);




  document.querySelector('#player1-gamble').addEventListener('click', function() {
    gamble('#player1-gamble')
  });
  document.querySelector('#player2-gamble').addEventListener('click', function() {
    gamble('#player2-gamble')
  });



  document.querySelector('#player1-swap').addEventListener('click', function() {
    swap('#player1-swap')
  });
  document.querySelector('#player2-swap').addEventListener('click', function() {
    swap('#player2-swap')
  });
}

function renewPower() {


  if (document.querySelector('#player1-gamble'))
    document.querySelector('#player1-gamble').remove();

  if (document.querySelector('#player2-gamble'))
    document.querySelector('#player2-gamble').remove();

  if (document.querySelector('#player1-swap'))
    document.querySelector('#player1-swap').remove();

  if (document.querySelector('#player2-swap'))
    document.querySelector('#player2-swap').remove();


  document.querySelector('.pl1').insertAdjacentHTML('beforeEnd', '<button type="button" class="btn powerup  btn-danger col-lg-5" id="player1-gamble">Gamble</button>');
  document.querySelector('.pl1').insertAdjacentHTML('beforeEnd', '<button type="button" class="btn powerup btn-success col-lg-5" id="player1-swap">Swap</button>');


  document.querySelector('.pl2').insertAdjacentHTML('beforeEnd', '<button type="button" class="btn powerup btn-danger col-lg-5" id="player2-gamble">Gamble</button>');
  document.querySelector('.pl2').insertAdjacentHTML('beforeEnd', '<button type="button" class="btn powerup btn-success col-lg-5" id="player2-swap">Swap</button>');

  document.querySelector('.pl1').style.visibility = 'visible';
  document.querySelector('.pl2').style.visibility = 'hidden';
}

document.querySelector('.btn-new').addEventListener('click', popUp);
