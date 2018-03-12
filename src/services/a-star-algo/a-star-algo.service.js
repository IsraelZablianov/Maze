import app from "../../app";
import { ServicesNames } from "../../constants/services-names";
var Graph = require("javascript-astar/astar.js");
var astar = require("javascript-astar/astar.js");
var AStarAlgoService = (function () {
    function AStarAlgoService() {
    }
    AStarAlgoService.prototype.findPath = function (maze) {
        var graph = this.extractAStarGraphFromMaze(maze);
        var start = graph.grid[maze.start.rawPos][maze.start.colPos];
        var end = graph.grid[maze.end.rawPos][maze.end.colPos];
        var result = astar.search(graph, start, end);
        return this.convertAStarGridNodeToPositions(result);
    };
    AStarAlgoService.prototype.extractAStarGraphFromMaze = function (maze) {
        var numberArrays = [];
        for (var i = 0; i < maze.raws; i++) {
            numberArrays.push([]);
            for (var j = 0; j < maze.cols; j++) {
                numberArrays[i].push(maze.matrix[i][j].cellState === CellState.regular ? 1 : 0);
            }
        }
        return new Graph(numberArrays);
    };
    AStarAlgoService.prototype.convertAStarGridNodeToPositions = function (gridNodes) {
        var positions = [];
        for (var _i = 0, gridNodes_1 = gridNodes; _i < gridNodes_1.length; _i++) {
            var node = gridNodes_1[_i];
            positions.push({
                rawPos: node.x,
                colPos: node.y
            });
        }
        return positions;
    };
    return AStarAlgoService;
}());
export { AStarAlgoService };
app.service(ServicesNames.A_STAR_ALGO, AStarAlgoService);
//# sourceMappingURL=a-star-algo.service.js.map