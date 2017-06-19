const GROUNDSPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.06;
const MIN_SPEED_TO_TURN = 0.5;

function carClass() {

    this.positionX = 0;
    this.positionY = 0;
    this.speed = 0;
    this.ang = 0;
    this.carImage;

    this.draw = function () {
        drawImageCenteredWithRotation(this.carImage, this.positionX, this.positionY, this.ang);
    }

    this.reset = function (image) {
        this.carImage = image;

        for (let row = 0; row < TRACK_ROWS; row++) {
            for (let col = 0; col < TRACK_COLS; col++) {
                if (trackGrid[row][col] == TRACK_CAR) {
                    trackGrid[row][col] = TRACK_ROAD;

                    this.positionX = col * TRACK_WIDTH + (TRACK_WIDTH / 2);
                    this.positionY = row * TRACK_HEIGHT + (TRACK_HEIGHT / 2);
                    this.ang = -Math.PI / 2;
                    return;
                }
            }
        }
    }

    this.move = function () {
        this.speed *= GROUNDSPEED_DECAY_MULT;

        if (keyHeld_Gas) {
            this.speed += DRIVE_POWER;
        }
        if (keyHeld_Reverse) {
            this.speed -= REVERSE_POWER;
        }
        if (Math.abs(this.speed) > MIN_SPEED_TO_TURN) {
            if (keyHeld_TurnLeft) {
                this.ang -= TURN_RATE;
            }
            if (keyHeld_TurnRight) {
                this.ang += TURN_RATE;
            }
        }

        this.positionX += Math.cos(this.ang) * this.speed;
        this.positionY += Math.sin(this.ang) * this.speed;

        carTrackHandling(this);
    }

}