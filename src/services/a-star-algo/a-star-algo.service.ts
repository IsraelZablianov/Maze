///<reference path="../../../_references.d.ts"/>

interface IMazeAlgoService {
    findPath(maze :IMaze): IPosition[];
}

class AStarAlgoService implements IMazeAlgoService {
    findPath(maze: IMaze): IPosition[] {
        var graph = this.extractAStarGraphFromMaze(maze);
        var start = graph.grid[maze.start.rawPos][maze.start.colPos];
        var end = graph.grid[maze.end.rawPos][maze.end.colPos];
        var result: GridNode[] = astar.search(graph, start, end);
        return this.convertAStarGridNodeToPositions(result);
    }

    private extractAStarGraphFromMaze(maze: IMaze): Graph {
        let numberArrays: number[][] = [];
        for(let i = 0; i < maze.raws; i++) {
            numberArrays.push([]);
            for(let j = 0; j < maze.cols; j++) {
                numberArrays[i].push(maze.matrix[i][j].cellState === CellState.regular ? 1 : 0);
            }
        }

        return new Graph(numberArrays);
    }

    private convertAStarGridNodeToPositions(gridNodes: GridNode[]): IPosition[] {
        var positions: IPosition[] = [];

        for(var node of gridNodes) {
            positions.push({
                rawPos: node.x,
                colPos: node.y
            })
        }

        return positions;
    }
}

app.service(ServicesNames.A_STAR_ALGO, AStarAlgoService);
