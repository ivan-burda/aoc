import {Vertex} from "./graphs";

describe('Vertex', () => {
    it('addAdjacentVertex assure a mutual connection is created', () => {
        const alice = new Vertex('alice');
        const bob = new Vertex('bob');

        alice.addAdjacentVertex(bob);

        expect(bob.adjacentVertices).toEqual([alice])
    });

    it('dfs returns the searched-for vertex if it was found', () => {
        const alice = new Vertex('alice');
        const bob = new Vertex('bob');
        const cyril = new Vertex('cyril');
        const dima = new Vertex('dima');
        const lucas = new Vertex('lucas');

        alice.addAdjacentVertex(bob);
        alice.addAdjacentVertex(cyril);
        alice.addAdjacentVertex(dima);

        const foundVertex = alice.dfs(alice, 'dima');
        console.log(foundVertex ? `Found: ${foundVertex.value}` : 'Vertex not found');
        expect(foundVertex).toEqual(dima)
    });

    it('bfs returns the searched-for vertex if it was found', () => {
        const alice = new Vertex('alice');
        const bob = new Vertex('bob');
        const cyril = new Vertex('cyril');
        const dima = new Vertex('dima');
        const lucas = new Vertex('lucas');

        alice.addAdjacentVertex(bob);
        alice.addAdjacentVertex(cyril);
        alice.addAdjacentVertex(dima);

        const foundVertex = alice.bfs(alice, 'dima');
        console.log(foundVertex ? `Found: ${foundVertex.value}` : 'Vertex not found');
        expect(foundVertex).toEqual(dima)
    });

    it('dfs traverse', () => {
        const alice = new Vertex('alice');
        const bob = new Vertex('bob');
        const cyril = new Vertex('cyril');
        const dima = new Vertex('dima');

        alice.addAdjacentVertex(bob);
        alice.addAdjacentVertex(cyril);
        bob.addAdjacentVertex(dima);

        bob.dfsTraverse(alice)
    })

    it('bfs traverse', () => {
        const alice = new Vertex('alice');
        const bob = new Vertex('bob');
        const cyril = new Vertex('cyril');
        const dima = new Vertex('dima');
        alice.addAdjacentVertex(bob);
        alice.addAdjacentVertex(cyril);
        bob.addAdjacentVertex(dima);

        alice.bfsTraverse(alice)
    })
})