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
var point_1 = require("../dtos/point");
var envConstants_1 = require("../constants/envConstants");
var EnemyBase = (function (_super) {
    __extends(EnemyBase, _super);
    function EnemyBase(type, initialPositionX, initialPositionY, anchorPositionX, anchorPositionY, isPatrolling) {
        var _this = _super.call(this, "randomEnemy", type, initialPositionX, initialPositionY, envConstants_1.EnvConstants.DEFAULT_ENEMY_SPEED) || this;
        _this.signalPlayerPosition = function (playerPosition) {
            _this.lastKnownPlayerPosition = playerPosition;
        };
        _this.stopAgainstSurface = function () {
            if (_this.lastWalkingXDirection == 4) {
                _this.lastWalkingXDirection = 3;
            }
            else if (_this.lastWalkingXDirection == 3) {
                _this.lastWalkingXDirection = 4;
            }
        };
        _this.move = function () {
            var distanceToPlayer = _this.position.x - _this.lastKnownPlayerPosition.x;
            var distanceToPlayerAbs = Math.abs(distanceToPlayer);
            _this.isAwareOfPlayer = (distanceToPlayerAbs <= _this.sightRange &&
                ((distanceToPlayer >= 0 && _this.lastWalkingXDirection == 3) || (distanceToPlayer < 0 && _this.lastWalkingXDirection == 4)));
            _this.isAttacking = _this.isAwareOfPlayer && (distanceToPlayerAbs <= envConstants_1.EnvConstants.CHARACTER_ATTACK_RANGE.x);
            _this.isWalking = !_this.isAttacking;
            if (_this.isAttacking) {
                return;
            }
            if (_this.isAwareOfPlayer) {
                _this.follow(distanceToPlayer);
            }
            else {
                _this.patrol();
            }
        };
        _this.patrol = function () {
            var distanceToAnchor = _this.position.x - _this.anchorPoint.x;
            if (Math.abs(distanceToAnchor) <= _this.patrolRange) {
                switch (_this.lastWalkingXDirection) {
                    case 4:
                        _this.position.x += _this.speed;
                        break;
                    case 3:
                        _this.position.x -= _this.speed;
                        break;
                }
                return;
            }
            if (distanceToAnchor >= 0) {
                if (_this.lastWalkingXDirection == 4) {
                    _this.lastWalkingXDirection = 3;
                }
                _this.position.x -= _this.speed;
            }
            else {
                if (_this.lastWalkingXDirection == 3) {
                    _this.lastWalkingXDirection = 4;
                }
                _this.position.x += _this.speed;
            }
        };
        _this.follow = function (distanceToPlayer) {
            if (distanceToPlayer > 0) {
                _this.lastWalkingXDirection = 3;
                _this.position.x -= _this.speed;
            }
            else {
                _this.lastWalkingXDirection = 4;
                _this.position.x += _this.speed;
            }
        };
        _this.anchorPoint = new point_1.Point(anchorPositionX, anchorPositionY);
        _this.isPatrolling = isPatrolling;
        _this.isAwareOfPlayer = false;
        _this.sightRange = envConstants_1.EnvConstants.ENEMY_SIGHT_RANGE;
        _this.patrolRange = envConstants_1.EnvConstants.ENEMY_PATROL_RANGE;
        _this.lastKnownPlayerPosition = new point_1.Point(0, 0);
        return _this;
    }
    return EnemyBase;
}(characterBase_1.CharacterBase));
exports.EnemyBase = EnemyBase;
//# sourceMappingURL=enemyBase.js.map