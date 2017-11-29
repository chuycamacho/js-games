import { Character } from './character';
import { PlayerControl } from './playerControl'

export interface Player extends Character{
    keyHeldNorth: boolean;
    keyHeldSouth: boolean;
    keyHeldWest: boolean;
    keyHeldEast: boolean;    

    control: PlayerControl;

    reactToKeyStroke(keyCode: number, keyPressed: boolean): void;    
}