const colors = ['red', 'blue', 'green', 'yellow'];
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

let deck = [];
let pile = [];

function createDeck() {
    for (let color of colors) {
        for (let number of numbers) {
            deck.push({ color, number });
        }
    }
}

function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function dealHands() {
    for (let i = 0; i < 7; i++) {
        drawCard('hand1');
        drawCard('hand2');
    }
}

function drawCard(handId) {
    const hand = document.getElementById(handId);
    const card = deck.pop();
    if (card) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.textContent = card.number;
        cardElement.style.backgroundColor = card.color;
        cardElement.onclick = () => playCard(card, cardElement);
        hand.appendChild(cardElement);
    }
}

function playCard(card, cardElement) {
    const topCard = pile[pile.length - 1];
    if (card.color === topCard.color || card.number === topCard.number) {
        pile.push(card);
        updatePileDisplay();
        cardElement.remove();
        checkWin();
        nextPlayer();
    } else {
        alert('No puedes jugar esa carta.');
    }
}

function updatePileDisplay() {
    const pileElement = document.getElementById('pile');
    const topCard = pile[pile.length - 1];
    pileElement.textContent = topCard.number;
    pileElement.style.backgroundColor = topCard.color;
}

function playTurn() {
    drawCard('hand1');
    drawCard('hand2');
    nextPlayer();
}

function nextPlayer() {
    const button = document.querySelector('button');
    const player1 = document.getElementById('player1');
    const player2 = document.getElementById('player2');

    if (button.disabled === true) {
        button.disabled = false;
        player1.style.border = '2px solid #000';
        player2.style.border = 'none';
    } else {
        button.disabled = true;
        player1.style.border = 'none';
        player2.style.border = '2px solid #000';
    }
}

function checkWin() {
    if (deck.length === 0) {
        const hand1 = document.getElementById('hand1').children.length;
        const hand2 = document.getElementById('hand2').children.length;

        if (hand1 === 0) {
            alert('¡Jugador 1 ha ganado!');
        } else if (hand2 === 0) {
            alert('¡Jugador 2 ha ganado!');
        } else {
            alert('¡Ha ocurrido un empate!');
        }
    }
}

createDeck();
shuffleDeck();
dealHands();
updatePileDisplay();
document.addEventListener('keydown', function(event) {
    const keyCode = event.keyCode;
    if (keyCode >= 49 && keyCode <= 57) { // 49-57 son los códigos de tecla para los números 1-9
        const handIndex = keyCode - 49; // Convertimos el código de tecla a un índice de la mano (0-8)
        const currentPlayer = document.querySelector('.player.active');
        const hand = currentPlayer.querySelector('.hand');
        const cards = hand.children;

        if (handIndex < cards.length) {
            const cardElement = cards[handIndex];
            const card = {
                color: cardElement.style.backgroundColor,
                number: cardElement.textContent
            };
            playCard(card, cardElement);
        }
    }
});
