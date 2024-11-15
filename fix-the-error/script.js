// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, collection, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

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

const sentenceContainer = document.getElementById('sentence-container');
const answerInput = document.getElementById('answer-input');
const submitButton = document.getElementById('submit-button');
const nextButton = document.getElementById('next-button');
const progressSegments = document.querySelectorAll('.progress-segment');
const timerDisplay = document.querySelector('.timer');
const feedbackElement = document.getElementById('feedback');

let currentQuestion = 0;
const totalQuestions = 10;
let timer;
let seconds = 60; // 1 minute
let score = 0; // Initialize score

const questions = [
  {
    sentence: 'Dia berkata "Saya akan datang besok".',
    correctAnswer: 'Dia berkata, "Saya akan datang besok."',
    feedback: 'Tanda koma diperlukan sebelum kutipan langsung, dan titik harus ditempatkan di dalam kutipan.'
  },
  {
    sentence: 'Ibu bertanya "Apakah kamu sudah makan?"',
    correctAnswer: 'Ibu bertanya, "Apakah kamu sudah makan?"',
    feedback: 'Tanda koma diperlukan sebelum kutipan langsung, dan titik harus ditempatkan di dalam kutipan.'
  },
  {
    sentence: 'Guru menjelaskan "Fotosintesis adalah proses pembuatan makanan pada tumbuhan"',
    correctAnswer: 'Guru menjelaskan, "Fotosintesis adalah proses pembuatan makanan pada tumbuhan."',
    feedback: 'Tanda koma diperlukan sebelum kutipan langsung, dan titik harus ditempatkan di dalam kutipan.'
  },
  {
    sentence: 'Guru menjelaskan "Fotosintesis adalah proses pembuatan makanan pada tumbuhan"',
    correctAnswer: 'Guru menjelaskan, "Fotosintesis adalah proses pembuatan makanan pada tumbuhan."',
    feedback: 'Tanda koma diperlukan sebelum kutipan langsung, dan titik harus ditempatkan di dalam kutipan.'
  },
  {
    sentence: 'Guru menjelaskan "Fotosintesis adalah proses pembuatan makanan pada tumbuhan"',
    correctAnswer: 'Guru menjelaskan, "Fotosintesis adalah proses pembuatan makanan pada tumbuhan."',
    feedback: 'Tanda koma diperlukan sebelum kutipan langsung, dan titik harus ditempatkan di dalam kutipan.'
  },
  {
    sentence: 'Guru menjelaskan "Fotosintesis adalah proses pembuatan makanan pada tumbuhan"',
    correctAnswer: 'Guru menjelaskan, "Fotosintesis adalah proses pembuatan makanan pada tumbuhan."',
    feedback: 'Tanda koma diperlukan sebelum kutipan langsung, dan titik harus ditempatkan di dalam kutipan.'
  },
  {
    sentence: 'Guru menjelaskan "Fotosintesis adalah proses pembuatan makanan pada tumbuhan"',
    correctAnswer: 'Guru menjelaskan, "Fotosintesis adalah proses pembuatan makanan pada tumbuhan."',
    feedback: 'Tanda koma diperlukan sebelum kutipan langsung, dan titik harus ditempatkan di dalam kutipan.'
  },
  {
    sentence: 'Guru menjelaskan "Fotosintesis adalah proses pembuatan makanan pada tumbuhan"',
    correctAnswer: 'Guru menjelaskan, "Fotosintesis adalah proses pembuatan makanan pada tumbuhan."',
    feedback: 'Tanda koma diperlukan sebelum kutipan langsung, dan titik harus ditempatkan di dalam kutipan.'
  },
  {
    sentence: 'Guru menjelaskan "Fotosintesis adalah proses pembuatan makanan pada tumbuhan"',
    correctAnswer: 'Guru menjelaskan, "Fotosintesis adalah proses pembuatan makanan pada tumbuhan."',
    feedback: 'Tanda koma diperlukan sebelum kutipan langsung, dan titik harus ditempatkan di dalam kutipan.'
  },
  {
    sentence: 'Guru menjelaskan "Fotosintesis adalah proses pembuatan makanan pada tumbuhan"',
    correctAnswer: 'Guru menjelaskan, "Fotosintesis adalah proses pembuatan makanan pada tumbuhan."',
    feedback: 'Tanda koma diperlukan sebelum kutipan langsung, dan titik harus ditempatkan di dalam kutipan.'
  }
];

// Start timer function
function startTimer() {
  timer = setInterval(() => {
    seconds--;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    
    if (seconds <= 0) {
      clearInterval(timer);
      checkAnswer();
      submitButton.style.display = 'none';
      nextButton.style.display = 'block';
    }
  }, 1000);
}

// Stop timer function
function stopTimer() {
  clearInterval(timer);
}

// Show final screen after game ends
function showFinalScreen() {
  feedbackElement.style.display = 'none';
  document.querySelector('.game-container').style.display = 'none'; // Hide quiz elements
  document.getElementById('final-screen').style.display = 'block'; // Show final screen
}

// Reset game to initial state
function resetGame() {
  seconds = 60;
  timerDisplay.textContent = '01:00';
  startTimer();
  
  progressBar();
  
  // Reset answer input and remove color classes
  answerInput.value = '';
  answerInput.classList.remove('correct', 'wrong');
  feedbackElement.style.display = 'none';

  // Reset buttons
  submitButton.style.display = 'block';
  nextButton.style.display = 'none';

  // Update question text
  sentenceContainer.textContent = questions[currentQuestion].sentence;
}

// Submit button listener
submitButton.addEventListener('click', () => {
  stopTimer();
  checkAnswer();
});

// Next button listener
nextButton.addEventListener('click', () => {
  currentQuestion++;
  if (currentQuestion < totalQuestions) {
    resetGame();
  } else {
    showFinalScreen();
    saveScoreToFirestore(); // Save final score to Firestore when the game ends
  }
});

// Check if the user's answer is correct
function checkAnswer() {
  const userAnswer = answerInput.value.trim();
  const correctAnswer = questions[currentQuestion].correctAnswer;

  if (userAnswer === correctAnswer) {
    feedbackElement.textContent = 'Jawaban benar!' && questions[currentQuestion].feedback;
    answerInput.classList.add('correct');
    score++;  // Increment score for correct answer
  } else {
    feedbackElement.textContent = questions[currentQuestion].feedback;
    answerInput.classList.add('wrong');
  }

  feedbackElement.style.display = 'block';
  submitButton.style.display = 'none';
  nextButton.style.display = 'block';
  
  updateProgressBar(userAnswer === correctAnswer);
}

// Restart button listener to restart the game
document.getElementById('restart-button').addEventListener('click', () => {
  currentQuestion = 0;
  document.getElementById('final-screen').style.display = 'none';
  document.querySelector('.game-container').style.display = 'block'; 
  resetGame();
});

// Back button listener to go back to the main page
document.getElementById('back-button').addEventListener('click', () => {
  window.location.href = '../index.html';
});

// Update progress bar after each answer
function updateProgressBar(isCorrect) {
  progressSegments[currentQuestion].classList.add('correct');
  if (!isCorrect) {
    progressSegments[currentQuestion].classList.add('wrong');
  }
}

// Add active class to progress bar for the current question
function progressBar() {
  progressSegments[currentQuestion].classList.add('active');
}

// Save score to Firestore
function saveScoreToFirestore() {
  const user = auth.currentUser;  // Get the current user

  if (user) {
    // Save the score to Firestore under the user's UID
    const scoresRef = collection(db, 'scores');
    addDoc(scoresRef, {
      userId: user.uid,
      score: score,
      timestamp: Timestamp.now()
    }).then(() => {
      console.log("Score saved successfully!");
    }).catch((error) => {
      console.error("Error saving score:", error);
    });
  } else {
    console.log("No user is signed in.");
  }
}

// Initialize quiz
resetGame();

// Listen for changes in authentication state
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('User logged in: ', user.email);
    // Show logout button if user is logged in
    document.getElementById('logout-button').style.display = 'block';
    document.getElementById('login-button').style.display = 'none';
  } else {
    console.log('No user logged in');
    // Show login button if no user is logged in
    document.getElementById('logout-button').style.display = 'none';
    document.getElementById('login-button').style.display = 'block';
  }
});

// Add logout functionality
document.getElementById('logout-button').addEventListener('click', () => {
  signOut(auth).then(() => {
    console.log('User signed out');
  }).catch((error) => {
    console.error('Error signing out: ', error);
  });
});
