import { Character } from './character';
import { CharacterType } from '../enums/characterType';
import { Direction } from '../enums/direction';
import { EnvConstants } from '../envConstants';

export class CharacterBase implements Character {
    readonly id: string;
    readonly name: string;
    readonly type: CharacterType;
    
    image: HTMLImageElement;
    imagesWalkingEast: HTMLImageElement[];
    imagesWalkingWest: HTMLImageElement[];
    positionX: number;
    positionY: number;
    speed: number;

    currentWalkingImage: number = 0;
    lastFacingDirection: Direction;

    constructor(name: string, type: CharacterType) {
        this.id = "";
        this.name = name;
        this.type = type;
        this.speed = EnvConstants.DEFAULT_CHARACTER_SPEED;
        this.lastFacingDirection = Direction.East;
        this.speed = 0;
    }

    public move = (): void => {
        
    };
}