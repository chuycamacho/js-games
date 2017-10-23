import { EnvConstants } from '../envConstants';
import { Scenarios } from '../scenarios'
import { WorldTileType } from '../enums/worldTileType';
import { GraphicsManager } from '../graphicsManager'
import { Character } from './character';
import { Player } from './player';
import { ImagesManager } from '../imagesManager'
import { CharacterType } from '../enums/characterType';
import { PlayerPrincess } from './playerPrincess';

export class World {

    private worldGrid: number[][];
    private playerType: CharacterType;
    private canvasContext: CanvasRenderingContext2D ;
    private player: Player;
    private npcs: Character[];
    private enemies: Character[];
    
    public mousePosInWorldX: number;
    public mousePosInWorldY: number;

    constructor(canvasContext: CanvasRenderingContext2D, playerType: CharacterType, initialScenario: number[][])  {
        this.canvasContext = canvasContext;
        this.playerType = playerType;
        this.setupInput();
        this.loadScenario(initialScenario);
    }

    public loadScenario = (scenario: number[][]): void => {
        this.worldGrid = scenario.map(function(arr) {
            return arr.slice();
        });
        this.loadCharacters();
        ImagesManager.loadInitialImages(this.player, this.npcs, this.enemies);
    }

    public changeWorld = (): void => {
        //TODO: make the characters move
        this.drawWorld();
    }

    private loadCharacters = (): void => {
        //TODO: create the character instances (npcs and enemies) depending on their presences in the Scenario
        //TODO: create a player factory
        this.player = new PlayerPrincess('Princess', true);
    }

    private drawWorld = (): void => {
        let tilePosX = 0;
        let tilePosY = 0;
        for (let row = 0; row < EnvConstants.WORLD_ROWS; row++) {
            for (let col = 0; col < EnvConstants.WORLD_COLS; col++) {
                let tileType = this.worldGrid[row][col];
                let useImg = ImagesManager.worldImages[tileType];
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
        GraphicsManager.drawImageCenteredWithRotation(this.canvasContext, this.player.image, this.player.positionX, this.player.positionY, EnvConstants.IMAGE_DEFAULT_ANG);
        
        this.npcs.forEach(npc => 
            GraphicsManager.drawImageCenteredWithRotation(this.canvasContext, npc.image, npc.positionX, npc.positionY, EnvConstants.IMAGE_DEFAULT_ANG)
        );

        this.enemies.forEach(enemy => 
            GraphicsManager.drawImageCenteredWithRotation(this.canvasContext, enemy.image, enemy.positionX, enemy.positionY, EnvConstants.IMAGE_DEFAULT_ANG)
        );
    }

    public warriorWorldHandling = (characterInstance: Character): void => {
        let characterPositionCol = Math.floor(characterInstance.positionX / EnvConstants.WORLD_TILE_WIDTH);
        let characterPositionRow = Math.floor(characterInstance.positionY / EnvConstants.WORLD_TILE_HEIGHT);

        if (characterPositionCol >= 0 && characterPositionCol < EnvConstants.WORLD_COLS && characterPositionRow >= 0 && characterPositionRow < EnvConstants.WORLD_ROWS) {
            let tileTypeHitted = this.tileTypeAtColRow(characterPositionRow, characterPositionCol);

            if (tileTypeHitted == WorldTileType.Goal) {
                //TODO: do something for the Transition between scenarios
            } else if (tileTypeHitted != WorldTileType.Ground) {
                //avoid the character to get stuck into the wall:TODO: check if still necessary
                // characterInstance.positionX -= Math.cos(characterInstance.ang) * characterInstance.speed;
                // characterInstance.positionY -= Math.sin(characterInstance.ang) * characterInstance.speed;
                characterInstance.speed *= -0.5;
            }
        }
    }

    private setupInput = (): void => {
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