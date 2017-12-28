import { Character } from './character';
import { CharacterType } from '../enums/characterType';
import { Direction } from '../enums/direction';
import { EnvConstants } from '../constants/envConstants';
import { Point } from '../dtos/point';

export class CharacterBase implements Character {
    readonly id: string;
    readonly name: string;
    readonly type: CharacterType;
    
    currentImage: HTMLImageElement;

    position: Point;
    speed: number;

    isWalking: boolean;
    isAttacking: boolean;
    currentWalkingImageIndex: number = 0;
    currentAttackingImageIndex: number = 0;
    lastWalkingXDirection: Direction;
    lastWalkingYDirection: Direction;

    constructor(name: string, type: CharacterType, initialPositionX: number, initialPositionY: number, initialSpeed: number) {
        this.id = "";
        this.name = name;
        this.type = type;
        this.position = new Point(initialPositionX, initialPositionY);
        
        this.speed = initialSpeed;
        this.isWalking = false;
        this.isAttacking = false;
        this.lastWalkingXDirection = Direction.East;
        this.lastWalkingYDirection = Direction.North;
    }

    public moveWalkingImageIndex = (maxImagesNumber: number): void => {
        this.currentWalkingImageIndex++;
        if (this.currentWalkingImageIndex >= maxImagesNumber) {
            this.currentWalkingImageIndex = 0;
        }
    }

    public moveAttackingImageIndex = (maxImagesNumber: number): void => {
        this.currentAttackingImageIndex++;
        if (this.currentAttackingImageIndex >= maxImagesNumber) {
            this.currentAttackingImageIndex = 0;
            this.isAttacking = false;
        }
    }

    public move = (): void => {};
    public stopAgainstSurface = (): void => {};
}