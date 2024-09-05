const graph = [
  [0, 1, 0, 1],
  [0, 0, 0, 1],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
];

const adjacencyMatrixToEdgeList = (graph: number[][]) => {
  const edgeList: number[][] = [];

  for (let i = 0; i < graph.length; i++) {
    for (let j = 0; j < graph[i].length; j++) {
      if (graph[i][j] === 1) {
        edgeList.push([i, j]);
      }
    }
  }

  return edgeList;
};

console.log(adjacencyMatrixToEdgeList(graph));
