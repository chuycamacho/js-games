const TRACK_WIDTH = 40;
const TRACK_HEIGHT = 40;
const TRACK_GAP = 2;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;

let trackGrid = [
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
    [1, 5, 5, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 0, 1],
    [1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [0, 2, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1],
    [0, 2, 0, 0, 0, 0, 1, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 4],
];
const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_GOAL = 2;
const TRACK_FLAG = 3;
const TRACK_TREE = 4;
const TRACK_CAR = 5;

function drawTracks() {
    let tilePosX = 0;
    let tilePosY = 0;
    for (let row = 0; row < TRACK_ROWS; row++) {
        for (let col = 0; col < TRACK_COLS; col++) {
            let trackCode = trackGrid[row][col]; 
            let useImg = trackImages[trackCode];
            canvasContext.drawImage(useImg, tilePosX, tilePosY);
            tilePosX += TRACK_WIDTH;
        }
        tilePosX = 0;
        tilePosY += TRACK_HEIGHT;
    }
}

function isObstacleAtColRow(row, col) {
    if (col >= 0 && col < TRACK_COLS && row >= 0 && row < TRACK_ROWS) {
        return trackGrid[row][col] != TRACK_ROAD;
    } else {
        return false;
    }
}

function carTrackHandling(carInstance) {
    let carPositionCol = Math.floor(carInstance.positionX / TRACK_WIDTH);
    let carPositionRow = Math.floor(carInstance.positionY / TRACK_HEIGHT);
    if (carPositionCol >= 0 && carPositionCol < TRACK_COLS && carPositionRow >= 0 && carPositionRow < TRACK_ROWS) {
        if (isObstacleAtColRow(carPositionRow, carPositionCol)) {
            //avoid the car to get stuck into the wall:
            carInstance.positionX -= Math.cos(carInstance.ang) * carInstance.speed;
            carInstance.positionY -= Math.sin(carInstance.ang) * carInstance.speed;

            carInstance.speed *= -0.5;
        }
    }
}