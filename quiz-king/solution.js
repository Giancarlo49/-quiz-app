/////////   Dieser Code erstellt ein JavaScript-Objekt mit dem Namen "quiz".  ///////

///   Das Objekt enthält einige Eigenschaften, die Details zum Quiz enthalten. Die erste Eigenschaft, "title", ///
///    gibt den Namen des Quiz an.Die zweite Eigenschaft, "questions", ist ein Array von Frage - Objekten   ///

const quiz = {
  title: 'Quiz-King',
  questions: [
    {
      question: 'What is the capital of Spain?',
      choices: [' Paris', ' Barcelona', ' Rome', ' Madrid'],
      correctAnswer: 3
    },
    {
      question: 'What is the tallest mountain in the world?',
      choices: [' Mount Everest', ' K2', ' Kangchenjunga', ' Lhotse'],
      correctAnswer: 0
    },
    {
      question: 'What is the largest ocean in the world?',
      choices: [' Pacific Ocean', ' Atlantic Ocean', ' Indian Ocean', ' Arctic Ocean'],
      correctAnswer: 0
    },
    {
      question: `What is the longest river in the world?`,
      choices: [` Amazonas`, ` Nil`, ` Rio Grande`, ` Donau`],
      correctAnswer: 1
    },
    {
      question: 'Who won the UEFA European Cup in 2022?',
      choices: [' France', ' Germany', ' Italy', ' Spain'],
      correctAnswer: 2
    },

  ]
};

///   Dieser Code definiert einige Variablen und eine Funktion namens "startQuiz".   ////////////

///   Die Variablen "currentQuestion" und "score" werden verwendet, um den Fortschritt des Quiz und    ////
///   die erzielten Punkte des Benutzers zu verfolgen. "currentQuestion" speichert die aktuelle Frage, ///
///       die der Benutzer beantwortet und "score" speichert die Gesamtpunktzahl des Benutzers.         ///

let currentQuestion = 0;
let score = 0;
let correctAnswerText = ["population 6,7 million", "8.849 meters", "180 Millionen Squarekilometer", "6.650 kilometer", "3-2 after penalty vs England"];

function startQuiz() {
  currentQuestion = 0;
  document.getElementById('quiz').style.display = 'block';
  document.getElementById('score').innerHTML = `Score: ${score}`;
  loadQuestion();
}

///   Diese Funktion wird verwendet, um die aktuelle Frage des Quizs zu laden und anzuzeigen. Die Funktion  ///
///   verwendet die Variable "currentQuestion", um die aktuelle Frage aus dem Quiz - Objekt zu extrahieren   ///

function loadQuestion() {
  const question = quiz.questions[currentQuestion];
  document.getElementById('question').innerHTML = question.question;
  document.querySelector('legend').innerHTML = `Choose one:`;

  const choices = document.getElementById('choices');
  choices.innerHTML = '';
  for (let i = 0; i < question.choices.length; i++) {
    const choice = question.choices[i];
    const input = document.createElement('input');
    input.setAttribute('type', 'radio');
    input.setAttribute('name', 'choice');
    input.setAttribute('value', i);
    input.setAttribute('id', `choice${i}`);
    const label = document.createElement('label');
    label.setAttribute('for', `choice${i}`);
    label.innerHTML = choice;
    choices.appendChild(input);
    choices.appendChild(label);
    choices.appendChild(document.createElement('br'));
  }
  
  document.getElementById('submit').style.display = 'inline';
  document.getElementById('progress').innerHTML = `Question ${currentQuestion + 1} of ${quiz.questions.length}`;
}

///   Diese Funktion wird aufgerufen, wenn der Benutzer auf den "Submit"-Button klickt, um seine Antwort auf die aktuelle Frage abzugeben. ///

function checkAnswer() {
  const question = quiz.questions[currentQuestion];
  const inputs = document.getElementsByName('choice');
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].checked) {
      if (question.correctAnswer === parseInt(inputs[i].value)) {
        score++;
      }
      let correctAnswer = question.choices[question.correctAnswer];
      alert(`The correct answer was ${correctAnswer} ${correctAnswerText[currentQuestion]}`);
      break;
    }
  }
  currentQuestion++;
  if (currentQuestion === quiz.questions.length) {
    showResult();
  } else {
    loadQuestion();
  }
}

///   Dieser Code enthält die letzten drei Funktionen des Quizs.   ////////////////////

function showResult() {
  document.getElementById('quiz').innerHTML = `
    <h1 class="result-header">Result</h1>
    <p>You scored ${score} out of ${quiz.questions.length}</p>
    <button class="btn--default" onclick="location.reload()">Play Again</button>
  `;
}

document.getElementById('start').onclick = function() {
  startQuiz();
};

document.getElementById('form').onsubmit = function(event) {
  event.preventDefault();
  checkAnswer();
};

