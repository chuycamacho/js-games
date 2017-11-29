import { CharacterType } from '../enums/characterType';
import { ScenarioTileType } from '../enums/scenarioTileType';
import { ImageNames } from '../constants/imageNames';
import { CharacterImages } from '../dtos/characterImages';
import { App } from '../app';

export class BackstageLoader {

    public scenarioImages: HTMLImageElement[] = [];
    public charactersImages: { [id: number]: CharacterImages; } = {};

    private imagesLeftToLoad = 0;

    public loadInitialImages = (): void => {

        this.imagesLeftToLoad = 0;

        this.createImageElementForArray(this.scenarioImages, ScenarioTileType.Ground, ImageNames.GROUND_IMAGE);
        this.createImageElementForArray(this.scenarioImages, ScenarioTileType.Wall, ImageNames.WALL_IMAGE);
        this.createImageElementForArray(this.scenarioImages, ScenarioTileType.Goal, ImageNames.GOAL_IMAGE);
        this.createImageElementForArray(this.scenarioImages, ScenarioTileType.Door, ImageNames.DOOR_IMAGE);
        this.createImageElementForArray(this.scenarioImages, ScenarioTileType.Key, ImageNames.KEY_IMAGE);

        for (let item in CharacterType) {
            let key = Number(item);
            if (!isNaN(key)) {

                let chImgs = new CharacterImages();

                this.createImageElement(chImgs.imageDefault, ImageNames.characterInitialImageName(key));

                let imagesWalkingEastNames = ImageNames.characterWalkingEastImageNames(key);
                let imagesWalkingWestNames = ImageNames.characterWalkingWestImageNames(key);
                let imagesAttackingEastNames = ImageNames.characterAttackingEastImageNames(key);
                let imagesAttackingWestNames = ImageNames.characterAttackingWestImageNames(key);

                for (let imgIndex = 0; imgIndex < imagesWalkingEastNames.length; imgIndex++) {
                    this.createImageElementForArray(chImgs.imagesWalkingEast, imgIndex, imagesWalkingEastNames[imgIndex]);
                }

                for (let imgIndex = 0; imgIndex < imagesWalkingWestNames.length; imgIndex++) {
                    this.createImageElementForArray(chImgs.imagesWalkingWest, imgIndex, imagesWalkingWestNames[imgIndex]);
                }

                for (let imgIndex = 0; imgIndex < imagesAttackingEastNames.length; imgIndex++) {
                    this.createImageElementForArray(chImgs.imagesAttackingEast, imgIndex, imagesAttackingEastNames[imgIndex]);
                }

                for (let imgIndex = 0; imgIndex < imagesAttackingWestNames.length; imgIndex++) {
                    this.createImageElementForArray(chImgs.imagesAttackingWest, imgIndex, imagesAttackingWestNames[imgIndex]);
                }

                this.charactersImages[key] = chImgs;
            }
        }
    }

    private createImageElement = (image: HTMLImageElement, fileName: string): void => {
        image = document.createElement("img");
        this.imagesLeftToLoad++;
        this.loadImage(image, fileName);
    }

    private createImageElementForArray = (imageArray: HTMLImageElement[], code: number, fileName: string): void => {
        imageArray[code] = document.createElement("img");
        this.imagesLeftToLoad++;
        this.loadImage(imageArray[code], fileName);
    }

    private loadImage = (imgVar: HTMLImageElement, imgName: string): void => {
        imgVar.onload = this.registerImageLoaded;
        imgVar.src = imgName;
    }

    private registerImageLoaded = (): void => {
        this.imagesLeftToLoad--;
        if (this.imagesLeftToLoad === 0) {
            App.startGame();
        }
    }
}