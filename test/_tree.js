/* eslint-disable no-unused-expressions, no-prototype-builtins */

const { expect } = require("chai");
const { isClass } = require("./utilities");
const Tree = require("../src/Tree");

let tree;
describe("Trees", () => {
  beforeEach(() => {
    tree = new Tree(1);
  });

  describe("The Tree class", () => {
    it("should be a class", () => {
      expect(isClass(Tree)).to.be.true;
    });

    it("should have properties named value and children", () => {
      expect(tree.hasOwnProperty("value")).to.equal(true);
      expect(tree.hasOwnProperty("children")).to.equal(true);
    });
  });

  describe("The addChild method", () => {
    it("should exist on the Tree prototype", () => {
      expect(Tree.prototype.addChild).to.exist;
    });

    it("should add a child node", () => {
      tree.addChild(2);
      expect(tree.children[0].value).to.equal(2);
    });

    it("should be able to add a child to a tree's child", () => {
      tree.addChild(2);
      tree.children[0].addChild(3);
      expect(tree.children[0].children[0].value).to.equal(3);
    });
  });

  describe("The contains method", () => {
    it("should exist on the Tree prototype", () => {
      expect(Tree.prototype.contains).to.exist;
    });

    it("should return true if a value exists", () => {
      tree.addChild(2);
      expect(tree.contains(2)).to.equal(true);
    });

    it("should return false if a value does not exist", () => {
      tree.addChild(2);
      expect(tree.contains(3)).to.equal(false);
    });

    it("should correctly detect nested children", () => {
      tree.addChild(2);
      tree.addChild(3);
      tree.children[0].addChild(4);
      tree.children[1].addChild(5);
      expect(tree.contains(4)).to.equal(true);
      expect(tree.contains(5)).to.equal(true);
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

  xdescribe("The traverseDepthFirst method", () => {
    it("should exist on the Tree prototype", () => {
      expect(Tree.prototype.traverseDepthFirst).to.exist;
    });

    it("should travel down the tree before across", () => {
      tree.addChild(2);
      tree.addChild(3);
      tree.children[0].addChild(4);
      tree.children[1].addChild(5);
      const depthFirstResult = [];
      tree.traverseDepthFirst((node) => depthFirstResult.push(node.value));
      expect(depthFirstResult).to.eql([4, 2, 5, 3, 1]);
    });

    it("should take a function as the parameter", () => {
      const x = (node) => node;
      tree.traverseDepthFirst(x);
      expect(x).to.be.a("function");
    });
  });

  xdescribe("The traverseBreadthFirst method", () => {
    it("should exist on the Tree prototype", () => {
      expect(Tree.prototype.traverseBreadthFirst).to.exist;
    });

    it("should travel across the tree before going down", () => {
      tree.addChild(2);
      tree.addChild(3);
      tree.children[0].addChild(4);
      tree.children[1].addChild(5);
      const breadthFirstResult = [];
      tree.traverseBreadthFirst((node) => breadthFirstResult.push(node.value));
      expect(breadthFirstResult).to.eql([1, 2, 3, 4, 5]);
    });

    it("should take a function as the parameter", () => {
      const x = (node) => node;
      tree.traverseBreadthFirst(x);
      expect(x).to.be.a("function");
    });
  });
});
