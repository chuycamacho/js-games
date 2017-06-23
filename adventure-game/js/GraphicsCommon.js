
function drawImageCenteredWithRotation(img, atX, atY, ang) {
    canvasContext.save();
    canvasContext.translate(atX, atY);
    canvasContext.rotate(ang);
    canvasContext.drawImage(img, -img.width / 2, -img.height / 2);
    canvasContext.restore();
}

function drawImage(img, atX, atY) {
    canvasContext.drawImage(img, atX, atY);
}

function drawRect(positionX, positionY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(positionX, positionY, width, height);
}

function drawCircle(centerX, centerY, radius, color) {
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
}

function drawText(text, textX, textY, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillText(text, textX, textY);
}

function drawMousePointer(mousePosX, mousePosY) {
    let mouseWorldCol = Math.floor(mousePosX / WORLD_TILE_WIDTH);
    let mouseWorldRow = Math.floor(mousePosY / WORLD_TILE_HEIGHT);
    drawText(mouseWorldCol + ',' + mouseWorldRow, mouseX, mouseY, 'yellow');
}
