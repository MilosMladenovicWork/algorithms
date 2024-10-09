const edgeList = [
  [0, 1],
  [0, 3],
  [1, 3],
  [2, 1],
  [3, 2],
];

const edgeListToAdjacencyMatrix = (edgeList: number[][]) => {
  let highestVertexNumber: number = 0;

  for (const edge of edgeList) {
    if (highestVertexNumber < edge[0]) {
      highestVertexNumber = edge[0];
    }
    if (highestVertexNumber < edge[1]) {
      highestVertexNumber = edge[1];
    }
  }

  const adjacencyMatrix = Array.from({ length: highestVertexNumber + 1 }, () =>
    Array(highestVertexNumber + 1).fill(0)
  );

  for (const edge of edgeList) {
    adjacencyMatrix[edge[0]][edge[1]] = 1;
  }

  return adjacencyMatrix;
};

console.log(edgeListToAdjacencyMatrix(edgeList));
