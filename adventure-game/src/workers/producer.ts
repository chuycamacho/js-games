import { EnvConstants } from '../constants/envConstants';
import { ScenarioTileType } from '../enums/scenarioTileType';
import { Scenographer } from './scenographer'
import { Character } from '../actors/character';
import { Player } from '../actors/player';
import { BackstageLoader } from './backstageLoader'
import { CharacterType } from '../enums/characterType';
import { PlayerBase } from '../actors/playerBase';
import { Director } from './director';
import { Usher } from './usher';

export class Producer {

    private canvasContext: CanvasRenderingContext2D

    private backstageLoader: BackstageLoader;
    private scenographer: Scenographer;
    private director: Director;
    private usher: Usher;

    private playerType: CharacterType;
    private playerName: string;

    private scenario: number[][];
    private player: Player;
    private npcs: Character[] = [];
    private enemies: Character[] = [];

    constructor(canvasContext: CanvasRenderingContext2D, playerType: CharacterType, playerName: string) {
        this.playerType = playerType;
        this.playerName = playerName;
        this.canvasContext = canvasContext;    
    }

    public buildSet = (initialScenario: number[][]): void => {
        console.log('loading scenario...');
        this.loadScenario(initialScenario);

        console.log('loading characters...');
        this.loadCharacters();

        console.log('loading workers...');
        this.backstageLoader = new BackstageLoader();
        this.scenographer = new Scenographer(this.backstageLoader, this.canvasContext);
        this.director = new Director(this.scenario, this.player, this.npcs, this.enemies);
        this.usher = new Usher(this.canvasContext, this.director);

        console.log('loading images...');
        this.backstageLoader.loadInitialImages();

        console.log('setting participant input...');
        this.usher.arrangeParticipantInput();
    }

    public changeSet = (): void => {
        this.director.continuePlay();
        this.scenographer.buildScenario(this.scenario, this.player, this.npcs, this.enemies);
    }

    private loadScenario = (scenario: number[][]): void => {
        this.scenario = scenario.map(function (arr) {
            return arr.slice();
        });
    }

    private loadCharacters = (): void => {
        for (let row = 0; row < EnvConstants.WORLD_ROWS; row++) {
            for (let col = 0; col < EnvConstants.WORLD_COLS; col++) {
                if (this.scenario[row][col] == ScenarioTileType.Player) {
                    this.player = new PlayerBase(this.playerType, this.playerName);

                    this.scenario[row][col] = ScenarioTileType.Ground;
                    this.player.positionX = col * EnvConstants.WORLD_TILE_WIDTH + (EnvConstants.WORLD_TILE_WIDTH / 2);
                    this.player.positionY = row * EnvConstants.WORLD_TILE_HEIGHT + (EnvConstants.WORLD_TILE_HEIGHT / 2);
                }
            }
        }

    }
}