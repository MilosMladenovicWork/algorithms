class FlowNetwork {
  flowNetwork: number[][];

  constructor(numberOfVertices: number) {
    this.flowNetwork = Array.from({ length: numberOfVertices }, () =>
      new Array(numberOfVertices).fill(0)
    );
  }

  addEdge(vertex1: number, vertex2: number, capacity: number) {
    this.flowNetwork[vertex1][vertex2] = capacity;
  }

  computeMaxFlow(fromVertex: number, toVertex: number) {
    const augmentingPath = new Array(this.flowNetwork.length).fill(-1);
    let maxFlow = 0;

    while (this.findAugmentingPath(fromVertex, toVertex, augmentingPath)) {
      let pathFlow = Infinity;

      for (let i = toVertex; i !== fromVertex; i = augmentingPath[i]) {
        const previousVertex = augmentingPath[i];
        pathFlow = Math.min(pathFlow, this.flowNetwork[previousVertex][i]);
      }

      for (let i = toVertex; i !== fromVertex; i = augmentingPath[i]) {
        const previousVertex = augmentingPath[i];
        this.flowNetwork[previousVertex][i] -= pathFlow;
        this.flowNetwork[i][previousVertex] += pathFlow;
      }

      maxFlow += pathFlow;
    }

    return maxFlow;
  }

  private findAugmentingPath(
    fromVertex: number,
    toVertex: number,
    augmentingPath: number[]
  ) {
    augmentingPath[fromVertex] = -1;
    const visited: { [key: number]: boolean } = {};

    const queue: number[] = [fromVertex];
    visited[fromVertex] = true;

    while (queue.length > 0) {
      const visitedVertex = queue.shift()!;

      for (let vertex = 0; vertex < this.flowNetwork.length; vertex++) {
        if (!visited[vertex] && this.flowNetwork[visitedVertex][vertex] > 0) {
          augmentingPath[vertex] = visitedVertex;
          queue.push(vertex);
          visited[vertex] = true;
        }
      }
    }

    return visited[toVertex];
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
