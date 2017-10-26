import { CharacterType } from './enums/characterType';
import { Player } from './domain/player';
import { EnvConstants } from './envConstants';
import { ImageNames } from './imageNames';
import { CharacterImages } from './dtos/characterImages';
import { App } from './app';

export module ImagesManager {

    export let worldImages: HTMLImageElement[] = [];
    export let charactersImages: { [id: number]: CharacterImages; } = {};

    let imagesLeftToLoad = 0;

    export function loadInitialImages(): void {

        imagesLeftToLoad = 0;

        createImageElementForArray(worldImages, EnvConstants.WORLD_GROUND, ImageNames.GROUND_IMAGE);
        createImageElementForArray(worldImages, EnvConstants.WORLD_WALL, ImageNames.WALL_IMAGE);
        createImageElementForArray(worldImages, EnvConstants.WORLD_GOAL, ImageNames.GOAL_IMAGE);
        createImageElementForArray(worldImages, EnvConstants.WORLD_DOOR, ImageNames.DOOR_IMAGE);
        createImageElementForArray(worldImages, EnvConstants.WORLD_KEY, ImageNames.KEY_IMAGE);

        for (let item in CharacterType) {
            let key = Number(item);
            if (!isNaN(key)) {

                let chImgs = new CharacterImages();

                createImageElement(chImgs.imageDefault, ImageNames.characterInitialImageName(key));

                for (let imgIndex = 0; imgIndex < ImageNames.characterWalkingEastImageNames(key).length; imgIndex++) {
                    createImageElementForArray(chImgs.imagesWalkingEast, imgIndex, ImageNames.characterWalkingEastImageNames(key)[imgIndex]);
                }

                for (let imgIndex = 0; imgIndex < ImageNames.characterWalkingWestImageNames(key).length; imgIndex++) {
                    createImageElementForArray(chImgs.imagesWalkingWest, imgIndex, ImageNames.characterWalkingWestImageNames(key)[imgIndex]);
                }

                charactersImages[key] = chImgs;
            }
        }
    }

    function createImageElement(image: HTMLImageElement, fileName: string): void {
        image = document.createElement("img");
        imagesLeftToLoad++;
        loadImage(image, fileName);
    }

    function createImageElementForArray(imageArray: HTMLImageElement[], code: number, fileName: string): void {
        imageArray[code] = document.createElement("img");
        imagesLeftToLoad++;
        loadImage(imageArray[code], fileName);
    }

    function loadImage(imgVar: HTMLImageElement, imgName: string): void {
        imgVar.onload = registerImageLoaded;
        imgVar.src = imgName;
    }

    function registerImageLoaded(): void {
        imagesLeftToLoad--;
        if (imagesLeftToLoad === 0) {
            console.log('images loaded...');
            App.startGame();
        }
    }
}