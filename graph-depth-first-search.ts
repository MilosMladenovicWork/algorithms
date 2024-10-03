const graph = {
  1: [2, 3],
  2: [1, 4],
  3: [1, 4],
  4: [2, 3, 5],
  5: [4],
};

function graphDepthFirstSearch(
  graph: { [key: number]: number[] },
  fromVertex: number,
  vertexToFind: number
) {
  if (!graph[fromVertex]) {
    return null;
  }

  const visited: { [key: number]: boolean } = {};

  const toVisitVertices = [fromVertex];

  visited[fromVertex] = true;

  while (toVisitVertices.length > 0) {
    const vertex = toVisitVertices.pop()!;

    console.log(vertex);

    if (vertex === vertexToFind) {
      return graph[vertex];
    }

    for (let i = graph[vertex].length - 1; i >= 0; i--) {
      const relatedVertex = graph[vertex][i];
      if (!visited[relatedVertex]) {
        toVisitVertices.push(relatedVertex);
        visited[relatedVertex] = true;
      }
    }
  }
}

graphDepthFirstSearch(graph, 1, 3);
