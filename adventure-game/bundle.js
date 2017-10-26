(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var envConstants_1 = require("./envConstants");
var worldBuilder_1 = require("./worldBuilder");
var scenarios_1 = require("./scenarios");
var characterType_1 = require("./enums/characterType");
var App;
(function (App) {
    var canvas;
    var canvasContext;
    var worldBuilderInstance;
    window.onload = function () {
        console.log('setting up game...');
        canvas = document.getElementById('gameCanvas');
        canvasContext = canvas.getContext('2d');
        worldBuilderInstance = new worldBuilder_1.WorldBuilder(canvasContext, characterType_1.CharacterType.Princess, 'SchonePrinzessin');
        worldBuilderInstance.buildWorld(scenarios_1.Scenarios.SCENARIO_ONE);
    };
    function startGame() {
        setInterval(updateEnvironment(worldBuilderInstance), 1000 / envConstants_1.EnvConstants.FRAMES_PER_SECOND);
        console.log('starting game...');
    }
    App.startGame = startGame;
    function updateEnvironment(worldBuilder) {
        worldBuilder.changeWorld();
    }
})(App = exports.App || (exports.App = {}));

},{"./enums/characterType":6,"./envConstants":7,"./scenarios":11,"./worldBuilder":12}],2:[function(require,module,exports){
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

},{"../envConstants":7}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CharacterControl = (function () {
    function CharacterControl(mainPlayer) {
        this.KEY_UP_ARROW = 38;
        this.KEY_RIGHT_ARROW = 39;
        this.KEY_DOWN_ARROW = 40;
        this.KEY_LEFT_ARROW = 37;
        this.KEY_W = 87;
        this.KEY_D = 68;
        this.KEY_S = 83;
        this.KEY_A = 65;
        this.controlKeyUp = mainPlayer ? this.KEY_UP_ARROW : this.KEY_W;
        this.controlKeyRight = mainPlayer ? this.KEY_RIGHT_ARROW : this.KEY_D;
        this.controlKeyDown = mainPlayer ? this.KEY_DOWN_ARROW : this.KEY_S;
        this.controlKeyLeft = mainPlayer ? this.KEY_LEFT_ARROW : this.KEY_A;
    }
    return CharacterControl;
}());
exports.CharacterControl = CharacterControl;

},{}],4:[function(require,module,exports){
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

},{"../imagesManager":10,"./characterBase":2,"./characterControl":3}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CharacterImages = (function () {
    function CharacterImages() {
        this.imageDefault = undefined;
        this.imagesWalkingEast = [];
        this.imagesWalkingWest = [];
    }
    return CharacterImages;
}());
exports.CharacterImages = CharacterImages;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CharacterType;
(function (CharacterType) {
    CharacterType[CharacterType["Warrior"] = 1] = "Warrior";
    CharacterType[CharacterType["Princess"] = 2] = "Princess";
})(CharacterType = exports.CharacterType || (exports.CharacterType = {}));

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EnvConstants;
(function (EnvConstants) {
    EnvConstants.FRAMES_PER_SECOND = 30;
    EnvConstants.DEFAULT_CHARACTER_SPEED = 3;
    EnvConstants.IMAGE_DEFAULT_ANG = 0;
    EnvConstants.WORLD_TILE_WIDTH = 40;
    EnvConstants.WORLD_TILE_HEIGHT = 40;
    EnvConstants.WORLD_GAP = 2;
    EnvConstants.WORLD_COLS = 20;
    EnvConstants.WORLD_ROWS = 15;
    EnvConstants.WORLD_GROUND = 0;
    EnvConstants.WORLD_WALL = 1;
    EnvConstants.WORLD_GOAL = 2;
    EnvConstants.WORLD_DOOR = 3;
    EnvConstants.WORLD_KEY = 4;
    EnvConstants.WORLD_PLAYER = 5;
})(EnvConstants = exports.EnvConstants || (exports.EnvConstants = {}));

},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var envConstants_1 = require("./envConstants");
var GraphicsManager;
(function (GraphicsManager) {
    function drawImageCenteredWithRotation(canvasContext, img, atX, atY, ang) {
        console.log('drawing character...', img, atX, atY, ang);
        canvasContext.save();
        canvasContext.translate(atX, atY);
        canvasContext.rotate(ang);
        canvasContext.drawImage(img, -img.width / 2, -img.height / 2);
        canvasContext.restore();
    }
    GraphicsManager.drawImageCenteredWithRotation = drawImageCenteredWithRotation;
    function drawRect(canvasContext, positionX, positionY, width, height, drawColor) {
        canvasContext.fillStyle = drawColor;
        canvasContext.fillRect(positionX, positionY, width, height);
    }
    GraphicsManager.drawRect = drawRect;
    function drawCircle(canvasContext, centerX, centerY, radius, color) {
        canvasContext.fillStyle = color;
        canvasContext.beginPath();
        canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
        canvasContext.fill();
    }
    GraphicsManager.drawCircle = drawCircle;
    function drawText(canvasContext, text, textX, textY, color) {
        canvasContext.fillStyle = color;
        canvasContext.fillText(text, textX, textY);
    }
    GraphicsManager.drawText = drawText;
    function drawMousePointer(canvasContext, mousePosX, mousePosY) {
        var mouseWorldCol = Math.floor(mousePosX / envConstants_1.EnvConstants.WORLD_TILE_WIDTH);
        var mouseWorldRow = Math.floor(mousePosY / envConstants_1.EnvConstants.WORLD_TILE_HEIGHT);
        drawText(canvasContext, mouseWorldCol + ',' + mouseWorldRow, mousePosX, mousePosY, 'yellow');
    }
    GraphicsManager.drawMousePointer = drawMousePointer;
    function drawImage(canvasContext, img, atX, atY) {
        canvasContext.drawImage(img, atX, atY);
    }
    GraphicsManager.drawImage = drawImage;
})(GraphicsManager = exports.GraphicsManager || (exports.GraphicsManager = {}));

},{"./envConstants":7}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var characterType_1 = require("./enums/characterType");
var ImageNames;
(function (ImageNames) {
    ImageNames.WARRIOR_INITIAL_IMAGE = "./images/warrior/warrior_standing_east.png";
    ImageNames.PRINCESS_INITIAL_IMAGE = "./images/princess/princess_standing_east.png";
    ImageNames.GROUND_IMAGE = "./images/world_ground.png";
    ImageNames.WALL_IMAGE = "./images/world_wall.png";
    ImageNames.GOAL_IMAGE = "./images/world_goal.png";
    ImageNames.DOOR_IMAGE = "./images/world_door.png";
    ImageNames.KEY_IMAGE = "./images/world_key.png";
    ImageNames.WARRIOR_WALKING_EAST_IMAGES = [
        "./images/warrior/warrior_walk_east_001.png", "./images/warrior/warrior_walk_east_002.png", "./images/warrior/warrior_walk_east_003.png",
        "./images/warrior/warrior_walk_east_004.png", "./images/warrior/warrior_walk_east_005.png", "./images/warrior/warrior_walk_east_006.png",
        "./images/warrior/warrior_walk_east_007.png", "./images/warrior/warrior_walk_east_008.png"
    ];
    ImageNames.WARRIOR_WALKING_WEST_IMAGES = [
        "./images/warrior/warrior_walk_west_001.png", "./images/warrior/warrior_walk_west_002.png", "./images/warrior/warrior_walk_west_003.png",
        "./images/warrior/warrior_walk_west_004.png", "./images/warrior/warrior_walk_west_005.png", "./images/warrior/warrior_walk_west_006.png",
        "./images/warrior/warrior_walk_west_007.png", "./images/warrior/warrior_walk_west_008.png"
    ];
    ImageNames.PRINCESS_WALKING_EAST_IMAGES = [
        "./images/princess/princess_walk_east_001.png", "./images/princess/princess_walk_east_002.png", "./images/princess/princess_walk_east_003.png",
        "./images/princess/princess_walk_east_004.png", "./images/princess/princess_walk_east_005.png", "./images/princess/princess_walk_east_006.png",
        "./images/princess/princess_walk_east_007.png", "./images/princess/princess_walk_east_008.png"
    ];
    ImageNames.PRINCESS_WALKING_WEST_IMAGES = [
        "./images/princess/princess_walk_west_001.png", "./images/princess/princess_walk_west_002.png", "./images/princess/princess_walk_west_003.png",
        "./images/princess/princess_walk_west_004.png", "./images/princess/princess_walk_west_005.png", "./images/princess/princess_walk_west_006.png",
        "./images/princess/princess_walk_west_007.png", "./images/princess/princess_walk_west_008.png"
    ];
    function characterInitialImageName(characterType) {
        switch (characterType) {
            case characterType_1.CharacterType.Warrior:
                return ImageNames.WARRIOR_INITIAL_IMAGE;
            case characterType_1.CharacterType.Princess:
                return ImageNames.PRINCESS_INITIAL_IMAGE;
            default:
                break;
        }
    }
    ImageNames.characterInitialImageName = characterInitialImageName;
    function characterWalkingEastImageNames(characterType) {
        switch (characterType) {
            case characterType_1.CharacterType.Warrior:
                return ImageNames.WARRIOR_WALKING_EAST_IMAGES;
            case characterType_1.CharacterType.Princess:
                return ImageNames.PRINCESS_WALKING_EAST_IMAGES;
            default:
                break;
        }
    }
    ImageNames.characterWalkingEastImageNames = characterWalkingEastImageNames;
    function characterWalkingWestImageNames(characterType) {
        switch (characterType) {
            case characterType_1.CharacterType.Warrior:
                return ImageNames.WARRIOR_WALKING_WEST_IMAGES;
            case characterType_1.CharacterType.Princess:
                return ImageNames.PRINCESS_WALKING_WEST_IMAGES;
            default:
                break;
        }
    }
    ImageNames.characterWalkingWestImageNames = characterWalkingWestImageNames;
})(ImageNames = exports.ImageNames || (exports.ImageNames = {}));

},{"./enums/characterType":6}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var characterType_1 = require("./enums/characterType");
var envConstants_1 = require("./envConstants");
var imageNames_1 = require("./imageNames");
var characterImages_1 = require("./dtos/characterImages");
var app_1 = require("./app");
var ImagesManager;
(function (ImagesManager) {
    ImagesManager.worldImages = [];
    ImagesManager.charactersImages = {};
    var imagesLeftToLoad = 0;
    function loadInitialImages() {
        imagesLeftToLoad = 0;
        createImageElementForArray(ImagesManager.worldImages, envConstants_1.EnvConstants.WORLD_GROUND, imageNames_1.ImageNames.GROUND_IMAGE);
        createImageElementForArray(ImagesManager.worldImages, envConstants_1.EnvConstants.WORLD_WALL, imageNames_1.ImageNames.WALL_IMAGE);
        createImageElementForArray(ImagesManager.worldImages, envConstants_1.EnvConstants.WORLD_GOAL, imageNames_1.ImageNames.GOAL_IMAGE);
        createImageElementForArray(ImagesManager.worldImages, envConstants_1.EnvConstants.WORLD_DOOR, imageNames_1.ImageNames.DOOR_IMAGE);
        createImageElementForArray(ImagesManager.worldImages, envConstants_1.EnvConstants.WORLD_KEY, imageNames_1.ImageNames.KEY_IMAGE);
        for (var item in characterType_1.CharacterType) {
            var key = Number(item);
            if (!isNaN(key)) {
                var chImgs = new characterImages_1.CharacterImages();
                createImageElement(chImgs.imageDefault, imageNames_1.ImageNames.characterInitialImageName(key));
                for (var imgIndex = 0; imgIndex < imageNames_1.ImageNames.characterWalkingEastImageNames(key).length; imgIndex++) {
                    createImageElementForArray(chImgs.imagesWalkingEast, imgIndex, imageNames_1.ImageNames.characterWalkingEastImageNames(key)[imgIndex]);
                }
                for (var imgIndex = 0; imgIndex < imageNames_1.ImageNames.characterWalkingWestImageNames(key).length; imgIndex++) {
                    createImageElementForArray(chImgs.imagesWalkingWest, imgIndex, imageNames_1.ImageNames.characterWalkingWestImageNames(key)[imgIndex]);
                }
                ImagesManager.charactersImages[key] = chImgs;
            }
        }
    }
    ImagesManager.loadInitialImages = loadInitialImages;
    function createImageElement(image, fileName) {
        image = document.createElement("img");
        imagesLeftToLoad++;
        loadImage(image, fileName);
    }
    function createImageElementForArray(imageArray, code, fileName) {
        imageArray[code] = document.createElement("img");
        imagesLeftToLoad++;
        loadImage(imageArray[code], fileName);
    }
    function loadImage(imgVar, imgName) {
        imgVar.onload = registerImageLoaded;
        imgVar.src = imgName;
    }
    function registerImageLoaded() {
        imagesLeftToLoad--;
        if (imagesLeftToLoad === 0) {
            console.log('images loaded...');
            app_1.App.startGame();
        }
    }
})(ImagesManager = exports.ImagesManager || (exports.ImagesManager = {}));

},{"./app":1,"./dtos/characterImages":5,"./enums/characterType":6,"./envConstants":7,"./imageNames":9}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Scenarios;
(function (Scenarios) {
    Scenarios.SCENARIO_ONE = [
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

},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var envConstants_1 = require("./envConstants");
var graphicsManager_1 = require("./graphicsManager");
var imagesManager_1 = require("./imagesManager");
var playerBase_1 = require("./domain/playerBase");
var WorldBuilder = (function () {
    function WorldBuilder(canvasContext, playerType, playerName) {
        var _this = this;
        this.npcs = [];
        this.enemies = [];
        this.buildWorld = function (initialScenario) {
            console.log('loading initial scenario...');
            _this.loadScenario(initialScenario);
            console.log('loading characters...');
            _this.loadCharacters();
            console.log('loading images...');
            imagesManager_1.ImagesManager.loadInitialImages();
        };
        this.loadScenario = function (scenario) {
            _this.worldGrid = scenario.map(function (arr) {
                return arr.slice();
            });
        };
        this.loadCharacters = function () {
            for (var row = 0; row < envConstants_1.EnvConstants.WORLD_ROWS; row++) {
                for (var col = 0; col < envConstants_1.EnvConstants.WORLD_COLS; col++) {
                    if (_this.worldGrid[row][col] == envConstants_1.EnvConstants.WORLD_PLAYER) {
                        _this.player = new playerBase_1.PlayerBase(_this.playerType, _this.playerName, true);
                        _this.worldGrid[row][col] = envConstants_1.EnvConstants.WORLD_GROUND;
                        _this.player.positionX = col * envConstants_1.EnvConstants.WORLD_TILE_WIDTH + (envConstants_1.EnvConstants.WORLD_TILE_WIDTH / 2);
                        _this.player.positionY = row * envConstants_1.EnvConstants.WORLD_TILE_HEIGHT + (envConstants_1.EnvConstants.WORLD_TILE_HEIGHT / 2);
                        return;
                    }
                }
            }
        };
        this.changeWorld = function () {
            _this.player.move();
            _this.enemies.forEach(function (e) { return e.move(); });
            _this.npcs.forEach(function (n) { return n.move(); });
            _this.HandlePlayerInWorld();
            _this.drawWorld();
        };
        this.drawWorld = function () {
            var tilePosX = 0;
            var tilePosY = 0;
            for (var row = 0; row < envConstants_1.EnvConstants.WORLD_ROWS; row++) {
                for (var col = 0; col < envConstants_1.EnvConstants.WORLD_COLS; col++) {
                    var tileType = _this.worldGrid[row][col];
                    var useImg = tileType <= 4
                        ? imagesManager_1.ImagesManager.worldImages[tileType]
                        : imagesManager_1.ImagesManager.worldImages[envConstants_1.EnvConstants.WORLD_GROUND];
                    if (_this.tileHasTransparency(tileType)) {
                        graphicsManager_1.GraphicsManager.drawImage(_this.canvasContext, imagesManager_1.ImagesManager.worldImages[0], tilePosX, tilePosY);
                    }
                    graphicsManager_1.GraphicsManager.drawImage(_this.canvasContext, useImg, tilePosX, tilePosY);
                    tilePosX += envConstants_1.EnvConstants.WORLD_TILE_WIDTH;
                }
                tilePosX = 0;
                tilePosY += envConstants_1.EnvConstants.WORLD_TILE_HEIGHT;
            }
            _this.drawCharacters();
        };
        this.drawCharacters = function () {
            graphicsManager_1.GraphicsManager.drawImageCenteredWithRotation(_this.canvasContext, _this.player.currentImage, _this.player.positionX, _this.player.positionY, envConstants_1.EnvConstants.IMAGE_DEFAULT_ANG);
            _this.npcs.forEach(function (npc) {
                return graphicsManager_1.GraphicsManager.drawImageCenteredWithRotation(_this.canvasContext, npc.currentImage, npc.positionX, npc.positionY, envConstants_1.EnvConstants.IMAGE_DEFAULT_ANG);
            });
            _this.enemies.forEach(function (enemy) {
                return graphicsManager_1.GraphicsManager.drawImageCenteredWithRotation(_this.canvasContext, enemy.currentImage, enemy.positionX, enemy.positionY, envConstants_1.EnvConstants.IMAGE_DEFAULT_ANG);
            });
        };
        this.HandlePlayerInWorld = function () {
            var characterPositionCol = Math.floor(_this.player.positionX / envConstants_1.EnvConstants.WORLD_TILE_WIDTH);
            var characterPositionRow = Math.floor(_this.player.positionY / envConstants_1.EnvConstants.WORLD_TILE_HEIGHT);
            if (characterPositionCol >= 0 && characterPositionCol < envConstants_1.EnvConstants.WORLD_COLS && characterPositionRow >= 0 && characterPositionRow < envConstants_1.EnvConstants.WORLD_ROWS) {
                var tileTypeHitted = _this.tileTypeAtColRow(characterPositionRow, characterPositionCol);
                if (tileTypeHitted == 2) {
                }
                else if (tileTypeHitted != 0) {
                    _this.player.speed *= -0.5;
                }
            }
        };
        this.setupEventHooks = function () {
            _this.canvasContext.canvas.addEventListener('mousedown', _this.manageMouseDown);
            document.addEventListener('keydown', _this.manageKeyPressed);
            document.addEventListener('keyup', _this.manageKeyReleased);
        };
        this.manageMouseDown = function (event) {
        };
        this.manageKeyPressed = function (event) {
            _this.signalCharactersToReactToKeyStroke(event, true);
            event.preventDefault();
        };
        this.manageKeyReleased = function (event) {
            _this.signalCharactersToReactToKeyStroke(event, false);
            event.preventDefault();
        };
        this.signalCharactersToReactToKeyStroke = function (event, keyPressed) {
            _this.player.reactToKeyStroke(event.keyCode, keyPressed);
        };
        this.tileHasTransparency = function (tileType) {
            return (tileType == 4 || tileType == 2 || tileType == 2);
        };
        this.tileTypeAtColRow = function (row, col) {
            if (col >= 0 && col < envConstants_1.EnvConstants.WORLD_COLS && row >= 0 && row < envConstants_1.EnvConstants.WORLD_ROWS) {
                return _this.worldGrid[row][col];
            }
            else {
                return 1;
            }
        };
        this.calculateMousePosition = function (event) {
            var rect = _this.canvasContext.canvas.getBoundingClientRect();
            var root = document.documentElement;
            _this.mousePosInWorldX = event.clientX - rect.left - root.scrollLeft;
            _this.mousePosInWorldY = event.clientY - rect.top - root.scrollTop;
            return {
                x: _this.mousePosInWorldX,
                y: _this.mousePosInWorldY
            };
        };
        this.canvasContext = canvasContext;
        this.playerType = playerType;
        this.playerName = playerName;
        this.setupEventHooks();
    }
    return WorldBuilder;
}());
exports.WorldBuilder = WorldBuilder;

},{"./domain/playerBase":4,"./envConstants":7,"./graphicsManager":8,"./imagesManager":10}]},{},[1]);
