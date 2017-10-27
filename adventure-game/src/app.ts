import { EnvConstants } from './constants/envConstants';
import { WorldBuilder } from './workers/worldBuilder';
import { Scenarios } from './constants/scenarios';
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
        console.log('starting game...');
        setInterval(updateEnvironment, 1000 / EnvConstants.FRAMES_PER_SECOND);
    }

    function updateEnvironment() : void {
        worldBuilderInstance.changeWorld();
    }
}