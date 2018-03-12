import app from "../../app";
import { SuccessStateParams, StateNames } from "../../constants/state-names";
var SuccessController = (function () {
    function SuccessController($state) {
        this.$state = $state;
        this.msg = this.$state.params[SuccessStateParams.MSG];
    }
    Object.defineProperty(SuccessController.prototype, "appLanguage", {
        get: function () {
            return AppLanguage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuccessController.prototype, "appStates", {
        get: function () {
            return StateNames;
        },
        enumerable: true,
        configurable: true
    });
    SuccessController.$inject = ['$state'];
    return SuccessController;
}());
app.component("success", {
    controller: SuccessController,
    templateUrl: "src/components/success/success.component.html",
    bindings: {}
});
//# sourceMappingURL=success.component.js.map