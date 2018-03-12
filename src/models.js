///<reference path="../_references.d.ts"/>
var CellState;
(function (CellState) {
    CellState[CellState["regular"] = 1] = "regular";
    CellState[CellState["forbidden"] = 2] = "forbidden";
    CellState[CellState["route"] = 3] = "route";
})(CellState || (CellState = {}));
var MazeOption;
(function (MazeOption) {
    MazeOption[MazeOption["selectStartPosition"] = 1] = "selectStartPosition";
    MazeOption[MazeOption["selectEndPosition"] = 2] = "selectEndPosition";
    MazeOption[MazeOption["go"] = 3] = "go";
})(MazeOption || (MazeOption = {}));
//# sourceMappingURL=models.js.map