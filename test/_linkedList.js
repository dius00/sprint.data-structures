/* eslint-disable no-unused-expressions, no-prototype-builtins */

const { expect } = require("chai");
const { isClass } = require("./utilities");
const LinkedList = require("../src/LinkedList");

let linkedList;
describe("Linked Lists", () => {
  beforeEach(() => {
    linkedList = new LinkedList(5);
  });

  describe("The Linked List constructor", () => {
    it("should be a function", () => {
      expect(isClass(LinkedList)).to.be.true;
    });

    it("should have properties head and tail", () => {
      expect(linkedList.hasOwnProperty("head")).to.equal(true);
      expect(linkedList.hasOwnProperty("tail")).to.equal(true);
    });

    it("should able to instantiate LinkedList without initial value", () => {
      expect(() => new LinkedList()).not.to.throw();
    });

    it("should initialize properties with proper values when initial value is not passed into constructor", () => {
      linkedList = new LinkedList();
      expect(linkedList.head).to.be.undefined;
      expect(linkedList.head).to.not.exist; // Hint: this line tests if `head` is undefined or null.
      expect(linkedList.tail).to.not.exist; // Hint: this line tests if `head` is undefined or null.
    });

    it("should add starting node to head and tail with argument value", () => {
      expect(linkedList.head.value).to.equal(5);
      expect(linkedList.tail.value).to.equal(5);
      expect(linkedList.head).to.deep.equal(linkedList.tail);
    });
  });

  describe("The appendToTail method", () => {
    it("should exist on the LinkedList prototype", () => {
      expect(LinkedList.prototype.appendToTail).to.exist;
      expect(typeof LinkedList.prototype.appendToTail).to.equal("function");
    });

    it("should return a node", () => {
      const newNode = linkedList.appendToTail(3);
      expect(newNode.value).to.equal(3);
      expect(newNode.next).to.eql(null);
      expect(newNode).to.deep.equal(linkedList.tail);
    });

    it("should append a new node to the tail of the linked list", () => {
      const newNode = linkedList.appendToTail(4);
      expect(linkedList.tail).to.equal(newNode);
      expect(linkedList.tail.value).to.equal(4);
    });

    it("should be okay to appendToTail when there is no initial value", () => {
      linkedList = new LinkedList();

      const newNode = linkedList.appendToTail(5);
      expect(linkedList.head).to.deep.equal(newNode);
      expect(linkedList.tail).to.deep.equal(newNode);
    });
  });

  describe("The removeHead method", () => {
    it("should exist on the LinkedList prototype", () => {
      expect(LinkedList.prototype.removeHead).to.exist;
      expect(typeof LinkedList.prototype.removeHead).to.equal("function");
    });

    it("should remove current head and replace with node from old head's next property", () => {
      linkedList.appendToTail(3);
      linkedList.appendToTail(4);

      const headBeforeRemoval = linkedList.head;
      const headAfterRemoval = headBeforeRemoval.next;

      const headRemoved = linkedList.removeHead();

      expect(headRemoved).to.deep.equal(headBeforeRemoval);
      expect(linkedList.head).to.deep.equal(headAfterRemoval);
    });
  });

  describe("The findNode method", () => {
    it("should exist on the LinkedList prototype", () => {
      expect(LinkedList.prototype.findNode).to.exist;
      expect(typeof LinkedList.prototype.findNode).to.equal("function");
    });

    it("should return node with value equal to the search value", () => {
      linkedList.appendToTail(3);
      const nodeValue6 = linkedList.appendToTail(6);
      linkedList.appendToTail(2);

      expect(linkedList.findNode(6)).to.deep.equal(nodeValue6);
      expect(linkedList.findNode(6).value).to.equal(6);
    });

    it("should return null if the search value is not in the linked list", () => {
      linkedList.appendToTail(3);
      linkedList.appendToTail(6);
      linkedList.appendToTail(2);
      expect(linkedList.findNode(20)).to.equal(null);
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

  describe("The forEach method", () => {
    it("should exist on the LinkedList prototype", () => {
      expect(LinkedList.prototype.forEach).to.exist;
      expect(typeof LinkedList.prototype.forEach).to.equal("function");
    });

    it("should run callback function on the value of each node in the linked list", () => {
      const results = [];
      linkedList.insertHead(3);
      linkedList.insertHead(6);
      linkedList.insertHead(2);
      linkedList.forEach((value) => results.push(value));
      expect(results).to.eql([2, 6, 3, 5]);
    });

    it("should not tamper the node values", () => {
      linkedList = new LinkedList();

      const valuesToBeInserted = [3, 6, 2];
      for (const val of valuesToBeInserted) {
        linkedList.appendToTail(val);
      }

      const results = [];
      linkedList.forEach((value) => results.push(value));

      let currentNode = linkedList.head;
      for (const val of valuesToBeInserted) {
        expect(currentNode.value).to.deep.equal(val);
        currentNode = currentNode.next;
      }
    });
  });

  describe("The print method", () => {
    it("should exist on the LinkedList prototype", () => {
      expect(LinkedList.prototype.print).to.exist;
      expect(typeof LinkedList.prototype.print).to.equal("function");
    });

    it("should return a string of all values in the linked list", () => {
      linkedList.insertHead(3);
      linkedList.insertHead(6);
      linkedList.insertHead(2);
      expect(linkedList.print()).to.equal("2, 6, 3, 5");
    });
  });

  describe("The insertHead method", () => {
    it("should exist on the LinkedList prototype", () => {
      expect(LinkedList.prototype.insertHead).to.exist;
      expect(typeof LinkedList.prototype.insertHead).to.equal("function");
    });

    it("should insert a new node to the head property and move previous node to the next property of the new head", () => {
      const oldHead = linkedList.head;
      const newHead = linkedList.insertHead(3);
      expect(linkedList.head.value).to.equal(3);
      expect(linkedList.head).to.deep.equal(newHead);
      expect(linkedList.head.next).to.deep.equal(oldHead);
    });
  });

  describe("The insertAfter method", () => {
    it("should exist on the LinkedList prototype", () => {
      expect(LinkedList.prototype.insertAfter).to.exist;
      expect(typeof LinkedList.prototype.insertAfter).to.equal("function");
    });

    it("should insert a new node after node referenced in arguments", () => {
      linkedList.insertHead(3);
      linkedList.insertHead(6);
      linkedList.insertHead(2);
      linkedList.insertAfter(linkedList.findNode(6), 9);
      expect(linkedList.print()).to.equal("2, 6, 9, 3, 5");
    });

    it("should raise exception when refNode is not supplemented", () => {
      linkedList.insertHead(3);
      linkedList.insertHead(6);
      linkedList.insertHead(2);
      expect(function insertAfter() {
        linkedList.insertAfter(undefined, 9);
      }).to.throw();
      expect(function insertAfter() {
        linkedList.insertAfter(null, 9);
      }).to.throw();
    });

    it("should raise exception when refNode is not a valid node", () => {
      linkedList.insertHead(3);
      linkedList.insertHead(6);
      linkedList.insertHead(2);
      expect(function insertAfter() {
        linkedList.insertAfter({}, 9);
      }).to.throw();
    });
  });

  describe("The removeAfter method", () => {
    it("should exist on the LinkedList prototype", () => {
      expect(LinkedList.prototype.removeAfter).to.exist;
      expect(typeof LinkedList.prototype.removeAfter).to.equal("function");
    });

    it("should remove the node directly after the node referenced in arguments", () => {
      linkedList.insertHead(3);
      linkedList.insertHead(6);
      linkedList.insertHead(2);
      linkedList.removeAfter(linkedList.findNode(6));
      expect(linkedList.print()).to.equal("2, 6, 5");
    });

    it("should not make any change when argument passed in is invalid", () => {
      linkedList.insertHead(3);
      linkedList.insertHead(6);
      linkedList.insertHead(2);
      linkedList.removeAfter();
      expect(linkedList.print()).to.equal("2, 6, 3, 5");
    });
  });
});
