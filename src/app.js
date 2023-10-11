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
  
