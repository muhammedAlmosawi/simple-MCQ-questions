document.addEventListener("DOMContentLoaded", function () {
    const quizContainer = document.getElementById("quiz-container");

    // Questions for each lesson
    const questions = {
        "lesson-math-1": [
            {
                question: "What is 2 + 2?",
                options: ["3", "4", "5"],
                correct: "4"
            }
        ],
        "lesson-math-2": [
            {
                question: "How many sides does a triangle have?",
                options: ["2", "3", "4"],
                correct: "3"
            }
        ],
        "lesson-science-1": [
            {
                question: "What force pulls objects down to Earth?",
                options: ["Friction", "Gravity", "Magnetism"],
                correct: "Gravity"
            }
        ]
    };

    // Function to display questions
    function displayQuestions(lesson) {
        quizContainer.innerHTML = ""; // Clear previous questions
        quizContainer.style.display = "block"; // Show the container

        if (questions[lesson]) {
            questions[lesson].forEach(q => {
                const questionDiv = document.createElement("div");
                questionDiv.classList.add("question");
                questionDiv.innerHTML = `<p>${q.question}</p>`;

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

        // Disable all buttons after selection
        buttons.forEach(btn => btn.disabled = true);

        if (button.textContent === correctAnswer) {
            button.classList.add("correct"); // Correct: Green
        } else {
            button.classList.add("wrong"); // Wrong: Red

            // Highlight the correct answer in orange
            buttons.forEach(btn => {
                if (btn.textContent === correctAnswer) {
                    btn.classList.add("correct-answer");
                }
            });
        }
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
