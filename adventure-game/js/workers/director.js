"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var envConstants_1 = require("../constants/envConstants");
var Director = (function () {
    function Director(scenario, player, npcs, enemies) {
        var _this = this;
        this.npcs = [];
        this.enemies = [];
        this.signalCharactersToReactToKeyStroke = function (event, keyPressed) {
            _this.player.reactToKeyStroke(event.keyCode, keyPressed);
        };
        this.handlePlayerOnScenario = function () {
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
        this.player.move();
        this.enemies.forEach(function (e) { return e.move(); });
        this.npcs.forEach(function (n) { return n.move(); });
        this.handlePlayerOnScenario();
    };
    return Director;
}());
exports.Director = Director;
//# sourceMappingURL=director.js.map