export class CharacterImages {

    imageDefault: HTMLImageElement;
    imagesWalkingEast: HTMLImageElement[];
    imagesWalkingWest: HTMLImageElement[];
    
    imagesAttackingEast: HTMLImageElement[];
    imagesAttackingWest: HTMLImageElement[];

    constructor() {
        this.imageDefault = undefined;
        this.imagesWalkingEast = [];
        this.imagesWalkingWest = [];
        this.imagesAttackingEast = [];
        this.imagesAttackingWest = [];
    }
}