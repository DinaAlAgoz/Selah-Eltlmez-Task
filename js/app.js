var wronganswer = document.getElementById("wronganswer");
var correctans=document.getElementById("correctans");


const Startquiz = document.querySelector('.start');
const tryAgain = document.querySelector('.tryAgain');

const GoHome = document.querySelector('.goHome');

const questionNumber = document.querySelector('.question-number');
const questionText = document.querySelector('.question-text');
const optionContainer = document.querySelector('.option-container');
const answerIndicatorContainer = document.querySelector('.answers-indicator');
const homeBox = document.querySelector('.home-box');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');




let questionCounter =0;
let currentQuestion;
let avalibaleQuestion = [];
let avalibaleOptions = [];

let correctAnswers = 0;

let attempt = 0;







 // push the questions into avalibaleQuestion Array

function setavalibaleQuestion (){

    const totalQuestion = quiz.length;
    for (let i =0 ; i <totalQuestion; i++) {

        avalibaleQuestion.push(quiz[i]);
    }
}

//set question num and qustions options

function getNewQuestion(){

    questionNumber.innerHTML = "الاسئلة " +  (questionCounter + 1) + " الى " + quiz.length;

    //Set question text
    //random question with a refreash page 

    const questionIndex = avalibaleQuestion[Math.floor(Math.random() * avalibaleQuestion.length)];

    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;
    
    
    // lmna3 tkrar el questions and get the postion of qindex
    const index1 = avalibaleQuestion.indexOf(questionIndex);

    //remove the auestionindex from array that the question does not repeat it self
    avalibaleQuestion.splice(index1,1);
     
    // set options
    //get the length of options
     
    const optionLen = currentQuestion.options.length;
    
    //push options into avalablesoptions arrays
    for (let i=0; i<optionLen; i++) {

        avalibaleOptions.push(i)
    }
    optionContainer.innerHTML = '';

    let animationDelay = 0.2

    //create options in the HTML

    for(let i =0; i <optionLen; i++) {
       
       
        const optionIndex = avalibaleOptions[Math.floor(Math.random() * avalibaleOptions.length)];
        // get the postion of indexOption
        const index2 = avalibaleOptions.indexOf(optionIndex)
        // remove the optionindex from Arrays and does not repeat it selfff
        avalibaleOptions.splice(index2,1);
        
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id =optionIndex ;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.2;
        option.className = "option";
        optionContainer.appendChild(option);
        option.setAttribute("onclick", 'getResult(this)');
    }

    
     questionCounter ++
}

// get the resultss with the click

function getResult(element){

const id = parseInt(element.id);

 if (id === currentQuestion.answer){

    //set the green color to correct answer
    element.classList.add("correct");
    
    //add the indicator correct
    updateAnswerIndicator("correct");

    correctAnswers++;
    
    correctans.play();
  

    console.log("correct: " +correctAnswers );

}

else {

    element.classList.add("wrong");

      //add the indicator incorrect
    updateAnswerIndicator("wrong");

    wronganswer.play();

    
    // if the answer is not correct then will show the correct answer 
    
    const optionLen = optionContainer.children.length;

    for (let i =0; i<optionLen; i ++) {

        if (parseInt(optionContainer.children[i].id) == currentQuestion.answer) {


            optionContainer.children[i].classList.add("correct");



        }
    }
}

attempt++;

unclickableOptions();

}
 
// make all the options unclickable when i click one of the options
 function unclickableOptions(){

 
    const optionLen = optionContainer.children.length;

    for (let i=0; i<optionLen; i++) {
     
        optionContainer.children[i].classList.add("aleray-answered");

    }

}


function  answersIndicator(){

    answerIndicatorContainer.innerHTML = '' ;

    const totalQuestions = quiz.length;

    for(let i = 0 ; i <totalQuestions; i++) {

        const indicator = document.createElement("div");
        answerIndicatorContainer.appendChild(indicator);
    }
}


 function updateAnswerIndicator(markType){

    answerIndicatorContainer.children[questionCounter - 1].classList.add(markType)

 }





function next()
{

    if (questionCounter == quiz.length ) {

        console.log('quizover');
        quizOver();
    }

    else {

        getNewQuestion();
    }
}

    function quizOver(){
  

    //hidde quiz box

    quizBox.classList.add('hide');

    // show resultnox
     
    resultBox.classList.remove('hide');
    quizResult();

 }

 function statquiz(){


   

    quizBox.classList.remove('hide');


    homeBox.classList.add('hide');

  

 }


 function tryAgianQuiz(){
 
   
   

 }

 // to get the quiz result

 function quizResult() {
  
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-incorrect").innerHTML = attempt - correctAnswers;
    const percentage = (correctAnswers/quiz.length) *100;
    resultBox.querySelector(".total-precentage").innerHTML = percentage.toFixed(2) + "%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + "/ " + quiz.length;
 }



window.onload = function () {

    //first we will set all the questions in arrays
    setavalibaleQuestion();

   

    //secound we will call getNewQuestions()function
    getNewQuestion();
     
    // to create the indecator of the answers
    answersIndicator();


}


