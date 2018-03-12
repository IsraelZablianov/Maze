///<reference path="../../../_references.d.ts"/>
var SuccessService = (function () {
    function SuccessService($state) {
        this.$state = $state;
    }
    SuccessService.prototype.showSuccessPage = function (msg) {
        this.$state.go(StateNames.SUCCESS, (_a = {},
            _a[SuccessStateParams.MSG] = msg,
            _a));
        var _a;
    };
    SuccessService.$inject = ['$state'];
    return SuccessService;
}());
app.service(ServicesNames.SUCCESS, SuccessService);
//# sourceMappingURL=success.service.js.map