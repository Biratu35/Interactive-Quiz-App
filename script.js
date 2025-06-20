/* ===== QUESTIONS ===== */
const questions = [
  {
    question: 'What keyword declares a variable in JavaScript?',
    answers : ['func', 'let', 'def', 'var()'],
    correct : 'let'
  },
  {
    question: 'Which HTML tag loads JavaScript?',
    answers : ['<link>', '<script>', '<style>', '<js>'],
    correct : '<script>'
  },
  {
    question: 'What does DOM stand for?',
    answers : [
      'Document Object Model',
      'Digital Ordinance Model',
      'Dynamic Object Method',
      'Display Object Management'
    ],
    correct : 'Document Object Model'
  },
  {
    question: 'Which method converts JSON to an object?',
    answers : ['JSON.object()', 'JSON.parse()', 'JSON.stringify()', 'parse.json()'],
    correct : 'JSON.parse()'
  },
  {
    question: 'Which symbol starts a single‑line comment?',
    answers : ['//', '<!--', '#', '/* */'],
    correct : '//'
  }
];

/* ===== SELECTORS ===== */
const questionEl  = document.getElementById('question');
const answersBox  = document.getElementById('answers');
const nextBtn     = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-inner');
const timeSpan    = document.getElementById('time');

/* ===== QUIZ STATE ===== */
let currentIdx = 0;
let score      = 0;
let timer;
const TIME_PER_Q = 15; // seconds

/* ===== INIT ===== */
startQuiz();

/* ===== FUNCTIONS ===== */
function startQuiz() {
  currentIdx = 0;
  score = 0;
  nextBtn.textContent = 'Next';
  showQuestion();
}

function showQuestion() {
  resetState();
  startTimer();

  const current = questions[currentIdx];
  questionEl.textContent = current.question;

  current.answers.forEach(ans => {
    const btn = document.createElement('button');
    btn.textContent = ans;
    btn.classList.add('btn');
    if (ans === current.correct) btn.dataset.correct = true;
    btn.onclick = selectAnswer;
    answersBox.appendChild(btn);
  });

  updateProgress();
}

function resetState() {
  clearInterval(timer);
  timeSpan.textContent = TIME_PER_Q;
  nextBtn.style.display = 'none';
  while (answersBox.firstChild) answersBox.removeChild(answersBox.firstChild);
}

function selectAnswer(e) {
  const selected = e.target;
  const correct  = selected.dataset.correct === 'true';

  if (correct) {
    selected.classList.add('correct');
    score++;
  } else {
    selected.classList.add('wrong');
  }

  Array.from(answersBox.children).forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.correct === 'true') btn.classList.add('correct');
  });

  nextBtn.style.display = 'inline-block';
  clearInterval(timer);
}

function showScore() {
  resetState();
  questionEl.textContent = `🎉 You scored ${score} of ${questions.length}!`;
  nextBtn.textContent = 'Restart';
  nextBtn.style.display = 'inline-block';
}

function handleNext() {
  currentIdx++;
  if (currentIdx < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextBtn.addEventListener('click', () => {
  if (currentIdx < questions.length) {
    handleNext();
  } else {
    startQuiz();
  }
});

function startTimer() {
  let timeLeft = TIME_PER_Q;
  timeSpan.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timeSpan.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      nextBtn.style.display = 'inline-block';
      // auto reveal correct answer
      Array.from(answersBox.children).forEach(btn => {
        btn.disabled = true;
        if (btn.dataset.correct === 'true') btn.classList.add('correct');
      });
    }
  }, 1000);
}

function updateProgress() {
  const pct = (currentIdx / questions.length) * 100;
  progressBar.style.width = `${pct}%`;
}
