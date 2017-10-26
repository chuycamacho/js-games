import { EnvConstants } from './envConstants';
import { WorldTileType } from './enums/worldTileType';
import { GraphicsManager } from './graphicsManager'
import { Character } from './domain/character';
import { Player } from './domain/player';
import { ImagesManager } from './imagesManager'
import { CharacterType } from './enums/characterType';
import { PlayerBase } from './domain/playerBase';

export class WorldBuilder {

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
    }

    public buildWorld = (initialScenario: number[][]): void => {
        console.log('loading initial scenario...');
        this.loadScenario(initialScenario);

        console.log('loading characters...');
        this.loadCharacters();

        console.log('loading images...');
        ImagesManager.loadInitialImages();
    }

    public loadScenario = (scenario: number[][]): void => {
        this.worldGrid = scenario.map(function (arr) {
            return arr.slice();
        });
    }

    private loadCharacters = (): void => {
        //TODO: create the character instances (npcs and enemies) depending on their presences in the Scenario
        for (let row = 0; row <EnvConstants.WORLD_ROWS; row++) {
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

        this.HandlePlayerInWorld();

        this.drawWorld();
    }

    private drawWorld = (): void => {
        let tilePosX = 0;
        let tilePosY = 0;
        for (let row = 0; row < EnvConstants.WORLD_ROWS; row++) {
            for (let col = 0; col < EnvConstants.WORLD_COLS; col++) {
                let tileType = this.worldGrid[row][col];
                let useImg = tileType <= 4
                    ? ImagesManager.worldImages[tileType]
                    : ImagesManager.worldImages[EnvConstants.WORLD_GROUND];
                if (this.tileHasTransparency(tileType)) {
                    GraphicsManager.drawImage(this.canvasContext, ImagesManager.worldImages[WorldTileType.Ground], tilePosX, tilePosY);
                }
                GraphicsManager.drawImage(this.canvasContext, useImg, tilePosX, tilePosY);
                tilePosX += EnvConstants.WORLD_TILE_WIDTH;
            }
            tilePosX = 0;
            tilePosY += EnvConstants.WORLD_TILE_HEIGHT;
        }
        this.drawCharacters();
    }

    private drawCharacters = (): void => {
        GraphicsManager.drawImageCenteredWithRotation(this.canvasContext, this.player.currentImage, this.player.positionX, this.player.positionY, EnvConstants.IMAGE_DEFAULT_ANG);

        this.npcs.forEach(npc =>
            GraphicsManager.drawImageCenteredWithRotation(this.canvasContext, npc.currentImage, npc.positionX, npc.positionY, EnvConstants.IMAGE_DEFAULT_ANG)
        );

        this.enemies.forEach(enemy =>
            GraphicsManager.drawImageCenteredWithRotation(this.canvasContext, enemy.currentImage, enemy.positionX, enemy.positionY, EnvConstants.IMAGE_DEFAULT_ANG)
        );
    }

    public HandlePlayerInWorld = (): void => {
        let characterPositionCol = Math.floor(this.player.positionX / EnvConstants.WORLD_TILE_WIDTH);
        let characterPositionRow = Math.floor(this.player.positionY / EnvConstants.WORLD_TILE_HEIGHT);

        if (characterPositionCol >= 0 && characterPositionCol < EnvConstants.WORLD_COLS && characterPositionRow >= 0 && characterPositionRow < EnvConstants.WORLD_ROWS) {
            let tileTypeHitted = this.tileTypeAtColRow(characterPositionRow, characterPositionCol);

            if (tileTypeHitted == WorldTileType.Goal) {
                //TODO: do something for the Transition between scenarios
            } else if (tileTypeHitted != WorldTileType.Ground) {
                this.player.speed *= -0.5;
            }
        }
    }

    private setupEventHooks = (): void => {
        this.canvasContext.canvas.addEventListener('mousedown', this.manageMouseDown);
        document.addEventListener('keydown', this.manageKeyPressed);
        document.addEventListener('keyup', this.manageKeyReleased);
    }

    private manageMouseDown = (event: any): void => {

    }

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

    private tileHasTransparency = (tileType: number): boolean => {
        return (tileType == WorldTileType.Key || tileType == WorldTileType.Goal || tileType == WorldTileType.Door);
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