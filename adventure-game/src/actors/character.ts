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

    isWalking: boolean;
    isAttacking: boolean;
    currentWalkingImageIndex: number;
    currentAttackingImageIndex: number;
    lastWalkingXDirection: Direction;
    lastWalkingYDirection: Direction;

    move(): void;
    stopAgainstSurface(): void;
    moveWalkingImageIndex(maxImagesNumber: number): void;
    moveAttackingImageIndex(maxImagesNumber: number): void;
}