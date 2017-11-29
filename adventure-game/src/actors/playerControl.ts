export class PlayerControl {
    private readonly KEY_UP_ARROW = 38;
    private readonly KEY_RIGHT_ARROW = 39;
    private readonly KEY_DOWN_ARROW = 40;
    private readonly KEY_LEFT_ARROW = 37;
    private readonly KEY_SPACEBAR = 32;
    
    readonly controlKeyUp: number;
    readonly controlKeyRight: number;
    readonly controlKeyDown: number;
    readonly controlKeyLeft: number;
    readonly controlKeyAttack: number;

    constructor() {
        this.controlKeyUp = this.KEY_UP_ARROW;
        this.controlKeyRight = this.KEY_RIGHT_ARROW;
        this.controlKeyDown = this.KEY_DOWN_ARROW;
        this.controlKeyLeft = this.KEY_LEFT_ARROW;
        this.controlKeyAttack = this.KEY_SPACEBAR;
    }

    public isValidInput = (keyCode: number): boolean => {
        if (keyCode === this.controlKeyUp || 
            keyCode === this.controlKeyRight || 
            keyCode === this.controlKeyDown || 
            keyCode === this.controlKeyLeft || 
            keyCode === this.controlKeyAttack) {
            return true;
        } else {
            return false;
        }
    }
}