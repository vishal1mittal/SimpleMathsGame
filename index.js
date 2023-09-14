var hour = 0;
var min = 0;
var sec = 0;
var score = 0;
var correctAnswer = 0;
var wrongAnswer = 0;
var questionNumber = 0;
var operators = ["+", "-", "X", "/"];
var currentQuestion = null;
var AllQuestions = [];
var AllAnswer = [];
var AllTimeTaken = [];

const input = document.querySelector('.Answer');

// Event listener for the Enter key ("Enter" is the key name)
input.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    document.querySelector('#submit').click();
  }
});

// Event listener for the Escape key ("Escape" is the key name)
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    finishPractice();
  }
});


function updateClock() {
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
    correctAnswer +=1;
    document.querySelector(".score_text").innerHTML = score;    
}

function penaliseScore() {
  score = score - 1;
  wrongAnswer +=1;
  document.querySelector(".score_text").innerHTML = score;    
  
}

function updateQuestionNumber() {
    questionNumber = questionNumber + 1;
    document.querySelector(".QuestionNumberText").innerHTML = ("Question " + questionNumber);    
}

function updateQuestion(){
  updateQuestionNumber()
  document.querySelector(".Answer").value = "";
    var num1 = Math.floor(Math.random() * 100);
    var num2 = Math.floor(Math.random() * 100);
    var operator = operators[Math.floor(Math.random() * operators.length)];

    if (num2 == 0 && operator == "/") {
        updateQuestion();
        return;
    }
    
    currentQuestion = [num1, operator, num2];
    AllQuestions.push(currentQuestion);
    document.querySelector(".QuestionText").innerHTML = (num1 + " " + operator + " " + num2); 
}

function CheckAnswer(answer) {
  if(answer === "" || currentQuestion.length <=0){
    alert("Please enter an answer");
    return;
  }
  
  answer = parseFloat(answer);
    
  var correctAnswer = ""
  switch (currentQuestion[1]) {
    case "+":
      correctAnswer = currentQuestion[0] + currentQuestion[2];
      break;

    case "-":
      correctAnswer = currentQuestion[0] - currentQuestion[2];
      break;

    case "X":
      correctAnswer = currentQuestion[0] * currentQuestion[2];
      break;

    case "/":
      correctAnswer = currentQuestion[0] / currentQuestion[2];
      break;
  
    default:
      break;
  }

  correctAnswer = parseFloat(Math.round((correctAnswer + Number.EPSILON) *100)/100);
  if (correctAnswer === answer) {
    updateScoreCard();
  }
  else {
    penaliseScore();
  }
  
  AllAnswer.push([correctAnswer, answer]); 
  AllTimeTaken.push(document.querySelector(".timer_text").innerHTML);
  document.querySelector(".timer_text").innerHTML = "00:00:00";
  sec = 0;
  min = 0;
  hour = 0;

  updateQuestion();
  
}

function finishPractice() {
  AllQuestions.pop();
  var count = 0;
  AllQuestions.forEach(question => {
      var num1 = question[0];
      var num2 = question[2];
      var op = question[1];

      var QuestionDiv = document.createElement('div');
      QuestionDiv.className = 'Question';
      QuestionDiv.innerHTML = 'Question ' + (count+1) + ":";
      
      if (AllAnswer[count][1] === AllAnswer[count][0]) {        
        var AnswerDiv = document.createElement('div');
        AnswerDiv.innerHTML = num1 + " " + op + " " + num2 + " = " + AllAnswer[count][1];
        AnswerDiv.className = 'Answers';
      }
      else{        
        var AnswerDiv = document.createElement('div');
        AnswerDiv.innerHTML = num1 + " " + op + " " + num2 + " &#8800; " + AllAnswer[count][1];
        AnswerDiv.className = 'Answers';

        var CorrectAnswerLabel = document.createElement('p');
        CorrectAnswerLabel.className = 'CorrectAnswer';
        CorrectAnswerLabel.innerHTML = "Correct Answer is: " + AllAnswer[count][0];

        AnswerDiv.appendChild(CorrectAnswerLabel);
        QuestionDiv.classList.add("red");
      }
      
      var TimeDiv = document.createElement('div');
      TimeDiv.innerHTML = "Time Taken: " + AllTimeTaken[count];
      TimeDiv.className = 'Time';
      count += 1;

      
      QuestionDiv.appendChild(AnswerDiv);
      QuestionDiv.appendChild(TimeDiv);
      document.querySelector(".Result").appendChild(QuestionDiv);

  });

  document.querySelector(".container").classList.add("hidden");
  document.querySelector(".Result").classList.remove("hidden");
  document.querySelector("#score").innerHTML = "Total Score: " + correctAnswer + " / " + count;
  document.querySelector("#score").classList.remove("hidden");
}

setInterval(updateClock, 1000);
updateQuestion();