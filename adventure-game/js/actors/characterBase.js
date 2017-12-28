"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var point_1 = require("../dtos/point");
var CharacterBase = (function () {
    function CharacterBase(name, type, initialPositionX, initialPositionY, initialSpeed) {
        var _this = this;
        this.currentWalkingImageIndex = 0;
        this.currentAttackingImageIndex = 0;
        this.moveWalkingImageIndex = function (maxImagesNumber) {
            _this.currentWalkingImageIndex++;
            if (_this.currentWalkingImageIndex >= maxImagesNumber) {
                _this.currentWalkingImageIndex = 0;
            }
        };
        this.moveAttackingImageIndex = function (maxImagesNumber) {
            _this.currentAttackingImageIndex++;
            if (_this.currentAttackingImageIndex >= maxImagesNumber) {
                _this.currentAttackingImageIndex = 0;
                _this.isAttacking = false;
            }
        };
        this.move = function () { };
        this.stopAgainstSurface = function () { };
        this.id = "";
        this.name = name;
        this.type = type;
        this.position = new point_1.Point(initialPositionX, initialPositionY);
        this.speed = initialSpeed;
        this.isWalking = false;
        this.isAttacking = false;
        this.lastWalkingXDirection = 4;
        this.lastWalkingYDirection = 1;
    }
    return CharacterBase;
}());
exports.CharacterBase = CharacterBase;
//# sourceMappingURL=characterBase.js.map