import { CharacterType } from './enums/characterType';
import { Character } from './domain/character';
import { EnvConstants } from './envConstants';
import { ImageNames } from './imageNames';

export module ImagesManager {

    export let worldImages: HTMLImageElement[] = [];

    let imagesLeftToLoad = 0;

    export function loadInitialImages(characters: Character[]): void {

        let worldImageNames = [{
                worldCode: EnvConstants.WORLD_GROUND,
                fileName: ImageNames.GROUND_IMAGE
            },
            {
                worldCode: EnvConstants.WORLD_WALL,
                fileName: ImageNames.WALL_IMAGE
            },
            {
                worldCode: EnvConstants.WORLD_GOAL,
                fileName: ImageNames.GOAL_IMAGE
            },
            {
                worldCode: EnvConstants.WORLD_DOOR,
                fileName: ImageNames.DOOR_IMAGE
            },
            {
                worldCode: EnvConstants.WORLD_KEY,
                fileName: ImageNames.KEY_IMAGE
            }
        ];

        let charactersToLoad = characters.map(character => {
            var characterImageNames = {
                character: character,
                characterImgName: ImageNames.characterInitialImageName(character.type),
                characterWalkingEastImgNames: ImageNames.characterWalkingEastImageNames(character.type),
                characterWalkingWestImgNames: ImageNames.characterWalkingWestImageNames(character.type)
            };
            imagesLeftToLoad += characterImageNames.characterWalkingEastImgNames.length + characterImageNames.characterWalkingWestImgNames.length + 1;
            return characterImageNames;
        });

        imagesLeftToLoad += worldImageNames.length;

        for (let i = 0; i < worldImageNames.length; i++) {
            createImageElement(worldImages, worldImageNames[i].worldCode, worldImageNames[i].fileName);
        }

        for (let characterIndex = 0; characterIndex < charactersToLoad.length; characterIndex++) {
            for (let imgIndex = 0; imgIndex < charactersToLoad[characterIndex].characterWalkingEastImgNames.length; imgIndex++) {
                createImageElement(charactersToLoad[characterIndex].character.imagesWalkingEast, imgIndex, charactersToLoad[characterIndex].characterWalkingEastImgNames[imgIndex]);
            }
            for (let imgIndex = 0; imgIndex < charactersToLoad[characterIndex].characterWalkingWestImgNames.length; imgIndex++) {
                createImageElement(charactersToLoad[characterIndex].character.imagesWalkingWest, imgIndex, charactersToLoad[characterIndex].characterWalkingWestImgNames[imgIndex]);
            }
        }
    }

    function createCharacterImageElement(character: Character, fileName: string) {
        character.image = document.createElement("img");
        loadImage(character.image, fileName);
    }

    function createImageElement(imageArray: HTMLImageElement[], code: number, fileName: string): void {
        imageArray[code] = document.createElement("img");
        loadImage(imageArray[code], fileName);
    }

    function loadImage(imgVar: HTMLImageElement, imgName: string) {
        imgVar.onload = registerImageLoadedAndStartGameWhenReady;
        imgVar.src = imgName;
    }

    function registerImageLoadedAndStartGameWhenReady() {
        imagesLeftToLoad--;
        if (imagesLeftToLoad == 0) {
            //startGame();//TODO
        }
    }
}