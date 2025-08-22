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
    question: "What is the derivative of x²?",
    answers: ["2x", "x", "x²", "2"],
    correct: "2x"
  },
  {
    question: "The limit of (1 + 1/n)^n as n → ∞ equals?",
    answers: ["0", "1", "e", "∞"],
    correct: "e"
  },
  {
    question: "If f(x) = 3x + 2, what is f(4)?",
    answers: ["12", "10", "14", "20"],
    correct: "14"
  },
  {
    question: "What is the integral of 1/x dx?",
    answers: ["ln|x| + C", "1/x² + C", "x + C", "e^x + C"],
    correct: "ln|x| + C"
  },
  {
    question: "Solve: 2x - 5 = 9",
    answers: ["x = 2", "x = 5", "x = 7", "x = -7"],
    correct: "x = 7"
  },
  {
    question: "What is the determinant of [[1,2],[3,4]]?",
    answers: ["-2", "-5", "2", "5"],
    correct: "-2"
  },
  {
    question: "What is the probability of getting a head when tossing a fair coin?",
    answers: ["0", "0.25", "0.5", "1"],
    correct: "0.5"
  },
  {
    question: "If sin²θ + cos²θ = ?",
    answers: ["0", "1", "2", "cos2θ"],
    correct: "1"
  },
  {
    question: "What is the next prime after 7?",
    answers: ["9", "10", "11", "13"],
    correct: "11"
  },
  {
    question: "If matrix A is 2x3 and matrix B is 3x4, what is the size of AB?",
    answers: ["2x4", "3x2", "3x4", "2x3"],
    correct: "2x4"
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
