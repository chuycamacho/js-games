import { EnvConstants } from '../constants/envConstants';
import { ScenarioTileType } from '../enums/scenarioTileType';
import { Character } from '../actors/character';
import { Player } from '../actors/player';

export class Director {

    private scenario: number[][];
    private player: Player;
    private npcs: Character[] = [];
    private enemies: Character[] = [];

    constructor(scenario: number[][], player: Player, npcs: Character[], enemies: Character[]) {
        this.scenario = scenario;
        this.player = player;
        this.npcs = npcs;
        this.enemies = enemies;
    }

    public continuePlay() {
        this.player.move();
        this.enemies.forEach(e => e.move());
        this.npcs.forEach(n => n.move());

        this.handlePlayerOnScenario();
    }

    public signalCharactersToReactToKeyStroke = (event: any, keyPressed: boolean): void => {
        this.player.reactToKeyStroke(event.keyCode, keyPressed);
    }

    private handlePlayerOnScenario = (): void => {
        let characterPositionCol = Math.floor(this.player.positionX / EnvConstants.WORLD_TILE_WIDTH);
        let characterPositionRow = Math.floor(this.player.positionY / EnvConstants.WORLD_TILE_HEIGHT);
        //TODO: improve collision detection, do not use the center of the player as a reference!
        if (characterPositionCol >= 0 && characterPositionCol < EnvConstants.WORLD_COLS && characterPositionRow >= 0 && characterPositionRow < EnvConstants.WORLD_ROWS) {
            let tileTypeHitted = this.tileTypeAtColRow(characterPositionRow, characterPositionCol);
            switch (tileTypeHitted) {
                case ScenarioTileType.Goal:

                    break;
                case ScenarioTileType.Wall:
                    this.player.stopAgainstSurface();
                    break;
                default:
                    break;
            }
        }
    }

    private tileTypeAtColRow = (row: number, col: number): number => {
        if (col >= 0 && col < EnvConstants.WORLD_COLS && row >= 0 && row < EnvConstants.WORLD_ROWS) {
            return this.scenario[row][col];
        } else {
            return ScenarioTileType.Wall;
        }
    }
}