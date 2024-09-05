class FlowNetwork {
  network: number[][];
  numberOfVertices: number;

  constructor(numberOfVertices: number) {
    this.numberOfVertices = numberOfVertices;
    this.network = Array.from({ length: numberOfVertices }, () =>
      Array(numberOfVertices).fill(0)
    );
  }

  addEdge(vertexFrom: number, vertexTo: number, capacity: number) {
    this.network[vertexFrom][vertexTo] = capacity;
  }

  computeMaxFlow(sourceVertex: number, sinkVertex: number) {
    let maxFlow = 0;
    let augmentingPath = Array(this.numberOfVertices).fill(-1);
    // find augmenting path
    while (this.findAugmentingPath(sourceVertex, sinkVertex, augmentingPath)) {
      // find min flow
      let minPathFlow = Infinity;

      for (let i = sinkVertex; i !== sourceVertex; i = augmentingPath[i]) {
        const previousVertex = augmentingPath[i];
        minPathFlow = Math.min(minPathFlow, this.network[previousVertex][i]);
      }

      // update capacities in network with min flow
      for (let i = sinkVertex; i !== sourceVertex; i = augmentingPath[i]) {
        const previousVertex = augmentingPath[i];
        this.network[previousVertex][i] -= minPathFlow;
        this.network[i][previousVertex] += minPathFlow;
      }

      // add min flow to max flow
      maxFlow += minPathFlow;
    }
    // return max flow
    return maxFlow;
  }

  private findAugmentingPath(
    sourceVertex: number,
    sinkVertex: number,
    augmentingPath: number[]
  ) {
    augmentingPath[sourceVertex] = -1;
    const visited: { [key: number]: boolean } = {};

    const queue: number[] = [sourceVertex];
    visited[sourceVertex] = true;

    while (queue.length > 0) {
      const visitedVertex = queue.shift()!;

      for (
        let nextVertex = 0;
        nextVertex < this.numberOfVertices;
        nextVertex++
      ) {
        if (
          this.network[visitedVertex][nextVertex] > 0 &&
          !visited[nextVertex]
        ) {
          visited[nextVertex] = true;
          augmentingPath[nextVertex] = visitedVertex;
          queue.push(nextVertex);
        }
      }
    }

    return visited[sinkVertex];
  }
}

// Example usage:
const network = new FlowNetwork(6);
network.addEdge(0, 1, 16);
network.addEdge(0, 2, 13);
network.addEdge(1, 2, 10);
network.addEdge(1, 3, 12);
network.addEdge(2, 1, 4);
network.addEdge(2, 4, 14);
network.addEdge(3, 2, 9);
network.addEdge(3, 5, 20);
network.addEdge(4, 3, 7);
network.addEdge(4, 5, 4);

const maxFlow = network.computeMaxFlow(0, 5);
console.log(`The maximum possible flow is ${maxFlow}`);
