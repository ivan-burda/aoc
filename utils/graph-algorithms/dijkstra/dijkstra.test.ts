import {Dijkstra, Vertex} from "./dijkstra";

describe('dijkstra-universal', () => {
    it('returns the shortest path and its price', () => {
        const atlanta = new Vertex("atlanta");
        const boston = new Vertex("boston");
        const chicago = new Vertex("chicago");
        const denver = new Vertex("denver");
        const el_paso = new Vertex("el_paso");

        atlanta.addEdge(boston, 100);
        atlanta.addEdge(denver, 160);
        boston.addEdge(chicago, 120);
        boston.addEdge(denver, 180);
        chicago.addEdge(el_paso, 80);
        denver.addEdge(chicago, 40);
        denver.addEdge(el_paso, 140);
        el_paso.addEdge(boston, 100);

        const citiesGraph = {
            atlanta,
            boston,
            chicago,
            denver,
            el_paso,
        }

        const citiesDijkstra = new Dijkstra(citiesGraph)

        expect(citiesDijkstra.findShortestPath('atlanta', 'el_paso')).toEqual({
            shortestPath: ['atlanta', 'denver', 'chicago', 'el_paso'], cost: 280
        });
    })

});