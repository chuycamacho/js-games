const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const KEY_W = 87;
const KEY_D = 68;
const KEY_S = 83;
const KEY_A = 65;

let mouseX;
let mouseY;

function setupInput() {
    canvas.addEventListener('mousedown', restartGame);
    document.addEventListener('keydown', keyPressed);
    document.addEventListener('keyup', keyReleased);

    blueCar.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW);
    greenCar.setupInput(KEY_W, KEY_D, KEY_S, KEY_A);
}

function setKeyHeldFlag(car, value, event) {
    if (event.keyCode == car.controlKeyLeft) {
        car.keyHeld_TurnLeft = value;
    } else if (event.keyCode == car.controlKeyRight) {
        car.keyHeld_TurnRight = value;
    } else if (event.keyCode == car.controlKeyUp) {
        car.keyHeld_Gas = value;
    } else if (event.keyCode == car.controlKeyDown) {
        car.keyHeld_Reverse = value;
    }
}

function keyPressed(event) {
    setKeyHeldFlag(blueCar, true, event);
    setKeyHeldFlag(greenCar, true, event);
    event.preventDefault();
}

function keyReleased(event) {
    setKeyHeldFlag(blueCar, false, event);
    setKeyHeldFlag(greenCar, false, event);
    event.preventDefault();
}

function calculateMousePosition(event) {
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;
    mouseX = event.clientX - rect.left - root.scrollLeft;
    mouseY = event.clientY - rect.top - root.scrollTop;

    return {
        x: mouseX,
        y: mouseY
    };
}