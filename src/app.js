const _container = document.getElementById('container');
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
const _catePage = document.getElementById('category-page');

let correctAnswer = "",
    correctScore = askedCount = 0,
    totalQuestion = 5;
let selectedCategory = null;
let timerInterval;

const categoryButtons = {
    math: document.getElementById('category-math'),
    computer: document.getElementById('category-computer'),
    history: document.getElementById('category-history')
    
};

function eventListeners() {
    _checkBtn.addEventListener('click', checkAnswer);
    _playAgainBtn.addEventListener('click', restartQuiz);

    Object.keys(categoryButtons).forEach(category => {
        categoryButtons[category].addEventListener('click', () => {
            selectedCategory = category;
            restartQuiz(); // Restart the quiz when a category is selected
        });
    });
}

_backHome.addEventListener('click', function() {

    const homePageURL = './home/home.html'; 
    
    // Redirect to the home page
    window.location.href = homePageURL;
});

document.addEventListener('DOMContentLoaded', function () {
    eventListeners();
    _totalQuestion.textContent = totalQuestion;
    _correctScore.textContent = correctScore;

    const categoryImages = document.querySelectorAll('img[id^="category-"]');
    categoryImages.forEach((image) => {
        image.addEventListener('click', function () {
            const category = image.id.replace('category-', ''); // Extract category name from the image id
            selectedCategory = category;
            loadQuestion();
            
            //hide img here after we click choosing cat
            categoryImages.forEach((img) => {
                img.style.display = 'none';
            });

            _catePage.style.display = "none";
            _container.style.display = "block";
        });
    });


});

// by category
async function loadQuestion() {
    clearInterval(timerInterval);
    const category = selectedCategory || 'general'; 
    const APIUrl = `https://opentdb.com/api.php?amount=1&category=${getCategoryId(category)}`;
    const result = await fetch(`${APIUrl}`);
    const data = await result.json();
    _result.innerHTML = "";

    showQuestion(data.results[0]);

}

// by category id HELPER
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
    clearInterval(timerInterval);
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
            <li> <span>${option}</span> </li>
        `).join('')}
    `;
    selectOption();
    startTimer();
}

//options
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

//checking ans
function checkAnswer() {
    clearInterval(timerInterval);
    _checkBtn.disabled = true;
    if (_options.querySelector('.selected')) {
        let selectedAnswer = _options.querySelector('.selected span').textContent;
        if (selectedAnswer === HTMLDecode(correctAnswer)) {
            correctScore++;
            _result.innerHTML = "";
        } else {
            _result.innerHTML = "";
        }
        checkCount();
    } else {
        _result.innerHTML = `<p>Please select an option!</p>`;
        _checkBtn.disabled = false;
    }

}


function HTMLDecode(textString) {
    let doc = new DOMParser().parseFromString(textString, "text/html");
    return doc.documentElement.textContent;
}

function checkCount() {
    askedCount++;
    setCount();
    _comment.innerHTML = '';
    _timer.innerHTML = '';
    if (askedCount === totalQuestion) {
        setTimeout(function () {
            console.log("");
        }, 5000);
        _comment.style.display ="block"
        _comment.innerHTML += `<p>${correctScore === 0 ? 'Try again!' : correctScore === 1 ? 'Keep going!' : correctScore === 2 ? 'Nice try!' : correctScore === 3 ? 'Well done!' : correctScore === 4 ? 'Good job!' : correctScore === 5 ? 'Excellent' : ''}</p>`;
        _result.innerHTML += `<p>${correctScore}/5</p>`;
        _playAgainBtn.style.display = "block";
        _backHome.style.display = "block";
        _timer.style.display = "none";
        _checkBtn.style.display = "none";
        _question.style.display = "none";
        _options.style.display = "none";
    } else {
        setTimeout(function () {
            loadQuestion();
        }, 300);
    }
}

function setCount() {
    _totalQuestion.textContent = totalQuestion;
    _correctScore.textContent = correctScore;
}

function restartQuiz() {
    correctScore = askedCount = 0;
    _playAgainBtn.style.display = "none";
    _backHome.style.display = "none";
    _comment.style.display = "none";
    _checkBtn.style.display = "block";
    _question.style.display = "block"; 
    _options.style.display = "block";
    _checkBtn.disabled = false;
    _timer.style.display = "block";
    setCount();
    loadQuestion();
}
  
