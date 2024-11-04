export class Vertex {
    name: string;
    adjacentVertices: Map<Vertex, number>;

    constructor(name: string) {
        this.name = name;
        this.adjacentVertices = new Map;
    }

    addEdge(name: Vertex, cost: number) {
        this.adjacentVertices.set(name, cost);
    }
}

export class Dijkstra {
    graph: Record<string, Vertex>;

    constructor(graph: Record<string, Vertex>) {
        this.graph = graph;
    }

    findShortestPath(startingEdge: string, finalEdge: string) {
        const lowestCostsTable: Record<string, number> = {};
        const lowestCostPreviousVertexTable: Record<string, string> = {};
        let unvisitedVertices: Vertex[] = [];
        const visitedVertices: Record<string, boolean> = {};

        lowestCostsTable[this.graph[startingEdge].name] = 0;
        let currentVertex = this.graph[startingEdge];

        while (currentVertex) {
            visitedVertices[currentVertex.name] = true;
            unvisitedVertices = unvisitedVertices.filter(unvisitedVertex => unvisitedVertex.name !== currentVertex.name);

            for (const [adjacentVertex, cost] of currentVertex.adjacentVertices) {
                if (!visitedVertices[adjacentVertex.name]) {
                    unvisitedVertices.push(adjacentVertex);
                }

                let costViaCurrentVertex = lowestCostsTable[currentVertex.name] + cost;
                if (!lowestCostsTable[adjacentVertex.name] || costViaCurrentVertex < lowestCostsTable[adjacentVertex.name]) {
                    lowestCostsTable[adjacentVertex.name] = costViaCurrentVertex;
                    lowestCostPreviousVertexTable[adjacentVertex.name] = currentVertex.name
                }
            }

            const getNextVertexToProcess = () => {
                let lowestCost = Infinity;
                let lowestCostVertex: Vertex | undefined = undefined;
                for (const unvisitedVertex of unvisitedVertices) {
                    if (lowestCostsTable[unvisitedVertex.name] < lowestCost) {
                        lowestCost = lowestCostsTable[unvisitedVertex.name];
                        lowestCostVertex = unvisitedVertex;
                    }
                }
                return lowestCostVertex;
            }

            currentVertex = getNextVertexToProcess()!;
        }

        const shortestPath = [];
        let currentVertexName = this.graph[finalEdge].name;

        while (currentVertexName !== this.graph[startingEdge].name) {
            shortestPath.push(currentVertexName);
            currentVertexName = lowestCostPreviousVertexTable[currentVertexName];
        }

        shortestPath.push(this.graph[startingEdge].name)
        shortestPath.reverse();

        return {
            shortestPath,
            cost: lowestCostsTable[this.graph[finalEdge].name]
        }
    }

}