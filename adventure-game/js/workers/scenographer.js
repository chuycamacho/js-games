"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var envConstants_1 = require("../constants/envConstants");
var Scenographer = (function () {
    function Scenographer(backstageLoader, canvasContext) {
        var _this = this;
        this.setCharacterImage = function (character) {
            if (character.isWalking) {
                var walkingImages = character.lastWalkingXDirection == 4
                    ? _this.backstageLoader.charactersImages[character.type].imagesWalkingEast
                    : _this.backstageLoader.charactersImages[character.type].imagesWalkingWest;
                character.currentImage = walkingImages[character.currentWalkingImage];
                character.currentWalkingImage += 1;
                if (character.currentWalkingImage >= walkingImages.length) {
                    character.currentWalkingImage = 0;
                }
            }
            else {
                character.currentImage = character.lastWalkingXDirection === 4
                    ? _this.backstageLoader.charactersImages[character.type].imagesWalkingEast[0]
                    : _this.backstageLoader.charactersImages[character.type].imagesWalkingWest[0];
            }
        };
        this.putCharactersOnScenario = function (player, npcs, enemies) {
            _this.drawImageCenteredWithRotation(player.currentImage, player.positionX, player.positionY, envConstants_1.EnvConstants.IMAGE_DEFAULT_ANG);
            npcs.forEach(function (npc) {
                return _this.drawImageCenteredWithRotation(npc.currentImage, npc.positionX, npc.positionY, envConstants_1.EnvConstants.IMAGE_DEFAULT_ANG);
            });
            enemies.forEach(function (enemy) {
                return _this.drawImageCenteredWithRotation(enemy.currentImage, enemy.positionX, enemy.positionY, envConstants_1.EnvConstants.IMAGE_DEFAULT_ANG);
            });
        };
        this.tileHasTransparency = function (tileType) {
            return (tileType == 4 || tileType == 2 || tileType == 3);
        };
        this.drawImageCenteredWithRotation = function (img, atX, atY, ang) {
            _this.canvasContext.save();
            _this.canvasContext.translate(atX, atY);
            _this.canvasContext.rotate(ang);
            _this.canvasContext.drawImage(img, -img.width / 2, -img.height / 2);
            _this.canvasContext.restore();
        };
        this.drawRect = function (positionX, positionY, width, height, drawColor) {
            _this.canvasContext.fillStyle = drawColor;
            _this.canvasContext.fillRect(positionX, positionY, width, height);
        };
        this.drawCircle = function (centerX, centerY, radius, color) {
            _this.canvasContext.fillStyle = color;
            _this.canvasContext.beginPath();
            _this.canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
            _this.canvasContext.fill();
        };
        this.drawText = function (text, textX, textY, color) {
            _this.canvasContext.fillStyle = color;
            _this.canvasContext.fillText(text, textX, textY);
        };
        this.drawMousePointer = function (mousePosX, mousePosY) {
            var mouseWorldCol = Math.floor(mousePosX / envConstants_1.EnvConstants.WORLD_TILE_WIDTH);
            var mouseWorldRow = Math.floor(mousePosY / envConstants_1.EnvConstants.WORLD_TILE_HEIGHT);
            _this.drawText(mouseWorldCol + ',' + mouseWorldRow, mousePosX, mousePosY, 'yellow');
        };
        this.drawImage = function (img, atX, atY) {
            _this.canvasContext.drawImage(img, atX, atY);
        };
        this.backstageLoader = backstageLoader;
        this.canvasContext = canvasContext;
    }
    Scenographer.prototype.buildScenario = function (scenario, player, npcs, enemies) {
        var tilePosX = 0;
        var tilePosY = 0;
        for (var row = 0; row < envConstants_1.EnvConstants.WORLD_ROWS; row++) {
            for (var col = 0; col < envConstants_1.EnvConstants.WORLD_COLS; col++) {
                var tileType = scenario[row][col];
                var useImg = tileType <= 4
                    ? this.backstageLoader.scenarioImages[tileType]
                    : this.backstageLoader.scenarioImages[0];
                if (this.tileHasTransparency(tileType)) {
                    this.drawImage(this.backstageLoader.scenarioImages[0], tilePosX, tilePosY);
                }
                this.drawImage(useImg, tilePosX, tilePosY);
                tilePosX += envConstants_1.EnvConstants.WORLD_TILE_WIDTH;
            }
            tilePosX = 0;
            tilePosY += envConstants_1.EnvConstants.WORLD_TILE_HEIGHT;
        }
        this.setCharacterImage(player);
        this.putCharactersOnScenario(player, npcs, enemies);
    };
    return Scenographer;
}());
exports.Scenographer = Scenographer;
//# sourceMappingURL=scenographer.js.map