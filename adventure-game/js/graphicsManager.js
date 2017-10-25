"use strict";
exports.__esModule = true;
var envConstants_1 = require("./envConstants");
var GraphicsManager;
(function (GraphicsManager) {
    function drawImageCenteredWithRotation(canvasContext, img, atX, atY, ang) {
        canvasContext.save();
        canvasContext.translate(atX, atY);
        canvasContext.rotate(ang);
        canvasContext.drawImage(img, -img.width / 2, -img.height / 2);
        canvasContext.restore();
    }
    GraphicsManager.drawImageCenteredWithRotation = drawImageCenteredWithRotation;
    function drawRect(canvasContext, positionX, positionY, width, height, drawColor) {
        canvasContext.fillStyle = drawColor;
        canvasContext.fillRect(positionX, positionY, width, height);
    }
    GraphicsManager.drawRect = drawRect;
    function drawCircle(canvasContext, centerX, centerY, radius, color) {
        canvasContext.fillStyle = color;
        canvasContext.beginPath();
        canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
        canvasContext.fill();
    }
    GraphicsManager.drawCircle = drawCircle;
    function drawText(canvasContext, text, textX, textY, color) {
        canvasContext.fillStyle = color;
        canvasContext.fillText(text, textX, textY);
    }
    GraphicsManager.drawText = drawText;
    function drawMousePointer(canvasContext, mousePosX, mousePosY) {
        var mouseWorldCol = Math.floor(mousePosX / envConstants_1.EnvConstants.WORLD_TILE_WIDTH);
        var mouseWorldRow = Math.floor(mousePosY / envConstants_1.EnvConstants.WORLD_TILE_HEIGHT);
        drawText(canvasContext, mouseWorldCol + ',' + mouseWorldRow, mousePosX, mousePosY, 'yellow');
    }
    GraphicsManager.drawMousePointer = drawMousePointer;
    function drawImage(canvasContext, img, atX, atY) {
        canvasContext.drawImage(img, atX, atY);
    }
    GraphicsManager.drawImage = drawImage;
})(GraphicsManager = exports.GraphicsManager || (exports.GraphicsManager = {}));
//# sourceMappingURL=graphicsManager.js.map