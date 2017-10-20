import { Character } from './character';
import { CharacterType } from '../enums/characterType';
import { Direction } from '../enums/direction';
import { CharacterControl } from './characterControl';
import { EnvConstants } from '../envConstants';
import { GraphicsManager } from '../graphicsManager';

export class CharacterBase implements Character {
    readonly id: string;
    readonly name: string;
    readonly type: CharacterType;
    
    image: HTMLImageElement = undefined;
    imagesWalkingEast: HTMLImageElement[];
    imagesWalkingWest: HTMLImageElement[];
    positionX: number;
    positionY: number;
    speed: number;

    keyHeldNorth: boolean;
    keyHeldSouth: boolean;
    keyHeldWest: boolean;
    keyHeldEast: boolean;

    currentWalkingImage: number = 0;
    lastFacingDirection: Direction;

    control: CharacterControl;

    constructor(name: string, type: CharacterType, image: any, control: CharacterControl) {
        this.id = "";
        this.name = name;
        this.image = image;
        this.type = type;
        this.control = control;
        this.speed = EnvConstants.DEFAULT_CHARACTER_SPEED;
        this.lastFacingDirection = Direction.East;
    }

    move() {
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

    draw() {
        //GraphicsManager.drawImageCenteredWithRotation(this.image, this.positionX, this.positionY, EnvConstants.IMAGE_DEFAULT_ANG);//TODO
    };

    reactToKeyStroke(keyCode: number, keyPressed: boolean) {
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