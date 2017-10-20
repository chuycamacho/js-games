import { CharacterType } from '../enums/characterType';
import { Direction } from '../enums/direction';
import { CharacterControl } from './characterControl'

export interface Character {
    readonly id: string;
    readonly name: string;
    readonly type: CharacterType;
    image: HTMLImageElement;
    imagesWalkingEast: HTMLImageElement[];
    imagesWalkingWest: HTMLImageElement[];

    positionX: number;
    positionY: number;
    speed: number;

    keyHeldNorth: boolean;
    keyHeldSouth: boolean;
    keyHeldWest: boolean;
    keyHeldEast: boolean;

    currentWalkingImage: number;
    lastFacingDirection: Direction;

    control: CharacterControl;

    move();
    draw();
    reactToKeyStroke(keyCode: number, keyPressed: boolean);
}