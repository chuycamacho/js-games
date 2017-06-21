let carOnePic = document.createElement("img");
let carTwoPic = document.createElement("img");

let trackImages = [];

let imagesLeftToLoad = 0;

function loadImages() {
    let imageElementList = [
        {imgVar: carOnePic, fileName: "car_one.png"},
        {imgVar: carTwoPic, fileName: "car_two.png"}
    ];

    let imageForTrackList = [
        {trackCode: TRACK_ROAD, fileName: "track_road.png"},
        {trackCode: TRACK_WALL, fileName: "track_wall.png"},
        {trackCode: TRACK_GOAL, fileName: "track_goal.png"},
        {trackCode: TRACK_FLAG, fileName: "track_flag.png"},
        {trackCode: TRACK_TREE, fileName: "track_tree.png"}
    ];

    imagesLeftToLoad = imageElementList.length + imageForTrackList.length;

    for (let i=0; i < imageElementList.length; i++) {
        loadImage(imageElementList[i].imgVar, imageElementList[i].fileName);
    }
    for (let i=0; i < imageForTrackList.length; i++) {
        createTrackImageElement(imageForTrackList[i].trackCode, imageForTrackList[i].fileName);
    }
}

function createTrackImageElement(trackCode, fileName) {
    trackImages[trackCode] = document.createElement("img");
    loadImage(trackImages[trackCode], fileName);
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