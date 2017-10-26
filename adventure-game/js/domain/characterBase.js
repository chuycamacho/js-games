"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var envConstants_1 = require("../envConstants");
var CharacterBase = (function () {
    function CharacterBase(name, type) {
        this.currentWalkingImage = 0;
        this.move = function () { };
        this.id = "";
        this.name = name;
        this.type = type;
        this.speed = envConstants_1.EnvConstants.DEFAULT_CHARACTER_SPEED;
        this.lastFacingDirection = 4;
        this.speed = 0;
        this.lastFacingDirection = 4;
    }
    return CharacterBase;
}());
exports.CharacterBase = CharacterBase;
//# sourceMappingURL=characterBase.js.map