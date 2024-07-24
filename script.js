const words = ['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us', 'is', 'are', 'was', 'were', 'been', 'has', 'had', 'may', 'might', 'must', 'should', 'could', 'would', 'can', 'cannot', 'shall', 'will', 'am', 'where', 'why', 'when', 'who', 'whom', 'whose', 'which', 'what', 'whatever', 'whoever', 'whomever', 'whichever', 'whenever', 'wherever', 'however', 'although', 'though', 'even', 'if', 'unless', 'until', 'provided', 'assuming', 'while', 'because', 'since', 'so', 'that', 'in', 'order', 'as', 'long', 'due', 'to', 'owing', 'considering', 'inasmuch', 'forasmuch', 'seeing', 'being', 'do', 'does', 'did', 'done', 'made', 'makes', 'making', 'take', 'takes', 'taking', 'took', 'taken', 'give', 'gives', 'giving', 'gave', 'given', 'go', 'goes', 'going', 'went', 'gone', 'come', 'comes', 'coming', 'came', 'get', 'gets', 'getting', 'got', 'gotten', 'put', 'puts', 'putting', 'set', 'sets', 'setting', 'sat', 'sat', 'let', 'lets', 'letting', 'run', 'runs', 'running', 'ran'];

let currentWords = [];
let score = 0;
let time = 60;
let timer;
let difficulty = 'easy';
let totalCharacters = 0;
let lastTypedTime = Date.now();


let currentLines = [];
let currentLineIndex = 0;
let currentWordIndex = 0;


const wordDisplay = document.getElementById('word-display');
const userInput = document.getElementById('user-input');
const timeDisplay = document.getElementById('time');
const scoreDisplay = document.getElementById('score');
const difficultySelect = document.getElementById('difficulty');
const highScoreDisplay = document.getElementById('high-score');

function init() {
    // Make sure all elements exist before adding event listeners
    if (difficultySelect && userInput && wordDisplay && scoreDisplay && timeDisplay) {
        difficultySelect.addEventListener('change', changeDifficulty);
        userInput.addEventListener('input', checkInput);
        userInput.addEventListener('keydown', handleSpace);
        setNewWords();
        startTimer();
        displayHighScore();
    } else {
        console.error('Some required elements are missing from the DOM');
    }
}

function setNewWords() {
    currentLines = [];
    let currentLine = [];
    let lineCharCount = 0;
    const maxLineLength = 60; // Adjust this value as needed

    while (currentLines.length < 5) {  // Generate 5 lines
        const newWord = getRandomWord();
        if (lineCharCount + newWord.length + 1 > maxLineLength) {
            currentLines.push(currentLine.join(' '));
            currentLine = [];
            lineCharCount = 0;
        }
        currentLine.push(newWord);
        lineCharCount += newWord.length + 1;
    }
    
    if (currentLine.length > 0) {
        currentLines.push(currentLine.join(' '));
    }

    currentLineIndex = 0;
    currentWordIndex = 0;
    updateDisplay();
}

function scrollToCurrentLine() {
    const lineHeight = wordDisplay.querySelector('.word-line').offsetHeight;
    const scrollAmount = lineHeight * currentLineIndex;
    wordDisplay.style.transform = `translateY(-${scrollAmount}px)`;
}

function updateDisplay() {
    const lineElements = currentLines.map((line, lineIndex) => {
      const words = line.split(' ');
      const wordSpans = words.map((word, wordIndex) => {
        const wordElement = document.querySelector(`#word-display .word-line:nth-child(${lineIndex + 1}) span:nth-child(${wordIndex + 1})`);
        let className = wordElement ? wordElement.className : '';
        
        if (lineIndex === currentLineIndex && wordIndex === currentWordIndex) {
          className = 'current';
        } else if (lineIndex > currentLineIndex || (lineIndex === currentLineIndex && wordIndex > currentWordIndex)) {
          className = ''; // Reset class for upcoming words
        }
        
        return `<span class="${className}">${word}</span>`;
      });
      return `<div class="word-line">${wordSpans.join(' ')}</div>`;
    });
  
    wordDisplay.innerHTML = lineElements.join('');
    scrollToCurrentLine();
  }
  

function smoothScroll() {
    const currentWordElement = wordDisplay.querySelector('.current');
    if (currentWordElement && typeof currentWordElement.scrollIntoView === 'function') {
        currentWordElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
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
    const currentLine = currentLines[currentLineIndex];
    const words = currentLine.split(' ');
    const currentWord = words[currentWordIndex];
    const userWord = userInput.value;
  
    const wordElements = document.querySelectorAll('#word-display .word-line')[currentLineIndex].querySelectorAll('span');
    const currentWordElement = wordElements[currentWordIndex];
  
    if (!currentWordElement) {
      console.error('Current word element not found');
      return;
    }
  
    if (userWord === currentWord) {
      currentWordElement.className = 'correct';
    } else if (currentWord.startsWith(userWord)) {
      currentWordElement.className = 'current';
    } else {
      currentWordElement.className = 'incorrect';
    }
  }
  
  function handleSpace(e) {
    if (e.code === 'Space') {
      e.preventDefault();
      const currentLine = currentLines[currentLineIndex];
      const words = currentLine.split(' ');
      
      if (currentWordIndex >= words.length) {
        moveToNextLine();
        return;
      }
  
      const currentWord = words[currentWordIndex];
      const userWord = userInput.value.trim();
  
      const wordElements = document.querySelectorAll('#word-display .word-line')[currentLineIndex].querySelectorAll('span');
      const currentWordElement = wordElements[currentWordIndex];
  
      if (userWord === currentWord) {
        // Word is correct
        currentWordElement.className = 'typed correct';
        score += calculateScore(currentWord);
        totalCharacters += currentWord.length + 1;
      } else {
        // Word is incorrect
        currentWordElement.className = 'typed incorrect';
        score -= Math.floor(currentWord.length / 2); // Penalty for incorrect word
      }
  
      currentWordIndex++;
      userInput.value = '';
      updateDisplay();
      scoreDisplay.textContent = `Score: ${score}`;
  
      if (currentWordIndex >= words.length) {
        moveToNextLine();
      }
    }
  }

function moveToNextLine() {
    currentLineIndex++;
    currentWordIndex = 0;
    if (currentLineIndex >= currentLines.length) {
      setNewWords();
    } else {
      updateDisplay();
    }
  }

function startTimer() {
    timer = setInterval(() => {
        time--;
        timeDisplay.textContent = `Time: ${time} seconds`;
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
    updateHighScore(score);
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
    lastTypedTime = Date.now();
    scoreDisplay.textContent = 'Score: 0';
    timeDisplay.textContent = 'Time: 60s';
    userInput.disabled = false;
    setNewWords();
    startTimer();
}

function updateHighScore(newScore) {
    const highScore = localStorage.getItem('typingGameHighScore') || 0;
    if (newScore > highScore) {
        localStorage.setItem('typingGameHighScore', newScore);
        displayHighScore();
    }
}

function calculateWPM() {
    const minutes = (Date.now() - gameStartTime) / 60000;
    return Math.round((totalCharacters / 5) / minutes);
  }

function calculateScore(word) {
    const now = Date.now();
    const timeTaken = (now - lastTypedTime) / 1000; // Time taken in seconds
    lastTypedTime = now;

    // Base score is the word length
    let score = word.length;

    // Bonus for speed: If typed under 1 second, add extra points
    if (timeTaken < 1) {
        score += Math.floor(10 * (1 - timeTaken)); // Up to 10 bonus points for speed
    }

    return score;
}

function displayHighScore() {
    const highScore = localStorage.getItem('typingGameHighScore') || 0;
    const highScoreDisplay = document.getElementById('high-score');
    if (highScoreDisplay) {
        highScoreDisplay.textContent = `High Score: ${highScore}`;
    }
}

// Wrap the init function in a DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    lastTypedTime = Date.now();
    init();
});