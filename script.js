const questions = [
  {
    question: "What is HTML?",
    options: ["Programming Language", "Markup Language", "Database"],
    answer: "Markup Language"
  },
  {
    question: "What is CSS?",
    options: ["Styling Language", "Database", "Programming Language"],
    answer: "Styling Language"
  },
  {
    question: "What is JavaScript?",
    options: ["Markup Language", "Programming Language", "Database"],
    answer: "Programming Language"
  }
];

let currentIndex = 0;
let score = 0;
let answered = false;
let time = 10;
let timer;

// Load Question
function loadQuestion() {
  answered = false;
  time = 10;
  startTimer();

  const q = questions[currentIndex];

  document.getElementById("question").innerText = q.question;

  document.getElementById("progress").innerText =
    `Question ${currentIndex + 1}/${questions.length}`;

  const buttons = document.querySelectorAll(".option");

  buttons.forEach((btn, index) => {
    btn.innerText = q.options[index];
    btn.style.backgroundColor = "#fff";
    btn.disabled = false;
  });
}

// Check Answer
function checkAnswer(button) {
  if (answered) return;

  answered = true;
  clearInterval(timer);

  const selected = button.innerText;
  const correct = questions[currentIndex].answer;

  const buttons = document.querySelectorAll(".option");

  buttons.forEach(btn => {
    if (btn.innerText === correct) {
      btn.style.backgroundColor = "green";
    } else {
      btn.style.backgroundColor = "red";
    }
    btn.disabled = true;
  });

  if (selected === correct) {
    score++;
  }
}

// Next Question
function nextQuestion() {
  clearInterval(timer);
  currentIndex++;

  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    showScore();
  }
}

// Show Final Score
function showScore() {
  const container = document.querySelector(".container");

  container.innerHTML = `
    <h1>Quiz Completed 🎉</h1>
    <h2>Your Score: ${score}/${questions.length}</h2>
    <button id="restartBtn">Restart Quiz</button>
  `;

  // IMPORTANT: attach event after rendering
  document.getElementById("restartBtn")
    .addEventListener("click", restartQuiz);
}

// Restart Quiz
function restartQuiz() {
  currentIndex = 0;
  score = 0;
  answered = false;

  const container = document.querySelector(".container");

  container.innerHTML = `
    <h1>Quiz Game</h1>
    <h4 id="progress"></h4>
    <div id="timer"></div>
    <h2 id="question"></h2>

    <button class="option"></button>
    <button class="option"></button>
    <button class="option"></button>

    <button id="nextBtn">Next</button>
  `;

  // Reattach events
  document.querySelectorAll(".option").forEach(btn => {
    btn.addEventListener("click", () => checkAnswer(btn));
  });

  document.getElementById("nextBtn")
    .addEventListener("click", nextQuestion);

  loadQuestion();
}

// Timer
function startTimer() {
  document.getElementById("timer").innerText = `Time: ${time}s`;

  timer = setInterval(() => {
    time--;
    document.getElementById("timer").innerText = `Time: ${time}s`;

    if (time === 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

// Initial Event Binding (IMPORTANT)
document.querySelectorAll(".option").forEach(btn => {
  btn.addEventListener("click", () => checkAnswer(btn));
});

document.getElementById("nextBtn")
  .addEventListener("click", nextQuestion);

// Start Quiz
loadQuestion();