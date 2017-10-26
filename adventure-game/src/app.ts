import { EnvConstants } from './envConstants';
import { WorldBuilder } from './worldBuilder';
import { Scenarios } from './scenarios';
import { CharacterType } from './enums/characterType';

export module App {
    let canvas: HTMLCanvasElement;
    let canvasContext: CanvasRenderingContext2D;
    let worldBuilderInstance: WorldBuilder;

    window.onload = function () : void {
        console.log('setting up game...');
        canvas = <HTMLCanvasElement> document.getElementById('gameCanvas');
        canvasContext = canvas.getContext('2d');
        
        worldBuilderInstance = new WorldBuilder(canvasContext, CharacterType.Princess, 'SchonePrinzessin');
        worldBuilderInstance.buildWorld(Scenarios.SCENARIO_ONE);
    }

    export function startGame() {
        setInterval(updateEnvironment(worldBuilderInstance), 1000 / EnvConstants.FRAMES_PER_SECOND);
        console.log('starting game...');
    }

    function updateEnvironment(worldBuilder: WorldBuilder) : void {
        worldBuilder.changeWorld();
    }
}