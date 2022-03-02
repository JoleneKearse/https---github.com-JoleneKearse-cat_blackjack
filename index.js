// grab DOM elements
let messageEl = document.getElementById("messageEl");
let cardsEl = document.getElementById("cardsEl");
let sumEl = document.getElementById("sumEl");
let startGameBtn = document.getElementById("startGameBtn");
let newCardBtn = document.getElementById("newCardBtn");
let root = document.documentElement;

// declare variables
let sum = 0;
let cards = [];
let message = "";
let isPlaying = false;
let hasBlackjack = false;

// lookups for card & value


// game play functions
const drawRandomCard = () => {
    let randomNumber = Math.floor(Math.random() * 13) + 1;
    if (randomNumber > 10) {
        return 10;
    } else if (randomNumber === 1) {
        return 1;
    } else {
        return randomNumber;
    } 
};

const startGame = () => {
    root.style.setProperty("--green-light", "#b1ffbb");
    startGameBtn.textContent = "Start Game";
    isPlaying = true;
    // draw first 2 cards
    let firstCard = drawRandomCard();
    let secondCard = drawRandomCard();
    // add to cards array
    cards = [firstCard, secondCard];
    // display first 2 cards
    cardsEl.textContent = ` ${cards[0]}   ${cards[1]}   `;
    // set initial sum
    sum = firstCard + secondCard;
    renderGame();
};

const renderGame = () => {
    // display additional cards
    if (cards.length > 2) {
        cardsEl.textContent += `${cards.slice(-1)}   `;
    };
    sumEl.textContent = ` ${sum}`;
    displayMessage();
};

const newCard = () => {
    if (isPlaying === true && hasBlackjack === false) {
        let card = drawRandomCard();
        sum += card;
        cards.push(card);
        renderGame();
    }
};

const displayMessage = () => {
    if (sum < 21) {
        messageEl.textContent = "Do you want another card?";
    } else if (sum === 21) {
        hasBlackjack = true;
        messageEl.textContent = "Blackjack!!!";
        root.style.setProperty("--green-light", "#F1D302");
        startGameBtn.textContent = "Reset";
        delayReset();
    } else {
        messageEl.textContent = "You're out of the game!";
        isPlaying = false;
        root.style.setProperty("--green-light", "#F1D302");
        startGameBtn.textContent = "Reset";
        delayReset();
    };
};

// allow results to stay up for 5000ms after end of game
function delayReset() {
    setTimeout(function() {resetGame(); }, 5000);
};

const resetGame = () => {
    messageEl.textContent = "Ready to play?";
    cardsEl.textContent = "";
    sumEl.textContent = "";
};
