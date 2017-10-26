import { EnvConstants } from './envConstants';

export module GraphicsManager {

    export function drawImageCenteredWithRotation(canvasContext: any, img: HTMLImageElement, atX: number, atY: number, ang: number): void {
        canvasContext.save();
        canvasContext.translate(atX, atY);
        canvasContext.rotate(ang);
        canvasContext.drawImage(img, -img.width / 2, -img.height / 2);
        canvasContext.restore();
    }

    export function drawRect(canvasContext: any, positionX: number, positionY: number, width: number, height: number, drawColor: any): void {
        canvasContext.fillStyle = drawColor;
        canvasContext.fillRect(positionX, positionY, width, height);
    }

    export function drawCircle(canvasContext: any, centerX: number, centerY: number, radius: number, color: any): void {
        canvasContext.fillStyle = color;
        canvasContext.beginPath();
        canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
        canvasContext.fill();
    }

    export function drawText(canvasContext: any, text: string, textX: number, textY: number, color: any): void {
        canvasContext.fillStyle = color;
        canvasContext.fillText(text, textX, textY);
    }

    export function drawMousePointer(canvasContext: any, mousePosX: number, mousePosY: number): void {
        let mouseWorldCol = Math.floor(mousePosX / EnvConstants.WORLD_TILE_WIDTH);
        let mouseWorldRow = Math.floor(mousePosY / EnvConstants.WORLD_TILE_HEIGHT);
        drawText(canvasContext, mouseWorldCol + ',' + mouseWorldRow, mousePosX, mousePosY, 'yellow');
    }

    export function drawImage(canvasContext: any, img: any, atX: number, atY: number): void {
        canvasContext.drawImage(img, atX, atY);
    }

}