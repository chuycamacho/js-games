import { Player } from './player';
import { CharacterBase } from './characterBase';
import { CharacterControl } from './characterControl';
import { CharacterType } from '../enums/characterType';
import { Direction } from '../enums/direction';

export class PlayerBase extends CharacterBase implements Player {

    keyHeldNorth: boolean;
    keyHeldSouth: boolean;
    keyHeldWest: boolean;
    keyHeldEast: boolean;

    control: CharacterControl;

    constructor(type: CharacterType, name: string, mainPlayer: boolean) {
        super(name, type);
        this.control = new CharacterControl(mainPlayer);
    }

    public move = (): void => {
        this.isWalking = false;

        if (this.keyHeldNorth) {
            this.lastWalkingYDirection = Direction.North;
            this.positionY -= this.speed;
            this.isWalking = true;
        } else if (this.keyHeldSouth) {
            this.lastWalkingYDirection = Direction.South;
            this.positionY += this.speed;
            this.isWalking = true;
        }

        if (this.keyHeldWest) {
            this.lastWalkingXDirection = Direction.West;
            this.positionX -= this.speed;
            this.isWalking = true;
        } else if (this.keyHeldEast) {
            this.lastWalkingXDirection = Direction.East;
            this.positionX += this.speed;
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
        if (keyCode == this.control.controlKeyLeft) {
            this.keyHeldWest = keyPressed;
        } else if (keyCode == this.control.controlKeyRight) {
            this.keyHeldEast = keyPressed;
        } else if (keyCode == this.control.controlKeyUp) {
            this.keyHeldNorth = keyPressed;
        } else if (keyCode == this.control.controlKeyDown) {
            this.keyHeldSouth = keyPressed;
        }
    };

    
}