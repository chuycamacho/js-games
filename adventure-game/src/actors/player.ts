import { Character } from './character';
import { CharacterControl } from './characterControl'

export interface Player extends Character{
    keyHeldNorth: boolean;
    keyHeldSouth: boolean;
    keyHeldWest: boolean;
    keyHeldEast: boolean;

    control: CharacterControl;

    reactToKeyStroke(keyCode: number, keyPressed: boolean): void;    
}