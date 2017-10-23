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

    constructor(mainPlayer: boolean) {
        this.controlKeyUp = mainPlayer ? this.KEY_UP_ARROW : this.KEY_W;
        this.controlKeyRight = mainPlayer ? this.KEY_RIGHT_ARROW : this.KEY_D;
        this.controlKeyDown = mainPlayer ? this.KEY_DOWN_ARROW : this.KEY_S;
        this.controlKeyLeft = mainPlayer ? this.KEY_LEFT_ARROW : this.KEY_A;
    }
}