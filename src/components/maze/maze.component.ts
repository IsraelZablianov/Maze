///<reference path="../../../_references.d.ts"/>

interface IMazeController {
    matrix: ICell[][];
    mazeOptions: Map;
    appLanguage: IAppLanguage;
    appStates: Map;
    getCellStyle(cell: ICell): Map;
    onCellClick(cell: ICell): void;
    onOptionSelected(selectedOption: MazeOption): void;
}

class MazeController implements IMazeController{
    static $inject: string[] = [ServicesNames.A_STAR_ALGO, ServicesNames.COLOR, ServicesNames.TIME_QUEUE, ServicesNames.SUCCESS];
    private maze: IMaze;
    private currentMazeOption: MazeOption;
    private cellStyles: Map;

    get mazeOptions(): Map {
        return MazeOption;
    }
    get appLanguage(): IAppLanguage {
        return AppLanguage;
    }
    get matrix(): ICell[][] {
        return this.maze.matrix;
    }
    get appStates(): Map {
        return StateNames;
    }

    constructor(private mazeSolverAlgoService: IMazeAlgoService,
        private colorService: IColorService,
        private timeService: ITimeQueueService,
        private successService: ISuccessService) {
        this.init();
    }

    private init(): void {
        this.initMaze();
        this.initCellStyles();
    }

    private initMaze(): void {
        this.maze = {
            matrix: [],
            raws: 12,
            cols: 12,
        };

        for(let i = 0; i < this.maze.raws; i++) {
            this.matrix.push([]);
            for(let j = 0; j < this.maze.cols; j++) {
                this.matrix[i].push({
                    cellState: CellState.regular,
                    rawPos: i,
                    colPos: j
                });
            }
        }
    }

    private initCellStyles(): void {
        const cellSize: string = Math.floor(100 / this.maze.raws) + "%";
        const defaultCellStyle = {
            [CssStyleProperties.HEIGHT]: cellSize,
            [CssStyleProperties.WIDTH]: cellSize
        }

        this.cellStyles = {
            [CellState.forbidden]: {
                [CssStyleProperties.BACKGROUND_COLOR]: this.colorService.forbiddenColor,
                ...defaultCellStyle
            },
            [CellState.regular]: {
                [CssStyleProperties.BACKGROUND_COLOR]: this.colorService.regularColor,
                ...defaultCellStyle
            },
            [CellState.route]: {
                [CssStyleProperties.BACKGROUND_COLOR]: this.colorService.routeColor,
                ...defaultCellStyle
            }
        };
    }

    private removeOptionSelection(): void {
        this.currentMazeOption = undefined;
    }

    private getPositionFromCell(cell: ICell): IPosition {
        return <IPosition>{
            rawPos: cell.rawPos,
            colPos: cell.colPos
        };
    }

    private handleError(errorMsg?: string): void {
        alert(errorMsg || AppLanguage.defaultErrorMsg);
    }

    private isTheSamePosition(position1: IPosition, position2: IPosition): boolean {
        if(!position1 || !position2
            || position1.rawPos !== position2.rawPos
            || position1.colPos !== position2.colPos) {
            return false;
        }

        return true;
    }

    private handlePrevCellPosition(prevPositionToHandle: IPosition): void {
        if(prevPositionToHandle) {
            let prevCellPosition = this.maze.matrix[prevPositionToHandle.rawPos][prevPositionToHandle.colPos];
            prevCellPosition.content = undefined;
        }
    }

    private updateMazePositions(option: MazeOption, cell: ICell): void {
        const newPosition: IPosition = this.getPositionFromCell(cell);
        const position = option === MazeOption.selectStartPosition ? this.maze.start : this.maze.end;

        if(this.isTheSamePosition(option === MazeOption.selectStartPosition ? this.maze.end : this.maze.start, newPosition)) {
            this.handleError(AppLanguage.startMustBeDifferentFromEnd);
            return;
        }

        this.handlePrevCellPosition(position);
        if(option === MazeOption.selectStartPosition) {
            this.maze.start = newPosition;
            cell.content = AppLanguage.start;
        }
        else {
            this.maze.end = newPosition;
            cell.content = AppLanguage.end;
        }
    }

    private handleMazeOptions(option: MazeOption, cell: ICell): void {
        if(option && cell) {
            switch(option) {
                case MazeOption.selectStartPosition: {
                    this.updateMazePositions(option, cell);
                    break;
                }
                case MazeOption.selectEndPosition: {
                    this.updateMazePositions(option, cell);
                    break;
                }
            }
        }
    }

    getCellStyle(cell: ICell): Map {
        if(cell && cell.cellState) {
            return this.cellStyles[cell.cellState];
        }

        return;
    }

    onCellClick(cell: ICell): void {
        if(cell) {
            if(!this.currentMazeOption) {
                cell.cellState = cell.cellState === CellState.regular ? CellState.forbidden : CellState.regular;
            }
            else {
                this.handleMazeOptions(this.currentMazeOption, cell);
            }
        }

        this.removeOptionSelection();
    }

    onOptionSelected(selectedOption: MazeOption): void {
        this.currentMazeOption = selectedOption;

        if(selectedOption === MazeOption.go) {
            this.generateRoute();
        }
    }

    private generateRoute(): void {
        const startTime = new Date();
        if(!this.maze.start || !this.maze.end) {
            this.handleError(this.maze.start ? AppLanguage.endMissing : AppLanguage.startMissing);
            return;
        }
        var path = this.mazeSolverAlgoService.findPath(this.maze);
        if(!path || path.length === 0) {
            this.handleError(AppLanguage.noPathIsFound);
            return;
        }

        this.handleMoves(path, startTime);
    }

    private handleMoves(path: IPosition[], startTime: Date) {
        this.addDelayedMoveToQueue(this.maze.start);
        for (let pos of path) {
            this.addDelayedMoveToQueue(pos);
        }
        this.timeService.add(() => {
            this.successService.showSuccessPage(this.getSuccessMsg(startTime, path.length));
        }, 0);

        this.timeService.run();
    }

    private addDelayedMoveToQueue(position: IPosition): void {
        this.timeService.add(() => {
            this.matrix[position.rawPos][position.colPos].cellState = CellState.route;
        }, 10);
    }

    private getSuccessMsg(startTime: Date, steps: number): string {
        const miliSecondsDiff: number = (new Date()).getTime() - startTime.getTime();
        const secondsDiff:number = Math.floor(miliSecondsDiff / 1000);
        const minutesDiff:number = Math.floor((secondsDiff / 60));
        const hoursDiff:number = Math.floor(minutesDiff / 60);
        const requestedFormat: string = (this.formatToAtLeastTwoDigits(hoursDiff) + ":" +
            this.formatToAtLeastTwoDigits(minutesDiff) + ":" +
            this.formatToAtLeastTwoDigits(secondsDiff));
        return AppLanguage.jobEndedSuccessfullyMsg(steps,requestedFormat);
    }

    private formatToAtLeastTwoDigits(num: number): string {
        if(num < 10) {
            return '0' + num;
        }

        return num.toString();
    }
}

app.component("maze", {
    controller: MazeController,
    templateUrl: "src/components/maze/maze.component.html",
    bindings: {
    }
});