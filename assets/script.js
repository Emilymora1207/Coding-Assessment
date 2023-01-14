var questions = document.querySelector(".Questions");
var choiceA = document.querySelector('.answer-a');
var choiceB = document.querySelector('.answer-b');
var choiceC = document.querySelector('.answer-c');
var choiceD = document.querySelector('.answer-d');
var answerToF = document.querySelector('.T-or-F');
var startbtn = document.querySelector('.start');
var timerEl = document.querySelector('.timer');
var answers = document.querySelector('.answers');
var quizEl = document.querySelector('.quiz');
var afterQuizEl = document.querySelector('.after-quiz');
var highScoreEl = document.querySelector('.high-score');
var initialsEl = document.querySelector('.initials');
var storedScores = document.querySelector('.stored-scores');
var currentHighScore;
var counter;
var score=0;
var i=0;
var countdown = 60;
var quiz =[ {
    question:"What type of file hold the styling for a Webpage?",
    A: "HTML",
    B: "CSS",
    C: "JavaScript",
    D: "Flexbox",
    answer: "CSS"
}, 
{
    question: 'What type of file holds the content for a webpage?',
    A:'HTML',
    B:'CSS',
    C: 'Browser',
    D: 'Bootstrap',
    answer: 'HTML'
},
{
    question: 'What type of file hold the functionality of a webpage?',
    A:'CSS',
    B:'Java',
    C:'HTML',
    D: 'JavaScript',
    answer: "JavaScript"
}
]

function startQuiz() {
startbtn.style.display = "none";
counter = setInterval(function () {timerEl.innerHTML = "Time:" + countdown--}, 1000);
addQuestions();
}

function addQuestions(){
    questions.textContent = quiz[i].question;
    choiceA.textContent = quiz[i].A;
    choiceB.textContent = quiz[i].B;
    choiceC.textContent = quiz[i].C;
    choiceD.textContent = quiz[i].D;
}

function endGame() {
    quizEl.style.display="none";
    afterQuizEl.style.display="initial";
    currentHighScore = Math.round((score / quiz.length) * 100);
    highScoreEl.textContent=currentHighScore + "%";
}

function displayHighScores() {
}


answers.addEventListener('click', function(event){
    console.log(event);
    if (event.target.innerHTML===quiz[i].answer){
        answerToF.textContent='Right';
        score++;
    }else {
        answerToF.textContent= 'Wrong'
    }
    i++;
    if (i<quiz.length){
        addQuestions()
    } else {
        timerEl.textContent= "Time:";
        endGame();
        // alert("Game Over");
        // clearInterval(counter);
    }
})
startbtn.addEventListener('click', startQuiz);
