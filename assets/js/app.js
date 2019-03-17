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
  const constTime = 9;//is set at 1 second below timer due to 1 second delay to run displaying unction 
  let timer = constTime;
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
      imgSrc: 'https://media.giphy.com/media/3WyKkg3A05wic/giphy.gif',
      answerText: 'A pimiento, pimento, or cherry pepper is a variety of large, red, heart-shaped chili pepper (Capsicum annuum) that measures 3 to 4 in (7 to 10 cm) long and 2 to 3 in (5 to 7 cm) wide (medium, elongate).'
    },
    {
      question: 'How many U.S. states border the Gulf of Mexico?',
      choices: ['8', '4', '1', '5'],
      answer: 1,
      imgSrc: 'assets/images/usmexico.jpg',
      answerText: 'The border between Mexico and the United States spans six Mexican states and four U.S. states.'
    },
    {
      question: 'What is the world’s largest river?',
      choices: ['Nile', 'Amazon', 'Colorado', 'Sahara'],
      answer: 1,
      imgSrc: 'https://media.giphy.com/media/2csuIJj6TmuKA/giphy.gif',
      answerText: 'The Amazon River in South America is the largest river by discharge volume of water in the world, and by some definitions it is the longest.'
    },
    {
      question: 'What is the world’s largest ocean?',
      choices: ['Pacific', 'Antarctic', 'Yellow', 'Indiana'],
      answer: 0,
      imgSrc: 'https://media.giphy.com/media/FgJ6FbfJGwztK/giphy.gif',
      answerText: 'The Pacific Ocean is the largest and deepest of Earth oceanic divisions. It extends from the Arctic Ocean in the north to the Southern Ocean (or, depending on definition, to Antarctica) in the south and is bounded by Asia and Australia in the west and the Americas in the east.'
    },
    {
      question: 'Which country is Prague in?',
      choices: ['Romania', 'Italy', 'Georgia', 'Czech Republic'],
      answer: 3,
      imgSrc: 'assets/images/prague.jpg',
      answerText: 'Prague is the capital and largest city in the Czech Republic, the 14th largest city in the European Union and the historical capital of Bohemia.'
    },
    {
      question: 'What does the N stand for in NATO?',
      choices: ['National', 'North', 'Negative', 'New'],
      answer: 1,
      imgSrc: 'assets/images/nato.jpg',
      answerText: 'The North Atlantic Treaty Organization, also called the North Atlantic Alliance, is an intergovernmental military alliance between 29 North American and European countries.'
    }
  ];

  $('#reset-btn').hide();
  $("#game-progress").hide();
  $("#left-game").hide();

  //start button is the beginning of the trivia game
  $('#start-btn').on('click', function () {
    $('#start-btn').hide();
    $("#left-game").show();
    //fill the game array with the trivia objects, shuffled around
    setArrayShuffle();
    questionDisplay();
    runTimer();
    // $('#reset-btn').show();
  });

//first make a copy of the trivia array and send it into Fisher Yates algorithm to shuffle. 
//wanted to make a copy first to not alter the original array. It seems like a safeguard to me.
  function setArrayShuffle() {
    for (var i = 0; i < trivia.length; i++) {
      gameArray.push(trivia[i]);
      //generate a random index in array, shuffle up the gameArray.
      //found an algorithm from some stats dudes from 1938, computerized in 1964.
      fisherYatesShuffle(gameArray);
    }
  }

  //https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
  //essentially from what I understand, it starts at the back and then swaps that end location
  //with a randomly picked location that comes before it. then it moves towards the front of the array and 
  //repeats the process. 
  function fisherYatesShuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i, the end swap is inclusive.   
      [array[i], array[j]] = [array[j], array[i]]; // swap elements
    }
  }

  function questionDisplay() {
    var tmp = timer + 1;
    $('#countdown-timer').text(tmp + ' seconds remaining...');
    $("#game-progress").show();
    var percent = ((gameIndex / gameArray.length)*100).toFixed(0);      
    $("#game-progress").css({width: +percent+'%'});  

    currentQuestion = gameArray[gameIndex];
    gameIndex++;
    $('#question-area').html('<h2 class="p-3 mb-2 text-center list-group-item-warning">' + currentQuestion.question + '</h2>');
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
      timerInterval = setInterval(decrease, 1000);
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
      $('#answer-area').html('<p class="p-3 mb-2 text-center list-group-item-dark">Your time has expired! The correct answer is: ' + currentQuestion.choices[currentQuestion.answer] + '</p>');
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
    timer = constTime;
    setArrayShuffle();
    questionDisplay();    
    runTimer();
    $("#game-progress").css({width: 0+'%'});
    $("#left-game").show();
  }

  $('#reset-btn').on('click', function () {
    reset();
  });
  $('#header-btn-reset').on('click', function () {
    reset();
    $('#start-btn').hide();    
  });

  $('body').on('click', '.list-group-item', function () {

    guessedAnswer = parseInt($(this).attr('data-answerIndex'));

    //correct guess or wrong guess outcomes
    if (guessedAnswer === currentQuestion.answer) {
      stopTimer();
      correctNum++;
      guessedAnswer = '';
      $('#answer-area').html('<h2 class="p-3 mb-2 text-center list-group-item-success">Correct!</h2>');
      answerReDraw();

    } else {
      stopTimer();
      incorrectNum++;
      guessedAnswer = '';
      $('#answer-area').html('<h2 class="p-3 mb-2 text-center list-group-item-danger">Wrong! The correct answer is: ' + currentQuestion.choices[currentQuestion.answer] + '</h2>');
      answerReDraw();
    }
  });

  function answerReDraw() {
    // $('#answer-area').append('<img class="img-thumbnail" src=' + currentQuestion.imgSrc + '>');
    $('#answer-area').append('<div class="card text-center">' +
    '<img class="card-img-top" src="' + currentQuestion.imgSrc + '" style="max-height:400px">' +
      '<div class="card-body"><p class="card-text">'+ currentQuestion.answerText + '</p>'+
      '</div></div>');    

    var fiveSecondDelay = setTimeout(function () {
      $('#answer-area').empty();
      $('#question-area').empty();      
      timer = constTime;
      console.log(incorrectNum);
      console.log(correctNum);
      console.log(unansweredNum);
      console.log(gameArray.length);

      //run the score screen if all questions answered
      if ((incorrectNum + correctNum + unansweredNum) === gameArray.length) {
        $('#question-area').empty();
        $('#question-area').html('<h3 class="p-3 mb-2 text-center list-group-item">Game Over!  Here is how you did: of ' + gameArray.length + ' questions:</h3>');
        $('#answer-area').append('<h4 class="p-3 mb-2 text-center list-group-item"> Correct: ' + correctNum + '</h4>');
        $('#answer-area').append('<h4 class="p-3 mb-2 text-center list-group-item"> Incorrect: ' + incorrectNum + '</h4>');
        $('#answer-area').append('<h4 class="p-3 mb-2 text-center list-group-item"> Unanswered: ' + unansweredNum + '</h4>');
        //<h2 class="p-3 mb-2 text-center list-group-item-warning">' + currentQues
        $('#reset-btn').show();
        $("#game-progress").hide();
        $("#left-game").hide();

      } else {
        runTimer();
        questionDisplay();
      }
    }, 5000);//five second delay between answer and next question. 

  }





});//document ready