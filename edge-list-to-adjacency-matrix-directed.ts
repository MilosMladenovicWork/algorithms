const edgeList = [
  [0, 1],
  [0, 3],
  [1, 3],
  [2, 1],
  [3, 2],
];

const edgeListToAdjacencyMatrix = (edgeList: number[][]) => {
  let visited: { [key: number]: boolean } = {};
  let numberOfVertices = 0;

  for (const edge of edgeList) {
    for (const vertex of edge) {
      if (!visited[vertex]) {
        visited[vertex] = true;
        numberOfVertices++;
      }
    }
  }

  const matrix = Array.from({ length: numberOfVertices }, () =>
    Array(numberOfVertices).fill(0)
  );

  for (const edge of edgeList) {
    matrix[edge[0]][edge[1]] = 1;
  }

  return matrix;
};

console.log(edgeListToAdjacencyMatrix(edgeList));
