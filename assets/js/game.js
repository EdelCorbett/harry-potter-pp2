const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
console.log(choices);
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');




//quiz questions

let questions = [
    {
        question: "What is the name of the potion that allows the drinker to assume the appearance of another person?",
        choice1: "Polyjuice Potion",
        choice2: "Felix Felicis",
        choice3: "Amortentia",
        choice4: "Amortentia",
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
//constants
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        //save the score to local storage
        localStorage.setItem("mostRecentScore", score);
        //go to the end page
        return window.location.assign("end.html");
    }
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
    }
    );
    //remove the question from the array
    availableQuestions.splice(questionIndex, 1);
    console.log(availableQuestions);

    acceptingAnswers = true;
};
//event listener for the choices
choices.forEach(choice => { 
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        //check if the answer is correct

        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        console.log(classToApply);

        if(classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.classList.add(classToApply);

        setTimeout(() => {
        selectedChoice.classList.remove(classToApply);
        getNewQuestion();
        }, 1000);
    });
})
incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};
startGame();