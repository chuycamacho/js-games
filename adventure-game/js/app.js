"use strict";
exports.__esModule = true;
var envConstants_1 = require("./envConstants");
var worldBuilder_1 = require("./worldBuilder");
var scenarios_1 = require("./scenarios");
var characterType_1 = require("./enums/characterType");
var App;
(function (App) {
    var canvas;
    var canvasContext;
    window.onload = function () {
        canvas = document.getElementById('gameCanvas');
        canvasContext = canvas.getContext('2d');
        var worldBuilderInstance = new worldBuilder_1.WorldBuilder(canvasContext, characterType_1.CharacterType.Princess, 'SchonePrinzessin', scenarios_1.Scenarios.SCENARIO_ONE);
        worldBuilderInstance.loadScenario(scenarios_1.Scenarios.SCENARIO_ONE);
        setInterval(updateEnvironment(worldBuilderInstance), 1000 / envConstants_1.EnvConstants.FRAMES_PER_SECOND);
    };
    function updateEnvironment(worldBuilder) {
        worldBuilder.changeWorld();
    }
})(App = exports.App || (exports.App = {}));
//# sourceMappingURL=app.js.map