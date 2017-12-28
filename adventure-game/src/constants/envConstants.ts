import { Point } from '../dtos/point';

export module EnvConstants {
    export const FRAMES_PER_SECOND = 30;
    export const DEFAULT_PLAYER_SPEED = 3;
    export const DEFAULT_ENEMY_SPEED = 2;
    export const IMAGE_DEFAULT_ANG = 0;
    
    export const PLAYER_POSITION_COMPENSATION: Point = new Point(10, 15);
    export const CHARACTER_ATTACK_RANGE: Point = new Point(20, 15);

    export const ENEMY_SIGHT_RANGE: number = 80;
    export const ENEMY_PATROL_RANGE: number = 160;
    
    export const WORLD_TILE_WIDTH = 40;
    export const WORLD_TILE_HEIGHT = 40;
    export const WORLD_GAP = 2;
    export const WORLD_COLS = 20;
    export const WORLD_ROWS = 15;
}