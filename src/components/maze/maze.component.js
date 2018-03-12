var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import app from "../../app";
import { ServicesNames } from "../../constants/services-names";
import { StateNames } from "../../constants/state-names";
import { CssStyleProperties } from "../../constants/css-style-properties";
var MazeController = (function () {
    function MazeController(mazeSolverAlgoService, colorService, timeService, successService) {
        this.mazeSolverAlgoService = mazeSolverAlgoService;
        this.colorService = colorService;
        this.timeService = timeService;
        this.successService = successService;
        this.init();
    }
    Object.defineProperty(MazeController.prototype, "mazeOptions", {
        get: function () {
            return MazeOption;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MazeController.prototype, "appLanguage", {
        get: function () {
            return AppLanguage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MazeController.prototype, "matrix", {
        get: function () {
            return this.maze.matrix;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MazeController.prototype, "appStates", {
        get: function () {
            return StateNames;
        },
        enumerable: true,
        configurable: true
    });
    MazeController.prototype.init = function () {
        this.initMaze();
        this.initCellStyles();
    };
    MazeController.prototype.initMaze = function () {
        this.maze = {
            matrix: [],
            raws: 12,
            cols: 12,
        };
        for (var i = 0; i < this.maze.raws; i++) {
            this.matrix.push([]);
            for (var j = 0; j < this.maze.cols; j++) {
                this.matrix[i].push({
                    cellState: CellState.regular,
                    rawPos: i,
                    colPos: j
                });
            }
        }
    };
    MazeController.prototype.initCellStyles = function () {
        var cellSize = Math.floor(100 / this.maze.raws) + "%";
        var defaultCellStyle = (_a = {},
            _a[CssStyleProperties.HEIGHT] = cellSize,
            _a[CssStyleProperties.WIDTH] = cellSize,
            _a);
        this.cellStyles = (_b = {},
            _b[CellState.forbidden] = __assign((_c = {}, _c[CssStyleProperties.BACKGROUND_COLOR] = this.colorService.forbiddenColor, _c), defaultCellStyle),
            _b[CellState.regular] = __assign((_d = {}, _d[CssStyleProperties.BACKGROUND_COLOR] = this.colorService.regularColor, _d), defaultCellStyle),
            _b[CellState.route] = __assign((_e = {}, _e[CssStyleProperties.BACKGROUND_COLOR] = this.colorService.routeColor, _e), defaultCellStyle),
            _b);
        var _a, _b, _c, _d, _e;
    };
    MazeController.prototype.removeOptionSelection = function () {
        this.currentMazeOption = undefined;
    };
    MazeController.prototype.getPositionFromCell = function (cell) {
        return {
            rawPos: cell.rawPos,
            colPos: cell.colPos
        };
    };
    MazeController.prototype.handleError = function (errorMsg) {
        alert(errorMsg || AppLanguage.defaultErrorMsg);
    };
    MazeController.prototype.isTheSamePosition = function (position1, position2) {
        if (!position1 || !position2
            || position1.rawPos !== position2.rawPos
            || position1.colPos !== position2.colPos) {
            return false;
        }
        return true;
    };
    MazeController.prototype.handlePrevCellPosition = function (prevPositionToHandle) {
        if (prevPositionToHandle) {
            var prevCellPosition = this.maze.matrix[prevPositionToHandle.rawPos][prevPositionToHandle.colPos];
            prevCellPosition.content = undefined;
        }
    };
    MazeController.prototype.updateMazePositions = function (option, cell) {
        var newPosition = this.getPositionFromCell(cell);
        var position = option === MazeOption.selectStartPosition ? this.maze.start : this.maze.end;
        if (this.isTheSamePosition(option === MazeOption.selectStartPosition ? this.maze.end : this.maze.start, newPosition)) {
            this.handleError(AppLanguage.startMustBeDifferentFromEnd);
            return;
        }
        this.handlePrevCellPosition(position);
        if (option === MazeOption.selectStartPosition) {
            this.maze.start = newPosition;
            cell.content = AppLanguage.start;
        }
        else {
            this.maze.end = newPosition;
            cell.content = AppLanguage.end;
        }
    };
    MazeController.prototype.handleMazeOptions = function (option, cell) {
        if (option && cell) {
            switch (option) {
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
    };
    MazeController.prototype.getCellStyle = function (cell) {
        if (cell && cell.cellState) {
            return this.cellStyles[cell.cellState];
        }
        return;
    };
    MazeController.prototype.onCellClick = function (cell) {
        if (cell) {
            if (!this.currentMazeOption) {
                cell.cellState = cell.cellState === CellState.regular ? CellState.forbidden : CellState.regular;
            }
            else {
                this.handleMazeOptions(this.currentMazeOption, cell);
            }
        }
        this.removeOptionSelection();
    };
    MazeController.prototype.onOptionSelected = function (selectedOption) {
        this.currentMazeOption = selectedOption;
        if (selectedOption === MazeOption.go) {
            this.generateRoute();
        }
    };
    MazeController.prototype.generateRoute = function () {
        var startTime = new Date();
        if (!this.maze.start || !this.maze.end) {
            this.handleError(this.maze.start ? AppLanguage.endMissing : AppLanguage.startMissing);
            return;
        }
        var path = this.mazeSolverAlgoService.findPath(this.maze);
        if (!path || path.length === 0) {
            this.handleError(AppLanguage.noPathIsFound);
            return;
        }
        this.handleMoves(path, startTime);
    };
    MazeController.prototype.handleMoves = function (path, startTime) {
        var _this = this;
        this.addDelayedMoveToQueue(this.maze.start);
        for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
            var pos = path_1[_i];
            this.addDelayedMoveToQueue(pos);
        }
        this.timeService.add(function () {
            _this.successService.showSuccessPage(_this.getSuccessMsg(startTime, path.length));
        }, 0);
        this.timeService.run();
    };
    MazeController.prototype.addDelayedMoveToQueue = function (position) {
        var _this = this;
        this.timeService.add(function () {
            _this.matrix[position.rawPos][position.colPos].cellState = CellState.route;
        }, 10);
    };
    MazeController.prototype.getSuccessMsg = function (startTime, steps) {
        var miliSecondsDiff = (new Date()).getTime() - startTime.getTime();
        var secondsDiff = Math.floor(miliSecondsDiff / 1000);
        var minutesDiff = Math.floor((secondsDiff / 60));
        var hoursDiff = Math.floor(minutesDiff / 60);
        var requestedFormat = (this.formatToAtLeastTwoDigits(hoursDiff) + ":" +
            this.formatToAtLeastTwoDigits(minutesDiff) + ":" +
            this.formatToAtLeastTwoDigits(secondsDiff));
        return AppLanguage.jobEndedSuccessfullyMsg(steps, requestedFormat);
    };
    MazeController.prototype.formatToAtLeastTwoDigits = function (num) {
        if (num < 10) {
            return '0' + num;
        }
        return num.toString();
    };
    MazeController.$inject = [ServicesNames.A_STAR_ALGO, ServicesNames.COLOR, ServicesNames.TIME_QUEUE, ServicesNames.SUCCESS];
    return MazeController;
}());
app.component("maze", {
    controller: MazeController,
    templateUrl: "src/components/maze/maze.component.html",
    bindings: {}
});
//# sourceMappingURL=maze.component.js.map