import { CharacterType } from '../enums/characterType';
import { Direction } from '../enums/direction';

export interface Character {
    
    currentImage: HTMLImageElement;

    readonly id: string;
    readonly name: string;
    readonly type: CharacterType;

    positionX: number;
    positionY: number;
    speed: number;

    currentWalkingImage: number;
    lastFacingDirection: Direction;

    move(): void;
}