let canvas;
let canvasContext;
let showWinScreen = false;

let character = new characterClass(PRINCESS_TYPE);

window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    loadImages(character.type);
}

function startGame() {
    const framesPerSecond = 30;
    setInterval(updateEnvironment, 1000 / framesPerSecond);
    
    setupInput();
    loadScenario(scenarioOneGrid);
}

function loadScenario(scenario) {
    worldGrid = scenario.map(function(arr) {
        return arr.slice();
    });

    character.start(characterImage, "The Warrior");
}

function setLoadingScreen() {
    drawRect(0,0,canvas.width, canvas.height, 'black');
    drawText('Loading...',canvas.width/2, canvas.height/2,'white');
}

function updateEnvironment() {
    environmentMovement();
    drawEverything();
}

function environmentMovement() {
    if (showWinScreen) {
        return;
    }
    character.move();
}

function drawEverything() {
    //winning condition
    if (showWinScreen) {
        canvasContext.fillStyle = 'white';
        canvasContext.fillText('You won! Click to continue', 350, 300);
        return;
    }
    drawWorld();
    character.draw();
}

function restartGame(event) {
    if (showWinScreen === true) {
        character.reset();
        showWinScreen = false;
    }
}
