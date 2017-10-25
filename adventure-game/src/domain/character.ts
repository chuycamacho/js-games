import { CharacterType } from '../enums/characterType';
import { Direction } from '../enums/direction';

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

    currentWalkingImage: number;
    lastFacingDirection: Direction;

    move(): void;
}