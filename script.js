// List of common English words (you'd want to expand this to 150)
const words = ['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I', 
               'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at'];

let currentWord = '';
let score = 0;
let time = 60;
let timer;
let difficulty = 'easy';

const wordDisplay = document.getElementById('word-display');
const userInput = document.getElementById('user-input');
const timeDisplay = document.getElementById('time');
const scoreDisplay = document.getElementById('score');
const difficultySelect = document.getElementById('difficulty');

function init() {
    difficultySelect.addEventListener('change', changeDifficulty);
    userInput.addEventListener('input', checkInput);
    setNewWord();
    startTimer();
}

function setNewWord() {
    currentWord = getRandomWord();
    wordDisplay.textContent = currentWord;
    userInput.value = '';
}

function getRandomWord() {
    let word = words[Math.floor(Math.random() * words.length)];
    
    if (difficulty === 'medium') {
        word = word.charAt(0).toUpperCase() + word.slice(1);
    } else if (difficulty === 'hard') {
        word = word.toUpperCase();
        if (Math.random() > 0.5) {
            word += '.';
        }
    }
    
    return word;
}

function checkInput() {
    if (userInput.value.trim() === currentWord) {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        userInput.style.backgroundColor = 'green';
        setTimeout(() => {
            userInput.style.backgroundColor = '';
            setNewWord();
        }, 300);
    } else if (userInput.value.includes(' ')) {
        userInput.style.backgroundColor = 'red';
        setTimeout(() => {
            userInput.style.backgroundColor = '';
            userInput.value = '';
        }, 300);
    }
}

function startTimer() {
    timer = setInterval(() => {
        time--;
        timeDisplay.textContent = `Time: ${time}s`;
        if (time === 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(timer);
    userInput.disabled = true;
    wordDisplay.textContent = `Game Over! Your score: ${score}`;
}

function changeDifficulty() {
    difficulty = difficultySelect.value;
    resetGame();
}

function resetGame() {
    clearInterval(timer);
    score = 0;
    time = 60;
    scoreDisplay.textContent = 'Score: 0';
    timeDisplay.textContent = 'Time: 60s';
    userInput.disabled = false;
    setNewWord();
    startTimer();
}

init();
