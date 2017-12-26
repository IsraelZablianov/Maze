///<reference path="../_references.d.ts"/>

'use strict';

const settings = Object.freeze({
    appName: "Maze"
});

const app = angular.module(settings.appName, ['ui.router', 'colorpicker.module']);

app.config(["$stateProvider", "$urlRouterProvider",
    ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {

        $urlRouterProvider.otherwise(StateNames.MAZE);

        $stateProvider.state(StateNames.MAZE, {
            url: "/" + StateNames.MAZE,
            template: '<maze></maze>'
        }).
        state(StateNames.COLOR_PICKER,{
            url: "/" + StateNames.COLOR_PICKER,
            template: '<color-picker></color-picker>'
        }).
        state(StateNames.SUCCESS, {
            url: "/" + StateNames.SUCCESS,
            params: {
                [SuccessStateParams.MSG]: undefined
            },
            template: '<success></success>'
        });
    }
]);