const graph = {
  1: [2, 3],
  2: [1, 3],
  3: [1, 2, 4],
  4: [3],
};

const graphBreadthFirstSearch = (
  graph: { [key: number]: number[] },
  startNode: number,
  searchedNode: number
) => {
  if (!graph[startNode]) {
    return;
  }

  if (startNode === searchedNode) {
    return graph[startNode];
  }

  const queue = [startNode];
  const visited: { [key: number]: boolean } = {};

  while (queue.length > 0) {
    const node = queue.shift()!;

    if (visited[node]) {
      continue;
    }
    console.log(node);

    if (node === searchedNode) {
      return graph[searchedNode];
    }

    queue.push(...graph[node]);
    visited[node] = true;
  }
};

console.log(graphBreadthFirstSearch(graph, 1, 4));
