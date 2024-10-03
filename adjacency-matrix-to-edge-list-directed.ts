const graph = [
  [0, 1, 0, 1],
  [0, 0, 0, 1],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
];

const adjacencyMatrixToEdgeList = (graph: number[][]) => {
  const edgeList: number[][] = [];
  const numberOfVertices = graph.length;

  for (let i = 0; i < numberOfVertices; i++) {
    for (let j = 0; j < numberOfVertices; j++) {
      if (graph[i][j] !== 0) {
        edgeList.push([i, j]);
      }
    }
  }

  return edgeList;
};

console.log(adjacencyMatrixToEdgeList(graph));
