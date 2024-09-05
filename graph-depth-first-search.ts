const graph = {
  1: [2, 3],
  2: [1, 4],
  3: [1, 4],
  4: [2, 3, 5],
  5: [4],
};

function graphDepthFirstSearch(
  graph: any,
  node: number,
  searchedForNode: number
) {
  const visited: { [key: number]: boolean } = {};

  if (!graph[node]) {
    return;
  }

  const verticesToVisit: number[] = [node];
  visited[node] = true;

  while (verticesToVisit.length > 0) {
    const vertex = verticesToVisit.pop()!;
    console.log(vertex);

    if (vertex === searchedForNode) {
      return graph[vertex];
    }

    for (let i = graph[vertex].length - 1; i >= 0; i--) {
      if (!visited[graph[vertex][i]]) {
        verticesToVisit.push(graph[vertex][i]);
        visited[graph[vertex][i]] = true;
      }
    }
  }
}

graphDepthFirstSearch(graph, 1, 3);
