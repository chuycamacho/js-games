
let characterImage = document.createElement("img");

let worldImages = [];
let characterWalkingEastImages = [];
let characterWalkingWestImages = [];

let imagesLeftToLoad = 0;

function loadImages(characterType) {
    let characterImageElements = [
        {imgVar: characterImage, fileName: characterInitialImageName(characterType)},
    ];

    let characterWalkingEastImgNames = characterWalkingEastImageNames(characterType);
    let characterWalkingWestImgNames = characterWalkingWestImageNames(characterType);

    let worldImageNames = [
        {worldCode: WORLD_GROUND, fileName: GROUND_IMAGE},
        {worldCode: WORLD_WALL, fileName: WALL_IMAGE},
        {worldCode: WORLD_GOAL, fileName: GOAL_IMAGE},
        {worldCode: WORLD_DOOR, fileName: DOOR_IMAGE},
        {worldCode: WORLD_KEY, fileName: KEY_IMAGE}
    ];

    imagesLeftToLoad = 
        characterImageElements.length +
        worldImageNames.length;

    for (let i=0; i < characterImageElements.length; i++) {
        loadImage(characterImageElements[i].imgVar, characterImageElements[i].fileName);
    }
    for (let i=0; i < worldImageNames.length; i++) {
        createImageElement(worldImages, worldImageNames[i].worldCode, worldImageNames[i].fileName);
    }
    for (let i=0; i < characterWalkingEastImgNames.length; i++) {
        createImageElement(characterWalkingEastImages, i, characterWalkingEastImgNames[i]);
    }
    for (let i=0; i < characterWalkingWestImgNames.length; i++) {
        createImageElement(characterWalkingWestImages, i, characterWalkingWestImgNames[i]);
    }
}

function createImageElement(imageArray, code, fileName) {
    imageArray[code] = document.createElement("img");
    loadImage(imageArray[code], fileName);
}

function loadImage(imgVar, imgName) {
    imgVar.onload = registerImageLoadedAndStartGameWhenReady;
    imgVar.src = imgName;   
}

function registerImageLoadedAndStartGameWhenReady() {
    imagesLeftToLoad--;
    if (imagesLeftToLoad == 0) {
        startGame();
    }
}