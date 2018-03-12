import app from "../../app";
import { ServicesNames } from "../../constants/services-names";
var ColorService = (function () {
    function ColorService() {
        this._regularColor = "#36ec51";
        this._forbiddenColor = "#000";
        this._routeColor = "#303aff";
    }
    Object.defineProperty(ColorService.prototype, "routeColor", {
        get: function () {
            return this.getColorAsHexString(this._routeColor);
        },
        set: function (value) {
            this._routeColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorService.prototype, "forbiddenColor", {
        get: function () {
            return this.getColorAsHexString(this._forbiddenColor);
        },
        set: function (value) {
            this._forbiddenColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorService.prototype, "regularColor", {
        get: function () {
            return this.getColorAsHexString(this._regularColor);
        },
        set: function (value) {
            this._regularColor = value;
        },
        enumerable: true,
        configurable: true
    });
    ColorService.prototype.getColorAsHexString = function (color) {
        if (color && color.indexOf("#") === -1) {
            return "#" + color;
        }
        return color;
    };
    ColorService.prototype.isHex = function (hex) {
        if (hex && hex.indexOf("#") !== -1) {
            hex = hex.replace("#", "");
        }
        var hexAsInt = parseInt(hex, 16);
        return (hexAsInt.toString(16) === hex);
    };
    return ColorService;
}());
export { ColorService };
app.service(ServicesNames.COLOR, ColorService);
//# sourceMappingURL=color.service.js.map