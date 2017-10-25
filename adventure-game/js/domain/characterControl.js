"use strict";
exports.__esModule = true;
var CharacterControl = (function () {
    function CharacterControl(mainPlayer) {
        this.KEY_UP_ARROW = 38;
        this.KEY_RIGHT_ARROW = 39;
        this.KEY_DOWN_ARROW = 40;
        this.KEY_LEFT_ARROW = 37;
        this.KEY_W = 87;
        this.KEY_D = 68;
        this.KEY_S = 83;
        this.KEY_A = 65;
        this.controlKeyUp = mainPlayer ? this.KEY_UP_ARROW : this.KEY_W;
        this.controlKeyRight = mainPlayer ? this.KEY_RIGHT_ARROW : this.KEY_D;
        this.controlKeyDown = mainPlayer ? this.KEY_DOWN_ARROW : this.KEY_S;
        this.controlKeyLeft = mainPlayer ? this.KEY_LEFT_ARROW : this.KEY_A;
    }
    return CharacterControl;
}());
exports.CharacterControl = CharacterControl;
//# sourceMappingURL=characterControl.js.map