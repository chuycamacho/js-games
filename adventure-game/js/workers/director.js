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
//# sourceMappingURL=director.js.map