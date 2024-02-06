// jshint esversion: 6
document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const levelOfDifficulty = document.querySelectorAll(".level-selection .choice");
    const takeTriviaBtn = document.querySelector(".take-trivia");
    const multipleChoice = document.querySelectorAll(".multiple-choice .choice");
    const verifyBtn = document.querySelector(".verify-answer");
    const nextTrivia = document.querySelector(".next-trivia");
    const triviaPage = document.querySelector(".trivia-section");
    const howToPlayPage = document.querySelector(".how-to-section");
    const backToLevel = document.querySelector(".back-to-level");
    const scorePage = document.querySelector(".score-section");
    const nbaTrivia = document.querySelector(".nba-trivia");
    const questionPage = document.querySelector(".question-section");


    // Initial setup
    takeTriviaBtn.style.visibility = "hidden";
    takeTriviaBtn.style.opacity = "0";
    nextTrivia.style.display = "none";

    // Variables to track trivia progress
    let questionNumber = 0;
    let questions;
    let score = 0;
    let currentQuestionIndex = 0;
    let currentQuestion;
    let sendAnswer = false;

    // Function to clear answer styles
    const clearAnswers = () => {
        multipleChoice.forEach(choice => {
            choice.classList.remove("choice-selected", "correct-answer", "incorrect-answer");
            choice.style.cursor = "pointer";
        });
    };

    // Function to clear buttons
    const clearBtns = () => {
        verifyBtn.style.display = "block";
        verifyBtn.style.visibility = "hidden";
        nextTrivia.style.visibility = "hidden";
        nextTrivia.style.display = "none";
        nextTrivia.style.opacity = "0";
        takeTriviaBtn.style.visibility = "hidden";
        takeTriviaBtn.style.opacity = "0";
    };

    // Function to reset trivia
    const resetTrivia = () => {
        sendAnswer = false;
        questionNumber = 0;
        triviaPage.classList.remove("hiddenPage");
        triviaPage.style.display = "block";
        questions = {};
        score = 0;
        currentQuestionIndex = 0;
        currentQuestion = "";
        nbaTrivia.textContent = "";
        sendAnswer = false;
        scorePage.style.display = "none"; 
        clearAnswers();
        clearBtns();
        takeTriviaBtn.style.visibility = "hidden";
        takeTriviaBtn.style.opacity = "0";
    };

    // Event listener for back to level button
    backToLevel.addEventListener("click", resetTrivia);

    // Event listeners for difficulty level buttons
    levelOfDifficulty.forEach(choice => {
        choice.addEventListener("click", () => {
            levelOfDifficulty.forEach(cho => cho.classList.remove("choice-selected"));
            choice.classList.toggle("choice-selected");
            takeTriviaBtn.style.visibility = "visible";
            takeTriviaBtn.style.opacity = "1";
        });
    });

   // Event listener for take trivia button
    takeTriviaBtn.addEventListener("click", () => {
    triviaPage.classList.add("hiddenPage");
    howToPlayPage.classList.add("hiddenPage");
    questionPage.classList.remove("hiddenPage");  
    setTimeout(() => {
        triviaPage.style.display = "none";
        howToPlayPage.style.display = "none";
        questionPage.style.display = "block";
    }, 300);

    const selectedLevel = document.querySelector(".choice-selected");
    nbaTrivia.style.visibility = "visible";
    let level = selectedLevel.dataset.info;

    // Set NBA Trivia text and icon based on difficulty level
    nbaTrivia.innerHTML = `<i class="icon"></i><span>${level.charAt(0).toUpperCase() + level.slice(1)}</span>`;
    nbaTrivia.classList.add(`level-${level === "simple" ? 1 : level === "intermediate" ? 2 : level === "advanced" ? 3 : 4}`);

    // Fetch trivia questions based on difficulty level
    fetch(`./resources/trivia/${level}.json`)
        .then(response => response.json())
        .then(data => {
            questions = data;
            showNextQuestion();
        })
        .catch(error => console.error("Error while fetching questions:", error));
});

    // Event listeners for multiple-choice buttons
    multipleChoice.forEach(choice => {
        choice.addEventListener("click", () => {
            if (!sendAnswer) {
                multipleChoice.forEach(cho => cho.classList.remove("choice-selected"));
                choice.classList.toggle("choice-selected");
                verifyBtn.style.visibility = "visible";
                verifyBtn.style.opacity = "1";
            }
        });
    });

    // Event listener for verifying the answer
    verifyBtn.addEventListener("click", () => {
        sendAnswer = true;
        multipleChoice.forEach(cho => cho.style.cursor = "not-allowed");
        verifyBtn.style.display = "none";
        nextTrivia.style.visibility = "visible";
        nextTrivia.style.display = "block";
        nextTrivia.style.opacity = "1";

        const answer = document.querySelector(".multiple-choice .choice-selected");

        // Check if the selected answer is correct
        if (answer.textContent === currentQuestion.answer) {
            answer.classList.add("correct-answer");
            score++;
        } else {
            answer.classList.add("incorrect-answer");
            // Highlight the correct answer
            multipleChoice.forEach(choice => {
                if (choice.textContent === currentQuestion.answer) {
                    choice.classList.add("correct-answer");
                }
            });
        }
    });

    // Event listener for moving to the next trivia
    nextTrivia.addEventListener("click", () => {
        if (currentQuestionIndex + 1 === questions.questions.length) {
            questionPage.style.display = "none";
            scorePage.style.display = "block";
            scorePage.style.visibility = "visible";
            document.querySelector(".score").textContent = score;
            return;
        }
        currentQuestionIndex++;
        clearBtns();
        sendAnswer = false;
        multipleChoice.forEach(cho => cho.style.cursor = "pointer");
        showNextQuestion();
    });

    // Function to display the next question
    const showNextQuestion = () => {
        clearAnswers();

        takeTriviaBtn.style.visibility = "hidden";
        takeTriviaBtn.style.opacity = "0";

        if (questions && questions.questions && questions.questions.length > currentQuestionIndex) {
            const questionData = questions.questions[currentQuestionIndex];

            if (questionData) {
                currentQuestion = questionData;

                // Update the question number
                questionNumber++;
                const questionNumberElement = document.querySelector(".question-section h3 span");
                if (questionNumberElement) {
                    questionNumberElement.textContent = `${questionNumber}/${questions.questions.length}`;
                }

                const questionText = document.querySelector(".question-section .question-text");

                if (questionText) {
                    questionText.textContent = currentQuestion.question;
                }

                const choices = document.querySelectorAll(".multiple-choice .choice");

                // Reset the display property to 'block' for each choice
                choices.forEach((choice, index) => {
                    choice.style.display = "block";
                    choice.textContent = currentQuestion.options[index];
                });
            } else {
                console.error("Error loading current question.");
            }
        } else {
            console.log("Quiz concluded!");
        }
    };

});

