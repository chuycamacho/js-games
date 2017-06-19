const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

let keyHeld_Gas = false;
let keyHeld_Reverse = false;
let keyHeld_TurnLeft = false;
let keyHeld_TurnRight = false;

let mouseX;
let mouseY;

function setupInput() {
    canvas.addEventListener('mousedown', restartGame);
    document.addEventListener('keydown', keyPressed);
    document.addEventListener('keyup', keyReleased);
}

function keyPressed(event) {
    if (event.keyCode == KEY_LEFT_ARROW) {
        keyHeld_TurnLeft = true;
    } else if (event.keyCode == KEY_RIGHT_ARROW) {
        keyHeld_TurnRight = true;
    } else if (event.keyCode == KEY_UP_ARROW) {
        keyHeld_Gas = true;
    } else if (event.keyCode == KEY_DOWN_ARROW) {
        keyHeld_Reverse = true;
    }
    event.preventDefault();
}

function keyReleased(event) {
    if (event.keyCode == KEY_LEFT_ARROW) {
        keyHeld_TurnLeft = false;
    } else if (event.keyCode == KEY_RIGHT_ARROW) {
        keyHeld_TurnRight = false;
    } else if (event.keyCode == KEY_UP_ARROW) {
        keyHeld_Gas = false;
    } else if (event.keyCode == KEY_DOWN_ARROW) {
        keyHeld_Reverse = false;
    }
    event.preventDefault();
}

function calculateMousePosition(event) {
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;
    mouseX = event.clientX - rect.left - root.scrollLeft;
    mouseY = event.clientY - rect.top - root.scrollTop;

    // carOnePositionX = mouseX;
    // carOnePositionY = mouseY;
    // carOneSpeed = 3;
    // carOneSpeedY = -4;

    return {
        x: mouseX,
        y: mouseY
    };
}