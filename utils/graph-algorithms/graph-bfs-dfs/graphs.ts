import {QueueAsArray} from "../../dataStructures/queue/queue-as-array";

export class Vertex {
    value: string;
    adjacentVertices: Vertex[];

    constructor(value: string) {
        this.value = value;
        this.adjacentVertices = [];
    }

    addAdjacentVertex(vertex: Vertex) {
        if (!this.adjacentVertices.includes(vertex)) {
            this.adjacentVertices.push(vertex);
            vertex.addAdjacentVertex(this);
        }
    }

    dfsTraverse(vertex: Vertex, visitedVertices: Record<string, boolean> = {}) {
        visitedVertices[vertex.value] = true;
        console.log(vertex.value);
        vertex.adjacentVertices.forEach((vertex: Vertex) => {
            if (!visitedVertices[vertex.value]) {
                this.dfsTraverse(vertex, visitedVertices);
            }
        })
    }

    dfs(vertex: Vertex, searchValue: string, visitedVertices: Record<string, boolean> = {}): Vertex | undefined {
        if (vertex.value === searchValue) {
            return vertex;
        }

        visitedVertices[vertex.value] = true;

        for (const adjacentVertex of this.adjacentVertices) {
            if (!visitedVertices[adjacentVertex.value]) {
                let foundVertex = this.dfs(adjacentVertex, searchValue, visitedVertices);
                if (foundVertex) {
                    return foundVertex;
                }
            }
        }

        return undefined;
    }

    bfsTraverse(startingVertex: Vertex) {
        const queue = new QueueAsArray<Vertex>();
        const visitedVertices: Record<string, boolean> = {};
        visitedVertices[startingVertex.value] = true;
        queue.enqueue(startingVertex)

        while (!queue.isEmpty()) {
            let currentVertex = queue.dequeue()!;
            console.log(currentVertex);
            for (let adjacentVertex of currentVertex.adjacentVertices) {
                if (!visitedVertices[adjacentVertex.value]) {
                    visitedVertices[adjacentVertex.value] = true;
                    queue.enqueue(adjacentVertex);
                }
            }
        }
    }

    bfs(startingVertex: Vertex, searchValue: string): Vertex | undefined {
        const queue = new QueueAsArray<Vertex>();
        const visitedVertices: Record<string, boolean> = {};

        visitedVertices[startingVertex.value] = true;
        queue.enqueue(startingVertex);

        while (!queue.isEmpty()) {
            const currentVertex = queue.dequeue()!;

            if (currentVertex.value === searchValue) {
                return currentVertex;
            }

            for (let adjacentVertex of currentVertex.adjacentVertices) {
                if (!visitedVertices[adjacentVertex.value]) {
                    visitedVertices[adjacentVertex.value] = true;
                    queue.enqueue(adjacentVertex);
                }
            }
        }

        return undefined;
    }
}

export class Graphs {

}