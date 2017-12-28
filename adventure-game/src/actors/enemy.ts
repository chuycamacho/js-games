import { Character } from './character';
import { Point } from '../dtos/point';

export interface Enemy extends Character {
    signalPlayerPosition(playerPosition: Point): void;
}