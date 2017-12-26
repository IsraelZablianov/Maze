interface IAppLanguage {
    end?: string,
    start?: string,
    go?: string,
    selectColors?: string,
    options?: string,
    defaultErrorMsg?: string,
    startMissing?: string,
    endMissing?: string,
    noPathIsFound?: string,
    startMustBeDifferentFromEnd?: string,
    colorA?: string,
    colorB?: string,
    colorC?: string,
    regular?: string,
    forbidden?: string,
    route?: string,
    save?: string,
    startOver: string,
    invalisColorMsg?: string,
    jobEndedSuccessfullyMsg: (steps: number, formatedString: string) => string;
}

const AppLanguage: IAppLanguage = ENUSMazeLanguage;