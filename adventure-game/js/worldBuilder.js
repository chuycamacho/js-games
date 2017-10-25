"use strict";
exports.__esModule = true;
var envConstants_1 = require("./envConstants");
var graphicsManager_1 = require("./graphicsManager");
var imagesManager_1 = require("./imagesManager");
var playerBase_1 = require("./domain/playerBase");
var WorldBuilder = (function () {
    function WorldBuilder(canvasContext, playerType, playerName, initialScenario) {
        var _this = this;
        this.loadScenario = function (scenario) {
            _this.worldGrid = scenario.map(function (arr) {
                return arr.slice();
            });
            _this.loadCharacters();
            imagesManager_1.ImagesManager.loadInitialImages();
        };
        this.changeWorld = function () {
            _this.player.move();
            _this.enemies.forEach(function (e) { return e.move(); });
            _this.npcs.forEach(function (n) { return n.move(); });
            _this.HandlePayerInWorld();
            _this.drawWorld();
        };
        this.loadCharacters = function () {
            _this.player = new playerBase_1.PlayerBase(_this.playerType, _this.playerName, true);
        };
        this.drawWorld = function () {
            var tilePosX = 0;
            var tilePosY = 0;
            for (var row = 0; row < envConstants_1.EnvConstants.WORLD_ROWS; row++) {
                for (var col = 0; col < envConstants_1.EnvConstants.WORLD_COLS; col++) {
                    var tileType = _this.worldGrid[row][col];
                    var useImg = imagesManager_1.ImagesManager.worldImages[tileType];
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
            graphicsManager_1.GraphicsManager.drawImageCenteredWithRotation(_this.canvasContext, _this.player.image, _this.player.positionX, _this.player.positionY, envConstants_1.EnvConstants.IMAGE_DEFAULT_ANG);
            _this.npcs.forEach(function (npc) {
                return graphicsManager_1.GraphicsManager.drawImageCenteredWithRotation(_this.canvasContext, npc.image, npc.positionX, npc.positionY, envConstants_1.EnvConstants.IMAGE_DEFAULT_ANG);
            });
            _this.enemies.forEach(function (enemy) {
                return graphicsManager_1.GraphicsManager.drawImageCenteredWithRotation(_this.canvasContext, enemy.image, enemy.positionX, enemy.positionY, envConstants_1.EnvConstants.IMAGE_DEFAULT_ANG);
            });
        };
        this.HandlePayerInWorld = function () {
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
        this.loadScenario(initialScenario);
    }
    return WorldBuilder;
}());
exports.WorldBuilder = WorldBuilder;
//# sourceMappingURL=worldBuilder.js.map