
export module InputManager {
    
    function setupInput() {
        canvas.addEventListener('mousedown', restartGame);//TODO: move this part to main
        document.addEventListener('keydown', keyPressed);
        document.addEventListener('keyup', keyReleased);
    }

    export function keyPressed(event) {
        event.preventDefault();
    }
    
    export function keyReleased(event) {
        event.preventDefault();
    }
}