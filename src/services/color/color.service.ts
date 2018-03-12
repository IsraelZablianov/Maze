import app from "../../app";
import { ServicesNames } from "../../constants/services-names";

export interface IColorService {
    isHex(hex: string): boolean;
    regularColor: string;
    forbiddenColor: string;
    routeColor: string;
}

export class ColorService implements IColorService {
    private _regularColor: string = "#36ec51";
    private _forbiddenColor: string = "#000";
    private _routeColor: string = "#303aff";

    get routeColor(): string {
        return this.getColorAsHexString(this._routeColor);
    }
    set routeColor(value: string) {
        this._routeColor = value;
    }

    get forbiddenColor() {
        return this.getColorAsHexString(this._forbiddenColor);
    }
    set forbiddenColor(value: string) {
        this._forbiddenColor = value;
    }

    get regularColor() {
        return this.getColorAsHexString(this._regularColor);
    }
    set regularColor(value: string) {
        this._regularColor = value;
    }

    private getColorAsHexString(color: string): string {
        if(color && color.indexOf("#") === -1) {
            return "#" + color;
        }

        return color;
    }

    isHex(hex: string): boolean {
        if(hex && hex.indexOf("#") !== -1) {
            hex = hex.replace("#", "");
        }

        const hexAsInt = parseInt(hex,16);
        return (hexAsInt.toString(16) === hex)
    }
}

app.service(ServicesNames.COLOR, ColorService);