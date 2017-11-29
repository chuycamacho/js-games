"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var characterType_1 = require("../enums/characterType");
var imageNames_1 = require("../constants/imageNames");
var characterImages_1 = require("../dtos/characterImages");
var app_1 = require("../app");
var BackstageLoader = (function () {
    function BackstageLoader() {
        var _this = this;
        this.scenarioImages = [];
        this.charactersImages = {};
        this.imagesLeftToLoad = 0;
        this.loadInitialImages = function () {
            _this.imagesLeftToLoad = 0;
            _this.createImageElementForArray(_this.scenarioImages, 0, imageNames_1.ImageNames.GROUND_IMAGE);
            _this.createImageElementForArray(_this.scenarioImages, 1, imageNames_1.ImageNames.WALL_IMAGE);
            _this.createImageElementForArray(_this.scenarioImages, 2, imageNames_1.ImageNames.GOAL_IMAGE);
            _this.createImageElementForArray(_this.scenarioImages, 3, imageNames_1.ImageNames.DOOR_IMAGE);
            _this.createImageElementForArray(_this.scenarioImages, 4, imageNames_1.ImageNames.KEY_IMAGE);
            for (var item in characterType_1.CharacterType) {
                var key = Number(item);
                if (!isNaN(key)) {
                    var chImgs = new characterImages_1.CharacterImages();
                    _this.createImageElement(chImgs.imageDefault, imageNames_1.ImageNames.characterInitialImageName(key));
                    var imagesWalkingEastNames = imageNames_1.ImageNames.characterWalkingEastImageNames(key);
                    var imagesWalkingWestNames = imageNames_1.ImageNames.characterWalkingWestImageNames(key);
                    var imagesAttackingEastNames = imageNames_1.ImageNames.characterAttackingEastImageNames(key);
                    var imagesAttackingWestNames = imageNames_1.ImageNames.characterAttackingWestImageNames(key);
                    for (var imgIndex = 0; imgIndex < imagesWalkingEastNames.length; imgIndex++) {
                        _this.createImageElementForArray(chImgs.imagesWalkingEast, imgIndex, imagesWalkingEastNames[imgIndex]);
                    }
                    for (var imgIndex = 0; imgIndex < imagesWalkingWestNames.length; imgIndex++) {
                        _this.createImageElementForArray(chImgs.imagesWalkingWest, imgIndex, imagesWalkingWestNames[imgIndex]);
                    }
                    for (var imgIndex = 0; imgIndex < imagesAttackingEastNames.length; imgIndex++) {
                        _this.createImageElementForArray(chImgs.imagesAttackingEast, imgIndex, imagesAttackingEastNames[imgIndex]);
                    }
                    for (var imgIndex = 0; imgIndex < imagesAttackingWestNames.length; imgIndex++) {
                        _this.createImageElementForArray(chImgs.imagesAttackingWest, imgIndex, imagesAttackingWestNames[imgIndex]);
                    }
                    _this.charactersImages[key] = chImgs;
                }
            }
        };
        this.createImageElement = function (image, fileName) {
            image = document.createElement("img");
            _this.imagesLeftToLoad++;
            _this.loadImage(image, fileName);
        };
        this.createImageElementForArray = function (imageArray, code, fileName) {
            imageArray[code] = document.createElement("img");
            _this.imagesLeftToLoad++;
            _this.loadImage(imageArray[code], fileName);
        };
        this.loadImage = function (imgVar, imgName) {
            imgVar.onload = _this.registerImageLoaded;
            imgVar.src = imgName;
        };
        this.registerImageLoaded = function () {
            _this.imagesLeftToLoad--;
            if (_this.imagesLeftToLoad === 0) {
                app_1.App.startGame();
            }
        };
    }
    return BackstageLoader;
}());
exports.BackstageLoader = BackstageLoader;
//# sourceMappingURL=backstageLoader.js.map