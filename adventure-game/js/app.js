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
//# sourceMappingURL=app.js.map