'use strict';

// Select Elements
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentScore, activePlayer, scores, playing;

const init = function() {
	currentScore = 0;
	activePlayer = 0;
	scores = [ 0, 0 ];
	playing = true;

	score0.textContent = 0;
	score1.textContent = 0;
	current0.textContent = 0;
	current1.textContent = 0;

	diceEl.classList.add('hidden');
	player0.classList.remove('player--winner');
	player1.classList.remove('player--winner');
	player0.classList.add('player--active');
	player1.classList.remove('player--active');
};

init();

const switchPlayers = function() {
	document.querySelector(`#current--${activePlayer}`).textContent = 0;
	//document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
	currentScore = 0;
	activePlayer = activePlayer === 0 ? 1 : 0;
	//document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
	player0.classList.toggle('player--active'); // toggle -> if class is found remove it
	player1.classList.toggle('player--active'); // if class is not found add it
};

// Rolling Dice
btnRoll.addEventListener('click', () => {
	if (playing) {
		const dice = Math.trunc(Math.random() * 6) + 1;

		diceEl.classList.remove('hidden');
		diceEl.src = `images/dice-${dice}.png`;

		if (dice !== 1) {
			currentScore += dice;
			document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
		} else {
			switchPlayers();
		}
	}
});

btnHold.addEventListener('click', () => {
	if (playing) {
		scores[activePlayer] += currentScore;
		document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];
		if (scores[activePlayer] >= 100) {
			// Finish the game
			playing = false;
			diceEl.classList.add('hidden');
			document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
			document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
		} else {
			switchPlayers();
		}
	}
});

btnNew.addEventListener('click', init);
