//variables to change the DOM
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
var highScoresPage = document.querySelector('.high-scores-page');
var highScoresLink = document.querySelector('.high-scores-link')

//variables used in the functions below 
var listHighScores = []
var currentHighScore;
var timer;
var score=0;
var i=0;
var j=0;
var k=0;
var countdown = 60;

//an array of opjects used to display the questions
var quiz =[ {
    //question displayed
    question:"What type of file hold the styling for a Webpage?",
    //4 options for the answer
    A: "A. HTML",
    B: "B. CSS",
    C: "C. JavaScript",
    D: "D. Flexbox",
    //used to check if the clicked on answer is correct
    answer: "B. CSS"
}, 
{
    question: 'What type of file holds the content for a webpage?',
    A:'A. HTML',
    B:'B. CSS',
    C: 'C. Browser',
    D: 'D. Bootstrap',
    answer: 'A. HTML'
},
{
    question: 'What type of file hold the functionality of a webpage?',
    A:'A. CSS',
    B:'B. Java',
    C:'C. HTML',
    D: 'D. JavaScript',
    answer: "D. JavaScript"
},
{
    question: 'What is a special variable, which can hold more than one value?',
    A: 'A. Function',
    B: 'B. Object',
    C: 'C. Array',
    D: 'D. Value',
    answer: 'C. Array'
},
{
    question: 'What is a decision-making statement that guides a program to make decisions based on specified criteria?',
    A: 'A. For Loop',
    B: 'B. If Statement',
    C: 'C. Function',
    D: 'D. Variable',
    answer: 'B. If Statement'
},
{
    question: 'What kind of operator is "="?',
    A: 'A. Arthmetic',
    B: 'B. Assignment',
    C: 'C. Comparison',
    D: 'D. Logical',
    answer: 'B. Assignment'
},
{
    question: 'What kind of operator is "==="?',
    A: 'A. Arthmetic',
    B: 'B. Assignment',
    C: 'C. Comparison',
    D: 'D. Logical',
    answer: 'C. Comparison'
},
{
    question: 'What is an example of a string?',
    A: 'A. 0',
    B: 'B. true',
    C: 'C. i=0',
    D: 'D. "Hello World"',
    answer: 'D. "Hello World"'
}
]

//press the start button to start quiz 
startbtn.addEventListener('click', startQuiz);

//funtion to start the quiz
function startQuiz() {
    //removes the start button from the display
    startbtn.style.display = "none";
    //starts the timer
    timer = setInterval(function () {timerEl.innerHTML = "Time:" + countdown--;
        //ends the game and stops the countdownn if it reaches 0
        if(countdown < 0){
            clearInterval(timer);
            endGame();
        }}, 1000);
    addQuestions();
}

//changes the DOM to add the questions and answer options 
function addQuestions(){
    questions.textContent = quiz[i].question;
    choiceA.textContent = quiz[i].A;
    choiceB.textContent = quiz[i].B;
    choiceC.textContent = quiz[i].C;
    choiceD.textContent = quiz[i].D;
}

//function for when an answer is clicked on
answers.addEventListener('click', function(event){
    //if the clicked onanswer is right
    if (event.target.innerHTML===quiz[i].answer){
        answerToF.textContent='Correct';
        answerToF.style.color="rgba(0, 0, 0, 0.425)"
        //adds to the scores variable for every right answer
        score++;
    //if the clicked onanswer is wrong
    }else {
        answerToF.textContent= 'Incorrect';
        answerToF.style.color= "rgba(255, 0, 0, 0.425)";
        countdown= countdown-3;
    }
    //adds 1 to i so when the addQuestions function is ran it will give the next set of questions and answers
    i++;
    //checks if there is another set of questions and answers to run
    if (i<quiz.length){
        addQuestions();
    } else {
        // timerEl.textContent= "Time:";
        endGame();
    }
});

//function for once the game is over. either by the timer running out or finishing the questions
function endGame() {
    clearInterval(timer);
    //displays the new main for once the quiz is done
    quizEl.style.display="none";
    afterQuizEl.style.display="initial";
    //finds the percentage of the total score and displays it on the DOM
    currentHighScore = Math.round((score / quiz.length) * 100);
    highScoreEl.textContent=currentHighScore + "%";
}

//function to submit initials for highscore
submitInitialsEl.addEventListener('click', function(){
    //checks that the initial submittion is not blank
    if (initialsEl.value===""){
        return
    }else{
    //displays new main for once the initials are submitted 
    afterQuizEl.style.display="none";
    highScoresPage.style.display="initial";
    scoresIntoStorage();
    displayHighScores();
    //returns the score back to 0 for the next time the quiz is taken
    score=0;
    }
});

//function to put the current high score and initials into the local storage 
function scoresIntoStorage() {
    listHighScores[j] = {
        scores: currentHighScore,
        initials: initialsEl.value
    };
localStorage.setItem("high scores", JSON.stringify(listHighScores));
}

//function to get the high score and initials out of local storage and display them on the page
function displayHighScores() {
    var getHighScores= JSON.parse(localStorage.getItem("high scores"));
    k=getHighScores.length-1;
    var liEls = document.createElement("li")
    liEls.innerHTML= "Score: " + getHighScores[k].scores + " Initials: " + getHighScores[k].initials;   
    storedScoresEl.append(liEls);
}

//function to start the quiz again
restartQuizEl.addEventListener('click', function(){
    i=0;
    // location.reload();
    highScoresPage.style.display="none";
    quizEl.style.display="initial";
    j++;
    startQuiz();
    countdown=60;
    answerToF.textContent="";

})

//// add a link to view the highscores at any time
highScoresLink.addEventListener('click', function(){
    quizEl.style.display='none';
    afterQuizEl.style.display='none'
    highScoresPage.style.display='initial'
    clearInterval(timer);
})