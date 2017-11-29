import { Director } from './director';

export class Usher {

    private canvasContext: CanvasRenderingContext2D
    private director: Director;

    private mousePosInWorldX: number;
    private mousePosInWorldY: number;

    constructor(canvasContext: CanvasRenderingContext2D, director: Director) {
        this.canvasContext = canvasContext;
        this.director = director;
    }

    public arrangeParticipantInput = (): void => {
        this.canvasContext.canvas.addEventListener('mousedown', this.manageMouseDown);
        document.addEventListener('keydown', this.manageKeyPressed);
        document.addEventListener('keyup', this.manageKeyReleased);
    }

    private manageKeyPressed = (event: any): void => {
        this.director.signalCharactersToReactToKeyStroke(event, true);
        event.preventDefault();
    }

    private manageKeyReleased = (event: any): void => {
        this.director.signalCharactersToReactToKeyStroke(event, false);
        event.preventDefault();
    }

    private calculateMousePosition = (canvasContext: CanvasRenderingContext2D, event: any): any => {
        let rect = canvasContext.canvas.getBoundingClientRect();
        let root = document.documentElement;
        this.mousePosInWorldX = event.clientX - rect.left - root.scrollLeft;
        this.mousePosInWorldY = event.clientY - rect.top - root.scrollTop;

        return {
            x: this.mousePosInWorldX,
            y: this.mousePosInWorldY
        };
    }

    private manageMouseDown = (event: any): void => { }
}