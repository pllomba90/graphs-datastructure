class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertices) {
    vertices.forEach(vertex => {
      this.addVertex(vertex);
    });
  }
  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(node1, node2) {
    if (!this.nodes.has(node1) || !this.nodes.has(node2)) {
      throw new Error("Both nodes must be in the graph to add an edge.");
    }

    node1.adjacent.add(node2);
    node2.adjacent.add(node1);
  }
  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(node1, node2) {
    if (!this.nodes.has(node1) || !this.nodes.has(node2)) {
      throw new Error("Both nodes must be in the graph to remove an edge.");
    }

    node1.adjacent.delete(node2);
    node2.adjacent.delete(node1);
  }
  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    if (!this.nodes.has(vertex)) {
      throw new Error("Vertex to remove is not in the graph.");
    }

    this.nodes.delete(vertex);

    for (const node of this.nodes) {
      node.adjacent.delete(vertex);
    }
  }
  // this function returns an array of Node values using DFS
  depthFirstSearch(startNode) {
    const visited = new Set();
    const result = [];

    const dfs = (node) => {
      if (!node) return;
      visited.add(node);
      result.push(node.value);
      for (const neighbor of node.adjacent) {
        if (!visited.has(neighbor)) {
          dfs(neighbor);
        }
      }
    };

    dfs(startNode);
    return result;
  }
  // this function returns an array of Node values using BFS
  breadthFirstSearch(startNode) {
    const visited = new Set();
    const result = [];
    const queue = [startNode];

    visited.add(startNode);

    while (queue.length) {
      const current = queue.shift();
      result.push(current.value);

      for (const neighbor of current.adjacent) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    return result;
  }
}

module.exports = {Graph, Node}