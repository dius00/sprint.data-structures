/* eslint-disable no-unused-expressions, no-prototype-builtins */

const { expect } = require("chai");
const { isClass } = require("./utilities");
const Graph = require("../src/Graph");

let graph;
describe("Graphs", () => {
  beforeEach(() => {
    graph = new Graph();
  });

  describe("The Graph class", () => {
    it("should be a function", () => {
      expect(isClass(Graph)).to.be.true;
    });

    it("should have a nodes property equal to an object", () => {
      expect(graph.hasOwnProperty("nodes")).to.equal(true);
      expect(typeof graph.nodes).to.equal("object");
    });
  });

  describe("The addNode method", () => {
    it("should exist on the Graph prototype", () => {
      expect(Graph.prototype.addNode).to.exist;
    });

    it("should add a new node onto the graph", () => {
      graph.addNode(5);
      graph.addNode(3);
      graph.addNode(6);
      expect(graph.nodes[5]).to.exist;
      expect(graph.nodes[3]).to.exist;
      expect(graph.nodes[6]).to.exist;
    });

    it("should set new node to an empty array IF unique or to the current value if node with the same value already exists", () => {
      graph.addNode(5);
      graph.addNode(3);
      graph.addNode(6);
      expect(graph.nodes[5]).to.exist;
      expect(graph.nodes[3]).to.exist;
      expect(graph.nodes[6]).to.exist;
    });
  });

  describe("The removeNode method", () => {
    it("should exist on the Graph prototype", () => {
      expect(Graph.prototype.removeNode).to.exist;
    });

    it("should remove node with the referenced value", () => {
      graph.addNode(5);
      graph.addNode(3);
      graph.addNode(6);
      expect(graph.nodes[5]).to.exist;
      expect(graph.nodes[3]).to.exist;
      expect(graph.nodes[6]).to.exist;
      graph.removeNode(5);
      expect(graph.nodes[5]).to.be.undefined;
    });

    it("should remove edges from all other nodes to referenced node", () => {
      graph.addNode(5);
      graph.addNode(3);
      graph.addNode(6);
      graph.addEdge(5, 3);
      graph.addEdge(3, 6);
      graph.removeNode(5);
      expect(graph.nodes).to.eql({ 3: [6], 6: [3] });
    });
  });

  describe("The contains method", () => {
    it("should exist on the Graph prototype", () => {
      expect(Graph.prototype.contains).to.exist;
    });

    it("should return true if value exists and false if it does not", () => {
      graph.addNode(5);
      graph.addNode(3);
      graph.addNode(6);
      expect(graph.contains(5)).to.be.true;
      expect(graph.contains(1)).to.be.false;
    });
  });

  describe("The addEdge method", () => {
    it("should exist on the Graph prototype", () => {
      expect(Graph.prototype.addEdge).to.exist;
    });

    it("should return 'Invalid node value' if node value does not exist", () => {
      graph.addNode(5);
      graph.addNode(3);
      graph.addNode(6);
      expect(graph.addEdge(5, 4)).to.equal("Invalid node value");
      expect(graph.addEdge(4, 5)).to.equal("Invalid node value");
      expect(graph.addEdge(1, 4)).to.equal("Invalid node value");
    });

    it("should add edges to both nodes referenced in arguments", () => {
      graph.addNode(5);
      graph.addNode(3);
      graph.addNode(6);
      graph.addEdge(5, 3);
      expect(graph.nodes[5][0]).to.equal(3);
      expect(graph.nodes[3][0]).to.equal(5);
      graph.addEdge(3, 6);
      expect(graph.nodes[3][0]).to.equal(5, 6);
      expect(graph.nodes[6][0]).to.equal(3);
    });

    it("should not allow duplicate edges", () => {
      graph.addNode(1);
      graph.addNode(3);
      graph.addNode(6);
      graph.addEdge(6,3);
      expect(graph.nodes[6][0]).to.equal(3);
      expect(graph.nodes[3][0]).to.equal(6);
      graph.addEdge(6,3);
      expect(graph.nodes[6].length).to.equal(1);
      expect(graph.nodes[3].length).to.equal(1);
    });
  });

  describe("The removeEdge method", () => {
    it("should exist on the Graph prototype", () => {
      expect(Graph.prototype.removeEdge).to.exist;
    });

    it("should remove edges between referenced nodes", () => {
      graph.addNode(5);
      graph.addNode(3);
      graph.addNode(6);
      graph.addEdge(5, 3);
      expect(graph.nodes[5][0]).to.equal(3);
      expect(graph.nodes[3][0]).to.equal(5);
      graph.addEdge(3, 6);
      expect(graph.nodes[3][0]).to.equal(5, 6);
      expect(graph.nodes[6][0]).to.equal(3);
      graph.removeEdge(3, 6);
      expect(graph.nodes[5][0]).to.equal(3);
      expect(graph.nodes[3][0]).to.equal(5);
    });
  });

  describe("The hasEdge method", () => {
    it("should exist on the Graph prototype", () => {
      expect(Graph.prototype.hasEdge).to.exist;
    });

    it("should return true if referenced nodes have a common edge and false if not", () => {
      graph.addNode(5);
      graph.addNode(3);
      graph.addNode(6);
      graph.addEdge(5, 3);
      expect(graph.hasEdge(5, 3)).to.be.true;
      expect(graph.hasEdge(3, 5)).to.be.true;
      expect(graph.hasEdge(6, 3)).to.be.false;
    });
  });

  /*
+-------------------------+
| Advanced Requirements!! |
+-------------------------+

The following are part of the advanced requirements.
Do not proceed until you are done with the basic
requirements for ALL data structures in this exercise.

Uncomment by removing the 'x'.
*/

  xdescribe("The forEach method", () => {
    it("should exist on the Graph prototype", () => {
      expect(Graph.prototype.addEdge).to.exist;
    });

    it("should run callback function on the value of all nodes in the graph", () => {
      const results = [];
      graph.addNode(5);
      graph.addNode(3);
      graph.addNode(6);
      graph.forEach((value) => {
        results.push(value);
      });
      expect(results).to.include.members(["5", "3", "6"]);
    });
  });

  xdescribe("The traverseDepthFirst method", () => {
    it("should exist on the Graph prototype", () => {
      expect(Graph.prototype.traverseDepthFirst).to.exist;
    });

    it("should travel down the graph before across", () => {
      graph.addNode(1);
      graph.addNode(2);
      graph.addNode(3);
      graph.addNode(4);
      graph.addNode(5);
      graph.addNode(6);
      graph.addEdge(1, 2);
      graph.addEdge(1, 4);
      graph.addEdge(2, 3);
      graph.addEdge(3, 5);
      graph.addEdge(5, 6);
      const depthFirstResult = [];
      graph.traverseDepthFirst(1, (value) => {
        depthFirstResult.push(value);
      });
      expect(depthFirstResult).to.eql([1, 2, 3, 5, 6, 4]);
    });
  });

  xdescribe("The traverseBreadthFirst method", () => {
    it("should exist on the Graph prototype", () => {
      expect(Graph.prototype.traverseBreadthFirst).to.exist;
    });

    it("should travel across the graph before down", () => {
      graph.addNode(1);
      graph.addNode(2);
      graph.addNode(3);
      graph.addNode(4);
      graph.addNode(5);
      graph.addNode(6);
      graph.addEdge(1, 2);
      graph.addEdge(1, 4);
      graph.addEdge(2, 3);
      graph.addEdge(3, 5);
      graph.addEdge(2, 6);
      const depthFirstResult = [];
      graph.traverseBreadthFirst(1, (value) => {
        depthFirstResult.push(value);
      });
      expect(depthFirstResult).to.eql([1, 2, 4, 3, 6, 5]);
    });
  });
});
