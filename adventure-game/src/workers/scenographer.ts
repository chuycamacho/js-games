import { EnvConstants } from '../constants/envConstants';
import { ScenarioTileType } from '../enums/scenarioTileType';
import { BackstageLoader } from './backstageLoader'
import { Character } from '../actors/character';
import { Direction } from '../enums/direction';

export class Scenographer {
    
    private backstageLoader: BackstageLoader;
    private canvasContext: CanvasRenderingContext2D

    constructor(backstageLoader: BackstageLoader, canvasContext: CanvasRenderingContext2D) {
        this.backstageLoader = backstageLoader;
        this.canvasContext = canvasContext;
    }

    public buildScenario(scenario: number[][], player: Character, npcs: Character[], enemies: Character[]) {
        let tilePosX = 0;
        let tilePosY = 0;
        for (let row = 0; row < EnvConstants.WORLD_ROWS; row++) {
            for (let col = 0; col < EnvConstants.WORLD_COLS; col++) {
                let tileType = scenario[row][col];
                let useImg = tileType <= 4
                    ? this.backstageLoader.scenarioImages[tileType]
                    : this.backstageLoader.scenarioImages[ScenarioTileType.Ground];
                if (this.tileHasTransparency(tileType)) {
                    this.drawImage(this.backstageLoader.scenarioImages[ScenarioTileType.Ground], tilePosX, tilePosY);
                }
                this.drawImage(useImg, tilePosX, tilePosY);
                tilePosX += EnvConstants.WORLD_TILE_WIDTH;
            }
            tilePosX = 0;
            tilePosY += EnvConstants.WORLD_TILE_HEIGHT;
        }
        this.setCharacterImage(player);
        this.putCharactersOnScenario(player, npcs, enemies);
    }

    private setCharacterImage = (character: Character): void => {
        if (character.isWalking) {
            let walkingImages = character.lastWalkingXDirection == Direction.East
                ? this.backstageLoader.charactersImages[character.type].imagesWalkingEast
                : this.backstageLoader.charactersImages[character.type].imagesWalkingWest;

            character.currentImage = walkingImages[character.currentWalkingImage];
            character.currentWalkingImage += 1;
            if (character.currentWalkingImage >= walkingImages.length) {
                character.currentWalkingImage = 0;
            }
        } else {
            character.currentImage = character.lastWalkingXDirection === Direction.East
                ? this.backstageLoader.charactersImages[character.type].imagesWalkingEast[0]
                : this.backstageLoader.charactersImages[character.type].imagesWalkingWest[0];
        }
    }

    private putCharactersOnScenario = (player: Character, npcs: Character[], enemies: Character[]): void => {
        this.drawImageCenteredWithRotation(player.currentImage, player.positionX, player.positionY, EnvConstants.IMAGE_DEFAULT_ANG);

        npcs.forEach(npc =>
            this.drawImageCenteredWithRotation(npc.currentImage, npc.positionX, npc.positionY, EnvConstants.IMAGE_DEFAULT_ANG)
        );

        enemies.forEach(enemy =>
            this.drawImageCenteredWithRotation(enemy.currentImage, enemy.positionX, enemy.positionY, EnvConstants.IMAGE_DEFAULT_ANG)
        );
    }

    private tileHasTransparency = (tileType: number): boolean => {
        return (tileType == ScenarioTileType.Key || tileType == ScenarioTileType.Goal || tileType == ScenarioTileType.Door);
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