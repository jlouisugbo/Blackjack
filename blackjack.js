// blackjack.js
import { initializeCards, calculateBestValue } from './cards.js';

const cardList = initializeCards(); 
let playerVals = []; 
let dealerVals = []; 
let losses = 0;
let wins = 0; 
let ties = 0;
let buttonsDisabled = false;
const gamescreen = document.getElementById("game-screen");
const gameover = document.getElementById("game-over-screen");
const p = 'player-cards';
const d = 'dealer-cards';

// Button delay system
function disableButtonsTemporarily() {
    buttonsDisabled = true;
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = '0.5';
        btn.style.cursor = 'not-allowed';
    });
    
    setTimeout(() => {
        buttonsDisabled = false;
        buttons.forEach(btn => {
            btn.disabled = false;
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
        });
    }, 3000);
}

// Wrapper function to check if buttons are disabled
function executeIfEnabled(callback) {
    if (!buttonsDisabled) {
        disableButtonsTemporarily();
        callback();
    }
}

function startGame() {
    document.getElementById("welcome-screen").classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    initializeGame();
}

function initializeGame() {
    playerVals = [];
    dealerVals = [];
    document.getElementById('player-cards').innerHTML = '';
    document.getElementById('dealer-cards').innerHTML = '';
    
    setTimeout(() => draw('player-cards'), 600);
    setTimeout(() => draw('dealer-cards'), 600);
    setTimeout(() => draw('player-cards'), 600);
}


function draw(person) {
    const rand = Math.floor(Math.random() * cardList.length);
    const [filename, rank, data] = cardList.splice(rand, 1)[0];;
    const container = document.getElementById(person);
    
    // Create card container
    const cardDiv = document.createElement('div');
    cardDiv.className = "w-16 h-24 bg-white border-2 border-gray-800 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-lg opacity-0";
    
    // Create and append image
    const img = document.createElement('img');
    img.src = `./cards/${filename}`;
    img.className = "w-full h-full object-cover rounded";
    img.alt = `${rank} card`;
    
    // Set dataset on cardDiv
    cardDiv.dataset.value = Array.isArray(data) ? data.join(' or ') : data;
    cardDiv.dataset.rank = rank;
    
    cardDiv.appendChild(img);
    
    if (person === 'dealer-cards') {
        dealerVals.push(data);
    } else {
        playerVals.push(data);
    }

    cardDiv.onclick = () => {
        const modal = document.getElementById('modal');
        const modalText = document.getElementById('modalText');
        modalText.textContent = `Card: ${rank} | Value: ${cardDiv.dataset.value}`;
        modal.classList.remove('hidden');

        setTimeout(() => {
            modal.classList.add('hidden');
        }, 2000);
    }

    container.appendChild(cardDiv);
    
    setTimeout(() => {
        cardDiv.style.opacity = '1';
        cardDiv.style.transition = 'opacity 0.5s ease-in-out';
    }, 50);
    
    setTimeout(() => {
        calculateHandValues();
    }, 600); 
}

function calculateHandValues() {
    let pval = calculateBestValue(playerVals);
    let dval = calculateBestValue(dealerVals);

    const pEl = document.getElementById('pval');
    const dEl = document.getElementById('dval');
    pEl.textContent = pval;
    dEl.textContent = dval;

    // Check for player bust - but show the card and value first
    if(pval > 21){
        // Wait 1.5 seconds to let player see their busting card and value
        setTimeout(() => {
            endGame('lose', 'busted');
        }, 1500);
    }
}

function stand(){
    // Disable buttons during dealer's turn
    buttonsDisabled = true;
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = '0.5';
    });

    // Function to draw dealer cards one by one with suspense
    function drawDealerCardWithDelay() {
        // Check if dealer should stop BEFORE drawing
        const currentDealerValue = calculateBestValue(dealerVals);
        
        if (currentDealerValue >= 17) {
            // Dealer is done drawing, calculate final results
            setTimeout(() => {
                const playerTotal = calculateBestValue(playerVals);
                const dealerTotal = calculateBestValue(dealerVals);

                if(dealerTotal > 21){
                    endGame('win', 'won - dealer busted');
                } else if(playerTotal > dealerTotal){
                    endGame('win', 'won');
                } else if(playerTotal === dealerTotal){
                    endGame('tie', 'tied');
                } else {
                    endGame('lose', 'lost');
                }
            }, 1000); // 1 second pause after dealer's final card
            return;
        }

        // Draw one dealer card
        draw(d);
        
        // Wait 2 seconds, then check again and potentially draw another
        setTimeout(() => {
            drawDealerCardWithDelay(); // Recursive call to continue drawing
        }, 2000);
    }

    // Start dealer card drawing sequence
    drawDealerCardWithDelay();
}

function endGame(outcome, message) {
    if (outcome === 'win') wins++;
    if (outcome === 'lose') losses++;
    if (outcome === 'tie') ties++;
    
    const result = document.getElementById("result");
    result.textContent = message;
    updateRecord();
    
    // Show game over screen after a delay
    setTimeout(() => {
        gamescreen.classList.add("hidden");
        gameover.classList.remove("hidden");
        
        // Re-enable buttons for game over screen
        const buttons = document.querySelectorAll('button');
        buttons.forEach(btn => {
            btn.disabled = false;
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
        });
        buttonsDisabled = false;
    }, 1500); // 1.5 second delay to see final cards
}

function hit() {
    executeIfEnabled(() => {
        draw('player-cards');
    });
}

function standWrapper() {
    executeIfEnabled(() => {
        stand();
    });
}

function playAgain(){
    document.getElementById(d).innerHTML = '';
    document.getElementById(p).innerHTML = '';

    document.getElementById("game-over-screen").classList.add("hidden");
    gamescreen.classList.remove("hidden");
    
    // Reset button states
    buttonsDisabled = false;
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
        btn.disabled = false;
        btn.style.opacity = '1';
        btn.style.cursor = 'pointer';
    });
    
    initializeGame();
}

function updateRecord(){
    document.getElementById("wins").textContent = wins;
    document.getElementById("ties").textContent = ties;
    document.getElementById("losses").textContent = losses;
}

// Make functions available globally for HTML onclick
window.startGame = startGame;
window.hit = hit;
window.stand = standWrapper; // Use wrapper for delay system
window.playAgain = playAgain;