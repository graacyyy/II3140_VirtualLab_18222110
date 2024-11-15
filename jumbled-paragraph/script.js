// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
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
const dropZone = document.getElementById('drop-zone');
const submitButton = document.getElementById('submit-button');
const nextButton = document.getElementById('next-button');
const progressSegments = document.querySelectorAll('.progress-segment');
const timerDisplay = document.querySelector('.timer');

let currentQuestion = 0;
let seconds = 60; // 1 minute
let timer;
let userId = null;
let totalScore = 0; // Total score overall
let questionScores = []; // Array for storing scores for each question
let scoreSaved = false; // Flag to check if the score has been saved

const questions = [
  {
    question: "Susun kalimat berikut menjadi paragraf yang benar!",
    sentences: [
      'Kita harus mampu menyeimbangkan penggunaan teknologi dengan interaksi sosial di dunia nyata.',
      'Teknologi telah mengubah cara kita hidup dan bekerja secara signifikan.',
      'Namun, penting untuk bijak dalam menggunakan teknologi agar tidak menjadi ketergantungan.',
      'Dengan adanya internet, informasi dapat diakses dengan mudah dan cepat.'
    ],
    correctOrder: [
      'Teknologi telah mengubah cara kita hidup dan bekerja secara signifikan.',
      'Dengan adanya internet, informasi dapat diakses dengan mudah dan cepat.',
      'Namun, penting untuk bijak dalam menggunakan teknologi agar tidak menjadi ketergantungan.',
      'Kita harus mampu menyeimbangkan penggunaan teknologi dengan interaksi sosial di dunia nyata.'
    ]
  },
  {
    question: "Susun kalimat berikut menjadi paragraf yang benar!",
    sentences: [
      'Dengan berolahraga, kita dapat meningkatkan stamina dan daya tahan tubuh.',
      'Selain itu, olahraga juga membantu mengurangi stres dan meningkatkan kualitas tidur.',
      'Olahraga teratur sangat penting untuk menjaga kesehatan tubuh dan pikiran.',
      'Pilihlah jenis olahraga yang Anda sukai agar dapat dilakukan secara konsisten.'
    ],
    correctOrder: [
      'Olahraga teratur sangat penting untuk menjaga kesehatan tubuh dan pikiran.',
      'Dengan berolahraga, kita dapat meningkatkan stamina dan daya tahan tubuh.',
      'Selain itu, olahraga juga membantu mengurangi stres dan meningkatkan kualitas tidur.',
      'Pilihlah jenis olahraga yang Anda sukai agar dapat dilakukan secara konsisten.'
    ]
  },
  {
    question: "Susun kalimat berikut menjadi paragraf yang benar!",
    sentences: [
      'Dengan berolahraga, kita dapat meningkatkan stamina dan daya tahan tubuh.',
      'Selain itu, olahraga juga membantu mengurangi stres dan meningkatkan kualitas tidur.',
      'Olahraga teratur sangat penting untuk menjaga kesehatan tubuh dan pikiran.',
      'Pilihlah jenis olahraga yang Anda sukai agar dapat dilakukan secara konsisten.'
    ],
    correctOrder: [
      'Olahraga teratur sangat penting untuk menjaga kesehatan tubuh dan pikiran.',
      'Dengan berolahraga, kita dapat meningkatkan stamina dan daya tahan tubuh.',
      'Selain itu, olahraga juga membantu mengurangi stres dan meningkatkan kualitas tidur.',
      'Pilihlah jenis olahraga yang Anda sukai agar dapat dilakukan secara konsisten.'
    ]
  },
  {
    question: "Susun kalimat berikut menjadi paragraf yang benar!",
    sentences: [
      'Dengan berolahraga, kita dapat meningkatkan stamina dan daya tahan tubuh.',
      'Selain itu, olahraga juga membantu mengurangi stres dan meningkatkan kualitas tidur.',
      'Olahraga teratur sangat penting untuk menjaga kesehatan tubuh dan pikiran.',
      'Pilihlah jenis olahraga yang Anda sukai agar dapat dilakukan secara konsisten.'
    ],
    correctOrder: [
      'Olahraga teratur sangat penting untuk menjaga kesehatan tubuh dan pikiran.',
      'Dengan berolahraga, kita dapat meningkatkan stamina dan daya tahan tubuh.',
      'Selain itu, olahraga juga membantu mengurangi stres dan meningkatkan kualitas tidur.',
      'Pilihlah jenis olahraga yang Anda sukai agar dapat dilakukan secara konsisten.'
    ]
  },
  {
    question: "Susun kalimat berikut menjadi paragraf yang benar!",
    sentences: [
      'Dengan berolahraga, kita dapat meningkatkan stamina dan daya tahan tubuh.',
      'Selain itu, olahraga juga membantu mengurangi stres dan meningkatkan kualitas tidur.',
      'Olahraga teratur sangat penting untuk menjaga kesehatan tubuh dan pikiran.',
      'Pilihlah jenis olahraga yang Anda sukai agar dapat dilakukan secara konsisten.'
    ],
    correctOrder: [
      'Olahraga teratur sangat penting untuk menjaga kesehatan tubuh dan pikiran.',
      'Dengan berolahraga, kita dapat meningkatkan stamina dan daya tahan tubuh.',
      'Selain itu, olahraga juga membantu mengurangi stres dan meningkatkan kualitas tidur.',
      'Pilihlah jenis olahraga yang Anda sukai agar dapat dilakukan secara konsisten.'
    ]
  },
  {
    question: "Susun kalimat berikut menjadi paragraf yang benar!",
    sentences: [
      'Dengan berolahraga, kita dapat meningkatkan stamina dan daya tahan tubuh.',
      'Selain itu, olahraga juga membantu mengurangi stres dan meningkatkan kualitas tidur.',
      'Olahraga teratur sangat penting untuk menjaga kesehatan tubuh dan pikiran.',
      'Pilihlah jenis olahraga yang Anda sukai agar dapat dilakukan secara konsisten.'
    ],
    correctOrder: [
      'Olahraga teratur sangat penting untuk menjaga kesehatan tubuh dan pikiran.',
      'Dengan berolahraga, kita dapat meningkatkan stamina dan daya tahan tubuh.',
      'Selain itu, olahraga juga membantu mengurangi stres dan meningkatkan kualitas tidur.',
      'Pilihlah jenis olahraga yang Anda sukai agar dapat dilakukan secara konsisten.'
    ]
  },
  {
    question: "Susun kalimat berikut menjadi paragraf yang benar!",
    sentences: [
      'Dengan berolahraga, kita dapat meningkatkan stamina dan daya tahan tubuh.',
      'Selain itu, olahraga juga membantu mengurangi stres dan meningkatkan kualitas tidur.',
      'Olahraga teratur sangat penting untuk menjaga kesehatan tubuh dan pikiran.',
      'Pilihlah jenis olahraga yang Anda sukai agar dapat dilakukan secara konsisten.'
    ],
    correctOrder: [
      'Olahraga teratur sangat penting untuk menjaga kesehatan tubuh dan pikiran.',
      'Dengan berolahraga, kita dapat meningkatkan stamina dan daya tahan tubuh.',
      'Selain itu, olahraga juga membantu mengurangi stres dan meningkatkan kualitas tidur.',
      'Pilihlah jenis olahraga yang Anda sukai agar dapat dilakukan secara konsisten.'
    ]
  },
  {
    question: "Susun kalimat berikut menjadi paragraf yang benar!",
    sentences: [
      'Dengan berolahraga, kita dapat meningkatkan stamina dan daya tahan tubuh.',
      'Selain itu, olahraga juga membantu mengurangi stres dan meningkatkan kualitas tidur.',
      'Olahraga teratur sangat penting untuk menjaga kesehatan tubuh dan pikiran.',
      'Pilihlah jenis olahraga yang Anda sukai agar dapat dilakukan secara konsisten.'
    ],
    correctOrder: [
      'Olahraga teratur sangat penting untuk menjaga kesehatan tubuh dan pikiran.',
      'Dengan berolahraga, kita dapat meningkatkan stamina dan daya tahan tubuh.',
      'Selain itu, olahraga juga membantu mengurangi stres dan meningkatkan kualitas tidur.',
      'Pilihlah jenis olahraga yang Anda sukai agar dapat dilakukan secara konsisten.'
    ]
  },
  {
    question: "Susun kalimat berikut menjadi paragraf yang benar!",
    sentences: [
      'Dengan berolahraga, kita dapat meningkatkan stamina dan daya tahan tubuh.',
      'Selain itu, olahraga juga membantu mengurangi stres dan meningkatkan kualitas tidur.',
      'Olahraga teratur sangat penting untuk menjaga kesehatan tubuh dan pikiran.',
      'Pilihlah jenis olahraga yang Anda sukai agar dapat dilakukan secara konsisten.'
    ],
    correctOrder: [
      'Olahraga teratur sangat penting untuk menjaga kesehatan tubuh dan pikiran.',
      'Dengan berolahraga, kita dapat meningkatkan stamina dan daya tahan tubuh.',
      'Selain itu, olahraga juga membantu mengurangi stres dan meningkatkan kualitas tidur.',
      'Pilihlah jenis olahraga yang Anda sukai agar dapat dilakukan secara konsisten.'
    ]
  },
  {
    question: "Susun kalimat berikut menjadi paragraf yang benar!",
    sentences: [
      'Dengan berolahraga, kita dapat meningkatkan stamina dan daya tahan tubuh.',
      'Selain itu, olahraga juga membantu mengurangi stres dan meningkatkan kualitas tidur.',
      'Olahraga teratur sangat penting untuk menjaga kesehatan tubuh dan pikiran.',
      'Pilihlah jenis olahraga yang Anda sukai agar dapat dilakukan secara konsisten.'
    ],
    correctOrder: [
      'Olahraga teratur sangat penting untuk menjaga kesehatan tubuh dan pikiran.',
      'Dengan berolahraga, kita dapat meningkatkan stamina dan daya tahan tubuh.',
      'Selain itu, olahraga juga membantu mengurangi stres dan meningkatkan kualitas tidur.',
      'Pilihlah jenis olahraga yang Anda sukai agar dapat dilakukan secara konsisten.'
    ]
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

// Start the timer
function startTimer() {
  timer = setInterval(() => {
    seconds--;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    
    if (seconds <= 0) {
      clearInterval(timer);
      checkAnswers();
      submitButton.style.display = 'none';
      nextButton.style.display = 'block';
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

// Shuffle function for sentences
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Reset the game
function resetGame() {
  seconds = 60;
  timerDisplay.textContent = '01:00';
  startTimer();

  progressBar();

  dropZone.innerHTML = '';
  sentenceContainer.innerHTML = '';

  // Shuffle and display sentences
  let sentences = [...questions[currentQuestion].sentences];
  shuffleArray(sentences);

  sentences.forEach(sentence => {
    const sentenceDiv = document.createElement('div');
    sentenceDiv.className = 'sentence';
    sentenceDiv.draggable = true;
    sentenceDiv.textContent = sentence;
    sentenceContainer.appendChild(sentenceDiv);

    // Drag listeners
    sentenceDiv.addEventListener('dragstart', dragStart);
    sentenceDiv.addEventListener('dragend', dragEnd);
  });

  // Reset buttons
  submitButton.style.display = 'block';
  nextButton.style.display = 'none';

  // Display the question
  timerDisplay.textContent = questions[currentQuestion].question;
}

// Drag and Drop Functions
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
  const draggingSentence = document.querySelector('.dragging');
  this.appendChild(draggingSentence);
}

dropZone.addEventListener('dragover', dragOver);
dropZone.addEventListener('dragenter', dragEnter);
dropZone.addEventListener('dragleave', dragLeave);
dropZone.addEventListener('drop', drop);

// Submit button listener
submitButton.addEventListener('click', () => {
  stopTimer();
  checkAnswers();
  submitButton.style.display = 'none';
  nextButton.style.display = 'block';
});

// Next button listener
nextButton.addEventListener('click', () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    resetGame();
  } else {
    showFinalScreen();
  }
});

// Check answers (with the original logic)
function checkAnswers() {
  const droppedSentences = Array.from(dropZone.children).map(child => child.textContent);
  const correctOrder = questions[currentQuestion].correctOrder;

  let isCorrect = true;
  
  // Pastikan semua tempat terisi, jika ada yang kosong dianggap salah
  if (droppedSentences.includes("") || droppedSentences.length !== correctOrder.length) {
    isCorrect = false;
  }

  // Compare the sentences one by one
  droppedSentences.forEach((sentence, index) => {
    if (sentence !== correctOrder[index]) {
      isCorrect = false;
    }
  });

  droppedSentences.forEach((sentence, index) => {
    const sentenceElement = dropZone.children[index];
    if (sentence === correctOrder[index]) {
      sentenceElement.classList.add('correct');
    } else {
      sentenceElement.classList.add('wrong');
    }
  });

  updateProgressBar(isCorrect);
  if (isCorrect) {
    questionScores[currentQuestion] = 1;
  } else {
    questionScores[currentQuestion] = 0;
  }
}

// Save the score in Firestore
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

  const scoresCollectionRef = collection(db, "scores", userId, "jumbled-paragraph");

  try {
    const total = questionScores.reduce((acc, score) => acc + score, 0); // Aggregate all scores from questionScores

    // Add new score with a unique ID to the Firestore collection
    await addDoc(scoresCollectionRef, {
      score: total,
      timestamp: Timestamp.now() // Add timestamp for when the score was saved
    });

    console.log("New score saved:", total);

    // Set the flag to true so that it does not get saved again
    scoreSaved = true;
  } catch (error) {
    console.error("Error saving score: ", error);
  }
}

// Show final screen after the game
async function showFinalScreen() {
  document.querySelector('.game-container').style.display = 'none'; // Hide game elements
  document.getElementById('final-screen').style.display = 'block'; // Show final screen

  // Save the score at the end of the game (only once)
  if (!scoreSaved && userId) {
    await saveScore(); // Save all scores for the user
  }
}

// Update the progress bar
function updateProgressBar(isCorrect) {
  progressSegments[currentQuestion].classList.add('correct');
  if (!isCorrect) {
    progressSegments[currentQuestion].classList.add('wrong');
  }
}

// Progress bar management
function progressBar() {
  progressSegments[currentQuestion].classList.add('active');
}

// Restart button listener (with null check)
const restartButton = document.getElementById('restart-button');
if (restartButton) {
  restartButton.addEventListener('click', () => {
    currentQuestion = 0;
    document.getElementById('final-screen').style.display = 'none';
    document.querySelector('.game-container').style.display = 'block'; 
    resetGame();
  });
}

// Back button listener (with null check)
const backButton = document.getElementById('back-button');
if (backButton) {
  backButton.addEventListener('click', () => {
    window.history.back();
  });
};

// Initialize the game
resetGame();
