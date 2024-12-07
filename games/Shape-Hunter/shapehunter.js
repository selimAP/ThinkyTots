document.addEventListener("DOMContentLoaded", () => {
    const shapes = [
        { name: "Circle", image: "images/circle.png" },
        { name: "Square", image: "images/square.png" },
        { name: "Triangle", image: "images/triangle.png" },
        { name: "Hexagon", image: "images/hexagon.png" },
        { name: "Pentagon", image: "images/pentagon.png" },
        { name: "Octagon", image: "images/octagon.png" },
        { name: "Ellipse", image: "images/ellipse.png" }
    ];

    const targetShapeDisplay = document.querySelector(".shape-display img");
    const shapeButtons = document.querySelectorAll(".shape-selection .shape-btn");
    const confirmButton = document.querySelector(".confirm-selection button");
    const hoverSoundPath = "../../sounds/button-hover.ogg";
    const correctSoundPath = "../sounds/correct.mp3";
    const wrongSoundPath = "../sounds/wrong.wav";

    let correctShape = "";
    let isRoundActive = true;

    function getRandomShape() {
        return shapes[Math.floor(Math.random() * shapes.length)];
    }

    function generateNewRound() {
        isRoundActive = true;
        confirmButton.textContent = "Confirm";
        confirmButton.style.backgroundColor = "";
        targetShapeDisplay.src = "";

        const randomShape = getRandomShape();
        correctShape = randomShape.name;
        targetShapeDisplay.src = randomShape.image;

        const randomShapes = [randomShape.name];
        while (randomShapes.length < 3) {
            const randomShapeName = getRandomShape().name;
            if (!randomShapes.includes(randomShapeName)) {
                randomShapes.push(randomShapeName);
            }
        }

        randomShapes.sort(() => Math.random() - 0.5);

        shapeButtons.forEach((button, index) => {
            button.textContent = randomShapes[index];
            button.dataset.shape = randomShapes[index];
            button.classList.remove("selected");
        });
    }

    function playAudio(path) {
        const audio = new Audio(path);
        audio.play();
    }

    confirmButton.addEventListener("click", () => {
        if (!isRoundActive) {
            generateNewRound();
            return;
        }

        isRoundActive = false;

        const selectedButton = Array.from(shapeButtons).find(button =>
            button.classList.contains("selected")
        );

        if (!selectedButton) {
            confirmButton.textContent = "Select a Shape!";
            confirmButton.style.backgroundColor = "orange";
            return;
        }

        const selectedShape = selectedButton.dataset.shape;

        if (selectedShape === correctShape) {
            confirmButton.textContent = "Correct!";
            confirmButton.style.backgroundColor = "#7CFC00";
            playAudio(correctSoundPath);
        } else {
            confirmButton.textContent = "Wrong!";
            confirmButton.style.backgroundColor = "red";
            playAudio(wrongSoundPath);
        }
    });

    shapeButtons.forEach(button => {
        button.addEventListener("click", () => {
            shapeButtons.forEach(btn => btn.classList.remove("selected"));
            button.classList.add("selected");
        });
    });

    document.body.addEventListener("mouseover", (event) => {
        if (event.target.tagName === "BUTTON") {
            playAudio(hoverSoundPath);
        }
    });

    generateNewRound();
});
