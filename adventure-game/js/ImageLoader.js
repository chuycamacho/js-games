let warriorPic = document.createElement("img");

let worldImages = [];

let imagesLeftToLoad = 0;

function loadImages() {
    let imageElementList = [
        {imgVar: warriorPic, fileName: WARRIOR_STANDING_EAST_IMAGE},
    ];

    let imageForWorldList = [
        {worldCode: WORLD_GROUND, fileName: "world_ground.png"},
        {worldCode: WORLD_WALL, fileName: "world_wall.png"},
        {worldCode: WORLD_GOAL, fileName: "world_goal.png"},
        {worldCode: WORLD_DOOR, fileName: "world_door.png"},
        {worldCode: WORLD_KEY, fileName: "world_key.png"}
    ];

    imagesLeftToLoad = imageElementList.length + imageForWorldList.length;

    for (let i=0; i < imageElementList.length; i++) {
        loadImage(imageElementList[i].imgVar, imageElementList[i].fileName);
    }
    for (let i=0; i < imageForWorldList.length; i++) {
        createWorldImageElement(imageForWorldList[i].worldCode, imageForWorldList[i].fileName);
    }
}

function createWorldImageElement(worldCode, fileName) {
    worldImages[worldCode] = document.createElement("img");
    loadImage(worldImages[worldCode], fileName);
}

function loadImage(imgVar, imgName) {
    imgVar.onload = registerImageLoadedAndStartGameWhenReady;
    imgVar.src = 'images/'+imgName;   
}

function registerImageLoadedAndStartGameWhenReady() {
    imagesLeftToLoad--;
    if (imagesLeftToLoad == 0) {
        startGame();
    }
}