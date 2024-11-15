// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, getDoc, setDoc, doc, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCL-NCq1jnZnTrOME0Lox4PD9ay3LLK0Xw",
  authDomain: "tpbuddy-aef41.firebaseapp.com",
  projectId: "tpbuddy-aef41",
  storageBucket: "tpbuddy-aef41.appspot.com",
  messagingSenderId: "535405660972",
  appId: "1:535405660972:web:8ddf0cafbb5b2e532c3a89"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

// DOM elements
const wordContainer = document.getElementById('word-container');
const dropZones = document.querySelectorAll('.drop-zone');
const submitButton = document.getElementById('submit-button');
const nextButton = document.getElementById('next-button');
const progressSegments = document.querySelectorAll('.progress-segment');
const timerDisplay = document.querySelector('.timer');
const questionText = document.getElementById('question-text');

// Game variables
let currentQuestion = 0;
let seconds = 60; // 1 minute
let timer;
let userId = null;
let totalScore = 0; // Total score overall
let questionScores = []; // Array for storing scores for each question
let scoreSaved = false; // Flag to check if the score has been saved

// Questions array
const questions = [
  {
    question: "Identifikasi penulisan kata serapan yang benar dan salah!",
    words: ['Materai', 'Baterai', 'Orisinil', 'Hapal', 'Manajer', 'Hirarki', 'Selular', 'Omzet', 'Embus', 'Naas'],
    correct: ['Baterai', 'Manajer', 'Hirarki', 'Omzet', 'Embus'],
    wrong: ['Materai', 'Orisinil', 'Hapal', 'Selular', 'Naas']
  },
  {
    question: "Identifikasi penulisan kata gabungan yang benar dan salah!",
    words: ['pascasarjana', 'antar wilayah', 'adihulung', 'proaktif', 'biokimia', 'demoralisasi', 'tri tunggal', 'orangtua', 'tuna wicara', 'pramusaji'],
    correct: ['pascasarjana', 'proaktif', 'biokimia', 'demoralisasi', 'tuna wicara', 'pramusaji'],
    wrong: ['antar wilayah', 'adihulung', 'tri tunggal', 'orangtua']
  },
  {
    question: "Identifikasi bentukan kata yang benar dan salah!",
    words: ['pemasukan', 'pemasukkan', 'memasukan', 'tumpukan', 'tumpukkan'],
    correct: ['pemasukan', 'tumpukan', 'tumpukkan'],
    wrong: ['pemasukkan', 'memasukan']
  },
  {
    question: "Identifikasi bentukan kata yang benar dan salah!",
    words: ['mengesahkan', 'pemboran', 'pengesahan', 'pengeboman', 'pengelasan'],
    correct: ['mengesahkan', 'pengesahan', 'pengeboman', 'pengelasan'],
    wrong: ['pemboran']
  },
  {
    question: "Identifikasi penggunaan huruf kapital yang benar dan salah!",
    words: ['Ayahnya seorang Jendral.', 'Hanya kepada-Mu kami memohon perlindungan.', 'Harimau Sumatra termasuk hewan terancam punah.', 'Kain tenun Lombok mewarnai perjalanan hidup manusia.', 'Seminar tersebut dihadiri para gubernur.'],
    correct: ['Hanya kepada-Mu kami memohon perlindungan.', 'Kain tenun Lombok mewarnai perjalanan hidup manusia.', 'Seminar tersebut dihadiri para gubernur.'],
    wrong: ['Ayahnya seorang Jendral.', 'Harimau Sumatra termasuk hewan terancam punah.']
  },
  {
    question: "Identifikasi penggunaan huruf kapital yang benar dan salah!",
    words: ['Ayahnya seorang Jendral.', 'Hanya kepada-Mu kami memohon perlindungan.', 'Harimau Sumatra termasuk hewan terancam punah.', 'Kain tenun Lombok mewarnai perjalanan hidup manusia.', 'Seminar tersebut dihadiri para gubernur.'],
    correct: ['Hanya kepada-Mu kami memohon perlindungan.', 'Kain tenun Lombok mewarnai perjalanan hidup manusia.', 'Seminar tersebut dihadiri para gubernur.'],
    wrong: ['Ayahnya seorang Jendral.', 'Harimau Sumatra termasuk hewan terancam punah.']
  },
  {
    question: "Identifikasi penggunaan huruf kapital yang benar dan salah!",
    words: ['Ayahnya seorang Jendral.', 'Hanya kepada-Mu kami memohon perlindungan.', 'Harimau Sumatra termasuk hewan terancam punah.', 'Kain tenun Lombok mewarnai perjalanan hidup manusia.', 'Seminar tersebut dihadiri para gubernur.'],
    correct: ['Hanya kepada-Mu kami memohon perlindungan.', 'Kain tenun Lombok mewarnai perjalanan hidup manusia.', 'Seminar tersebut dihadiri para gubernur.'],
    wrong: ['Ayahnya seorang Jendral.', 'Harimau Sumatra termasuk hewan terancam punah.']
  },
  {
    question: "Identifikasi penggunaan huruf kapital yang benar dan salah!",
    words: ['Ayahnya seorang Jendral.', 'Hanya kepada-Mu kami memohon perlindungan.', 'Harimau Sumatra termasuk hewan terancam punah.', 'Kain tenun Lombok mewarnai perjalanan hidup manusia.', 'Seminar tersebut dihadiri para gubernur.'],
    correct: ['Hanya kepada-Mu kami memohon perlindungan.', 'Kain tenun Lombok mewarnai perjalanan hidup manusia.', 'Seminar tersebut dihadiri para gubernur.'],
    wrong: ['Ayahnya seorang Jendral.', 'Harimau Sumatra termasuk hewan terancam punah.']
  },
  {
    question: "Identifikasi penggunaan huruf kapital yang benar dan salah!",
    words: ['Ayahnya seorang Jendral.', 'Hanya kepada-Mu kami memohon perlindungan.', 'Harimau Sumatra termasuk hewan terancam punah.', 'Kain tenun Lombok mewarnai perjalanan hidup manusia.', 'Seminar tersebut dihadiri para gubernur.'],
    correct: ['Hanya kepada-Mu kami memohon perlindungan.', 'Kain tenun Lombok mewarnai perjalanan hidup manusia.', 'Seminar tersebut dihadiri para gubernur.'],
    wrong: ['Ayahnya seorang Jendral.', 'Harimau Sumatra termasuk hewan terancam punah.']
  },
  {
    question: "Identifikasi penggunaan huruf kapital yang benar dan salah!",
    words: ['Ayahnya seorang Jendral.', 'Hanya kepada-Mu kami memohon perlindungan.', 'Harimau Sumatra termasuk hewan terancam punah.', 'Kain tenun Lombok mewarnai perjalanan hidup manusia.', 'Seminar tersebut dihadiri para gubernur.'],
    correct: ['Hanya kepada-Mu kami memohon perlindungan.', 'Kain tenun Lombok mewarnai perjalanan hidup manusia.', 'Seminar tersebut dihadiri para gubernur.'],
    wrong: ['Ayahnya seorang Jendral.', 'Harimau Sumatra termasuk hewan terancam punah.']
  }
];

// Authentication listener
onAuthStateChanged(auth, async (user) => {
  if (user) {
    userId = user.uid;
    console.log("User is logged in with UID:", userId);
  } else {
    console.log("No user is logged in");
    window.location.href = "../login.html";
  }
});

// Save the score without overwriting previous scores
async function saveScore() {
  if (!userId) {
    console.error("No user logged in");
    return;
  }

  // Check if the score has already been saved
  if (scoreSaved) {
    console.log("Score already saved");
    return;
  }

  const scoresCollectionRef = collection(db, "scores", userId, "true-or-false");

  try {
    const total = questionScores.reduce((acc, score) => acc + score, 0); // Aggregate all scores from questionScores

    // Add new score with a unique ID to the Firestore collection
    await addDoc(scoresCollectionRef, {
      score: total,
      timestamp: new Date() // Add timestamp for when the score was saved
    });

    console.log("New score saved:", total);

    // Set the flag to true so that it does not get saved again
    scoreSaved = true;
  } catch (error) {
    console.error("Error saving score: ", error);
  }
}

// Function to show final screen after the game
async function showFinalScreen() {
  const gameContainer = document.querySelector('.game-container');
  const finalScreen = document.getElementById('final-screen');
  const scoreElement = document.getElementById('score');
  scoreElement.textContent = totalScore; // Show total score on final screen

  // Hide the game container and show the final screen
  gameContainer.style.display = 'none';
  finalScreen.style.display = 'block';

  // Save the score at the end of the game (only once)
  if (!scoreSaved && userId) {
    await saveScore(); // Save all scores for the user
  }
}

// Reset game for new round
function resetGame() {
  totalScore = 0; // Reset total score for the new game
  seconds = 60;
  timerDisplay.textContent = '01:00';
  startTimer();
  
  progressBar();
  
  dropZones.forEach(zone => {
    const label = zone.querySelector('h3');
    zone.innerHTML = '';
    zone.appendChild(label);
  });

  wordContainer.innerHTML = '';

  if (questions[currentQuestion]) {
    questionText.textContent = questions[currentQuestion].question;
  } else {
    console.error("No question found at index", currentQuestion);
  }

  questions[currentQuestion].words.forEach(word => {
    const wordDiv = document.createElement('div');
    wordDiv.className = 'word';
    wordDiv.draggable = true;
    wordDiv.textContent = word;
    wordContainer.appendChild(wordDiv);

    wordDiv.addEventListener('dragstart', dragStart);
    wordDiv.addEventListener('dragend', dragEnd);
  });

  submitButton.style.display = 'block';
  nextButton.style.display = 'none';
}

// Check the answers and update the score
function checkAnswers() {
  if (!questions[currentQuestion]) {
    console.error("Question data is undefined for index", currentQuestion);
    return;
  }

  const { correct, wrong } = questions[currentQuestion];
  const benarZone = document.getElementById('benar');
  const salahZone = document.getElementById('salah');

  let currentScore = 0; // Score for this question

  benarZone.querySelectorAll('.word').forEach(word => {
    if (correct.includes(word.textContent)) {
      word.classList.add('correct');
      currentScore++;
    } else {
      word.classList.add('wrong');
    }
  });

  salahZone.querySelectorAll('.word').forEach(word => {
    if (wrong.includes(word.textContent)) {
      word.classList.add('correct');
      currentScore++;
    } else {
      word.classList.add('wrong');
    }
  });

  questionScores[currentQuestion] = currentScore; // Store score for the question
  totalScore = questionScores.reduce((acc, score) => acc + score, 0); // Update total score

  updateProgressBar(currentScore === (correct.length + wrong.length));
}

// Function to update progress bar
function updateProgressBar(isCorrect) {
  if (progressSegments[currentQuestion]) {
    progressSegments[currentQuestion].classList.add('correct');
    if (!isCorrect) {
      progressSegments[currentQuestion].classList.add('wrong');
    }
  } else {
    console.error("Progress segment not found for currentQuestion", currentQuestion);
  }
}

// Reset progress bar function
function progressBar() {
  if (progressSegments[currentQuestion]) {
    progressSegments[currentQuestion].classList.add('active');
  } else {
    console.error("Progress segment not found for currentQuestion", currentQuestion);
  }
}

// Updated Drag-and-Drop Functions
function dragStart() {
  this.classList.add('dragging');
}

function dragEnd() {
  this.classList.remove('dragging');
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.classList.add('hovered');
}

function dragLeave() {
  this.classList.remove('hovered');
}

function drop() {
  this.classList.remove('hovered');
  const draggingElement = document.querySelector('.dragging');
  this.appendChild(draggingElement);
}

// Drop listeners
dropZones.forEach(zone => {
  zone.addEventListener('dragover', dragOver);
  zone.addEventListener('dragenter', dragEnter);
  zone.addEventListener('dragleave', dragLeave);
  zone.addEventListener('drop', drop);
});

// Next question handler
nextButton.addEventListener('click', () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    resetGame();
  } else {
    showFinalScreen();
  }
});

// Submit button logic
submitButton.addEventListener('click', () => {
  checkAnswers();
  submitButton.style.display = 'none';
  nextButton.style.display = 'block';
});

// Timer functionality
function startTimer() {
  timer = setInterval(() => {
    seconds--;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    timerDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;

    if (seconds <= 0) {
      clearInterval(timer);
      showFinalScreen();
    }
  }, 1000);
}

document.getElementById('back-button').addEventListener('click', () => {
  window.location.href = '../index.html';
});


startTimer();
resetGame();