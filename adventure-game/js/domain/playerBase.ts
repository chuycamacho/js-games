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

    constructor(name: string, type: CharacterType, control: CharacterControl) {
        super(name,type);
        this.control = control;
    }

    public move = (): void => {
        let ischaracterWalking = false;
        let ischaracterWalkingForward = true;

        if (this.keyHeldNorth) {
            this.positionY -= this.speed;
            ischaracterWalking = true;
        }
        if (this.keyHeldSouth) {
            this.positionY += this.speed;
            ischaracterWalking = true;
        }
        if (this.keyHeldWest) {
            this.positionX -= this.speed;
            ischaracterWalking = true;
            ischaracterWalkingForward = false;
        }
        if (this.keyHeldEast) {
            this.positionX += this.speed;
            ischaracterWalking = true;
            ischaracterWalkingForward = true;
        }

        if (ischaracterWalking) {
            let walkingImages = ischaracterWalkingForward ? this.imagesWalkingEast : this.imagesWalkingWest;

            this.lastFacingDirection = ischaracterWalkingForward ? Direction.East : Direction.West;
            this.image = walkingImages[this.currentWalkingImage];
            this.currentWalkingImage += 1;
            if (this.currentWalkingImage >= walkingImages.length) {
                this.currentWalkingImage = 0;
            }
        } else {
            this.image = this.lastFacingDirection === Direction.East ?
                this.imagesWalkingEast[0] :
                this.imagesWalkingWest[0];
        }

        // warriorWorldHandling(this);//TODO: manage world handling
    };

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