var hour = 0;
var min = 0;
var sec = 0;
var score = 0;
var questionNumber = 0;
var operators = ["+", "-", "X", "/"];
var AllQuestions = [];
var AllAnswer = [];

function updateClock() {
    updateScoreCard();
    updateQuestionNumber();
    sec = sec + 1;

    if (sec >= 60) {
        sec = 0;
        min = min + 1;
    }
    if (min >= 60) {
        min = 0;
        hour = hour + 1;
    }

    // Convert hours, minutes, and seconds to double digits
    var formattedHour = hour.toString().padStart(2, '0');
    var formattedMin = min.toString().padStart(2, '0');
    var formattedSec = sec.toString().padStart(2, '0');

    var time = formattedHour + ":" + formattedMin + ":" + formattedSec;

    document.querySelector(".timer_text").innerHTML = time;
}

function updateScoreCard() {
    score = score + 1;
    document.querySelector(".score_text").innerHTML = score;    
}

function updateQuestionNumber() {
    questionNumber = questionNumber + 1;
    document.querySelector(".QuestionNumberText").innerHTML = ("Question " + questionNumber);    
}

function updateQuestion(answer){
    if(answer === ""){
        alert("Please enter an answer");
        return;
    }
    var num1 = Math.floor(Math.random() * 100);
    var num2 = Math.floor(Math.random() * 100);
    var operator = operators[Math.floor(Math.random() * operators.length)];

    if (num2 == 0 && operator == "/") {
        updateQuestion();
        return;
    }
    
    document.querySelector(".QuestionText").innerHTML = (num1 + " " + operator + " " + num2);
}

setInterval(updateClock, 1000);