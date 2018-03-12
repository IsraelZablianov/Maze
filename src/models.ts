///<reference path="../_references.d.ts"/>

export enum CellState {
    regular = 1,
    forbidden,
    route
}

export enum MazeOption {
    selectStartPosition = 1,
    selectEndPosition,
    go
}

export interface IPosition {
    colPos: number;
    rawPos: number;
}

export interface ICell extends IPosition {
    cellState: CellState;
    content?: string;
}

export interface IMaze {
    raws: number;
    cols: number;
    matrix: ICell[][];
    start?: IPosition;
    end?: IPosition;
}