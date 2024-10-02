const adjacencyMatrix = [
  [0, Infinity, 10, Infinity],
  [Infinity, 0, Infinity, 5000],
  [Infinity, 1000, 0, Infinity],
  [Infinity, Infinity, Infinity, 0],
];

const calculateShortestPathBetweenAllPairsOfVertices = (
  adjacencyMatrix: number[][]
) => {
  const numberOfVertices = adjacencyMatrix.length;

  const distanceMatrix = Array.from({ length: numberOfVertices }, (_, i) =>
    Array.from({ length: numberOfVertices }, (_, j) => adjacencyMatrix[i][j])
  );

  for (let i = 0; i < numberOfVertices; i++) {
    for (let j = 0; j < numberOfVertices; j++) {
      for (let k = 0; k < numberOfVertices; k++) {
        if (
          distanceMatrix[i][j] >
          distanceMatrix[i][k] + distanceMatrix[k][j]
        ) {
          distanceMatrix[i][j] = distanceMatrix[i][k] + distanceMatrix[k][j];
        }
      }
    }
  }
  return distanceMatrix;
};

console.log(calculateShortestPathBetweenAllPairsOfVertices(adjacencyMatrix));
