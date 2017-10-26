"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var characterBase_1 = require("./characterBase");
var characterControl_1 = require("./characterControl");
var imagesManager_1 = require("../imagesManager");
var PlayerBase = (function (_super) {
    __extends(PlayerBase, _super);
    function PlayerBase(type, name, mainPlayer) {
        var _this = _super.call(this, name, type) || this;
        _this.move = function () {
            var ischaracterWalking = false;
            var ischaracterWalkingForward = _this.lastFacingDirection == 4;
            if (_this.keyHeldNorth) {
                _this.positionY -= _this.speed;
                ischaracterWalking = true;
            }
            if (_this.keyHeldSouth) {
                _this.positionY += _this.speed;
                ischaracterWalking = true;
            }
            if (_this.keyHeldWest) {
                _this.positionX -= _this.speed;
                ischaracterWalking = true;
                ischaracterWalkingForward = false;
            }
            if (_this.keyHeldEast) {
                _this.positionX += _this.speed;
                ischaracterWalking = true;
                ischaracterWalkingForward = true;
            }
            if (ischaracterWalking) {
                var walkingImages = ischaracterWalkingForward
                    ? imagesManager_1.ImagesManager.charactersImages[_this.type].imagesWalkingEast
                    : imagesManager_1.ImagesManager.charactersImages[_this.type].imagesWalkingWest;
                _this.lastFacingDirection = ischaracterWalkingForward ? 4 : 3;
                _this.currentImage = walkingImages[_this.currentWalkingImage];
                _this.currentWalkingImage += 1;
                if (_this.currentWalkingImage >= walkingImages.length) {
                    _this.currentWalkingImage = 0;
                }
            }
            else {
                _this.currentImage = _this.lastFacingDirection === 4
                    ? imagesManager_1.ImagesManager.charactersImages[_this.type].imagesWalkingEast[0]
                    : imagesManager_1.ImagesManager.charactersImages[_this.type].imagesWalkingWest[0];
            }
        };
        _this.reactToKeyStroke = function (keyCode, keyPressed) {
            if (keyCode == _this.control.controlKeyLeft) {
                _this.keyHeldWest = keyPressed;
            }
            else if (keyCode == _this.control.controlKeyRight) {
                _this.keyHeldEast = keyPressed;
            }
            else if (keyCode == _this.control.controlKeyUp) {
                _this.keyHeldNorth = keyPressed;
            }
            else if (keyCode == _this.control.controlKeyDown) {
                _this.keyHeldSouth = keyPressed;
            }
        };
        _this.control = new characterControl_1.CharacterControl(mainPlayer);
        return _this;
    }
    return PlayerBase;
}(characterBase_1.CharacterBase));
exports.PlayerBase = PlayerBase;
//# sourceMappingURL=playerBase.js.map