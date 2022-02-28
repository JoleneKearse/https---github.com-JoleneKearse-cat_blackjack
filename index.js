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
    root.style.setProperty("--btn-background", "#b1ffbb");
    startGameBtn.textContent = "Start Game";
    isPlaying = true;
    // draw first 2 cards
    let firstCard = drawRandomCard();
    let secondCard = drawRandomCard();
    // add to cards array
    cards = [firstCard, secondCard];
    // display first 2 cards
    cardsEl.textContent = ` ${cards[0]}  ${cards[1]}  `;
    // set initial sum
    sum = firstCard + secondCard;
    renderGame();
};

const renderGame = () => {
    // display additional cards
    for (let i = 2; i < cards.length; i++) {
        // BUG: doubles up after 4th newCard()
        cardsEl.textContent += `${cards[i]}  `;
    };
    // display sum
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
        setDelay(function() {
            root.style.setProperty("--btn-background", "#F1D302");
            startGameBtn.textContent = "Reset";
        }, 2000);
        resetGame();
    } else {
        messageEl.textContent = "You're out of the game!";
        isPlaying = false;
        setDelay(function() {
            root.style.setProperty("--btn-background", "#F1D302");
            startGameBtn.textContent = "Reset";
        }, 2000);
        resetGame();
        // root.style.setProperty("--btn-background", "#F1D302");
        // startGameBtn.textContent = "Reset";
        // setDelay(function() {
        //     resetGame();
        // }, 2000);
    }
};

const resetGame = () => {
    messageEl.textContent = "Ready to play?";
    cardsEl.textContent = "";
    sumEl.textContent = "";
    setDelay(function() {
        startGame();
    }, 2000);
};
