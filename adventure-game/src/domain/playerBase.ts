import { Player } from './player';
import { CharacterBase } from './characterBase';
import { CharacterControl } from './characterControl';
import { CharacterType } from '../enums/characterType';
import { Direction } from '../enums/direction';
import { ImagesManager } from '../imagesManager';

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
        let ischaracterWalking = false;
        let ischaracterWalkingForward = this.lastFacingDirection == Direction.East;

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
            let walkingImages = ischaracterWalkingForward
                ? ImagesManager.charactersImages[this.type].imagesWalkingEast
                : ImagesManager.charactersImages[this.type].imagesWalkingWest;

            this.lastFacingDirection = ischaracterWalkingForward ? Direction.East : Direction.West;
            this.currentImage = walkingImages[this.currentWalkingImage];
            this.currentWalkingImage += 1;
            if (this.currentWalkingImage >= walkingImages.length) {
                this.currentWalkingImage = 0;
            }
        } else {
            this.currentImage = this.lastFacingDirection === Direction.East
                ? ImagesManager.charactersImages[this.type].imagesWalkingEast[0]
                : ImagesManager.charactersImages[this.type].imagesWalkingWest[0];
        }
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