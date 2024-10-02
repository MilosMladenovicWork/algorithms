const graph = {
  1: [2, 3],
  2: [1, 3],
  3: [1, 2, 4],
  4: [3],
};

const graphBreadthFirstSearch = (
  graph: { [key: number]: number[] },
  startVertex: number,
  searchedVertex: number
) => {
  const visited: { [key: number]: boolean } = {};

  if (!graph[startVertex]) {
    return null;
  }

  const queue: number[] = [startVertex];
  visited[startVertex] = true;

  while (queue.length > 0) {
    const vertex = queue.shift()!;

    if (vertex === searchedVertex) {
      return graph[vertex];
    }

    for (let connectedVertex of graph[vertex]) {
      if (!visited[connectedVertex]) {
        queue.push(connectedVertex);
        visited[connectedVertex] = true;
      }
    }
  }

  return null;
};

console.log(graphBreadthFirstSearch(graph, 1, 4));
