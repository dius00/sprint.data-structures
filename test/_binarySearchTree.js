/* eslint-disable no-unused-expressions */
// Hello Student! Can you guess the reason why we are specifically disabling the no-unused-expressions rules here?

const { expect } = require("chai");
const { BinarySearchTree } = require("../src/BinarySearchTree");
const { isClass } = require("./utilities");

let tree;
let anotherTree;
let fullBST;
describe("The Binary Search Tree", () => {
  beforeEach(() => {
    tree = new BinarySearchTree(1);

    anotherTree = new BinarySearchTree(10);
    anotherTree.insert(5);
    anotherTree.insert(15);
    anotherTree.insert(8);
    anotherTree.insert(3);
    anotherTree.insert(7);
    anotherTree.insert(20);
    anotherTree.insert(17);
    anotherTree.insert(9);
    anotherTree.insert(14);

    fullBST = new BinarySearchTree(10);
    fullBST.insert(5);
    fullBST.insert(20);
    fullBST.insert(15);
    fullBST.insert(21);
    fullBST.insert(16);
    fullBST.insert(13);
  });

  describe("The Binary Search Tree constructor", () => {
    it("should be an ES6 class", () => {
      expect(isClass(BinarySearchTree)).to.be.true;
    });
  });

  describe("The insert method", () => {
    it("should exist on the Tree prototype", () => {
      expect(BinarySearchTree.prototype.insert).to.exist;
      expect(typeof BinarySearchTree.prototype.insert).to.equal("function");
    });

    it.only("should insert the given value", () => {
      tree.insert(2);
      expect(tree.value).to.equal(1);
      expect(tree.right.value).to.equal(2);
    });

    it("should return the entire tree for chaining purpose", () => {
      const treeReturned1 = tree.insert(1);
      expect(tree).to.deep.equal(treeReturned1);

      const treeReturned2 = tree.insert(2);
      expect(tree).to.deep.equal(treeReturned2);
    });

    it("should insert the given value in the proper location", () => {
      tree.insert(4);
      tree.insert(2);
      tree.insert(0.4);
      tree.insert(7);
      expect(tree.left.value).to.equal(0.4);
      expect(tree.right.value).to.equal(4);
      expect(tree.right.right.value).to.equal(7);
      expect(tree.right.left.value).to.equal(2);
    });

    it("should not allow duplicated value", () => {
      tree = new BinarySearchTree(101);
      tree.insert(101);

      expect(tree.value).to.equal(101);
      expect(tree.left).to.not.exist;
      expect(tree.right).to.not.exist;
    });
  });

  describe("The contains method", () => {
    it("should exist on the Tree prototype", () => {
      expect(BinarySearchTree.prototype.contains).to.exist;
      expect(typeof BinarySearchTree.prototype.contains).to.equal("function");
    });

    it("should return true if a value exists and false if it does not", () => {
      tree.insert(4);
      tree.insert(2);
      tree.insert(1);
      tree.insert(7);
      expect(tree.contains(7)).to.equal(true);
    });

    it("should return false if a value does not exist", () => {
      tree.insert(4);
      tree.insert(2);
      tree.insert(1);
      tree.insert(7);
      expect(tree.contains(5)).to.equal(false);
    });
  });

  describe("The traverseDepthFirstInOrder method", () => {
    it("should exist on the Tree prototype", () => {
      expect(BinarySearchTree.prototype.traverseDepthFirstInOrder).to.exist;
    });

    it("should traverse the left branch, root, and right branch in that order", () => {
      const result = [];
      anotherTree.traverseDepthFirstInOrder((node) => result.push(node.value));
      expect(result).to.eql([3, 5, 7, 8, 9, 10, 14, 15, 17, 20]);
    });

    it("should take a function as the parameter", () => {
      const x = (node) => node;
      tree.traverseDepthFirstInOrder(x);
      expect(x).to.be.a("function");
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

  describe("The traverseBreadthFirst method", () => {
    it("should exist on the Tree prototype", () => {
      expect(BinarySearchTree.prototype.traverseBreadthFirst).to.exist;
      expect(typeof BinarySearchTree.prototype.traverseBreadthFirst).to.equal(
        "function"
      );
    });

    it("should traverse across the binary tree before going down", () => {
      const traverseBreadthFirstResult = [];
      anotherTree.traverseBreadthFirst((node) =>
        traverseBreadthFirstResult.push(node.value)
      );
      expect(traverseBreadthFirstResult).to.eql([
        10,
        5,
        15,
        3,
        8,
        14,
        20,
        7,
        9,
        17,
      ]);
    });
  });

  describe("The traverseDepthFirstPreOrder method", () => {
    it("should exist on the Tree prototype", () => {
      expect(BinarySearchTree.prototype.traverseDepthFirstPreOrder).to.exist;
    });

    it("should traverse the root, left branch, and right branch in that order", () => {
      const result = [];
      anotherTree.traverseDepthFirstPreOrder((node) => result.push(node.value));
      expect(result).to.eql([10, 5, 3, 8, 7, 9, 15, 14, 20, 17]);
    });

    it("should take a function as the parameter", () => {
      const x = (node) => node;
      tree.traverseDepthFirstPreOrder(x);
      expect(x).to.be.a("function");
    });
  });

  describe("The traverseDepthFirstPostOrder method", () => {
    it("should exist on the Tree prototype", () => {
      expect(BinarySearchTree.prototype.traverseDepthFirstPostOrder).to.exist;
    });

    it("should traverse the left branch, right branch, and root in that order", () => {
      const result = [];
      anotherTree.traverseDepthFirstPostOrder((node) =>
        result.push(node.value)
      );
      expect(result).to.eql([3, 7, 9, 8, 5, 14, 17, 20, 15, 10]);
    });

    it("should take a function as the parameter", () => {
      const x = (node) => node;
      tree.traverseDepthFirstPostOrder(x);
      expect(x).to.be.a("function");
    });
  });

  describe("The checkIfFull method", () => {
    it("should exist on the Tree prototype", () => {
      expect(BinarySearchTree.prototype.checkIfFull).to.exist;
    });

    it("should return false if a node has only 1 child", () => {
      expect(anotherTree.checkIfFull()).to.equal(false);
    });

    it("should return true if each node has either 0 or 2 children", () => {
      expect(fullBST.checkIfFull()).to.equal(true);
    });
  });

  describe("The checkIfBalanced method", () => {
    it("should exist on the Tree prototype", () => {
      expect(BinarySearchTree.prototype.checkIfBalanced).to.exist;
    });

    it("should return false if the height of each branch differs by more than 1", () => {
      expect(fullBST.checkIfBalanced()).to.equal(false);
    });
    it("should return true if the height of each branch differs by no more than 1", () => {
      expect(anotherTree.checkIfBalanced()).to.equal(true);
    });
  });
});
