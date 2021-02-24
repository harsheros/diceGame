'use strict';

// Selecting HTML Elements
const diceRoll = document.querySelector('.btn--roll'),
  dice = document.querySelector('.dice'),
  hold = document.querySelector('.btn--hold'),
  player1Current = document.querySelector('#current--0'),
  player2Current = document.querySelector('#current--1'),
  player1Score = document.querySelector('#score--0'),
  player2Score = document.querySelector('#score--1'),
  player1 = document.querySelector('.player--0'),
  player2 = document.querySelector('.player--1');

// setting variable for dice number & player chance.
let randomNumber,
  chance = 0;

// Hidding the dice.
dice.style.display = 'none';

// function to toggle b/w chances & player--active class for player 1 & 2.
function chanceToggle(ch) {
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
  document.querySelector(`#current--${ch}`).innerText = 0;
  chance = ch === 1 ? 0 : 1;
}

// event handler for the click on roll dice button.
diceRoll.addEventListener('click', () => {
  randomNumber = Math.trunc(Math.random() * 6) + 1; // generating random number b/w 1-6;
  dice.src = `dice-${randomNumber}.png`; // changing dice.
  dice.style.display = 'block'; // show the dice.

  // check for dice number
  if (randomNumber === 1) {
    chanceToggle(chance); // calling the fuction to toggle the chance.
  } else {
    // calculating the current score of the current player
    document.querySelector(`#current--${chance}`).innerText =
      Number(document.querySelector(`#current--${chance}`).innerText) +
      randomNumber;
  }
});

// event handler for the click on hold button.
hold.addEventListener('click', () => {
  // calculating the total score of the current player.
  document.querySelector(`#score--${chance}`).innerText =
    Number(document.querySelector(`#current--${chance}`).innerText) +
    Number(document.querySelector(`#score--${chance}`).innerText);

  //checking if the current player is winner or not
  if (document.querySelector(`#score--${chance}`).innerText >= 100) {
    document
      .querySelector(`.player--${chance}`)
      .classList.add('player--winner'); // adding player--winner class
    document
      .querySelector(`.player--${chance} > .player--winGif`)
      .classList.remove('hidden');
    document.querySelector('body').style.background =
      'linear-gradient(to top left, #367d82 0%, #2ebf46 100%)';

    // disabling the dice Roll & hold button.
    diceRoll.disabled = true;
    hold.disabled = true;
  }

  // calling the funcrion to toggle the player chance & resting the current score.
  chanceToggle(chance);
});

// reseting Everything back to initial state
document.querySelector('.btn--new').addEventListener('click', () => {
  dice.style.display = 'none'; // hiding dice

  // reseting player 1 & 2 current score to 0
  player1Current.innerText = 0;
  player2Current.innerText = 0;

  // reseting player 1 & 2 main score to 0.
  player1Score.innerText = 0;
  player2Score.innerText = 0;

  // making dice roll & hold button clickable again.
  diceRoll.disabled = false;
  hold.disabled = false;

  // reseting the chance to 0 means chance of player 1.
  chance = 0;

  // reseting the background of the game back to initial.
  document.querySelector('body').style.background =
    ' linear-gradient(to top left, #753682 0%, #bf2e34 100%)';

  // removing player--winner class from player 1 & 2 classList
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');

  // Adding hidden class to the winGif to hide the you win image.
  document
    .querySelector(`.player--0 > .player--winGif`)
    .classList.add('hidden');
  document
    .querySelector(`.player--1 > .player--winGif`)
    .classList.add('hidden');

  // Making player 1 active & player 2 deactive.
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
});
