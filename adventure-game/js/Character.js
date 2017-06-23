const SPEED = 3;
const IMAGE_DEFAULT_ANG = 0;

const WARRIOR_TYPE = 0;
const PRINCESS_TYPE = 1;

function characterClass(type) {

    this.type = type;
    this.positionX = 0;
    this.positionY = 0;
    this.speed = 1;
    this.characterImage;
    this.characterName = "Untitled warrior";

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
        drawImageCenteredWithRotation(this.characterImage, this.positionX, this.positionY, IMAGE_DEFAULT_ANG);
    }

    this.start = function (image, name) {
        this.characterImage = image;
        this.characterName = name;
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

        let ischaracterWalking = false;
        let ischaracterWalkingEast = true;

        if (this.keyHeld_North) {
            this.positionY -= SPEED;
            ischaracterWalking = true;
        }
        if (this.keyHeld_South) {
            this.positionY += SPEED;
            ischaracterWalking = true;
        }
        if (this.keyHeld_West) {
            this.positionX -= SPEED;
            ischaracterWalking = true;
            ischaracterWalkingEast = false;
        }
        if (this.keyHeld_East) {
            this.positionX += SPEED;
            ischaracterWalking = true;
            ischaracterWalkingEast = true;
        }
        if (ischaracterWalking) {
            let walkingImages = ischaracterWalkingEast ? characterWalkingEastImages : characterWalkingWestImages;
                
            this.lastFacingDirection = ischaracterWalkingEast ? "east" : "west";
            this.characterImage = walkingImages[this.currentWalkingImage];
            this.currentWalkingImage += 1;
            if (this.currentWalkingImage >= walkingImages.length) {
                this.currentWalkingImage = 0;
            }
        } else {
            this.characterImage = this.lastFacingDirection === "east" 
                ? characterWalkingEastImages[0] 
                : characterWalkingWestImages[0];
        }
        warriorWorldHandling(this);
    }

}