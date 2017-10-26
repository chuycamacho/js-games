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
//# sourceMappingURL=worldBuilder.js.map