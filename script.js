const words = ['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I', 
    'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at'];
// Expand this list to 150 words

let currentWords = [];
let currentWordIndex = 0;
let score = 0;
let time = 60;
let timer;
let difficulty = 'easy';
let totalCharacters = 0;

const wordDisplay = document.getElementById('word-display');
const userInput = document.getElementById('user-input');
const timeDisplay = document.getElementById('time');
const scoreDisplay = document.getElementById('score');
const difficultySelect = document.getElementById('difficulty');

function init() {
difficultySelect.addEventListener('change', changeDifficulty);
userInput.addEventListener('input', checkInput);
userInput.addEventListener('keydown', handleSpace);
setNewWords();
startTimer();
}

function setNewWords() {
currentWords = [];
for (let i = 0; i < 20; i++) {
currentWords.push(getRandomWord());
}
currentWordIndex = 0;
updateDisplay();
}

function updateDisplay() {
const wordSpans = currentWords.map((word, index) => {
if (index < currentWordIndex) {
 return `<span class="correct">${word}</span>`;
} else if (index === currentWordIndex) {
 return `<span class="current">${word}</span>`;
} else {
 return `<span>${word}</span>`;
}
});

const firstLine = wordSpans.slice(0, 10).join(' ');
const secondLine = wordSpans.slice(10, 20).join(' ');
wordDisplay.innerHTML = `${firstLine}<br>${secondLine}`;
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
const currentWord = currentWords[currentWordIndex];
const userWord = userInput.value;

if (userWord === currentWord) {
document.querySelectorAll('#word-display span')[currentWordIndex].className = 'correct';
} else if (currentWord.startsWith(userWord)) {
document.querySelectorAll('#word-display span')[currentWordIndex].className = 'current';
} else {
document.querySelectorAll('#word-display span')[currentWordIndex].className = 'incorrect';
}
}

function handleSpace(e) {
if (e.code === 'Space') {
e.preventDefault();
const currentWord = currentWords[currentWordIndex];
const userWord = userInput.value.trim();

if (userWord === currentWord) {
 score++;
 totalCharacters += currentWord.length + 1; // +1 for space
}

currentWordIndex++;
if (currentWordIndex >= currentWords.length) {
 setNewWords();
} else {
 updateDisplay();
}

userInput.value = '';
scoreDisplay.textContent = `Score: ${score}`;
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
const wpm = Math.round((totalCharacters / 5) / 1); // 1 minute
wordDisplay.innerHTML = `<h2>Game Over!</h2><p>Your score: ${score}</p><p>Words Per Minute: ${wpm}</p>`;
}

function changeDifficulty() {
difficulty = difficultySelect.value;
resetGame();
}

function resetGame() {
clearInterval(timer);
score = 0;
time = 60;
totalCharacters = 0;
scoreDisplay.textContent = 'Score: 0';
timeDisplay.textContent = 'Time: 60s';
userInput.disabled = false;
setNewWords();
startTimer();
}

init();