"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var characterType_1 = require("./enums/characterType");
var envConstants_1 = require("./envConstants");
var imageNames_1 = require("./imageNames");
var characterImages_1 = require("./dtos/characterImages");
var app_1 = require("./app");
var ImagesManager;
(function (ImagesManager) {
    ImagesManager.worldImages = [];
    ImagesManager.charactersImages = {};
    var imagesLeftToLoad = 0;
    function loadInitialImages() {
        imagesLeftToLoad = 0;
        createImageElementForArray(ImagesManager.worldImages, envConstants_1.EnvConstants.WORLD_GROUND, imageNames_1.ImageNames.GROUND_IMAGE);
        createImageElementForArray(ImagesManager.worldImages, envConstants_1.EnvConstants.WORLD_WALL, imageNames_1.ImageNames.WALL_IMAGE);
        createImageElementForArray(ImagesManager.worldImages, envConstants_1.EnvConstants.WORLD_GOAL, imageNames_1.ImageNames.GOAL_IMAGE);
        createImageElementForArray(ImagesManager.worldImages, envConstants_1.EnvConstants.WORLD_DOOR, imageNames_1.ImageNames.DOOR_IMAGE);
        createImageElementForArray(ImagesManager.worldImages, envConstants_1.EnvConstants.WORLD_KEY, imageNames_1.ImageNames.KEY_IMAGE);
        for (var item in characterType_1.CharacterType) {
            var key = Number(item);
            if (!isNaN(key)) {
                var chImgs = new characterImages_1.CharacterImages();
                createImageElement(chImgs.imageDefault, imageNames_1.ImageNames.characterInitialImageName(key));
                for (var imgIndex = 0; imgIndex < imageNames_1.ImageNames.characterWalkingEastImageNames(key).length; imgIndex++) {
                    createImageElementForArray(chImgs.imagesWalkingEast, imgIndex, imageNames_1.ImageNames.characterWalkingEastImageNames(key)[imgIndex]);
                }
                for (var imgIndex = 0; imgIndex < imageNames_1.ImageNames.characterWalkingWestImageNames(key).length; imgIndex++) {
                    createImageElementForArray(chImgs.imagesWalkingWest, imgIndex, imageNames_1.ImageNames.characterWalkingWestImageNames(key)[imgIndex]);
                }
                ImagesManager.charactersImages[key] = chImgs;
            }
        }
    }
    ImagesManager.loadInitialImages = loadInitialImages;
    function createImageElement(image, fileName) {
        image = document.createElement("img");
        imagesLeftToLoad++;
        loadImage(image, fileName);
    }
    function createImageElementForArray(imageArray, code, fileName) {
        imageArray[code] = document.createElement("img");
        imagesLeftToLoad++;
        loadImage(imageArray[code], fileName);
    }
    function loadImage(imgVar, imgName) {
        imgVar.onload = registerImageLoaded;
        imgVar.src = imgName;
    }
    function registerImageLoaded() {
        imagesLeftToLoad--;
        if (imagesLeftToLoad === 0) {
            app_1.App.startGame();
        }
    }
})(ImagesManager = exports.ImagesManager || (exports.ImagesManager = {}));
//# sourceMappingURL=imagesManager.js.map