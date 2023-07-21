const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
console.log(choices);
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');
const username = document.getElementById("username");
const saveScore = document.getElementById("saveScore");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const highScoresList = document.getElementById("highScoresList");
const resultDiv = document.getElementById("result");
const highScoreContainerDiv = document.querySelector(".high-score-container");

//constants
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 10;
const MAX_HIGH_SCORES = 5;

// let variables
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
//update the score
finalScore.innerText = mostRecentScore;


let questions = [{
        question: "What is the name of the potion that allows the drinker to assume the appearance of another person?",
        choice1: "Polyjuice Potion",
        choice2: "Felix Felicis",
        choice3: "Amortentia",
        choice4: "Person Potion ",
        answer: "1",
    },
    {
        question: "What is the name of Harry Potter's owl?",
        choice1: "Gryffindor",
        choice2: "Ron",
        choice3: "Hedwig",
        choice4: "Albus Dumbledore",
        answer: "3",
    },
    {
        question: "Who is the ghost who haunts the girls' bathroom at Hogwarts?",
        choice1: "Jenny Weasley",
        choice2: "Moaning Myrtle",
        choice3: "Hermonie Granger",
        choice4: "Luna Lovegood",
        answer: "2",
    },
    {
        question: "What is Lord Voldemort's real name?",
        choice1: "Albus Dumbledore",
        choice2: "Barty Crouch",
        choice3: "Dean Thomas",
        choice4: "Tom Riddle",
        answer: "4",
    },
    {
        question: "Which position does Harry Potter play in Quidditch?",
        choice1: " Keeper",
        choice2: "Chaser",
        choice3: "Seeker",
        choice4: "Mascot",
        answer: "3",
    },
    {
        question: "Who is Harry Potter's best friend?",
        choice1: "Ron Weasley",
        choice2: "Neville Longbottom",
        choice3: "Draco Malfoy",
        choice4: "Sirius Black",
        answer: "1",
    },
    {
        question: "What is the name of the three-headed dog that guards the Philosopher's Stone?",
        choice1: "Fluffy",
        choice2: "Fang",
        choice3: "Norbert",
        choice4: "Hedwig",
        answer: "1",
    },
    {
        question: "Who wrote the Harry Potter books?",
        choice1: "Jk Rowling",
        choice2: "Harry Potter",
        choice3: "Stephen King",
        choice4: "Remus Lupin",
        answer: "1",
    },
    {
        question: "What is the name of the wizarding bank?",
        choice1: "Azkaban",
        choice2: "Hogwarts",
        choice3: "Diagon Alley",
        choice4: "Gringotts",
        answer: "4",
    },
    {
        question: "What is the name of the wizarding prison?",
        choice1: "Wommig Willow",
        choice2: "Azkaban",
        choice3: "Hogwarts",
        choice4: "Diagon Alley",
        answer: "2",
    },
    {
        question: "What is the name of the magical plant that screams when it is uprooted?",
        choice1: "Mandrake",
        choice2: "Whomping Willow",
        choice3: "Devil's Snare",
        choice4: "Gillyweed",
        answer: "1",
    },
    {
        question: "How many books are in the Harry Potter series?",
        choice1: "5",
        choice2: "6",
        choice3: "7",
        choice4: "8",
        answer: "3",
    },
    {
        question: "What is the name of the Weasley's house?",
        choice1: "The Burrow",
        choice2: "Tree House",
        choice3: "Weasley Manor",
        choice4: "Weasley Cottage",
        answer: "1",
    },
    {
        question: "What is the name of the wizarding school?",
        choice1: "Platform 9 3/4",
        choice2: "Hogwarts",
        choice3: "Diagon Alley",
        choice4: "Gringotts",
        answer: "2",
    }

];

//start the game

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
};

//get a new question

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        //save the score to local storage
        localStorage.setItem("mostRecentScore", score);

        return;
    }
    //increment the question counter
    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

    //randomly select a question
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);

    currentQuestion = availableQuestions[questionIndex];
    //display the question 
    question.innerText = currentQuestion.question;


    //display the choices

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });
    //remove the question from the array
    availableQuestions.splice(questionIndex, 1);
    console.log(availableQuestions);

    acceptingAnswers = true;
};
//event listener for the choices
choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        //check if the answer is correct

        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        console.log(classToApply);
        //if the answer is correct, add 1 point to the score
        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }
        selectedChoice.classList.add(classToApply);
        //set a time out for the next question
        setTimeout(() => {
            selectedChoice.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });


})
//increment score
incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};
startGame();

//game countdown timer
function startTimer(duration, display) {
    let timer = duration;
    // Update the timer every second
    const countdownInterval = setInterval(function () {
        display.textContent = timer;
        timer--;
        // If the timer reaches 0, display this  message
        if (timer < 0) {
            clearInterval(countdownInterval);
            display.textContent = ' Game Over!';

        }
    }, 1000); // Update the timer by 1 every second
}
// Start the timer when the window loads

window.onload = function () {
    const display = document.getElementById('timer');
    startTimer(60, display); // 60 seconds timer
};


username.addEventListener("keyup", () => {
    saveScore.disabled = !username.value;
    console.log(username.value);
});
saveHighScore = e => {
    console.log("clicked the save button!");
    e.preventDefault();
    const score = {
        score: Math.floor(Math.random() * 10),
        name: username.value
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);
    localStorage.setItem("highScores", JSON.stringify(highScores));


    resultDiv.removeAttribute("hidden");
    questionContainer.setAttribute("hidden", true);
    highScoreContainerDiv.setAttribute("hidden", true);
    questionContainer.setAttribute("hidden", true);

};

saveScore.addEventListener("click", saveHighScore);

// update high scores list by mapping through the high scores array creating a list item 
highScoresList.innerHTML = highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
}).join("");

// clear high scores
function clearHighScores() {
    localStorage.removeItem("highScores");

    highScores.length = 0;
    highScoresList.innerHTML = "";
}