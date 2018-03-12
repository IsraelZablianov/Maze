import app from "../../app";
import { SuccessStateParams, StateNames } from "../../constants/state-names";
import { IAppLanguage, AppLanguage } from "../../Languages/index";
interface ISuccessController {
}

class SuccessController implements ISuccessController {
    public static $inject: string[] = ['$state'];
    msg: string;

    constructor(private $state: ng.ui.IStateService) {
        this.msg = this.$state.params[SuccessStateParams.MSG];
    }

    get appLanguage(): IAppLanguage {
        return AppLanguage;
    }
    get appStates() {
        return StateNames;
    }

}

app.component("success", {
    controller: SuccessController,
    templateUrl: "src/components/success/success.component.html",
    bindings: {
    }
});