document.addEventListener("DOMContentLoaded", function () {
    const quizContainer = document.getElementById("quiz-container");
    const currentScoreElement = document.getElementById("current-score");
    const questionsRemainingElement = document.getElementById("questions-remaining");
    
    let totalQuestions = 0;
    let answeredQuestions = 0;
    let score = 0;

    // Questions for each lesson
    const questions = {
        "lesson-math-1": [
            {
                question: "What is 2 + 2?",
                options: ["3", "4", "5"],
                correct: "4"
            },
            {
                question: "Solve for x: 3x = 12",
                options: ["2", "4", "6"],
                correct: "4"
            }
        ],
        "lesson-math-2": [
            {
                question: "How many sides does a triangle have?",
                options: ["2", "3", "4"],
                correct: "3"
            },
            {
                question: "What is the sum of interior angles in a quadrilateral?",
                options: ["180°", "360°", "540°"],
                correct: "360°"
            }
        ],
        "lesson-science-1": [
            {
                question: "What force pulls objects down to Earth?",
                options: ["Friction", "Gravity", "Magnetism"],
                correct: "Gravity"
            },
            {
                question: "What is the SI unit of force?",
                options: ["Watt", "Newton", "Joule"],
                correct: "Newton"
            }
        ]
    };

    // Function to display questions
    function displayQuestions(lesson) {
        quizContainer.innerHTML = "";
        quizContainer.style.display = "block";
        score = 0;
        answeredQuestions = 0;
        currentScoreElement.textContent = `Score: ${score}`;

        if (questions[lesson]) {
            totalQuestions = questions[lesson].length;
            questionsRemainingElement.textContent = `Questions: ${answeredQuestions}/${totalQuestions}`;
            
            questions[lesson].forEach((q, index) => {
                const questionDiv = document.createElement("div");
                questionDiv.classList.add("question");
                questionDiv.innerHTML = `<p>Question ${index + 1}: ${q.question}</p>`;

                q.options.forEach(option => {
                    const btn = document.createElement("button");
                    btn.classList.add("option");
                    btn.textContent = option;
                    btn.addEventListener("click", function () {
                        checkAnswer(btn, q.correct, questionDiv);
                    });
                    questionDiv.appendChild(btn);
                });

                quizContainer.appendChild(questionDiv);
            });
        }
    }

    // Function to check the answer
    function checkAnswer(button, correctAnswer, questionDiv) {
        const buttons = questionDiv.querySelectorAll(".option");
        buttons.forEach(btn => btn.disabled = true);

        if (button.textContent === correctAnswer) {
            button.classList.add("correct");
            score++;
            answeredQuestions++;
        } else {
            button.classList.add("wrong");
            answeredQuestions++;
            buttons.forEach(btn => {
                if (btn.textContent === correctAnswer) {
                    btn.classList.add("correct-answer");
                }
            });
        }

        currentScoreElement.textContent = `Score: ${score}`;
        questionsRemainingElement.textContent = `Questions: ${answeredQuestions}/${totalQuestions}`;
        
        // Add progress animation
        currentScoreElement.style.transform = "scale(1.1)";
        setTimeout(() => {
            currentScoreElement.style.transform = "scale(1)";
        }, 200);
    }

    // Event listeners for lesson selection
    document.querySelectorAll(".lesson-link").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const lessonId = this.getAttribute("data-lesson");
            displayQuestions(lessonId);
        });
    });
});