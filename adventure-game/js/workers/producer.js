"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var envConstants_1 = require("../constants/envConstants");
var scenographer_1 = require("./scenographer");
var backstageLoader_1 = require("./backstageLoader");
var playerBase_1 = require("../actors/playerBase");
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
                    if (_this.scenario[row][col] == 5) {
                        _this.player = new playerBase_1.PlayerBase(_this.playerType, _this.playerName);
                        _this.scenario[row][col] = 0;
                        _this.player.positionX = col * envConstants_1.EnvConstants.WORLD_TILE_WIDTH + (envConstants_1.EnvConstants.WORLD_TILE_WIDTH / 2);
                        _this.player.positionY = row * envConstants_1.EnvConstants.WORLD_TILE_HEIGHT + (envConstants_1.EnvConstants.WORLD_TILE_HEIGHT / 2);
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
//# sourceMappingURL=producer.js.map