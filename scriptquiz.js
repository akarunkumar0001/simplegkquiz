const questions = [
    {
        question: "Which is the largest continent?",
        answers: [
            { text: "Asia", correct: true },
            { text: "Europe", correct: false },
            { text: "South America", correct: false },
            { text: "Africa", correct: false },
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Mercury", correct: false },
            { text: "Venus", correct: false },
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
        ]
    },
    {
        question: "Which country has the capital city of Tokyo?",
        answers: [
            { text: "China", correct: false },
            { text: "Japan", correct: true },
            { text: "South Korea", correct: false },
            { text: "Thailand", correct: false },
        ]
    },
    {
        question: "The Eiffel Tower is located in which city?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Paris", correct: true },
            { text: "Madrid", correct: false },
            { text: "Rome", correct: false },
        ]
    },
    {
        question: "Who is the inventor of the light bulb?",
        answers: [
            { text: "Thomas Alva Edison", correct: true },
            { text: "Alexander Graham Bell", correct: false },
            { text: "Nikola Tesla", correct: false },
            { text: "Marie Curie", correct: false },
        ]
    },
    {
        question: "The telephone was invented by?",
        answers: [
            { text: "Guglielmo Marconi", correct: false },
            { text: "Thomas Alva Edison", correct: false },
            { text: "Alexander Graham Bell", correct: true },
            { text: "Nikola Tesla", correct: false },
        ]
    },
    {
        question: "In which year did India gain independence?",
        answers: [
            { text: "1945", correct: false },
            { text: "1947", correct: true },
            { text: "1950", correct: false },
            { text: "1962", correct: false },
        ]
    },
    {
        question: "What is the national currency of India?",
        answers: [
            { text: "Rupee", correct: true },
            { text: "Dollar", correct: false },
            { text: "Yen", correct: false },
            { text: "Euro", correct: false },
        ]
    },
    {
        question: "Which festival is known as the Festival of Lights in India?",
        answers: [
            { text: "Holi", correct: false },
            { text: "Diwali", correct: true },
            { text: "Navratri", correct: false },
            { text: "Eid", correct: false },
        ]
    },
    {
        question: "Which city is famous for the Taj Mahal?",
        answers: [
            { text: "Agra", correct: true },
            { text: "Jaipur", correct: false },
            { text: "Varanasi", correct: false },
            { text: "Lucknow", correct: false },
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

document.addEventListener('DOMContentLoaded', function () {
    const quotes = [
        "The only way to do great work is to love what you do. - Steve Jobs",
        "In three words I can sum up everything I've learned about life: it goes on. - Robert Frost",
        "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
        "The greatest glory in living lies not in never falling, but in rising every time we fall. -Nelson Mandela",
        "The way to get started is to quit talking and begin doing. -Walt Disney"
    ];

    const quoteElement = document.getElementById('quote');

    function displayRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteElement.textContent = quotes[randomIndex];
    }

    displayRandomQuote();
});

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.textContent = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct){
            button.dataset.correct=answer.correct
        }
        button.addEventListener("click", selectAnswer) 
    });
}
function resetState(){
    nextButton.style.display="None";
    while (answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect){
        selectedBtn.classList.add("Correct");
        score++;
    }
    else{
        selectedBtn.classList.add("Incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true"){
            button.classList.add("Correct");
        }
        button.disabled = true;
    })
    nextButton.style.display="block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        quizEnd();
    }
}
nextButton.addEventListener("click",() => {
    if (currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})
function quizEnd() {
    resetState();
    questionElement.textContent = `Quiz Complete! Your score is ${score}/${questions.length}`;
    nextButton.innerHTML = 'Play Again';
    nextButton.style.display = "block";
}
function exitApp() {
    const confirmExit = confirm("Are you sure you want to exit the quiz?");
    
    if (confirmExit) {
        window.close(); // You can customize this action based on your requirements
    }
}
startQuiz();
