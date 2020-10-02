class Graph {
  constructor() {
    /**
     * There are many representations of Graph.
     * We can store Graph in many ways.
     * One way is by using Adjacency List.
     */
    this.nodes = {}; // Adjacency List
  }

  // adds a node to graph with a primitive value. Returns undefined.
  addNode(value) {
    if (!this.nodes[value]) {
      this.nodes[value] = [];
    }
  }

  // removes a node from graph and returns undefined.
  removeNode(value) {
    if (this.nodes[value]) {
      delete this.nodes[value];
    }
  }
  // returns boolean. Returns true if value is found in graph, false otherwise
  contains(value) {
    if (this.nodes.hasOwnProperty(value)) return true;
    return false;
  }
  // returns undefined. Create connection between two nodes if they're both present in the graph
  addEdge(value1, value2) {
    if (this.nodes[value1] && this.nodes[value2]) {
      if (!this.nodes[value1].includes(value2)) this.nodes[value1].push(value2);
      if (!this.nodes[value2].includes(value1)) this.nodes[value2].push(value1);
    } else {
      return "Invalid node value";
    }
  }
  // returns undefined. Remove connection between two nodes
  removeEdge(value1, value2) {}
  // returns boolean. Returns true if edge exists, false otherwise
  hasEdge(value1, value2) {}
}

/*
|XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
|X                               X
|X   What is the time complexity X
|X   of the above functions?     X
|X                               X
|XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
*/

module.exports = { Graph };
