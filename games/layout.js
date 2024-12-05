    document.addEventListener("DOMContentLoaded", () => {

    const headGames = `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="../games.css">
    <link rel="icon" href="../../images/ThinkyTots.png">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Indie+Flower&family=Patrick+Hand&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">

    <script src="https://unpkg.com/lenis@1.1.16/dist/lenis.min.js"></script> 
    `;
    document.head.insertAdjacentHTML('beforeend', headGames);

    const headerGames = `
        <div class="header">
            <a href="../..">ThinkyThots</a>
        </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', headerGames);

    const footerGames = `
        <footer>
            <div class="footer">
                <a href="https://github.com/selimAP" target="_blank">Built and designed by selimAP.</a>
                <a href="https://minihackathon.de/" target="_blank">This site was created during the Minihackathon 2.0 hosted by Kevin Chromik.</a>
                <p>All rights reserved. ©</p>
            </div>
        </footer>
    `;
    document.body.insertAdjacentHTML('beforeend', footerGames);
});