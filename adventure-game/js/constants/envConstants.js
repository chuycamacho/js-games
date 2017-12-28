"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var point_1 = require("../dtos/point");
var EnvConstants;
(function (EnvConstants) {
    EnvConstants.FRAMES_PER_SECOND = 30;
    EnvConstants.DEFAULT_PLAYER_SPEED = 3;
    EnvConstants.DEFAULT_ENEMY_SPEED = 2;
    EnvConstants.IMAGE_DEFAULT_ANG = 0;
    EnvConstants.PLAYER_POSITION_COMPENSATION = new point_1.Point(10, 15);
    EnvConstants.CHARACTER_ATTACK_RANGE = new point_1.Point(20, 15);
    EnvConstants.ENEMY_SIGHT_RANGE = 80;
    EnvConstants.ENEMY_PATROL_RANGE = 160;
    EnvConstants.WORLD_TILE_WIDTH = 40;
    EnvConstants.WORLD_TILE_HEIGHT = 40;
    EnvConstants.WORLD_GAP = 2;
    EnvConstants.WORLD_COLS = 20;
    EnvConstants.WORLD_ROWS = 15;
})(EnvConstants = exports.EnvConstants || (exports.EnvConstants = {}));
//# sourceMappingURL=envConstants.js.map