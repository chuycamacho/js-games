import { CharacterType } from '../enums/characterType';
import { Direction } from '../enums/direction';
import { Point } from '../dtos/point';

export interface Character {
    
    currentImage: HTMLImageElement;

    readonly id: string;
    readonly name: string;
    readonly type: CharacterType;

    position: Point;
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