const images = [
   "apple.jpg",
    "banana.jpg",
    "cherry.jpg",
    "grapes.jpg",
    "orange.jpg",
    "pineapple.jpg"
];

const totalPairs = images.length;
let cards = [...images, ...images];

let firstCard = null;
let secondCard = null;
let lockBoard = false;

let currentPlayer = 1;
let score1 = 0;
let score2 = 0;

const gameBoard = document.getElementById("gameBoard");
const turnText = document.getElementById("turn");
const p1Score = document.getElementById("p1");
const p2Score = document.getElementById("p2");
const popup = document.getElementById("popup");
const winnerText = document.getElementById("winnerText");

function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
}

function createBoard() {
    gameBoard.innerHTML = "";
    shuffle(cards);

    cards.forEach(img => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="front"></div>
            <div class="back">
                <img src="images/${img}">
            </div>
        `;

        card.addEventListener("click", () => flipCard(card));
        gameBoard.appendChild(card);
    });
}

function flipCard(card) {
    if (lockBoard || card === firstCard) return;

    card.classList.add("flip");

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    checkMatch();
}

function checkMatch() {
    const img1 = firstCard.querySelector("img").src;
    const img2 = secondCard.querySelector("img").src;

    if (img1 === img2) {
        if (currentPlayer === 1) {
            score1++;
            p1Score.innerText = score1;
        } else {
            score2++;
            p2Score.innerText = score2;
        }
        checkWinner();
        resetTurn();
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove("flip");
            secondCard.classList.remove("flip");
            switchPlayer();
            resetTurn();
        }, 1000);
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    turnText.innerText = `Player ${currentPlayer} Turn`;
}

function resetTurn() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function checkWinner() {
    if (score1 + score2 === totalPairs) {
        popup.style.display = "flex";

        if (score1 > score2) {
            winnerText.innerText = "🏆 Player 1 Wins!";
        } else if (score2 > score1) {
            winnerText.innerText = "🏆 Player 2 Wins!";
        } else {
            winnerText.innerText = "🤝 It's a Draw!";
        }
    }
}

function resetGame() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;

    currentPlayer = 1;
    score1 = 0;
    score2 = 0;

    p1Score.innerText = 0;
    p2Score.innerText = 0;
    turnText.innerText = "Player 1 Turn";
    popup.style.display = "none";

    createBoard();
}

createBoard();
