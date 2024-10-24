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
let seconds = 60; // 1 minutes

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
  },
];

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

function stopTimer() {
  clearInterval(timer);
}

function showFinalScreen() {
  feedbackElement.style.display = 'none';
  document.querySelector('.game-container').style.display = 'none'; // Hide quiz elements
  document.getElementById('final-screen').style.display = 'block'; // Show final screen
}

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
  }
});

function checkAnswer() {
  const userAnswer = answerInput.value.trim();
  const correctAnswer = questions[currentQuestion].correctAnswer;

  if (userAnswer === correctAnswer) {
    feedbackElement.textContent = 'Jawaban benar!' && questions[currentQuestion].feedback;
    answerInput.classList.add('correct');
  } else {
    feedbackElement.textContent = questions[currentQuestion].feedback;
    answerInput.classList.add('wrong');
  }

  feedbackElement.style.display = 'block';
  submitButton.style.display = 'none';
  nextButton.style.display = 'block';
  
  updateProgressBar(userAnswer === correctAnswer);
}

document.getElementById('restart-button').addEventListener('click', () => {
  currentQuestion = 0;
  document.getElementById('final-screen').style.display = 'none';
  document.querySelector('.game-container').style.display = 'block'; 
  resetGame();
});

document.getElementById('back-button').addEventListener('click', () => {
  window.location.href = '../index.html';
});

function updateProgressBar(isCorrect) {
  progressSegments[currentQuestion].classList.add('correct');
  if (!isCorrect) {
    progressSegments[currentQuestion].classList.add('wrong');
  }
}

function progressBar() {
  progressSegments[currentQuestion].classList.add('active');
}

// Initialize quiz
resetGame();