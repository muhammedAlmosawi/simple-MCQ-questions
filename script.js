document.addEventListener("DOMContentLoaded", function () {
    // Select all answer buttons
    const buttons = document.querySelectorAll(".option");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            let selectedText = this.innerText.trim(); // Get text and remove spaces
            let correctAnswer = this.getAttribute("data-answer").trim(); // Get correct answer

            let parentDiv = this.parentElement;
            let allButtons = parentDiv.querySelectorAll(".option");

            // Disable all buttons after answering
            allButtons.forEach(btn => btn.disabled = true);

            if (selectedText === correctAnswer) {
                this.classList.add("correct"); // Green if correct
            } else {
                this.classList.add("wrong"); // Red if incorrect
                allButtons.forEach(btn => {
                    if (btn.innerText.trim() === correctAnswer) {
                        btn.classList.add("correct-answer"); // Highlight correct answer
                    }
                });
            }
        });
    });
});
