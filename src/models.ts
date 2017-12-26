///<reference path="../_references.d.ts"/>

type Map = any;

enum CellState {
    regular = 1,
    forbidden,
    route
}

enum MazeOption {
    selectStartPosition = 1,
    selectEndPosition,
    go
}

interface IPosition {
    colPos: number;
    rawPos: number;
}

interface ICell extends IPosition {
    cellState: CellState;
    content?: string;
}

interface IMaze {
    raws: number;
    cols: number;
    matrix: ICell[][];
    start?: IPosition;
    end?: IPosition;
}