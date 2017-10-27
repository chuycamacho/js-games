import { CharacterType } from '../enums/characterType';
import { Player } from '../actors/player';
import { EnvConstants } from '../constants/envConstants';
import { ImageNames } from '../constants/imageNames';
import { CharacterImages } from '../dtos/characterImages';
import { App } from '../app';

export class ImagesLoader {

    public worldImages: HTMLImageElement[] = [];
    public charactersImages: { [id: number]: CharacterImages; } = {};

    private imagesLeftToLoad = 0;

    public loadInitialImages = (): void => {

        this.imagesLeftToLoad = 0;

        this.createImageElementForArray(this.worldImages, EnvConstants.WORLD_GROUND, ImageNames.GROUND_IMAGE);
        this.createImageElementForArray(this.worldImages, EnvConstants.WORLD_WALL, ImageNames.WALL_IMAGE);
        this.createImageElementForArray(this.worldImages, EnvConstants.WORLD_GOAL, ImageNames.GOAL_IMAGE);
        this.createImageElementForArray(this.worldImages, EnvConstants.WORLD_DOOR, ImageNames.DOOR_IMAGE);
        this.createImageElementForArray(this.worldImages, EnvConstants.WORLD_KEY, ImageNames.KEY_IMAGE);

        for (let item in CharacterType) {
            let key = Number(item);
            if (!isNaN(key)) {

                let chImgs = new CharacterImages();

                this.createImageElement(chImgs.imageDefault, ImageNames.characterInitialImageName(key));

                for (let imgIndex = 0; imgIndex < ImageNames.characterWalkingEastImageNames(key).length; imgIndex++) {
                    this.createImageElementForArray(chImgs.imagesWalkingEast, imgIndex, ImageNames.characterWalkingEastImageNames(key)[imgIndex]);
                }

                for (let imgIndex = 0; imgIndex < ImageNames.characterWalkingWestImageNames(key).length; imgIndex++) {
                    this.createImageElementForArray(chImgs.imagesWalkingWest, imgIndex, ImageNames.characterWalkingWestImageNames(key)[imgIndex]);
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