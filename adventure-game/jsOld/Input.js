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

    character.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW);
}

function setKeyHeldFlag(character, value, event) {
    if (event.keyCode == character.controlKeyLeft) {
        character.keyHeld_West = value;
    } else if (event.keyCode == character.controlKeyRight) {
        character.keyHeld_East = value;
    } else if (event.keyCode == character.controlKeyUp) {
        character.keyHeld_North = value;
    } else if (event.keyCode == character.controlKeyDown) {
        character.keyHeld_South = value;
    }
}

function keyPressed(event) {
    setKeyHeldFlag(character, true, event);
    event.preventDefault();
}

function keyReleased(event) {
    setKeyHeldFlag(character, false, event);
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