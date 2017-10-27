const WORLD_TILE_WIDTH = 40;
const WORLD_TILE_HEIGHT = 40;
const WORLD_GAP = 2;
const WORLD_COLS = 20;
const WORLD_ROWS = 15;

let scenarioOneGrid = [
    [4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
    [4, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 1, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 1, 1, 0, 0, 1, 4, 4, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 3, 0, 0, 0, 3, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 5, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 0, 1],
    [1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [0, 2, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1],
    [0, 2, 0, 0, 0, 0, 1, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 4],
];
let worldGrid = [];

const WORLD_GROUND = 0;
const WORLD_WALL = 1;
const WORLD_GOAL = 2;
const WORLD_DOOR = 3;
const WORLD_KEY = 4;
const WORLD_WARRIOR = 5;

function drawWorld() {
    let tilePosX = 0;
    let tilePosY = 0;
    for (let row = 0; row < WORLD_ROWS; row++) {
        for (let col = 0; col < WORLD_COLS; col++) {
            let tileType = worldGrid[row][col];
            let useImg = worldImages[tileType];
            if (tileHasTransparency(tileType)) {
                drawImage(worldImages[WORLD_GROUND], tilePosX, tilePosY);
            }
            drawImage(useImg, tilePosX, tilePosY);
            tilePosX += WORLD_TILE_WIDTH;
        }
        tilePosX = 0;
        tilePosY += WORLD_TILE_HEIGHT;
    }
}

function tileHasTransparency(tileType) {
    return (tileType == WORLD_KEY || tileType == WORLD_GOAL || tileType == WORLD_DOOR);
}

function tileTypeAtColRow(row, col) {
    if (col >= 0 && col < WORLD_COLS && row >= 0 && row < WORLD_ROWS) {
        return worldGrid[row][col];
    } else {
        return WORLD_WALL;
    }
}

function warriorWorldHandling(warriorInstance) {
    let warriorPositionCol = Math.floor(warriorInstance.positionX / WORLD_TILE_WIDTH);
    let warriorPositionRow = Math.floor(warriorInstance.positionY / WORLD_TILE_HEIGHT);
    if (warriorPositionCol >= 0 && warriorPositionCol < WORLD_COLS && warriorPositionRow >= 0 && warriorPositionRow < WORLD_ROWS) {
        let tileTypeHitted = tileTypeAtColRow(warriorPositionRow, warriorPositionCol);
        if (tileTypeHitted == WORLD_GOAL) {
            loadScenario(scenarioOneGrid);
        } else if (tileTypeHitted != WORLD_GROUND) {
            
            //avoid the warrior to get stuck into the wall:
            warriorInstance.positionX -= Math.cos(warriorInstance.ang) * warriorInstance.speed;
            warriorInstance.positionY -= Math.sin(warriorInstance.ang) * warriorInstance.speed;

            warriorInstance.speed *= -0.5;
        }
    }
}