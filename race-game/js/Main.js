let canvas;
let canvasContext;
let showWinScreen = false;

let blueCar = new carClass();
let greenCar = new carClass();

window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    loadImages();
}

function startGame() {
    const framesPerSecond = 30;
    setInterval(updateEnvironment, 1000 / framesPerSecond);
    
    setupInput();
    loadCircuit(circuitOneGrid);
}

function loadCircuit(circuit) {
    trackGrid = circuit.map(function(arr) {
        return arr.slice();
    });

    greenCar.start(carTwoPic, "GreenMachine");
    blueCar.start(carOnePic, "BlueStorm");
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
    greenCar.move();
    blueCar.move();
}

function drawEverything() {
    //winning condition
    if (showWinScreen) {
        canvasContext.fillStyle = 'white';
        canvasContext.fillText('You won! Click to continue', 350, 300);
        return;
    }
    drawTracks();
    greenCar.draw();
    blueCar.draw();
}

function restartGame(event) {
    if (showWinScreen === true) {
        greenCar.reset();
        blueCar.reset();
        showWinScreen = false;
    }
}
