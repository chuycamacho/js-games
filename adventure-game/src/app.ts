import { EnvConstants } from './envConstants';
import { WorldBuilder } from './worldBuilder';
import { Scenarios } from './scenarios';
import { CharacterType } from './enums/characterType';

export module App {
    let canvas: HTMLCanvasElement;
    let canvasContext: CanvasRenderingContext2D;

    window.onload = function () : void {
        canvas = <HTMLCanvasElement> document.getElementById('gameCanvas');
        canvasContext = canvas.getContext('2d');
        
        let worldBuilderInstance = new WorldBuilder(canvasContext, CharacterType.Princess, 'SchonePrinzessin', Scenarios.SCENARIO_ONE);
        worldBuilderInstance.loadScenario(Scenarios.SCENARIO_ONE);

        setInterval(updateEnvironment(worldBuilderInstance), 1000 / EnvConstants.FRAMES_PER_SECOND);
    }

    function updateEnvironment(worldBuilder: WorldBuilder) : void {
        worldBuilder.changeWorld();
    }
}