$(document).ready(function () {
  //
  //
  //
  //
  //Global Variables, then Objects, then Function Calls, yo.

  //GLOBALS
  let correctNum = 0;
  let incorrectNum = 0;
  let unansweredNum = 0;
  let timer = 20;
  let runFlag = false;
  let gameArray = [];
  let gameIndex = 0;
  let timerInterval;
  let currentQuestion;
  let guessedAnswer;
  let displayDelay;


  //OBJECTS
  var trivia = [
    {
      question: 'What is allspice alternatively known as?',
      choices: ['Pimento', 'Grain', 'Filiment', 'Cinnamon'],
      answer: 0,
      imgSrc: './assets/images/questions/Q.png'
    },
    {
      question: 'How many U.S. states border the Gulf of Mexico?',
      choices: ['8', '4', '1', '5'],
      answer: 3,
      imgSrc: './assets/images/questions/Q.png'
    },
    {
      question: 'What is the world’s longest river?',
      choices: ['Nile', 'Amazon', 'Colorado', 'Sahara'],
      answer: 1,
      imgSrc: './assets/images/questions/Q.png'
    },
    {
      question: 'What is the world’s largest ocean?',
      choices: ['Pacific', 'Antarctic', 'Yellow', 'Indiana'],
      answer: 0,
      imgSrc: './assets/images/questions/Q.png'
    },
    {
      question: 'Which country is Prague in?',
      choices: ['Romania', 'Italy', 'Georgia', 'Czech Republic'],
      answer: 3,
      imgSrc: './assets/images/questions/Q.png'
    },
    {
      question: 'What does the N stand for in NATO?',
      choices: ['National', 'North', 'Negative', 'New'],
      answer: 1,
      imgSrc: './assets/images/questions/Q.png'
    }
  ];

  $('#reset-btn').hide();

  //start button is the beginning of the trivia game
  $('#start-btn').on('click', function () {
    $('#start-btn').hide();
    //fill the game array with the trivia objects, shuffled around
    setArrayShuffle();
    // questionDisplay();
    displayDelay = setTimeout(questionDisplay, 1000);
    runTimer();
    // $('#reset-btn').show();
  });

  function setArrayShuffle() {
    for (var i = 0; i < trivia.length; i++) {
      gameArray.push(trivia[i]);
      //TODO generate a random index in array, shuffle up the gameArray.
      // gameIndex = Math.floor(Math.random() * gameArray.length);
    }

  }

  function questionDisplay() {
    currentQuestion = gameArray[gameIndex];
    gameIndex++;

    $('#question-area').html('<h2>' + currentQuestion.question + '</h2>');
    for (var i = 0; i < currentQuestion.choices.length; i++) {
      var choiceDiv = $('<div>');
      choiceDiv.addClass('list-group-item quiz');
      choiceDiv.html(currentQuestion.choices[i]);
      //assign array position to it so can check answer
      choiceDiv.attr('data-answerIndex', i);
      $('#answer-area').append(choiceDiv);

    }
  }

  function runTimer() {
    if (!runFlag) {
      //if the game is not running, it is now, and set the timer to decrease by a second (1000 miliseconds)
      timerInterval = setInterval(decrease, 100);
      runFlag = true;
    }
  }
  function decrease() {
    //update the DOM for the timer
    $('#countdown-timer').text(timer + ' seconds remaining...');
    timer--;
    //if the timer reaches 0, stop it.
    if (timer < 0) {
      unansweredNum++;
      stopTimer();
      $('#answer-area').html('<p>Your time has expired! The correct answer is: ' + currentQuestion.choices[currentQuestion.answer] + '</p>');
      answerReDraw();
    }

  }

  function stopTimer() {
    $('#countdown-timer').text('');
    runFlag = false;
    clearInterval(timerInterval);
  }
  function reset() {
    stopTimer();
    $('#reset-btn').hide();
    // $('#start-btn').show();
    $('#answer-area').empty();
    $('#question-area').empty();
    gameArray = [];
    gameIndex = 0;
    correctNum = 0;
    incorrectNum = 0;
    unansweredNum = 0;
    timer = 20;
    setArrayShuffle();
    // questionDisplay();
    displayDelay = setTimeout(questionDisplay, 1000);
    runTimer();

  }

  $('#reset-btn').on('click', function () {
    reset();
  });
  $('#header-btn-reset').on('click', function () {
    reset();
  });

  $('body').on('click', '.list-group-item', function () {

    guessedAnswer = parseInt($(this).attr('data-answerIndex'));

    //correct guess or wrong guess outcomes
    if (guessedAnswer === currentQuestion.answer) {
      stopTimer();
      correctNum++;
      guessedAnswer = '';
      $('#answer-area').html('<p>Correct!</p>');
      answerReDraw();

    } else {
      stopTimer();
      incorrectNum++;
      guessedAnswer = '';
      $('#answer-area').html('<p>Wrong! The correct answer is: ' + currentQuestion.choices[currentQuestion.answer] + '</p>');
      answerReDraw();
    }
  });

  function answerReDraw() {
    $('#answer-area').append('<img src=' + currentQuestion.photo + '>');
    // gameArray.push(currentQuestion);
    // console.log('push: currentQ ' + currentQuestion.answer);

    var fiveSecondDelay = setTimeout(function () {
      $('#answer-area').empty();
      $('#question-area').empty();
      //TODO add a spinning image? Have 1 sec delay.
      timer = 20;
      console.log(incorrectNum);
      console.log(correctNum);
      console.log(unansweredNum);
      console.log(gameArray.length);

      //run the score screen if all questions answered
      if ((incorrectNum + correctNum + unansweredNum) === gameArray.length) {
        $('#question-area').empty();
        $('#question-area').html('<h3>Game Over!  Here is how you did: of ' + gameArray.length + ' questions:</h3>');
        $('#answer-area').append('<h4> Correct: ' + correctNum + '</h4>');
        $('#answer-area').append('<h4> Incorrect: ' + incorrectNum + '</h4>');
        $('#answer-area').append('<h4> Unanswered: ' + unansweredNum + '</h4>');
        $('#reset-btn').show();

      } else {
        runTimer();
        displayDelay = setTimeout(questionDisplay, 1000);

      }
    }, 5000);

  }





});//document ready