import { CharacterType } from './enums/characterType';
import { Character } from './domain/character';
import { Player } from './domain/player';
import { EnvConstants } from './envConstants';
import { ImageNames } from './imageNames';

export module ImagesManager {

    export let worldImages: HTMLImageElement[] = [];
    export let playerImages: HTMLImageElement[] = [];
    export let npcsImages: HTMLImageElement[][] = [];
    export let enemiesImages: HTMLImageElement[][] = [];

    let imagesLeftToLoad = 0;

    export function loadInitialImages(player: Player, npcs: Character[], enemies: Character[]): void {

        imagesLeftToLoad = 0;
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

        let characterTypesToLoad: any[] = [];
        characterTypesToLoad.push(
            {
                characterType: player.type,
                characterImgName: ImageNames.characterInitialImageName(player.type),
                characterWalkingEastImgNames: ImageNames.characterWalkingEastImageNames(player.type),
                characterWalkingWestImgNames: ImageNames.characterWalkingWestImageNames(player.type)
            }
        );

        let charactersToLoad = npcs.concat(enemies).concat(player).map(character => {//TODO: select just unique types
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

        while (true) {
            if (imagesLeftToLoad == 0) {
                return;
            }
        }
    }

    function createCharacterImageElement(character: Character, fileName: string): void {
        character.image = document.createElement("img");
        loadImage(character.image, fileName);
    }

    function createImageElement(imageArray: HTMLImageElement[], code: number, fileName: string): void {
        imageArray[code] = document.createElement("img");
        loadImage(imageArray[code], fileName);
    }

    function loadImage(imgVar: HTMLImageElement, imgName: string): void {
        imgVar.onload = registerImageLoaded;
        imgVar.src = imgName;
    }

    function registerImageLoaded(): void {
        imagesLeftToLoad--;
    }
}