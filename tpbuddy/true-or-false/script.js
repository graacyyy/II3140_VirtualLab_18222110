const wordContainer = document.getElementById('word-container');
const dropZones = document.querySelectorAll('.drop-zone');
const submitButton = document.getElementById('submit-button');
const nextButton = document.getElementById('next-button');
const progressSegments = document.querySelectorAll('.progress-segment');
const timerDisplay = document.querySelector('.timer');
const questionText = document.getElementById('question-text');

let currentQuestion = 0;
const totalQuestions = 10;
let timer;
let seconds = 60; // 1 minutes

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

function showFinalScreen() {
  document.querySelector('.game-container').style.display = 'none'; // Hide quiz elements
  document.getElementById('final-screen').style.display = 'block'; // Show final screen
}

function resetGame() {
  seconds = 60;
  timerDisplay.textContent = '01:00';
  startTimer();
  
  progressBar();
  
  dropZones.forEach(zone => {
    const label = zone.querySelector('h3');
    zone.innerHTML = '';
    zone.appendChild(label);
  });

  // Reset words
  wordContainer.innerHTML = '';

  questions[currentQuestion].words.forEach(word => {
    const wordDiv = document.createElement('div');
    wordDiv.className = 'word';
    wordDiv.draggable = true;
    wordDiv.textContent = word;
    wordContainer.appendChild(wordDiv);

    // Drag listeners
    wordDiv.addEventListener('dragstart', dragStart);
    wordDiv.addEventListener('dragend', dragEnd);
  });

  // Reset buttons
  submitButton.style.display = 'block';
  nextButton.style.display = 'none';

  // Update question text
  questionText.textContent = questions[currentQuestion].question;
}

// Drop listeners
dropZones.forEach(zone => {
  zone.addEventListener('dragover', dragOver);
  zone.addEventListener('dragenter', dragEnter);
  zone.addEventListener('dragleave', dragLeave);
  zone.addEventListener('drop', drop);
});

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
  const draggingWord = document.querySelector('.dragging');
  this.appendChild(draggingWord);
}

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
  if (currentQuestion < totalQuestions) {
    resetGame();
  } else {
    showFinalScreen();
  }
});

function checkAnswers() {
  const {correct, wrong} = questions[currentQuestion];

  const benarZone = document.getElementById('benar');
  const salahZone = document.getElementById('salah');

  let correctCount = 0;

  benarZone.querySelectorAll('.word').forEach(word => {
    if (correct.includes(word.textContent)) {
      word.classList.add('correct');
      correctCount++;
    } else {
      word.classList.add('wrong');
    }
  });

  salahZone.querySelectorAll('.word').forEach(word => {
    if (wrong.includes(word.textContent)) {
      word.classList.add('correct');
      correctCount++;
    } else {
      word.classList.add('wrong');
    }
  });

  updateProgressBar(correctCount === (correct.length + wrong.length))
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