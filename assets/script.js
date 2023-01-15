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
timer = setInterval(function () {timerEl.innerHTML = "Time:" + countdown--}, 1000);
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


//*******************************************************
function displayHighScores() {
listHighScores= JSON.parse(localStorage.getItem("high scores"));
for(k=0; k<listHighScores.length; k++){
var liEls = document.createElement("li")
storedScoresEl.children[k].textContent= ("Score: " + listHighScores[k].scores + "Initials: " + listHighScores[k].initials);
storedScoresEl.append(liEls);  
}

}

function scoresIntoScorage() {
    listHighScores[j] = {
        scores: currentHighScore,
        initials: initialsEl.value
    }
localStorage.setItem("high scores", JSON.stringify(listHighScores));
j++;
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
        addQuestions();
    } else {
        timerEl.textContent= "Time:";
        endGame();
        // alert("Game Over");
        // clearInterval(counter);
    }
});

startbtn.addEventListener('click', startQuiz);

submitInitialsEl.addEventListener('click', function(){
    if (initialsEl.value===""){
        return
    }else{
    scoresIntoScorage();
    afterQuizEl.style.display="none";
    afterSubmitEl.style.display="initial";
    }
});

restartQuizEl.addEventListener('click', function(){
    afterSubmitEl.style.display="none";
    i=0;
    quizEl.style.display="initial";
    addQuestions();
})
