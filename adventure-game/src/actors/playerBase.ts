import { Player } from './player';
import { CharacterBase } from './characterBase';
import { PlayerControl } from './playerControl';
import { CharacterType } from '../enums/characterType';
import { Direction } from '../enums/direction';

export class PlayerBase extends CharacterBase implements Player {

    keyHeldNorth: boolean;
    keyHeldSouth: boolean;
    keyHeldWest: boolean;
    keyHeldEast: boolean;

    control: PlayerControl;

    constructor(type: CharacterType, name: string) {
        super(name, type);
        this.control = new PlayerControl();
    }

    public move = (): void => {
        this.isWalking = false;
        if (this.keyHeldNorth) {
            this.lastWalkingYDirection = Direction.North;
            this.positionY -= this.speed;
        } else if (this.keyHeldSouth) {
            this.lastWalkingYDirection = Direction.South;
            this.positionY += this.speed;
        }

        if (this.keyHeldWest) {
            this.lastWalkingXDirection = Direction.West;
            this.positionX -= this.speed;
        } else if (this.keyHeldEast) {
            this.lastWalkingXDirection = Direction.East;
            this.positionX += this.speed;
        }
        if (this.keyHeldNorth || this.keyHeldSouth || this.keyHeldWest || this.keyHeldEast) {
            this.isWalking = true;
        }
    };

    public stopAgainstSurface = (): void => {
        if (this.keyHeldNorth && this.lastWalkingYDirection == Direction.North) {
            this.positionY += this.speed;
        } else if (this.keyHeldSouth && this.lastWalkingYDirection == Direction.South) {
            this.positionY -= this.speed;
        }

        if (this.keyHeldEast && this.lastWalkingXDirection == Direction.East) {
            this.positionX -= this.speed;
        } else if (this.keyHeldWest && this.lastWalkingXDirection == Direction.West) {
            this.positionX += this.speed;
        }
        this.isWalking = false;
    }

    public reactToKeyStroke = (keyCode: number, keyPressed: boolean): void => {
        if (!this.control.isValidInput(keyCode)) {
            return;
        }

        if (keyCode === this.control.controlKeyAttack) {
            this.setAttackingMode(keyPressed);
        } else {
            if (keyCode === this.control.controlKeyLeft) {
                this.keyHeldWest = keyPressed;
            } else if (keyCode === this.control.controlKeyRight) {
                this.keyHeldEast = keyPressed;
            } 
            if (keyCode === this.control.controlKeyUp) {
                this.keyHeldNorth = keyPressed;
            } else if (keyCode === this.control.controlKeyDown) {
                this.keyHeldSouth = keyPressed;
            }
        }
    };

    private setAttackingMode = (keyPressed: boolean): void => {
        if (keyPressed === false) {
            return;
        }

        if (this.isWalking) {
            this.currentAttackingImageIndex = 0;
        }
        this.isAttacking = true;
        this.isWalking = false;
    }
}