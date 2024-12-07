document.addEventListener("DOMContentLoaded", () => {
    const numberButtons = document.querySelectorAll(".sortit-button-selection button");
    const correctSoundPath = "../sounds/correct.mp3";
    const wrongSoundPath = "../sounds/wrong.wav";
    const winSoundPath = "../sounds/win.wav";
    let numbers = [];
    let currentNumber = 1;
    let winSoundPlayed = false;

    function playAudio(path, callback) {
        const audio = new Audio(path);
        audio.play().then(() => {
            if (callback) {
                audio.onended = callback;
            }
        });
    }

    function generateRandomNumbers() {
        const uniqueNumbers = new Set();
        while (uniqueNumbers.size < 8) {
            uniqueNumbers.add(Math.floor(Math.random() * 100) + 1);
        }
        return Array.from(uniqueNumbers).sort(() => Math.random() - 0.5);
    }

    function renderNumbers() {
        numbers = generateRandomNumbers();
        currentNumber = Math.min(...numbers);
        winSoundPlayed = false;

        numberButtons.forEach((button, index) => {
            if (numbers[index] !== undefined) {
                button.textContent = numbers[index];
                button.disabled = false;
                button.style.backgroundColor = "";
            } else {
                button.textContent = "";
                button.disabled = true;
            }
        });
    }

    function startNewRound() {
        if (!winSoundPlayed) {
            playAudio(winSoundPath, () => {
                launchConfetti();
            });
            winSoundPlayed = true;
        }

        setTimeout(() => {
            renderNumbers();
        }, 3000);
    }

    function handleButtonClick(button, number) {
        if (number === currentNumber) {
            button.style.backgroundColor = "green";
            playAudio(correctSoundPath);
            button.disabled = true;
            currentNumber = Math.min(...numbers.filter(n => n > currentNumber));

            if (!numbers.some(n => n > currentNumber)) {
                setTimeout(() => {
                    launchConfetti();
                    startNewRound();
                }, 500);
            }
        } else {
            button.style.backgroundColor = "red";
            playAudio(wrongSoundPath);
            setTimeout(() => {
                renderNumbers();
            }, 1000);
        }
    }

    function launchConfetti() {
        const duration = 2000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 10,
                spread: 60,
                origin: { x: 0.5, y: 0.5 },
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        })();
    }

    function gameLoop() {
        renderNumbers();

        numberButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const number = parseInt(button.textContent, 10);
                handleButtonClick(button, number);
            });
        });
    }

    gameLoop();
});
