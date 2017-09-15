
export module InputManager {
        
    let mouseX;
    let mouseY;
    
    function setupInput() {
        canvas.addEventListener('mousedown', restartGame);
        document.addEventListener('keydown', keyPressed);
        document.addEventListener('keyup', keyReleased);
    }

    export function keyPressed(event) {
        setKeyHeldFlag(character, true, event);
        event.preventDefault();
    }
    
    export function keyReleased(event) {
        setKeyHeldFlag(character, false, event);
        event.preventDefault();
    }
    
    export function setKeyHeldFlag(character, value, event) {
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
}