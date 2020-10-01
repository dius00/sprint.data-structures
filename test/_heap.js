/* eslint-disable no-unused-expressions, no-prototype-builtins */

const { expect } = require("chai");
const Heap = require("../src/Heap");

describe("Heaps", () => {
  let heap;
  beforeEach(() => {
    heap = new Heap();
  });

  describe("The Heap constructor", () => {
    it("should be a function", () => {
      expect(Heap).to.be.a("function");
    });
    it("should have a property named storage", () => {
      expect(heap.storage).to.exist;
    });
  });

  describe("The insert method", () => {
    it("should have a insert method that exists on the Heap prototype", () => {
      expect(Heap.prototype.insert).to.exist;
    });
    it("should insert a value into the heap", () => {
      heap.insert(1);
      expect(heap.storage[0]).to.equal(1);
    });
    it("should reorder the heap with each insert", () => {
      heap.insert(1);
      heap.insert(4);
      heap.insert(7);
      heap.insert(5);
      heap.insert(3);
      expect(heap.storage).to.eql([7, 5, 4, 1, 3]);
    });
  });

  describe("The removeMax method", () => {
    it("should have a removeMax method that exists on the Heap prototype", () => {
      expect(Heap.prototype.removeMax).to.exist;
    });
    it("should remove the max value", () => {
      heap.insert(1);
      heap.insert(4);
      heap.insert(7);
      heap.insert(5);
      heap.insert(3);
      expect(heap.removeMax()).to.equal(7);
    });
    it("should reorder the heap after each deletion", () => {
      heap.insert(1);
      heap.insert(4);
      heap.insert(7);
      heap.insert(5);
      heap.insert(3);
      heap.removeMax();
      expect(heap.storage).to.eql([5, 3, 4, 1]);
    });
  });
});
