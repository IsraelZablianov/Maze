import { ServicesNames } from "../../constants/services-names";
import { StateNames } from "../../constants/state-names";
import app from "../../app";
import { IColorService } from "../../services/color/color.service";
import { IAppLanguage, AppLanguage } from "../../Languages/index";

interface IColorPickerController {
    save(): void;
    isValidHex(): void;
}

class ColorPickerController implements IColorPickerController {
    public static $inject: string[] = [ServicesNames.COLOR, '$state'];
    regularColor: string;
    forbiddenColor: string;
    routeColor: string;
    isValidColors: boolean = false;

    get appLanguage(): IAppLanguage {
        return AppLanguage;
    }

    constructor(private colorService: IColorService, private $state: ng.ui.IStateService) {
    }

    save(): void {
        this.colorService.forbiddenColor = this.forbiddenColor;
        this.colorService.regularColor = this.regularColor;
        this.colorService.routeColor = this.routeColor;
        this.$state.go(StateNames.MAZE);
    }

    isValidHex(): void {
        this.isValidColors = (this.colorService.isHex(this.regularColor)
            && this.colorService.isHex(this.forbiddenColor)
            && this.colorService.isHex(this.routeColor));
    }
}

app.component("colorPicker", {
    controller: ColorPickerController,
    templateUrl: "src/components/color-picker/color-picker.component.html",
    bindings: {
    }
});