import { ServicesNames } from "../../constants/services-names";
import { StateNames } from "../../constants/state-names";
import app from "../../app";
var ColorPickerController = (function () {
    function ColorPickerController(colorService, $state) {
        this.colorService = colorService;
        this.$state = $state;
        this.isValidColors = false;
    }
    Object.defineProperty(ColorPickerController.prototype, "appLanguage", {
        get: function () {
            return AppLanguage;
        },
        enumerable: true,
        configurable: true
    });
    ColorPickerController.prototype.save = function () {
        this.colorService.forbiddenColor = this.forbiddenColor;
        this.colorService.regularColor = this.regularColor;
        this.colorService.routeColor = this.routeColor;
        this.$state.go(StateNames.MAZE);
    };
    ColorPickerController.prototype.isValidHex = function () {
        this.isValidColors = (this.colorService.isHex(this.regularColor)
            && this.colorService.isHex(this.forbiddenColor)
            && this.colorService.isHex(this.routeColor));
    };
    ColorPickerController.$inject = [ServicesNames.COLOR, '$state'];
    return ColorPickerController;
}());
app.component("colorPicker", {
    controller: ColorPickerController,
    templateUrl: "src/components/color-picker/color-picker.component.html",
    bindings: {}
});
//# sourceMappingURL=color-picker.component.js.map