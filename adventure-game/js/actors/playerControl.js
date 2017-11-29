"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PlayerControl = (function () {
    function PlayerControl() {
        var _this = this;
        this.KEY_UP_ARROW = 38;
        this.KEY_RIGHT_ARROW = 39;
        this.KEY_DOWN_ARROW = 40;
        this.KEY_LEFT_ARROW = 37;
        this.KEY_SPACEBAR = 32;
        this.isValidInput = function (keyCode) {
            if (keyCode === _this.controlKeyUp ||
                keyCode === _this.controlKeyRight ||
                keyCode === _this.controlKeyDown ||
                keyCode === _this.controlKeyLeft ||
                keyCode === _this.controlKeyAttack) {
                return true;
            }
            else {
                return false;
            }
        };
        this.controlKeyUp = this.KEY_UP_ARROW;
        this.controlKeyRight = this.KEY_RIGHT_ARROW;
        this.controlKeyDown = this.KEY_DOWN_ARROW;
        this.controlKeyLeft = this.KEY_LEFT_ARROW;
        this.controlKeyAttack = this.KEY_SPACEBAR;
    }
    return PlayerControl;
}());
exports.PlayerControl = PlayerControl;
//# sourceMappingURL=playerControl.js.map