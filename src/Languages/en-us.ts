const ENUSMazeLanguage: IAppLanguage = Object.freeze({
    end: "End",
    start: "Start",
    go: "Go",
    selectColors: "Change Colors",
    options: "Options",
    defaultErrorMsg: "ops.. an error has occurred, please try again",
    startMustBeDifferentFromEnd: "Start position must be different from end position",
    startMissing: "Start Position is mandatory",
    endMissing: "End Position is mandatory",
    noPathIsFound: "Opss.. cannot find a suitable route",
    colorA: "Color A'",
    colorB: "Color B'",
    colorC: "Color C'",
    save: "Save",
    regular: "Regular",
    forbidden: "Forbidden",
    route: "Route",
    startOver: "Start Over",
    invalisColorMsg: "Please enter valid colors before saving",
    jobEndedSuccessfullyMsg: (steps: number, formatedString: string) => {
        return "Job ended successfully with " + steps + " Steps, at " + formatedString + " minutes";
    }
});