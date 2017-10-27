import { EnvConstants } from '../constants/envConstants';
import { WorldBuilder } from './worldBuilder';
import { WorldTileType } from '../enums/worldTileType';
import { ImagesLoader } from './imagesLoader'
import { Character } from '../actors/character';

export class Scenographer {
    
    private imagesLoader: ImagesLoader;
    private canvasContext: CanvasRenderingContext2D

    constructor(imagesLoader: ImagesLoader, canvasContext: CanvasRenderingContext2D) {
        this.imagesLoader = imagesLoader;
        this.canvasContext = canvasContext;
    }

    public drawWorld(worldGrid: number[][]) {
        let tilePosX = 0;
        let tilePosY = 0;
        for (let row = 0; row < EnvConstants.WORLD_ROWS; row++) {
            for (let col = 0; col < EnvConstants.WORLD_COLS; col++) {
                let tileType = worldGrid[row][col];
                let useImg = tileType <= 4
                    ? this.imagesLoader.worldImages[tileType]
                    : this.imagesLoader.worldImages[EnvConstants.WORLD_GROUND];
                if (this.tileHasTransparency(tileType)) {
                    this.drawImage(this.imagesLoader.worldImages[WorldTileType.Ground], tilePosX, tilePosY);
                }
                this.drawImage(useImg, tilePosX, tilePosY);
                tilePosX += EnvConstants.WORLD_TILE_WIDTH;
            }
            tilePosX = 0;
            tilePosY += EnvConstants.WORLD_TILE_HEIGHT;
        }
    }

    public drawCharacters = (player: Character, npcs: Character[], enemies: Character[]): void => {
        this.drawImageCenteredWithRotation(player.currentImage, player.positionX, player.positionY, EnvConstants.IMAGE_DEFAULT_ANG);

        npcs.forEach(npc =>
            this.drawImageCenteredWithRotation(npc.currentImage, npc.positionX, npc.positionY, EnvConstants.IMAGE_DEFAULT_ANG)
        );

        enemies.forEach(enemy =>
            this.drawImageCenteredWithRotation(enemy.currentImage, enemy.positionX, enemy.positionY, EnvConstants.IMAGE_DEFAULT_ANG)
        );
    }

    private tileHasTransparency = (tileType: number): boolean => {
        return (tileType == WorldTileType.Key || tileType == WorldTileType.Goal || tileType == WorldTileType.Door);
    }

    private drawImageCenteredWithRotation = (img: HTMLImageElement, atX: number, atY: number, ang: number): void  => {
        this.canvasContext.save();
        this.canvasContext.translate(atX, atY);
        this.canvasContext.rotate(ang);
        this.canvasContext.drawImage(img, -img.width / 2, -img.height / 2);
        this.canvasContext.restore();
    }

    private drawRect = (positionX: number, positionY: number, width: number, height: number, drawColor: any): void => {
        this.canvasContext.fillStyle = drawColor;
        this.canvasContext.fillRect(positionX, positionY, width, height);
    }

    private drawCircle = (centerX: number, centerY: number, radius: number, color: any): void => {
        this.canvasContext.fillStyle = color;
        this.canvasContext.beginPath();
        this.canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
        this.canvasContext.fill();
    }

    private drawText = (text: string, textX: number, textY: number, color: any): void => {
        this.canvasContext.fillStyle = color;
        this.canvasContext.fillText(text, textX, textY);
    }

    private drawMousePointer = (mousePosX: number, mousePosY: number): void => {
        let mouseWorldCol = Math.floor(mousePosX / EnvConstants.WORLD_TILE_WIDTH);
        let mouseWorldRow = Math.floor(mousePosY / EnvConstants.WORLD_TILE_HEIGHT);
        this.drawText(mouseWorldCol + ',' + mouseWorldRow, mousePosX, mousePosY, 'yellow');
    }

    private drawImage = (img: any, atX: number, atY: number): void => {
        this.canvasContext.drawImage(img, atX, atY);
    }

}