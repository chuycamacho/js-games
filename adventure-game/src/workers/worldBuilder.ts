import { EnvConstants } from '../constants/envConstants';
import { WorldTileType } from '../enums/worldTileType';
import { Scenographer } from './scenographer'
import { Character } from '../actors/character';
import { Player } from '../actors/player';
import { ImagesLoader } from './imagesLoader'
import { CharacterType } from '../enums/characterType';
import { PlayerBase } from '../actors/playerBase';
import { Direction } from '../enums/direction';

export class WorldBuilder {

    private imagesLoader: ImagesLoader;
    private scenographer: Scenographer;

    private worldGrid: number[][];
    private playerType: CharacterType;
    private playerName: string;
    private canvasContext: CanvasRenderingContext2D;
    private player: Player;
    private npcs: Character[] = [];
    private enemies: Character[] = [];

    public mousePosInWorldX: number;
    public mousePosInWorldY: number;

    constructor(canvasContext: CanvasRenderingContext2D, playerType: CharacterType, playerName: string) {
        this.canvasContext = canvasContext;
        this.playerType = playerType;
        this.playerName = playerName;
        this.setupEventHooks();

        this.imagesLoader = new ImagesLoader();
        this.scenographer = new Scenographer(this.imagesLoader, this.canvasContext);
    }

    public buildWorld = (initialScenario: number[][]): void => {
        console.log('loading initial scenario...');
        this.loadScenario(initialScenario);

        console.log('loading characters...');
        this.loadCharacters();

        console.log('loading images...');
        this.imagesLoader.loadInitialImages();
    }

    public loadScenario = (scenario: number[][]): void => {
        this.worldGrid = scenario.map(function (arr) {
            return arr.slice();
        });
    }

    private loadCharacters = (): void => {
        for (let row = 0; row < EnvConstants.WORLD_ROWS; row++) {
            for (let col = 0; col < EnvConstants.WORLD_COLS; col++) {
                if (this.worldGrid[row][col] == EnvConstants.WORLD_PLAYER) {
                    this.player = new PlayerBase(this.playerType, this.playerName, true);

                    this.worldGrid[row][col] = EnvConstants.WORLD_GROUND;
                    this.player.positionX = col * EnvConstants.WORLD_TILE_WIDTH + (EnvConstants.WORLD_TILE_WIDTH / 2);
                    this.player.positionY = row * EnvConstants.WORLD_TILE_HEIGHT + (EnvConstants.WORLD_TILE_HEIGHT / 2);
                    return;
                }
            }
        }

    }

    public changeWorld = (): void => {
        this.player.move();
        this.enemies.forEach(e => e.move());
        this.npcs.forEach(n => n.move());

        this.handlePlayerInWorld();
        this.setCharacterImage(this.player);

        this.scenographer.drawWorld(this.worldGrid);
        this.scenographer.drawCharacters(this.player, this.npcs, this.enemies);
    }

    private setCharacterImage = (character: Character): void => {
        if (character.isWalking) {
            let walkingImages = character.lastWalkingXDirection == Direction.East
                ? this.imagesLoader.charactersImages[character.type].imagesWalkingEast
                : this.imagesLoader.charactersImages[character.type].imagesWalkingWest;

            character.currentImage = walkingImages[character.currentWalkingImage];
            character.currentWalkingImage += 1;
            if (character.currentWalkingImage >= walkingImages.length) {
                character.currentWalkingImage = 0;
            }
        } else {
            character.currentImage = character.lastWalkingXDirection === Direction.East
                ? this.imagesLoader.charactersImages[character.type].imagesWalkingEast[0]
                : this.imagesLoader.charactersImages[character.type].imagesWalkingWest[0];
        }
    }

    public handlePlayerInWorld = (): void => {
        let characterPositionCol = Math.floor(this.player.positionX / EnvConstants.WORLD_TILE_WIDTH);
        let characterPositionRow = Math.floor(this.player.positionY / EnvConstants.WORLD_TILE_HEIGHT);
        //TODO: improve collision detection, do not use the center of the player as a reference!
        if (characterPositionCol >= 0 && characterPositionCol < EnvConstants.WORLD_COLS && characterPositionRow >= 0 && characterPositionRow < EnvConstants.WORLD_ROWS) {
            let tileTypeHitted = this.tileTypeAtColRow(characterPositionRow, characterPositionCol);
            switch (tileTypeHitted) {
                case WorldTileType.Goal:

                    break;
                case WorldTileType.Wall:
                    this.player.stopAgainstSurface();
                    break;
                default:
                    break;
            }
        }
    }

    private setupEventHooks = (): void => {
        this.canvasContext.canvas.addEventListener('mousedown', this.manageMouseDown);
        document.addEventListener('keydown', this.manageKeyPressed);
        document.addEventListener('keyup', this.manageKeyReleased);
    }

    private manageMouseDown = (event: any): void => { }

    private manageKeyPressed = (event: any): void => {
        this.signalCharactersToReactToKeyStroke(event, true);
        event.preventDefault();
    }

    private manageKeyReleased = (event: any): void => {
        this.signalCharactersToReactToKeyStroke(event, false);
        event.preventDefault();
    }

    private signalCharactersToReactToKeyStroke = (event: any, keyPressed: boolean): void => {
        this.player.reactToKeyStroke(event.keyCode, keyPressed);
    }

    private tileTypeAtColRow = (row: number, col: number): number => {
        if (col >= 0 && col < EnvConstants.WORLD_COLS && row >= 0 && row < EnvConstants.WORLD_ROWS) {
            return this.worldGrid[row][col];
        } else {
            return WorldTileType.Wall;
        }
    }

    private calculateMousePosition = (event: any): any => {
        let rect = this.canvasContext.canvas.getBoundingClientRect();
        let root = document.documentElement;
        this.mousePosInWorldX = event.clientX - rect.left - root.scrollLeft;
        this.mousePosInWorldY = event.clientY - rect.top - root.scrollTop;

        return {
            x: this.mousePosInWorldX,
            y: this.mousePosInWorldY
        };
    }
}