export class CharacterControl {
    private readonly KEY_UP_ARROW = 38;
    private readonly KEY_RIGHT_ARROW = 39;
    private readonly KEY_DOWN_ARROW = 40;
    private readonly KEY_LEFT_ARROW = 37;
    
    private readonly KEY_W = 87;
    private readonly KEY_D = 68;
    private readonly KEY_S = 83;
    private readonly KEY_A = 65;
    
    readonly controlKeyUp: number;
    readonly controlKeyRight: number;
    readonly controlKeyDown: number;
    readonly controlKeyLeft: number;

    constructor() {
        this.controlKeyUp = this.KEY_UP_ARROW;
        this.controlKeyRight = this.KEY_RIGHT_ARROW;
        this.controlKeyDown = this.KEY_DOWN_ARROW;
        this.controlKeyLeft = this.KEY_LEFT_ARROW;
    }
}