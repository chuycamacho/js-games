"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var envConstants_1 = require("../constants/envConstants");
var scenographer_1 = require("./scenographer");
var imagesLoader_1 = require("./imagesLoader");
var playerBase_1 = require("../actors/playerBase");
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
            _this.imagesLoader.loadInitialImages();
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
            _this.handlePlayerInWorld();
            _this.setCharacterImage(_this.player);
            _this.scenographer.drawWorld(_this.worldGrid);
            _this.scenographer.drawCharacters(_this.player, _this.npcs, _this.enemies);
        };
        this.setCharacterImage = function (character) {
            if (character.isWalking) {
                var walkingImages = character.lastWalkingXDirection == 4
                    ? _this.imagesLoader.charactersImages[character.type].imagesWalkingEast
                    : _this.imagesLoader.charactersImages[character.type].imagesWalkingWest;
                character.currentImage = walkingImages[character.currentWalkingImage];
                character.currentWalkingImage += 1;
                if (character.currentWalkingImage >= walkingImages.length) {
                    character.currentWalkingImage = 0;
                }
            }
            else {
                character.currentImage = character.lastWalkingXDirection === 4
                    ? _this.imagesLoader.charactersImages[character.type].imagesWalkingEast[0]
                    : _this.imagesLoader.charactersImages[character.type].imagesWalkingWest[0];
            }
        };
        this.handlePlayerInWorld = function () {
            var characterPositionCol = Math.floor(_this.player.positionX / envConstants_1.EnvConstants.WORLD_TILE_WIDTH);
            var characterPositionRow = Math.floor(_this.player.positionY / envConstants_1.EnvConstants.WORLD_TILE_HEIGHT);
            if (characterPositionCol >= 0 && characterPositionCol < envConstants_1.EnvConstants.WORLD_COLS && characterPositionRow >= 0 && characterPositionRow < envConstants_1.EnvConstants.WORLD_ROWS) {
                var tileTypeHitted = _this.tileTypeAtColRow(characterPositionRow, characterPositionCol);
                switch (tileTypeHitted) {
                    case 2:
                        break;
                    case 1:
                        _this.player.stopAgainstSurface();
                        break;
                    default:
                        break;
                }
            }
        };
        this.setupEventHooks = function () {
            _this.canvasContext.canvas.addEventListener('mousedown', _this.manageMouseDown);
            document.addEventListener('keydown', _this.manageKeyPressed);
            document.addEventListener('keyup', _this.manageKeyReleased);
        };
        this.manageMouseDown = function (event) { };
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
        this.imagesLoader = new imagesLoader_1.ImagesLoader();
        this.scenographer = new scenographer_1.Scenographer(this.imagesLoader, this.canvasContext);
    }
    return WorldBuilder;
}());
exports.WorldBuilder = WorldBuilder;
//# sourceMappingURL=worldBuilder.js.map