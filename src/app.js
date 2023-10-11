const _question = document.getElementById('question');
const _options = document.querySelector('.quiz-options');
const _checkBtn = document.getElementById('check-answer');
const _playAgainBtn = document.getElementById('play-again');
const _backHome = document.getElementById('back-home');
const _comment = document.getElementById('comment');
const _result = document.getElementById('result');
const _correctScore = document.getElementById('correct-score');
const _totalQuestion = document.getElementById('total-question');
const _timer = document.getElementById('timer');

let correctAnswer = "",
  correctScore = askedCount = 0,
  totalQuestion = 3;
let selectedCategory = null;

const categoryButtons = {
      math: document.getElementById('math-category'),
      history: document.getElementById('history-category'),
      computer: document.getElementById('computer-category')
};

function eventListeners() {
  _checkBtn.addEventListener('click', checkAnswer);
      _playAgainBtn.addEventListener('click', restartQuiz);

  Object.keys(categoryButtons).forEach(category => {
    categoryButtons[category].addEventListener('click', () => {
      selectedCategory = category;
      restartQuiz();
      );
    );
}

document.addEventListener('DOMContentLoaded', function () {
      eventListeners();
   _totalQuestion.textContent = totalQuestion;
   _correctScore.textContent = correctScore;
  loadQuestion();
  );
}

async function loadQuestion() {
  const category = selectedCategory || 'general'; 
  const APIUrl = `https://opentdb.com/api.php?amount=1&category=${getCategoryId(category)}`;
  const result = await fetch(`${APIUrl}`);
  const data = await result.json();
  _result.innerHTML = "";
  showQuestion(data.results[0]);
}

function getCategoryId(category) {
  switch (category) {
      case 'math':
      return 19;
      case 'history':
      return 23;
      case 'computer':
      return 18;
      default:
      return 9; 
  }
}

function startTimer() {
  let timeLeft = 15;
   _timer.textContent = `00:${timeLeft}`;
  timerInterval = setInterval(() => {
  timeLeft--;
  _timer.textContent = `00:${timeLeft}`;

  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    checkCount();
  }
  }, 1000);
}


function showQuestion(data) {
   _checkBtn.disabled = false;
  correctAnswer = data.correct_answer;
  let incorrectAnswer = data.incorrect_answers;
  let optionsList = incorrectAnswer;
  optionsList.splice(Math.floor(Math.random() * (incorrectAnswer.length + 1)), 0, correctAnswer);
  _question.innerHTML = `${data.question} ` ;
   _options.innerHTML = `
   ${optionsList.map((option, index) => `
   <li> ${index + 1}. <span>${option}</span> </li>
   `).join('')}
  `;
  selectOption();
  startTimer();
}
function selectOption() {
  _options.querySelectorAll('li').forEach(function (option) {
    option.addEventListener('click', function () {
      if (_options.querySelector('.selected')) {
       const activeOption = _options.querySelector('.selected');
        activeOption.classList.remove('selected');
      }
      option.classList.add('selected');
    });

  });
}

function checkAnswer() {
  clearInterval(timerInterval);
  _checkBtn.disabled = true;
  if (_options.querySelector('.selected')) {
    let selectedAnswer = _options.querySelector('.selected span').textContent;
    if (selectedAnswer === HTMLDecode(correctAnswer)) {
      correctScore++;
      _result.innerHTML = "";
    } else 
    {
            _result.innerHTML = "";
    }
    checkCount();
  }
  else {
        _result.innerHTML = `<p>Please select an option!</p>`;
        _checkBtn.disabled = false;
  }
}

function HTMLDecode(textString){
  let doc = new DOMParser().parseFromString(textString, "text/html");
  return doc.documentElement.textContent;
}

function checkCount() {
  askedCount++;
  setCount();
  _comment.innerHTML = '';
  if (askedCount === totalQuestion) {
        setTimeout(function () {
            console.log("");
        }, 5000);
        _comment.style.display ="block"
        _comment.innerHTML += `<p>${correctScore === 0 ? 'Try again!' : correctScore === 1 ? 'Keep going!' : correctScore === 2 ? 'Nice try!' : correctScore === 3 ? 'Well done!' : correctScore === 4 ? 'Good job!' : correctScore === 5 ? 'Excellent' : ''}</p>`;
        _result.innerHTML += `<p>${correctScore}/5</p>`;
        _playAgainBtn.style.display = "block";
        _backHome.style.display = "block";
        _checkBtn.style.display = "none";
        _question.style.display = "none";
        _options.style.display = "none";
    }
  else {
        setTimeout(function () {
            loadQuestion();
        }, 300);
    }
}

function setCount() {
  correctScore = askedCount = 0;
  _playAgainBtn.style.display = "none";
  _backHome.style.display = "none";
  _comment.style.display = "none";
  _checkBtn.style.display = "block";
  _question.style.display = "block";
  _options.style.display = "block";
  
