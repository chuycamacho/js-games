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
var PlayerBase = (function (_super) {
    __extends(PlayerBase, _super);
    function PlayerBase(type, name, mainPlayer) {
        var _this = _super.call(this, name, type) || this;
        _this.move = function () {
            _this.isWalking = false;
            if (_this.keyHeldNorth) {
                _this.lastWalkingYDirection = 1;
                _this.positionY -= _this.speed;
                _this.isWalking = true;
            }
            else if (_this.keyHeldSouth) {
                _this.lastWalkingYDirection = 2;
                _this.positionY += _this.speed;
                _this.isWalking = true;
            }
            if (_this.keyHeldWest) {
                _this.lastWalkingXDirection = 3;
                _this.positionX -= _this.speed;
                _this.isWalking = true;
            }
            else if (_this.keyHeldEast) {
                _this.lastWalkingXDirection = 4;
                _this.positionX += _this.speed;
                _this.isWalking = true;
            }
        };
        _this.stopAgainstSurface = function () {
            if (_this.keyHeldNorth && _this.lastWalkingYDirection == 1) {
                _this.positionY += _this.speed;
            }
            else if (_this.keyHeldSouth && _this.lastWalkingYDirection == 2) {
                _this.positionY -= _this.speed;
            }
            if (_this.keyHeldEast && _this.lastWalkingXDirection == 4) {
                _this.positionX -= _this.speed;
            }
            else if (_this.keyHeldWest && _this.lastWalkingXDirection == 3) {
                _this.positionX += _this.speed;
            }
            _this.isWalking = false;
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