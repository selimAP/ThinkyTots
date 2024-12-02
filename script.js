// Initialisiere Lenis für Smooth Scrolling
const lenis = new Lenis({
    duration: 1.8, // Dauer für sanftes Scrollen
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Trägheitseffekt
    smooth: true, // Aktiviert sanftes Scrollen
    smoothTouch: true, // Auch auf Touch-Geräten aktivieren
  });
  
  // Animations-Frame mit Lenis synchronisieren
  function raf(time) {
    lenis.raf(time); // Lenis Scroll aktualisieren
    requestAnimationFrame(raf); // Wiederholen
  }
  
  requestAnimationFrame(raf);
  