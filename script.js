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

// function to toggle b/w chances.
function chanceToggle(ch) {
  if (ch === 1) {
    player2Current.innerText = 0;
    player1.classList.add('player--active');
    player2.classList.remove('player--active');
    chance = 0;
  } else {
    player1Current.innerText = 0;
    player2.classList.add('player--active');
    player1.classList.remove('player--active');
    chance = 1;
  }
}

// event handler for the click on roll dice button.
diceRoll.addEventListener('click', () => {
  randomNumber = Math.trunc(Math.random() * 6) + 1; // generating random number b/w 1-6;
  dice.src = `dice-${randomNumber}.png`; // changing dice.
  dice.style.display = 'block'; // show the dice.

  // for dice = 1
  if (randomNumber === 1) {
    chanceToggle(chance); // calling the fuction to toggle the chance.
  } else {
    // calculating the current score of the player 1 & 2
    if (chance === 0) {
      player1Current.innerText =
        Number(player1Current.innerText) + randomNumber;
    } else if (chance === 1) {
      player2Current.innerText =
        Number(player2Current.innerText) + randomNumber;
    }
  }
});

// event handler for the click on hold button.
hold.addEventListener('click', () => {
  if (chance === 1) {
    // calculating the total score of the player 2
    player2Score.innerText =
      Number(player2Current.innerText) + Number(player2Score.innerText);

    //checking if the player 2 is winner or not
    if (player2Score.innerText >= 100) {
      alert("Player 2 Win's the game !!! ");
      player2.classList.add('player--winner');
      diceRoll.disabled = true;
      hold.disabled = true;
    }
    chanceToggle(chance);
  } else if (chance === 0) {
    // calculating the total score of the player 1
    player1Score.innerText =
      Number(player1Current.innerText) + Number(player1Score.innerText);

    //checking if the player 2 is winner or not
    if (player1Score.innerText >= 100) {
      alert("Player 1 Win's the game !!! ");
      player1.classList.add('player--winner');
      diceRoll.disabled = true;
      hold.disabled = true;
    }
    chanceToggle(chance);
  }
});

document.querySelector('.btn--new').addEventListener('click', () => {
  dice.style.display = 'none';
  player1Current.innerText = 0;
  player2Current.innerText = 0;
  player1Score.innerText = 0;
  player2Score.innerText = 0;
  chance = 0;
  if (player1.classList.contains('player--winner')) {
    player1.classList.remove('player--winner');
  } else if (!player1.classList.contains('player--active')) {
    player1.classList.add('player--active');
  }

  if (player2.classList.contains('player--winner')) {
    player2.classList.remove('player--winner');
  } else if (player2.classList.contains('player--active')) {
    player2.classList.remove('player--active');
  }
});
