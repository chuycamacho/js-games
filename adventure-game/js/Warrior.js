const SPEED = 3;
const IMAGE_DEFAULT_ANG = 0;
const WARRIOR_STANDING_EAST_IMAGE = "warrior/warrior_standing_east.png";
const WARRIOR_STANDING_WEST_IMAGE = "warrior/warrior_standing_west.png";
const WARRIOR_WALKING_EAST_IMAGES = [
    "warrior/warrior_walk_east_001.png", "warrior/warrior_walk_east_002.png", "warrior/warrior_walk_east_003.png", "warrior/warrior_walk_east_004.png", 
    "warrior/warrior_walk_east_005.png", "warrior/warrior_walk_east_006.png", "warrior/warrior_walk_east_007.png", "warrior/warrior_walk_east_008.png"
];
const WARRIOR_WALKING_WEST_IMAGES = [
    "warrior/warrior_walk_west_001.png", "warrior/warrior_walk_west_002.png", "warrior/warrior_walk_west_003.png", "warrior/warrior_walk_west_004.png", 
    "warrior/warrior_walk_west_005.png", "warrior/warrior_walk_west_006.png", "warrior/warrior_walk_west_007.png", "warrior/warrior_walk_west_008.png"
];


function warriorClass() {

    this.positionX = 0;
    this.positionY = 0;
    this.speed = 1;
    this.warriorImage;
    this.warriorName = "Untitled warrior";

    this.keyHeld_North = false;
    this.keyHeld_South = false;
    this.keyHeld_West = false;
    this.keyHeld_East = false;

    this.controlKeyUp;
    this.controlKeyRight;
    this.controlKeyDown;
    this.controlKeyLeft;

    this.currentWalkingImage = 0;
    this.lastFacingDirection = "east";

    this.setupInput = function (keyUp, keyRight, keyDown, keyLeft) {
        this.controlKeyUp = keyUp;
        this.controlKeyRight = keyRight;
        this.controlKeyDown = keyDown;
        this.controlKeyLeft = keyLeft;
    }

    this.draw = function () {
        drawImageCenteredWithRotation(this.warriorImage, this.positionX, this.positionY, IMAGE_DEFAULT_ANG);
    }

    this.start = function (image, name) {
        this.warriorImage = image;
        this.warriorName = name;
        this.speed = 0;
        for (let row = 0; row < WORLD_ROWS; row++) {
            for (let col = 0; col < WORLD_COLS; col++) {
                if (worldGrid[row][col] == WORLD_WARRIOR) {
                    worldGrid[row][col] = WORLD_GROUND;

                    this.positionX = col * WORLD_TILE_WIDTH + (WORLD_TILE_WIDTH / 2);
                    this.positionY = row * WORLD_TILE_HEIGHT + (WORLD_TILE_HEIGHT / 2);
                    return;
                }
            }
        }
    }

    this.move = function () {

        let isWarriorWalking = false;
        let isWarriorWalkingEast = true;

        if (this.keyHeld_North) {
            this.positionY -= SPEED;
            isWarriorWalking = true;
        }
        if (this.keyHeld_South) {
            this.positionY += SPEED;
            isWarriorWalking = true;
        }
        if (this.keyHeld_West) {
            this.positionX -= SPEED;
            isWarriorWalking = true;
            isWarriorWalkingEast = false;
        }
        if (this.keyHeld_East) {
            this.positionX += SPEED;
            isWarriorWalking = true;
            isWarriorWalkingEast = true;
        }
        if (isWarriorWalking) {
            let walkingImages = isWarriorWalkingEast ? WARRIOR_WALKING_EAST_IMAGES : WARRIOR_WALKING_WEST_IMAGES;
            this.lastFacingDirection = isWarriorWalkingEast ? "east" : "west";
            warriorPic.src = 'images/'+walkingImages[this.currentWalkingImage];
            this.currentWalkingImage += 1;
            if (this.currentWalkingImage >= walkingImages.length) {
                this.currentWalkingImage = 0;
            }
        } else {
            warriorPic.src = this.lastFacingDirection === "east" ? 'images/'+WARRIOR_STANDING_EAST_IMAGE : 'images/'+WARRIOR_STANDING_WEST_IMAGE;
        }
        warriorWorldHandling(this);
    }

}