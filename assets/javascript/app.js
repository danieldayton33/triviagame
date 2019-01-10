
var rightAnswers = 0;
var wrongAnswers = 0;
var unAnswered = 0;
var startTime;
var countAmt; 
var interval;
var questionIndex = 0;
var qIndex = 0;
var answerChoosen = false;
var questionAdded = false;
var gameFinished = false;
var gameStarted = false;
var questions = [
    {
        question: "Which director has won the most Academy Awards?",
        answer1: "Francis Ford Coppola",
        answer2: "Stanley Kubrick",
        answer3: "Howard Hughes",
        answer4: "John Ford",
        correctAns: "John Ford",
        correctAnsIndex: 4,
        image: "assets/images/tumblr_ly26mrghi61qj71muo2_500.gif"
    },
    {
        question: "Which movie contains the longest tracking shot?",
        answer1: "The Player",
        answer2: "Snake Eyes",
        answer3: "Russian Ark",
        answer4: "Weekend",
        correctAns: "Russian Ark",
        correctAnsIndex: 3,
        image: "assets/images/russian ark.gif"
    },
    {
        question: "Marion Robert Morrison is the given name of ________",
        answer1: "Cary Grant",
        answer2: "John Wayne",
        answer3: "Sidney Poitier",
        answer4: "Kirk Douglas",
        correctAns: "John Wayne",
        correctAnsIndex: 2,
        image: "assets/images/johnwayne.gif"
    },
    {
        question: "What was the first Quentin Tarintino screenplay to become a movie?",
        answer1: "Reservoir Dogs",
        answer2: "True Romance",
        answer3: "Pulp Fiction",
        answer4: "Kill Bill",
        correctAns: "True Romance",
        correctAnsIndex: 2,
        image: "assets/images/true romance.gif"
    },
    {
        question: "Who played the lead in 'Rebel Without a Cause'?",
        answer1: "Marlon Brando",
        answer2: "Steve McQueen",
        answer3: "James Dean",
        answer4: "Clint Eastwood",
        correctAns: "James Dean",
        correctAnsIndex: 3,
        image: "assets/images/rebelwithout.gif"
    },
    {
        question: "What was the first movie with 'Brat Pack'?",
        answer1: "The Outsiders",
        answer2: "16 Candles",
        answer3: "Pretty in Pink",
        answer4: "Red Dawn",
        correctAns: "The Outsiders",
        correctAnsIndex: 1,
        image: "assets/images/outsiders.gif"
    },
    {
        question: "Who was the first director to be attached to a film adaptation of 'Dune'?",
        answer1: "David Lynch",
        answer2: "David Cronenberg",
        answer3: "Steven Spielberg",
        answer4: "Alejandro Jodorowsky",
        correctAns: "Alejandro Jodorowsky",
        correctAnsIndex: 4,
        image: "assets/images/dune.gif"
    },
    {
        question: "What are the animals names in Homeward Bound?",
        answer1: "Autumn, Violet, Rocco",
        answer2: "Rex, Fluffy, Bo",
        answer3: "Shadow, Sassy, Chance",
        answer4: "Josh, Franchesca, Spot",
        correctAns: "Shadow, Sassy, Chance",
        correctAnsIndex: 3,
        image: "assets/images/homeward bound.gif"
    },
    {
        question: "Which actor was also an accomplished racecar driver?",
        answer1: "Michael Douglas",
        answer2: "Steve McQueen",
        answer3: "Paul Newman",
        answer4: "Robert Redford",
        correctAns: "Steve McQueen",
        correctAnsIndex: 2,
        image: "assets/images/mcqueen.gif"
    },
    {
        question: "What was the name of the insurance salesman in 'Groundhog Day'?",
        answer1: "Tim Myers",
        answer2: "Ned Ryerson",
        answer3: "Toby Flenderson",
        answer4: "Robert Redford",
        correctAns: "Sturgil McCuthers",
        correctAnsIndex: 2,
        image: "assets/images/groundhogday.gif"
    },
    {
        question: "Where was Audrey Hepburn born?",
        answer1: "France",
        answer2: "California",
        answer3: "Belgium",
        answer4: "Switzerland",
        correctAns: "Belgium",
        correctAnsIndex: 3,
        image: "assets/images/hepburn.gif"
    }
]

$(document).ready(function() {
    

    function now() {
      return ((new Date()).getTime());
    }
    
    function tick() {
      var elapsed = now() - startTime;
      var cnt = countAmt - elapsed;
      var elem = $("#timer");
      if (cnt > 0) {
        elem.text(Math.round(cnt / 1000));
      } else {
        clearInterval(interval);
        $("#timer").text(0);
        clearDivs();
        $("#ans1").text(questions[questionIndex].correctAns);
            $("#question").text("You ran out of time!");
            addImage();
            unAnswered ++;
            questionAdded = false;
            // questionIndex ++;
            setTimeout(addQuestion, 5000);  
      }
    }
    
    function startTimer(secs) {
      clearInterval(interval);
      $("#timer").text(secs);
      countAmt = secs * 1000;
      startTime = now();
      interval = setInterval(tick, 1000);  
    }
    function clearDivs (){
        $("#question").empty();
        $("#ans1").empty();
        $("#ans2").empty();
        $("#ans3").empty();
        $("#ans4").empty();
        $("#retry").empty();
        $("#pic").empty();
        $("#answer").empty();
        $("#answer2").empty();
        
    }
    function firstQuestion(){
        startTimer(30);
        $("#question").text(questions[questionIndex].question);
        $("#ans1").text(questions[questionIndex].answer1);
        $("#ans2").text(questions[questionIndex].answer2);
        $("#ans3").text(questions[questionIndex].answer3);
        $("#ans4").text(questions[questionIndex].answer4);
            questionAdded = true;
            answerChoosen = false;
        getAnswer();
    }
    function addQuestion (){
       if(!questionAdded){
        questionIndex ++;
        if(questionIndex <= (questions.length-1)){
            clearDivs();
            startTimer(30);
            $("#question").text(questions[questionIndex].question);
            $("#ans1").text(questions[questionIndex].answer1);
            $("#ans2").text(questions[questionIndex].answer2);
            $("#ans3").text(questions[questionIndex].answer3);
            $("#ans4").text(questions[questionIndex].answer4); 
            questionAdded = true;
            answerChoosen = false;
            getAnswer();
        }
        else {
            answerChoosen = true;
            questionAdded = true;
            gameFinished = true;
            $("#timer").empty();
            clearDivs();
            var resetButton = $("<div>");
            resetButton.addClass("button");
            resetButton.text("Retry");
            $("#question").text("That's the end of the game!");
            $("#answer").text("Correct Answers: " + rightAnswers);
            $("#answer2").text("Wrong Answers: " + wrongAnswers);
            $("#pic").text("Unanswered Questions: " + unAnswered);
            $("#retry").append(resetButton);
            
            resetButton.on("click", function(){
                clearDivs();
                restartGame();
            });
             } 
            } else {
                return false;
            }
        }
    function getAnswer (){
        // $(".answer").unbind('mouseenter mouseleave');
            $(".answer").on("click", function(){
                if(questionAdded && !answerChoosen){
                clearInterval(interval);
                
                var playerAnswer = $(this);
                // $("#game-play").empty();
                qIndex = parseInt(playerAnswer.attr('index'));
                answerChoosen = true;
                clearDivs();
                checkAnswer();
                }else {
                    return false;
                }
            });
        }
    function checkAnswer(){
            if(answerChoosen){    
            if(qIndex === questions[questionIndex].correctAnsIndex){
                        rightAnswers ++;    
                        $("#timer").empty(); 
                        clearDivs();
                        $("#question").text("You're right!");
                        $("#answer").text(questions[questionIndex].correctAns);
                        addImage();
                    }
                    else{
                        wrongAnswers ++;
                        $("#timer").empty();
                        clearDivs();
                        $("#question").text("You're Wrong!");
                        $("#answer").text(questions[questionIndex].correctAns);
                        addImage();
                        // addQuestion();
                    }
                questionAdded = false;
                setTimeout(addQuestion, 5000);
                }    
            }
                
        
    function addImage(){
        var answerImage = $("<img>");
        answerImage.addClass("answer-image");
        answerImage.attr("src", questions[questionIndex].image);
        $("#pic").append(answerImage);
    }

function startGame (){
    if(!gameStarted){
    var startDiv = $("<div>");
    startDiv.addClass("button");
    startDiv.text("Start");
    var gamePlay = $("#question");
    var theaterPic = $("<img>");
    theaterPic.addClass("start-pic");
    theaterPic.attr("src", "assets/images/theater.jpg")
    gamePlay.append(startDiv);
    $("#ans1").attr("index", 1);
    $("#ans2").attr("index", 2);
    $("#ans3").attr("index", 3);
    $("#ans4").attr("index", 4);
    $("#pic").append(theaterPic);
    
    startDiv.on("click", function(){
        gameStarted = true;
        clearDivs();
       firstQuestion();
   

        });
    } else {
        return false;
    }
}
    function restartGame(){
        questionAdded = false;
        gameFinshed = false;
        questionIndex = 0;
        rightAnswers = 0;
        wrongAnswers = 0;
        unAnswered = 0;

     firstQuestion();
    }
   startGame(); 
});