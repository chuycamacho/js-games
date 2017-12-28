import { EnvConstants } from '../constants/envConstants';
import { ScenarioTileType } from '../enums/scenarioTileType';
import { Enemy } from '../actors/enemy';
import { Player } from '../actors/player';
import { Character } from '../actors/character';
import { Point } from '../dtos/point';

export class Director {

    private scenario: number[][];
    private player: Player;
    private npcs: Enemy[] = [];
    private enemies: Enemy[] = [];

    constructor(scenario: number[][], player: Player, npcs: Enemy[], enemies: Enemy[]) {
        this.scenario = scenario;
        this.player = player;
        this.npcs = npcs;
        this.enemies = enemies;
    }

    public continuePlay() {
        this.player.move();
        this.npcs.forEach(n => n.move());
        this.enemies.forEach(e => {
            e.signalPlayerPosition(this.player.position);
            e.move();
        });

        this.handleCharacterOnScenario(this.player);
        this.enemies.forEach(e => this.handleCharacterOnScenario(e));
        this.npcs.forEach(n => this.handleCharacterOnScenario(n));
    }

    public signalCharactersToReactToKeyStroke = (event: any, keyPressed: boolean): void => {
        this.player.reactToKeyStroke(event.keyCode, keyPressed);
    }

    private handleCharacterOnScenario = (character: Character): void => {
        let characterHittingPositionsInGrid: Point[] = [];
        characterHittingPositionsInGrid.push(new Point(Math.floor(character.position.x / EnvConstants.WORLD_TILE_WIDTH), Math.floor((character.position.y - EnvConstants.PLAYER_POSITION_COMPENSATION.y) / EnvConstants.WORLD_TILE_HEIGHT)));
        characterHittingPositionsInGrid.push(new Point(Math.floor(character.position.x / EnvConstants.WORLD_TILE_WIDTH), Math.floor((character.position.y + EnvConstants.PLAYER_POSITION_COMPENSATION.y) / EnvConstants.WORLD_TILE_HEIGHT)));
        characterHittingPositionsInGrid.push(new Point(Math.floor((character.position.x + EnvConstants.PLAYER_POSITION_COMPENSATION.x) / EnvConstants.WORLD_TILE_WIDTH), Math.floor(character.position.y / EnvConstants.WORLD_TILE_HEIGHT)));
        characterHittingPositionsInGrid.push(new Point(Math.floor((character.position.x - EnvConstants.PLAYER_POSITION_COMPENSATION.x) / EnvConstants.WORLD_TILE_WIDTH), Math.floor(character.position.y / EnvConstants.WORLD_TILE_HEIGHT)));

        characterHittingPositionsInGrid.some(hittingPoint => {
            if (hittingPoint.x >= 0 && hittingPoint.x < EnvConstants.WORLD_COLS && hittingPoint.y >= 0 && hittingPoint.y < EnvConstants.WORLD_ROWS) {
                let tileTypeHitted = this.tileTypeAtColRow(hittingPoint.y, hittingPoint.x);
                switch (tileTypeHitted) {
                    case ScenarioTileType.Goal:
                        break;
                    case ScenarioTileType.Wall:
                        character.stopAgainstSurface();
                        return true;
                    default:
                        break;
                }
            }
        });
    }

    private tileTypeAtColRow = (row: number, col: number): number => {
        if (col >= 0 && col < EnvConstants.WORLD_COLS && row >= 0 && row < EnvConstants.WORLD_ROWS) {
            return this.scenario[row][col];
        } else {
            return ScenarioTileType.Wall;
        }
    }
}