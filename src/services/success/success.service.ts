///<reference path="../../../_references.d.ts"/>

interface ISuccessService {
    showSuccessPage(msg?: string): void;
}

class SuccessService implements ISuccessService {
    public static $inject: string[] = ['$state'];
    constructor(private $state: ng.ui.IStateService) {

    }

    showSuccessPage(msg?: string): void {
        this.$state.go(StateNames.SUCCESS, {
            [SuccessStateParams.MSG]: msg
        });
    }
}

app.service(ServicesNames.SUCCESS, SuccessService);
