import { EnvConstants } from '../envConstants';
import { Scenarios } from '../scenarios'
import { WorldTileType } from '../enums/worldTileType';
import { GraphicsManager } from '../graphicsManager'
import { Character } from './character';
import { ImagesManager } from '../imagesManager'

export class World {

    private worldGrid: number[][];
    player: Character;
    npcs: Character[];
    canvasContext: any;
    mousePosInWorldX: number;
    mousePosInWorldY: number;

    constructor(canvasContext: any, player: Character, initialNpcs: Character[])  {
        this.canvasContext = canvasContext;
        this.player = player;
        this.npcs = initialNpcs;
    }

    loadScenario(scenario) {
        this.worldGrid = scenario.map(function(arr) {
            return arr.slice();
        });
        //TODO: initialize proper characters
    }

    drawWorld() {
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
    }

    warriorWorldHandling(characterInstance: Character) {
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

    manageKeyPressed(event: any) {
        this.signalCharactersToReactToKeyStroke(event, true);
        event.preventDefault();
    }
    
    manageKeyReleased(event: any) {
        this.signalCharactersToReactToKeyStroke(event, false);
        event.preventDefault();
    }

    signalCharactersToReactToKeyStroke(event: any, keyPressed: boolean) {
        this.player.reactToKeyStroke(event.keyCode, keyPressed);
        this.npcs.forEach(npc => npc.reactToKeyStroke(event.keyCode, keyPressed));
    }

    private tileHasTransparency(tileType: number) {
        return (tileType == WorldTileType.Key || tileType == WorldTileType.Goal || tileType == WorldTileType.Door);
    }

    private tileTypeAtColRow(row: number, col: number) {
        if (col >= 0 && col < EnvConstants.WORLD_COLS && row >= 0 && row < EnvConstants.WORLD_ROWS) {
            return this.worldGrid[row][col];
        } else {
            return WorldTileType.Wall;
        }
    }

    private calculateMousePosition(event: any) {
        let rect = this.canvasContext.getBoundingClientRect();
        let root = document.documentElement;
        this.mousePosInWorldX = event.clientX - rect.left - root.scrollLeft;
        this.mousePosInWorldY = event.clientY - rect.top - root.scrollTop;
    
        return {
            x: this.mousePosInWorldX,
            y: this.mousePosInWorldY
        };
    }
}