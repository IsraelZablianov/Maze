declare class GridNode {
    x: number;
    y: number;
    weight?: number;
}

declare class Graph {
    constructor(gridNumbers: number[][]);
    grid: GridNode[][];
}

declare class JavaScriptAstar {
    search(graph: Graph, start: GridNode, end: GridNode): GridNode[];
}

declare var astar: JavaScriptAstar;
