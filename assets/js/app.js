$(document).ready(function () {
  //
  //
  //
  //
  //Global Variables, then Objects, then Function Calls, yo.

  //GLOBALS

  
  //OBJECTS
  // Trivia Questions
  class gameQuestion {
    constructor(q, a1, a2, a3, a4, ca, img, index) {
      this.question = q;
      this.answer1 = a1;
      this.answer2 = a2;
      this.answer3 = a3;
      this.answer4 = a4;
      this.correctAnswer = ca;
      this.imgName = img;
      this.questionIndex = index;

    }
    displayQuestion() {
      let displayQ =
        '<div class="card">' +
        '<img src="src="' + this.imgName + '" class="card-img-top" alt="...">' +
        '<div class="card-body">' +
        '<p class="card-text questions">'+ this.question +'</p> ' +
          '</div>' +
          '</div>'+

      
        // '<img class="img-thumbnail" src=Q"' + this.imgName + '">' +
        '<div class="answer" id="question-' + this.questionIndex + '">' + '</div>'
      return displayQ;
    };
    displayAnswers() {
      let answerQ = '<div class="answer-box>"' +
        '<ul class="list-group answers">' +
        '<li class="list-group-item">' + this.answer1 + '</li>' +
        '<li class="list-group-item">' + this.answer2 + '</li>' +
        '<li class="list-group-item">' + this.answer3 + '</li>' +
        '<li class="list-group-item">' + this.answer4 + '</li>' +
        '</ul>' + '</div>'

      return answerQ;
    };
    displayCorrectAnswer() {
      let correctAnswerQ = '<div class="answer">' + this.correctAnswer + '</div>' +
        '<img class="img-thumbnail" src=A"' + this.imgName + '.png">' +
        '<div class="answer" id="answer-' + this.questionIndex + '">' + '</div>'
        console.log(correctAnswerQ);
        return correctAnswerQ;
    };

  }//class Questions

   // constructor(q, a1, a2, a3, a4, ca, img, index) 
   let q1 = new gameQuestion('How many U.S. states border the Gulf of Mexico?', '8', '4', '1', '5', 'd', './assets/images/questions/Q1.png', 's1s');
   let q2 = new gameQuestion('What is allspice alternatively known as?', 'Pimento', 'Grain', 'Filiment', 'Cinnamon', 'a', './assets/images/questions/Q2.png', 's2d');
   let q3 = new gameQuestion('What is the world’s longest river?', 'Nile', 'Amazon', 'Colorado', 'Sahara', 'b', './assets/images/questions/Q3.png', 's3f');
   let q4 = new gameQuestion('What is the world’s largest ocean?', 'Pacific', 'Antarctic', 'Yellow', 'Indiana', 'a', './assets/images/questions/Q4.png', 's4g');
   let q5 = new gameQuestion('Which country is Prague in?', 'Romania', 'Italy', 'Georgia', 'Czech Republic', 'd', './assets/images/questions/Q5.png', 's5h');
   let q6 = new gameQuestion('What does the N stand for in NATO?', 'National', 'North', 'Negative', 'New', 'b', './assets/images/questions/Q6.png', 's6j');
  
   const questionsArr = [q1, q2, q3, q4, q5, q6];

   

   function gameSetup(){
    var quesDiv;
    for (let i in questionsArr) {
      quesDiv = $(questionsArr[i].displayQuestion()+questionsArr[i].displayAnswers());
      // quesDiv += $(questionsArr[i].displayAnswers());
      
      quesDiv.appendTo("#right-game");
    }
  }


   function displayQ(){
  
  }


   function displayA(){
  
  }


   function displayCA(){
  
  }


   $('#submit-btn').on("click", function () {
    

  });

  $('#start-btn').on("click", function () {
    
    gameSetup();

  });

  $('body').on("click", '.list-group-item', function () {
    console.log('selected. display result.');
  });




 
});//document ready