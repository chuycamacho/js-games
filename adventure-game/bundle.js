(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"../dtos/point":10}],2:[function(require,module,exports){
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

},{"../constants/envConstants":6,"../dtos/point":10,"./characterBase":1}],3:[function(require,module,exports){
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

},{"../constants/envConstants":6,"./characterBase":1,"./playerControl":4}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PlayerControl = (function () {
    function PlayerControl() {
        var _this = this;
        this.KEY_UP_ARROW = 38;
        this.KEY_RIGHT_ARROW = 39;
        this.KEY_DOWN_ARROW = 40;
        this.KEY_LEFT_ARROW = 37;
        this.KEY_SPACEBAR = 32;
        this.isValidInput = function (keyCode) {
            if (keyCode === _this.controlKeyUp ||
                keyCode === _this.controlKeyRight ||
                keyCode === _this.controlKeyDown ||
                keyCode === _this.controlKeyLeft ||
                keyCode === _this.controlKeyAttack) {
                return true;
            }
            else {
                return false;
            }
        };
        this.controlKeyUp = this.KEY_UP_ARROW;
        this.controlKeyRight = this.KEY_RIGHT_ARROW;
        this.controlKeyDown = this.KEY_DOWN_ARROW;
        this.controlKeyLeft = this.KEY_LEFT_ARROW;
        this.controlKeyAttack = this.KEY_SPACEBAR;
    }
    return PlayerControl;
}());
exports.PlayerControl = PlayerControl;

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var envConstants_1 = require("./constants/envConstants");
var producer_1 = require("./workers/producer");
var scenarios_1 = require("./constants/scenarios");
var characterType_1 = require("./enums/characterType");
var App;
(function (App) {
    var canvas;
    var canvasContext;
    var producer;
    window.onload = function () {
        console.log('setting up game...');
        canvas = document.getElementById('gameCanvas');
        canvasContext = canvas.getContext('2d');
        producer = new producer_1.Producer(canvasContext, characterType_1.CharacterType.Warrior, 'TheWarrior');
        producer.buildSet(scenarios_1.Scenarios.SCENARIO_ONE);
    };
    function startGame() {
        console.log('starting game...');
        setInterval(updateEnvironment, 1000 / envConstants_1.EnvConstants.FRAMES_PER_SECOND);
    }
    App.startGame = startGame;
    function updateEnvironment() {
        producer.changeSet();
    }
})(App = exports.App || (exports.App = {}));

},{"./constants/envConstants":6,"./constants/scenarios":8,"./enums/characterType":11,"./workers/producer":14}],6:[function(require,module,exports){
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

},{"../dtos/point":10}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var characterType_1 = require("../enums/characterType");
var ImageNames;
(function (ImageNames) {
    ImageNames.GROUND_IMAGE = "./images/world_ground.png";
    ImageNames.WALL_IMAGE = "./images/world_wall.png";
    ImageNames.GOAL_IMAGE = "./images/world_goal.png";
    ImageNames.DOOR_IMAGE = "./images/world_door.png";
    ImageNames.KEY_IMAGE = "./images/world_key.png";
    var WARRIOR_INITIAL_IMAGE = "./images/warrior/warrior_standing_east.png";
    var PRINCESS_INITIAL_IMAGE = "./images/princess/princess_standing_east.png";
    var BARBARIAN_INITIAL_IMAGE = "./images/barbarian/barbarian_standing_east.png";
    var WARRIOR_WALKING_EAST_IMAGES = [
        "./images/warrior/warrior_walk_east_001.png", "./images/warrior/warrior_walk_east_002.png", "./images/warrior/warrior_walk_east_003.png",
        "./images/warrior/warrior_walk_east_004.png", "./images/warrior/warrior_walk_east_005.png", "./images/warrior/warrior_walk_east_006.png",
        "./images/warrior/warrior_walk_east_007.png", "./images/warrior/warrior_walk_east_008.png"
    ];
    var WARRIOR_WALKING_WEST_IMAGES = [
        "./images/warrior/warrior_walk_west_001.png", "./images/warrior/warrior_walk_west_002.png", "./images/warrior/warrior_walk_west_003.png",
        "./images/warrior/warrior_walk_west_004.png", "./images/warrior/warrior_walk_west_005.png", "./images/warrior/warrior_walk_west_006.png",
        "./images/warrior/warrior_walk_west_007.png", "./images/warrior/warrior_walk_west_008.png"
    ];
    var WARRIOR_ATTACKING_EAST_IMAGES = [
        "./images/warrior/warrior_attack_east_001.png", "./images/warrior/warrior_attack_east_002.png", "./images/warrior/warrior_attack_east_003.png"
    ];
    var WARRIOR_ATTACKING_WEST_IMAGES = [
        "./images/warrior/warrior_attack_west_001.png", "./images/warrior/warrior_attack_west_002.png", "./images/warrior/warrior_attack_west_003.png"
    ];
    var PRINCESS_WALKING_EAST_IMAGES = [
        "./images/princess/princess_walk_east_001.png", "./images/princess/princess_walk_east_002.png", "./images/princess/princess_walk_east_003.png",
        "./images/princess/princess_walk_east_004.png", "./images/princess/princess_walk_east_005.png", "./images/princess/princess_walk_east_006.png",
        "./images/princess/princess_walk_east_007.png", "./images/princess/princess_walk_east_008.png"
    ];
    var PRINCESS_WALKING_WEST_IMAGES = [
        "./images/princess/princess_walk_west_001.png", "./images/princess/princess_walk_west_002.png", "./images/princess/princess_walk_west_003.png",
        "./images/princess/princess_walk_west_004.png", "./images/princess/princess_walk_west_005.png", "./images/princess/princess_walk_west_006.png",
        "./images/princess/princess_walk_west_007.png", "./images/princess/princess_walk_west_008.png"
    ];
    var PRINCESS_ATTACKING_EAST_IMAGES = [
        "./images/princess/princess_attack_east_001.png", "./images/princess/princess_attack_east_002.png", "./images/princess/princess_attack_east_003.png"
    ];
    var PRINCESS_ATTACKING_WEST_IMAGES = [
        "./images/princess/princess_attack_west_001.png", "./images/princess/princess_attack_west_002.png", "./images/princess/princess_attack_west_003.png"
    ];
    var BARBARIAN_WALKING_EAST_IMAGES = [
        "./images/barbarian/barbarian_walk_east_001.png", "./images/barbarian/barbarian_walk_east_002.png", "./images/barbarian/barbarian_walk_east_003.png",
        "./images/barbarian/barbarian_walk_east_004.png", "./images/barbarian/barbarian_walk_east_005.png", "./images/barbarian/barbarian_walk_east_006.png",
        "./images/barbarian/barbarian_walk_east_007.png", "./images/barbarian/barbarian_walk_east_008.png"
    ];
    var BARBARIAN_WALKING_WEST_IMAGES = [
        "./images/barbarian/barbarian_walk_west_001.png", "./images/barbarian/barbarian_walk_west_002.png", "./images/barbarian/barbarian_walk_west_003.png",
        "./images/barbarian/barbarian_walk_west_004.png", "./images/barbarian/barbarian_walk_west_005.png", "./images/barbarian/barbarian_walk_west_006.png",
        "./images/barbarian/barbarian_walk_west_007.png", "./images/barbarian/barbarian_walk_west_008.png"
    ];
    var BARBARIAN_ATTACKING_EAST_IMAGES = [
        "./images/barbarian/barbarian_attack_east_001.png", "./images/barbarian/barbarian_attack_east_002.png", "./images/barbarian/barbarian_attack_east_003.png"
    ];
    var BARBARIAN_ATTACKING_WEST_IMAGES = [
        "./images/barbarian/barbarian_attack_west_001.png", "./images/barbarian/barbarian_attack_west_002.png", "./images/barbarian/barbarian_attack_west_003.png"
    ];
    function characterInitialImageName(characterType) {
        switch (characterType) {
            case characterType_1.CharacterType.Warrior:
                return WARRIOR_INITIAL_IMAGE;
            case characterType_1.CharacterType.Princess:
                return PRINCESS_INITIAL_IMAGE;
            case characterType_1.CharacterType.Barbarian:
                return BARBARIAN_INITIAL_IMAGE;
            default:
                break;
        }
    }
    ImageNames.characterInitialImageName = characterInitialImageName;
    function characterWalkingEastImageNames(characterType) {
        switch (characterType) {
            case characterType_1.CharacterType.Warrior:
                return WARRIOR_WALKING_EAST_IMAGES;
            case characterType_1.CharacterType.Princess:
                return PRINCESS_WALKING_EAST_IMAGES;
            case characterType_1.CharacterType.Barbarian:
                return BARBARIAN_WALKING_EAST_IMAGES;
            default:
                break;
        }
    }
    ImageNames.characterWalkingEastImageNames = characterWalkingEastImageNames;
    function characterWalkingWestImageNames(characterType) {
        switch (characterType) {
            case characterType_1.CharacterType.Warrior:
                return WARRIOR_WALKING_WEST_IMAGES;
            case characterType_1.CharacterType.Princess:
                return PRINCESS_WALKING_WEST_IMAGES;
            case characterType_1.CharacterType.Barbarian:
                return BARBARIAN_WALKING_WEST_IMAGES;
            default:
                break;
        }
    }
    ImageNames.characterWalkingWestImageNames = characterWalkingWestImageNames;
    function characterAttackingEastImageNames(characterType) {
        switch (characterType) {
            case characterType_1.CharacterType.Warrior:
                return WARRIOR_ATTACKING_EAST_IMAGES;
            case characterType_1.CharacterType.Princess:
                return PRINCESS_ATTACKING_EAST_IMAGES;
            case characterType_1.CharacterType.Barbarian:
                return BARBARIAN_ATTACKING_EAST_IMAGES;
            default:
                break;
        }
    }
    ImageNames.characterAttackingEastImageNames = characterAttackingEastImageNames;
    function characterAttackingWestImageNames(characterType) {
        switch (characterType) {
            case characterType_1.CharacterType.Warrior:
                return WARRIOR_ATTACKING_WEST_IMAGES;
            case characterType_1.CharacterType.Princess:
                return PRINCESS_ATTACKING_WEST_IMAGES;
            case characterType_1.CharacterType.Barbarian:
                return BARBARIAN_ATTACKING_WEST_IMAGES;
            default:
                break;
        }
    }
    ImageNames.characterAttackingWestImageNames = characterAttackingWestImageNames;
})(ImageNames = exports.ImageNames || (exports.ImageNames = {}));

},{"../enums/characterType":11}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Scenarios;
(function (Scenarios) {
    Scenarios.SCENARIO_ONE = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    Scenarios.SCENARIO_TWO = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
        [1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 3, 0, 0, 0, 3, 0, 0, 1, 0, 0, 1, 0, 0, 1],
        [1, 0, 5, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 0, 1],
        [1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [0, 2, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1],
        [0, 2, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
})(Scenarios = exports.Scenarios || (exports.Scenarios = {}));

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CharacterImages = (function () {
    function CharacterImages() {
        this.imageDefault = undefined;
        this.imagesWalkingEast = [];
        this.imagesWalkingWest = [];
        this.imagesAttackingEast = [];
        this.imagesAttackingWest = [];
    }
    return CharacterImages;
}());
exports.CharacterImages = CharacterImages;

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
exports.Point = Point;

},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CharacterType;
(function (CharacterType) {
    CharacterType[CharacterType["Warrior"] = 1] = "Warrior";
    CharacterType[CharacterType["Princess"] = 2] = "Princess";
    CharacterType[CharacterType["Barbarian"] = 3] = "Barbarian";
})(CharacterType = exports.CharacterType || (exports.CharacterType = {}));

},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var characterType_1 = require("../enums/characterType");
var imageNames_1 = require("../constants/imageNames");
var characterImages_1 = require("../dtos/characterImages");
var app_1 = require("../app");
var BackstageLoader = (function () {
    function BackstageLoader() {
        var _this = this;
        this.scenarioImages = [];
        this.charactersImages = {};
        this.imagesLeftToLoad = 0;
        this.loadInitialImages = function () {
            _this.imagesLeftToLoad = 0;
            _this.createImageElementForArray(_this.scenarioImages, 0, imageNames_1.ImageNames.GROUND_IMAGE);
            _this.createImageElementForArray(_this.scenarioImages, 1, imageNames_1.ImageNames.WALL_IMAGE);
            _this.createImageElementForArray(_this.scenarioImages, 2, imageNames_1.ImageNames.GOAL_IMAGE);
            _this.createImageElementForArray(_this.scenarioImages, 3, imageNames_1.ImageNames.DOOR_IMAGE);
            _this.createImageElementForArray(_this.scenarioImages, 4, imageNames_1.ImageNames.KEY_IMAGE);
            for (var item in characterType_1.CharacterType) {
                var key = Number(item);
                if (!isNaN(key)) {
                    var chImgs = new characterImages_1.CharacterImages();
                    _this.createImageElement(chImgs.imageDefault, imageNames_1.ImageNames.characterInitialImageName(key));
                    var imagesWalkingEastNames = imageNames_1.ImageNames.characterWalkingEastImageNames(key);
                    var imagesWalkingWestNames = imageNames_1.ImageNames.characterWalkingWestImageNames(key);
                    var imagesAttackingEastNames = imageNames_1.ImageNames.characterAttackingEastImageNames(key);
                    var imagesAttackingWestNames = imageNames_1.ImageNames.characterAttackingWestImageNames(key);
                    for (var imgIndex = 0; imgIndex < imagesWalkingEastNames.length; imgIndex++) {
                        _this.createImageElementForArray(chImgs.imagesWalkingEast, imgIndex, imagesWalkingEastNames[imgIndex]);
                    }
                    for (var imgIndex = 0; imgIndex < imagesWalkingWestNames.length; imgIndex++) {
                        _this.createImageElementForArray(chImgs.imagesWalkingWest, imgIndex, imagesWalkingWestNames[imgIndex]);
                    }
                    for (var imgIndex = 0; imgIndex < imagesAttackingEastNames.length; imgIndex++) {
                        _this.createImageElementForArray(chImgs.imagesAttackingEast, imgIndex, imagesAttackingEastNames[imgIndex]);
                    }
                    for (var imgIndex = 0; imgIndex < imagesAttackingWestNames.length; imgIndex++) {
                        _this.createImageElementForArray(chImgs.imagesAttackingWest, imgIndex, imagesAttackingWestNames[imgIndex]);
                    }
                    _this.charactersImages[key] = chImgs;
                }
            }
        };
        this.createImageElement = function (image, fileName) {
            image = document.createElement("img");
            _this.imagesLeftToLoad++;
            _this.loadImage(image, fileName);
        };
        this.createImageElementForArray = function (imageArray, code, fileName) {
            imageArray[code] = document.createElement("img");
            _this.imagesLeftToLoad++;
            _this.loadImage(imageArray[code], fileName);
        };
        this.loadImage = function (imgVar, imgName) {
            imgVar.onload = _this.registerImageLoaded;
            imgVar.src = imgName;
        };
        this.registerImageLoaded = function () {
            _this.imagesLeftToLoad--;
            if (_this.imagesLeftToLoad === 0) {
                app_1.App.startGame();
            }
        };
    }
    return BackstageLoader;
}());
exports.BackstageLoader = BackstageLoader;

},{"../app":5,"../constants/imageNames":7,"../dtos/characterImages":9,"../enums/characterType":11}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var envConstants_1 = require("../constants/envConstants");
var point_1 = require("../dtos/point");
var Director = (function () {
    function Director(scenario, player, npcs, enemies) {
        var _this = this;
        this.npcs = [];
        this.enemies = [];
        this.signalCharactersToReactToKeyStroke = function (event, keyPressed) {
            _this.player.reactToKeyStroke(event.keyCode, keyPressed);
        };
        this.handleCharacterOnScenario = function (character) {
            var characterHittingPositionsInGrid = [];
            characterHittingPositionsInGrid.push(new point_1.Point(Math.floor(character.position.x / envConstants_1.EnvConstants.WORLD_TILE_WIDTH), Math.floor((character.position.y - envConstants_1.EnvConstants.PLAYER_POSITION_COMPENSATION.y) / envConstants_1.EnvConstants.WORLD_TILE_HEIGHT)));
            characterHittingPositionsInGrid.push(new point_1.Point(Math.floor(character.position.x / envConstants_1.EnvConstants.WORLD_TILE_WIDTH), Math.floor((character.position.y + envConstants_1.EnvConstants.PLAYER_POSITION_COMPENSATION.y) / envConstants_1.EnvConstants.WORLD_TILE_HEIGHT)));
            characterHittingPositionsInGrid.push(new point_1.Point(Math.floor((character.position.x + envConstants_1.EnvConstants.PLAYER_POSITION_COMPENSATION.x) / envConstants_1.EnvConstants.WORLD_TILE_WIDTH), Math.floor(character.position.y / envConstants_1.EnvConstants.WORLD_TILE_HEIGHT)));
            characterHittingPositionsInGrid.push(new point_1.Point(Math.floor((character.position.x - envConstants_1.EnvConstants.PLAYER_POSITION_COMPENSATION.x) / envConstants_1.EnvConstants.WORLD_TILE_WIDTH), Math.floor(character.position.y / envConstants_1.EnvConstants.WORLD_TILE_HEIGHT)));
            characterHittingPositionsInGrid.some(function (hittingPoint) {
                if (hittingPoint.x >= 0 && hittingPoint.x < envConstants_1.EnvConstants.WORLD_COLS && hittingPoint.y >= 0 && hittingPoint.y < envConstants_1.EnvConstants.WORLD_ROWS) {
                    var tileTypeHitted = _this.tileTypeAtColRow(hittingPoint.y, hittingPoint.x);
                    switch (tileTypeHitted) {
                        case 2:
                            break;
                        case 1:
                            character.stopAgainstSurface();
                            return true;
                        default:
                            break;
                    }
                }
            });
        };
        this.tileTypeAtColRow = function (row, col) {
            if (col >= 0 && col < envConstants_1.EnvConstants.WORLD_COLS && row >= 0 && row < envConstants_1.EnvConstants.WORLD_ROWS) {
                return _this.scenario[row][col];
            }
            else {
                return 1;
            }
        };
        this.scenario = scenario;
        this.player = player;
        this.npcs = npcs;
        this.enemies = enemies;
    }
    Director.prototype.continuePlay = function () {
        var _this = this;
        this.player.move();
        this.npcs.forEach(function (n) { return n.move(); });
        this.enemies.forEach(function (e) {
            e.signalPlayerPosition(_this.player.position);
            e.move();
        });
        this.handleCharacterOnScenario(this.player);
        this.enemies.forEach(function (e) { return _this.handleCharacterOnScenario(e); });
        this.npcs.forEach(function (n) { return _this.handleCharacterOnScenario(n); });
    };
    return Director;
}());
exports.Director = Director;

},{"../constants/envConstants":6,"../dtos/point":10}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var envConstants_1 = require("../constants/envConstants");
var characterType_1 = require("../enums/characterType");
var playerBase_1 = require("../actors/playerBase");
var enemyBase_1 = require("../actors/enemyBase");
var scenographer_1 = require("./scenographer");
var backstageLoader_1 = require("./backstageLoader");
var director_1 = require("./director");
var usher_1 = require("./usher");
var Producer = (function () {
    function Producer(canvasContext, playerType, playerName) {
        var _this = this;
        this.npcs = [];
        this.enemies = [];
        this.buildSet = function (initialScenario) {
            console.log('loading scenario...');
            _this.loadScenario(initialScenario);
            console.log('loading characters...');
            _this.loadCharacters();
            console.log('loading workers...');
            _this.backstageLoader = new backstageLoader_1.BackstageLoader();
            _this.scenographer = new scenographer_1.Scenographer(_this.backstageLoader, _this.canvasContext);
            _this.director = new director_1.Director(_this.scenario, _this.player, _this.npcs, _this.enemies);
            _this.usher = new usher_1.Usher(_this.canvasContext, _this.director);
            console.log('loading images...');
            _this.backstageLoader.loadInitialImages();
            console.log('setting participant input...');
            _this.usher.arrangeParticipantInput();
        };
        this.changeSet = function () {
            _this.director.continuePlay();
            _this.scenographer.buildScenario(_this.scenario, _this.player, _this.npcs, _this.enemies);
        };
        this.loadScenario = function (scenario) {
            _this.scenario = scenario.map(function (arr) {
                return arr.slice();
            });
        };
        this.loadCharacters = function () {
            for (var row = 0; row < envConstants_1.EnvConstants.WORLD_ROWS; row++) {
                for (var col = 0; col < envConstants_1.EnvConstants.WORLD_COLS; col++) {
                    if (_this.scenario[row][col] >= 5) {
                        var initialPositionX = col * envConstants_1.EnvConstants.WORLD_TILE_WIDTH + (envConstants_1.EnvConstants.WORLD_TILE_WIDTH / 2);
                        var initialPositionY = row * envConstants_1.EnvConstants.WORLD_TILE_HEIGHT + (envConstants_1.EnvConstants.WORLD_TILE_HEIGHT / 2);
                        switch (_this.scenario[row][col]) {
                            case 5:
                                _this.player = new playerBase_1.PlayerBase(_this.playerType, _this.playerName, initialPositionX, initialPositionY);
                                break;
                            case 6:
                                var barbarian = new enemyBase_1.EnemyBase(characterType_1.CharacterType.Barbarian, initialPositionX, initialPositionY, initialPositionX, initialPositionY, true);
                                _this.enemies.push(barbarian);
                                break;
                        }
                        _this.scenario[row][col] = 0;
                    }
                }
            }
        };
        this.playerType = playerType;
        this.playerName = playerName;
        this.canvasContext = canvasContext;
    }
    return Producer;
}());
exports.Producer = Producer;

},{"../actors/enemyBase":2,"../actors/playerBase":3,"../constants/envConstants":6,"../enums/characterType":11,"./backstageLoader":12,"./director":13,"./scenographer":15,"./usher":16}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var envConstants_1 = require("../constants/envConstants");
var Scenographer = (function () {
    function Scenographer(backstageLoader, canvasContext) {
        var _this = this;
        this.setCharacterImage = function (character) {
            if (character.isAttacking) {
                var images = character.lastWalkingXDirection == 4
                    ? _this.backstageLoader.charactersImages[character.type].imagesAttackingEast
                    : _this.backstageLoader.charactersImages[character.type].imagesAttackingWest;
                character.currentImage = images[character.currentAttackingImageIndex];
                character.moveAttackingImageIndex(images.length);
            }
            else if (character.isWalking) {
                var images = character.lastWalkingXDirection == 4
                    ? _this.backstageLoader.charactersImages[character.type].imagesWalkingEast
                    : _this.backstageLoader.charactersImages[character.type].imagesWalkingWest;
                character.currentImage = images[character.currentWalkingImageIndex];
                character.moveWalkingImageIndex(images.length);
            }
            else {
                character.currentImage = character.lastWalkingXDirection === 4
                    ? _this.backstageLoader.charactersImages[character.type].imagesWalkingEast[0]
                    : _this.backstageLoader.charactersImages[character.type].imagesWalkingWest[0];
            }
        };
        this.putCharactersOnScenario = function (player, npcs, enemies) {
            _this.drawImageCenteredWithRotation(player.currentImage, player.position.x, player.position.y, envConstants_1.EnvConstants.IMAGE_DEFAULT_ANG);
            npcs.forEach(function (npc) {
                return _this.drawImageCenteredWithRotation(npc.currentImage, npc.position.x, npc.position.y, envConstants_1.EnvConstants.IMAGE_DEFAULT_ANG);
            });
            enemies.forEach(function (enemy) {
                return _this.drawImageCenteredWithRotation(enemy.currentImage, enemy.position.x, enemy.position.y, envConstants_1.EnvConstants.IMAGE_DEFAULT_ANG);
            });
        };
        this.tileHasTransparency = function (tileType) {
            return (tileType == 4 || tileType == 2 || tileType == 3);
        };
        this.drawImageCenteredWithRotation = function (img, atX, atY, ang) {
            _this.canvasContext.save();
            _this.canvasContext.translate(atX, atY);
            _this.canvasContext.rotate(ang);
            _this.canvasContext.drawImage(img, -img.width / 2, -img.height / 2);
            _this.canvasContext.restore();
        };
        this.drawRect = function (positionX, positionY, width, height, drawColor) {
            _this.canvasContext.fillStyle = drawColor;
            _this.canvasContext.fillRect(positionX, positionY, width, height);
        };
        this.drawCircle = function (centerX, centerY, radius, color) {
            _this.canvasContext.fillStyle = color;
            _this.canvasContext.beginPath();
            _this.canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
            _this.canvasContext.fill();
        };
        this.drawText = function (text, textX, textY, color) {
            _this.canvasContext.fillStyle = color;
            _this.canvasContext.fillText(text, textX, textY);
        };
        this.drawMousePointer = function (mousePosX, mousePosY) {
            var mouseWorldCol = Math.floor(mousePosX / envConstants_1.EnvConstants.WORLD_TILE_WIDTH);
            var mouseWorldRow = Math.floor(mousePosY / envConstants_1.EnvConstants.WORLD_TILE_HEIGHT);
            _this.drawText(mouseWorldCol + ',' + mouseWorldRow, mousePosX, mousePosY, 'yellow');
        };
        this.drawImage = function (img, atX, atY) {
            _this.canvasContext.drawImage(img, atX, atY);
        };
        this.backstageLoader = backstageLoader;
        this.canvasContext = canvasContext;
    }
    Scenographer.prototype.buildScenario = function (scenario, player, npcs, enemies) {
        var _this = this;
        var tilePosX = 0;
        var tilePosY = 0;
        for (var row = 0; row < envConstants_1.EnvConstants.WORLD_ROWS; row++) {
            for (var col = 0; col < envConstants_1.EnvConstants.WORLD_COLS; col++) {
                var tileType = scenario[row][col];
                var useImg = tileType <= 4
                    ? this.backstageLoader.scenarioImages[tileType]
                    : this.backstageLoader.scenarioImages[0];
                if (this.tileHasTransparency(tileType)) {
                    this.drawImage(this.backstageLoader.scenarioImages[0], tilePosX, tilePosY);
                }
                this.drawImage(useImg, tilePosX, tilePosY);
                tilePosX += envConstants_1.EnvConstants.WORLD_TILE_WIDTH;
            }
            tilePosX = 0;
            tilePosY += envConstants_1.EnvConstants.WORLD_TILE_HEIGHT;
        }
        this.setCharacterImage(player);
        enemies.forEach(function (e) { return _this.setCharacterImage(e); });
        npcs.forEach(function (n) { return _this.setCharacterImage(n); });
        this.putCharactersOnScenario(player, npcs, enemies);
    };
    return Scenographer;
}());
exports.Scenographer = Scenographer;

},{"../constants/envConstants":6}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Usher = (function () {
    function Usher(canvasContext, director) {
        var _this = this;
        this.arrangeParticipantInput = function () {
            _this.canvasContext.canvas.addEventListener('mousedown', _this.manageMouseDown);
            document.addEventListener('keydown', _this.manageKeyPressed);
            document.addEventListener('keyup', _this.manageKeyReleased);
        };
        this.manageKeyPressed = function (event) {
            _this.director.signalCharactersToReactToKeyStroke(event, true);
            event.preventDefault();
        };
        this.manageKeyReleased = function (event) {
            _this.director.signalCharactersToReactToKeyStroke(event, false);
            event.preventDefault();
        };
        this.calculateMousePosition = function (canvasContext, event) {
            var rect = canvasContext.canvas.getBoundingClientRect();
            var root = document.documentElement;
            _this.mousePosInWorldX = event.clientX - rect.left - root.scrollLeft;
            _this.mousePosInWorldY = event.clientY - rect.top - root.scrollTop;
            return {
                x: _this.mousePosInWorldX,
                y: _this.mousePosInWorldY
            };
        };
        this.manageMouseDown = function (event) { };
        this.canvasContext = canvasContext;
        this.director = director;
    }
    return Usher;
}());
exports.Usher = Usher;

},{}]},{},[5]);
