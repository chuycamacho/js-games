"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Usher = (function () {
    function Usher(canvasContext, director) {
        var _this = this;
        this.arrangeAudienceInput = function () {
            _this.canvasContext.canvas.addEventListener('mousedown', _this.manageMouseDown);
            document.addEventListener('keydown', _this.manageKeyPressed);
            document.addEventListener('keyup', _this.manageKeyReleased);
        };
        this.manageMouseDown = function (event) { };
        this.manageKeyPressed = function (event) {
            _this.director.signalCharactersToReactToKeyStroke(event, true);
            event.preventDefault();
        };
        this.manageKeyReleased = function (event) {
            _this.director.signalCharactersToReactToKeyStroke(event, false);
            event.preventDefault();
        };
        this.calculateMousePosition = function (canvasContext, event) {
            var rect = canvasContext.canvas.getBoundingClientRect();
            var root = document.documentElement;
            _this.mousePosInWorldX = event.clientX - rect.left - root.scrollLeft;
            _this.mousePosInWorldY = event.clientY - rect.top - root.scrollTop;
            return {
                x: _this.mousePosInWorldX,
                y: _this.mousePosInWorldY
            };
        };
        this.canvasContext = canvasContext;
        this.director = director;
    }
    return Usher;
}());
exports.Usher = Usher;
//# sourceMappingURL=usher.js.map