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
//# sourceMappingURL=app.js.map