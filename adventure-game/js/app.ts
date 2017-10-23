import { EnvConstants } from './envConstants';
import { ImagesManager } from './imagesManager';
import { World } from './domain/world';
import { Character } from './domain/character';
import { PlayerPrincess } from './domain/playerPrincess';
import { Scenarios } from './scenarios';
import { CharacterType } from './enums/characterType';

export module App {
    let canvas: HTMLCanvasElement;
    let canvasContext: CanvasRenderingContext2D;

    window.onload = function () : void {
        canvas = <HTMLCanvasElement> document.getElementById('gameCanvas');
        canvasContext = canvas.getContext('2d');
        
        let worldInstance = new World(canvasContext, CharacterType.Princess, Scenarios.SCENARIO_ONE);
        worldInstance.loadScenario(Scenarios.SCENARIO_ONE);

        setInterval(updateEnvironment(worldInstance), 1000 / EnvConstants.FRAMES_PER_SECOND);
    }

    function updateEnvironment(world: World) : void {
        world.changeWorld();
    }
}