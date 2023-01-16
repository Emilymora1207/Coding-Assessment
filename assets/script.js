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
var storedScoresEl = document.querySelector('.stored-scores');
var submitInitialsEl = document.querySelector('.submit-initials');
var afterSubmitEl = document.querySelector('.after-submit');
var restartQuizEl = document.querySelector('.restart-quiz');

var listHighScores = []
var currentHighScore;
var timer;
var score=0;
var i=0;
var j=0;
var k=0;
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
},
{
    question: 'What is a special variable, which can hold more than one value?',
    A: 'Function',
    B: 'Object',
    C: 'Array',
    D: 'Value',
    answer: 'Array'
},
{
    question: 'What is a decision-making statement that guides a program to make decisions based on specified criteria?',
    A: 'For Loop',
    B: 'If Statement',
    C: 'Function',
    D: 'Variable',
    answer: 'If Statement'
},
{
    question: 'What kind of operator is "="?',
    A: 'Arthmetic',
    B: 'Assignment',
    C: 'Comparison',
    D: 'Logical',
    answer: 'Assignment'
},
{
    question: 'What kind of operator is "==="?',
    A: 'Arthmetic',
    B: 'Assignment',
    C: 'Comparison',
    D: 'Logical',
    answer: 'Comparison'
},
{
    question: 'What is an example of a string?',
    A: '0',
    B: 'true',
    C: 'i=0',
    D: '"Hello World"',
    answer: '"Hello World"'
}
]

startbtn.addEventListener('click', startQuiz);


function startQuiz() {
startbtn.style.display = "none";
timer = setInterval(function () {timerEl.innerHTML = "Time:" + countdown--;
    if(countdown < 0){
        clearInterval(timer);
        endGame();
    }}, 1000);
addQuestions();
}

function addQuestions(){
    questions.textContent = quiz[i].question;
    choiceA.textContent = quiz[i].A;
    choiceB.textContent = quiz[i].B;
    choiceC.textContent = quiz[i].C;
    choiceD.textContent = quiz[i].D;
}


answers.addEventListener('click', function(event){
    console.log(event);
    if (event.target.innerHTML===quiz[i].answer){
        answerToF.textContent='Right';
        score++;
    }else {
        answerToF.textContent= 'Wrong';
        countdown= countdown-3;
    }
    i++;
    if (i<quiz.length){
        addQuestions();
    } else {
        // timerEl.textContent= "Time:";
        endGame();
    }
});


function endGame() {
    clearInterval(timer);
    quizEl.style.display="none";
    afterQuizEl.style.display="initial";
    currentHighScore = Math.round((score / quiz.length) * 100);
    highScoreEl.textContent=currentHighScore + "%";
}

submitInitialsEl.addEventListener('click', function(){
    if (initialsEl.value===""){
        return
    }else{

    afterQuizEl.style.display="none";
    afterSubmitEl.style.display="initial";
    scoresIntoStorage();
    displayHighScores();
    }
});

function scoresIntoStorage() {
    listHighScores[j] = [{
        scores: currentHighScore,
        initials: initialsEl.value
    }];
localStorage.setItem("high scores", JSON.stringify(listHighScores));
j++;
}


//*******************************************************
function displayHighScores() {
    listHighScores= JSON.parse(localStorage.getItem("high scores"));
    k=listHighScores.length-1;
    var liEls = document.createElement("li")
    storedScoresEl.append(liEls);
    storedScoresEl.lastElementChild.innerHTML= "Score: " + listHighScores[k].scores + "Initials: " + listHighScores[k].initials;   
}



restartQuizEl.addEventListener('click', function(){
    i=0;
    afterSubmitEl.style.display="none";
    quizEl.style.display="initial";
    startQuiz();
    countdown=60;
    answerToF.textContent="";
})
