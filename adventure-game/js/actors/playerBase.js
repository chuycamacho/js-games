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
var playerControl_1 = require("./playerControl");
var envConstants_1 = require("../constants/envConstants");
var PlayerBase = (function (_super) {
    __extends(PlayerBase, _super);
    function PlayerBase(type, name, initialPositionX, initialPositionY) {
        var _this = _super.call(this, name, type, initialPositionX, initialPositionY, envConstants_1.EnvConstants.DEFAULT_PLAYER_SPEED) || this;
        _this.move = function () {
            _this.isWalking = false;
            if (_this.keyHeldNorth) {
                _this.lastWalkingYDirection = 1;
                _this.position.y -= _this.speed;
            }
            else if (_this.keyHeldSouth) {
                _this.lastWalkingYDirection = 2;
                _this.position.y += _this.speed;
            }
            if (_this.keyHeldWest) {
                _this.lastWalkingXDirection = 3;
                _this.position.x -= _this.speed;
            }
            else if (_this.keyHeldEast) {
                _this.lastWalkingXDirection = 4;
                _this.position.x += _this.speed;
            }
            if (_this.keyHeldNorth || _this.keyHeldSouth || _this.keyHeldWest || _this.keyHeldEast) {
                _this.isWalking = true;
            }
        };
        _this.stopAgainstSurface = function () {
            if (_this.keyHeldNorth && _this.lastWalkingYDirection == 1) {
                _this.position.y += _this.speed;
            }
            else if (_this.keyHeldSouth && _this.lastWalkingYDirection == 2) {
                _this.position.y -= _this.speed;
            }
            if (_this.keyHeldEast && _this.lastWalkingXDirection == 4) {
                _this.position.x -= _this.speed;
            }
            else if (_this.keyHeldWest && _this.lastWalkingXDirection == 3) {
                _this.position.x += _this.speed;
            }
            _this.isWalking = false;
        };
        _this.reactToKeyStroke = function (keyCode, keyPressed) {
            if (!_this.control.isValidInput(keyCode)) {
                return;
            }
            if (keyCode === _this.control.controlKeyAttack) {
                _this.setAttackingMode(keyPressed);
            }
            else {
                if (keyCode === _this.control.controlKeyLeft) {
                    _this.keyHeldWest = keyPressed;
                }
                else if (keyCode === _this.control.controlKeyRight) {
                    _this.keyHeldEast = keyPressed;
                }
                if (keyCode === _this.control.controlKeyUp) {
                    _this.keyHeldNorth = keyPressed;
                }
                else if (keyCode === _this.control.controlKeyDown) {
                    _this.keyHeldSouth = keyPressed;
                }
            }
        };
        _this.setAttackingMode = function (keyPressed) {
            if (keyPressed === false) {
                return;
            }
            if (_this.isWalking) {
                _this.currentAttackingImageIndex = 0;
            }
            _this.isAttacking = true;
            _this.isWalking = false;
        };
        _this.control = new playerControl_1.PlayerControl();
        return _this;
    }
    return PlayerBase;
}(characterBase_1.CharacterBase));
exports.PlayerBase = PlayerBase;
//# sourceMappingURL=playerBase.js.map