import { EnvConstants } from './constants/envConstants';
import { Producer } from './workers/producer';
import { Scenarios } from './constants/scenarios';
import { CharacterType } from './enums/characterType';

export module App {
    let canvas: HTMLCanvasElement;
    let canvasContext: CanvasRenderingContext2D;
    let producer: Producer;

    window.onload = function () : void {
        console.log('setting up game...');
        canvas = <HTMLCanvasElement> document.getElementById('gameCanvas');
        canvasContext = canvas.getContext('2d');
        
        producer = new Producer(canvasContext, CharacterType.Warrior, 'TheWarrior');
        producer.buildSet(Scenarios.SCENARIO_ONE);
    }

    export function startGame() {
        console.log('starting game...');
        setInterval(updateEnvironment, 1000 / EnvConstants.FRAMES_PER_SECOND);
    }

    function updateEnvironment() : void {
        producer.changeSet();
    }
}