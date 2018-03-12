import app from "../../app";
import { StateNames, SuccessStateParams } from "../../constants/state-names";
import { ServicesNames } from "../../constants/services-names";


export interface ISuccessService {
    showSuccessPage(msg?: string): void;
}

export class SuccessService implements ISuccessService {
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
