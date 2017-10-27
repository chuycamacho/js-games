import { Character } from './character';
import { CharacterType } from '../enums/characterType';
import { Direction } from '../enums/direction';
import { EnvConstants } from '../constants/envConstants';

export class CharacterBase implements Character {
    readonly id: string;
    readonly name: string;
    readonly type: CharacterType;
    
    currentImage: HTMLImageElement;

    positionX: number;
    positionY: number;
    speed: number;

    isWalking: boolean;
    currentWalkingImage: number = 0;
    lastWalkingXDirection: Direction;
    lastWalkingYDirection: Direction;

    constructor(name: string, type: CharacterType) {
        this.id = "";
        this.name = name;
        this.type = type;
        this.speed = EnvConstants.DEFAULT_CHARACTER_SPEED;
        this.isWalking = false;
        this.lastWalkingXDirection = Direction.East;
        this.lastWalkingYDirection = Direction.North;
    }

    public move = (): void => {};
    public stopAgainstSurface = (): void => {};
}