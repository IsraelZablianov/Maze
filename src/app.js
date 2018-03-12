import { StateNames, SuccessStateParams } from "../src/constants/state-names";
require("angular-bootstrap-colorpicker/css/colorpicker.css");
var settings = Object.freeze({
    appName: "Maze"
});
var app = angular.module(settings.appName, ['ui.router', 'colorpicker.module']);
app.config(["$stateProvider", "$urlRouterProvider",
    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise(StateNames.MAZE);
        $stateProvider.state(StateNames.MAZE, {
            url: "/" + StateNames.MAZE,
            template: '<maze></maze>'
        }).
            state(StateNames.COLOR_PICKER, {
            url: "/" + StateNames.COLOR_PICKER,
            template: '<color-picker></color-picker>'
        }).
            state(StateNames.SUCCESS, {
            url: "/" + StateNames.SUCCESS,
            params: (_a = {},
                _a[SuccessStateParams.MSG] = undefined,
                _a),
            template: '<success></success>'
        });
        var _a;
    }
]);
export default app;
//# sourceMappingURL=app.js.map