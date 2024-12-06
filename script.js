const lenis = new Lenis({
    duration: 1.8,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

document.addEventListener("DOMContentLoaded", () => {
    const containers = document.querySelectorAll(".container");
    let audioInitialized = false;
    const audio = new Audio("./sounds/button-hover.ogg");

    // Initialisiere Audio durch Benutzerinteraktion
    document.addEventListener("click", () => {
        if (!audioInitialized) {
            audio.play().then(() => {
                audio.pause();
                audio.currentTime = 0; // Zurücksetzen für spätere Nutzung
                audioInitialized = true;
                console.log("Audio initialized successfully!");
            }).catch(error => {
                console.error("Audio initialization failed:", error);
            });
        }
    });

    // Event-Listener für Hover
    containers.forEach(container => {
        container.addEventListener("mouseenter", () => {
            if (audioInitialized) {
                audio.currentTime = 0; // Startet das Audio von Anfang
                audio.play().catch(error => {
                    console.error("Audio playback error:", error);
                });
            }
        });
    });
});
