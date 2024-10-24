const sentenceContainer = document.getElementById('sentence-container');
const dropZone = document.getElementById('drop-zone');
const submitButton = document.getElementById('submit-button');
const nextButton = document.getElementById('next-button');
const progressSegments = document.querySelectorAll('.progress-segment');
const timerDisplay = document.querySelector('.timer');

let currentQuestion = 0;
const totalQuestions = 10;
let timer;
let seconds = 60; // 1 minutes

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

  timerDisplay.textContent = questions[currentQuestion].question;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

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

// Drop listeners
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
  if (currentQuestion < totalQuestions) {
    resetGame();
  } else {
    showFinalScreen();
  }
});

function checkAnswers() {
  const droppedSentences = Array.from(dropZone.children).map(child => child.textContent);
  const correctOrder = questions[currentQuestion].correctOrder;

  let isCorrect = JSON.stringify(droppedSentences) === JSON.stringify(correctOrder);

  droppedSentences.forEach((sentence, index) => {
    const sentenceElement = dropZone.children[index];
    if (sentence === correctOrder[index]) {
      sentenceElement.classList.add('correct');
    } else {
      sentenceElement.classList.add('wrong');
    }
  });

  updateProgressBar(isCorrect);
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