document.addEventListener("DOMContentLoaded", () => {

    const buttons = document.querySelectorAll(".buttons button");

    buttons.forEach(button => {
        button.addEventListener("mouseover", () => {
            const audio = new Audio("../../sounds/button-hover.ogg");
            audio.play();
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const animals = [
        "Dog", "Cat", "Horse", "Rabbit", "Hamster", "Budgerigar", "Parrot",
        "Tiger", "Seal", "Wolf", "Lion", "Dolphin",
        "Squirrel", "Red Fox", "Bear", "Rhinoceros", "Hippopotamus"
    ];

    const playSoundButton = document.querySelector(".play-sound button");
    const confirmButton = document.querySelector(".confirm-selection button");
    const animalButtons = document.querySelectorAll(".animal-selection button");
    const animalImage = document.querySelector(".animal-img img");
    const hoverSoundPath = "sounds/button-hover.ogg";
    const correctSoundPath = "../sounds/correct.mp3";
    const wrongSoundPath = "../sounds/wrong.wav";

    let correctAnimal = "";
    let currentAudio = null;
    let isRoundActive = true;

    function getRandomAnimal() {
        return animals[Math.floor(Math.random() * animals.length)];
    }

    function generateNewRound() {
        isRoundActive = true;
        confirmButton.style.backgroundColor = "";
        confirmButton.textContent = "Confirm";
        animalImage.src = "gifs/question.gif";
        correctAnimal = getRandomAnimal();

        const randomAnimals = [correctAnimal];
        while (randomAnimals.length < 3) {
            const randomAnimal = getRandomAnimal();
            if (!randomAnimals.includes(randomAnimal)) {
                randomAnimals.push(randomAnimal);
            }
        }

        randomAnimals.sort(() => Math.random() - 0.5);
        animalButtons.forEach((button, index) => {
            button.textContent = randomAnimals[index];
            button.classList.remove("selected");
        });

    }

    playSoundButton.addEventListener("click", () => {
        if (!isRoundActive) {
            return;
        }

        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }

        const soundPath = `sounds/${correctAnimal.toLowerCase().replace(" ", "")}.wav`;
        currentAudio = new Audio(soundPath);
        currentAudio.play();
    });

    confirmButton.addEventListener("click", () => {
        if (!isRoundActive) {
            generateNewRound();
            return;
        }

        isRoundActive = false;

        const selectedButton = Array.from(animalButtons).find(button =>
            button.classList.contains("selected")
        );

        if (!selectedButton) {
            confirmButton.style.backgroundColor = "orange";
            confirmButton.textContent = "Select an Animal!";
            return;
        }

        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }

        if (selectedButton.textContent === correctAnimal) {
            confirmButton.style.backgroundColor = "#7CFC00";

            const correctAudio = new Audio(correctSoundPath);
            correctAudio.play();
        } else {
            confirmButton.style.backgroundColor = "red";

            const wrongAudio = new Audio(wrongSoundPath);
            wrongAudio.play();
        }

        const animalGifPath = `gifs/${correctAnimal.toLowerCase().replace(" ", "")}.gif`;
        animalImage.src = animalGifPath;

        confirmButton.textContent = "Next";
    });

    animalButtons.forEach(button => {
        button.addEventListener("click", () => {
            animalButtons.forEach(btn => btn.classList.remove("selected"));
            button.classList.add("selected");
        });
    });

    document.body.addEventListener("mouseover", (event) => {
        if (event.target.tagName === "BUTTON") {
            const hoverAudio = new Audio(hoverSoundPath);
            hoverAudio.play();
        }
    });

    generateNewRound();
});
