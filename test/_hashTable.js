/* eslint-disable no-unused-expressions, no-prototype-builtins */

const { expect } = require("chai");
const HashTable = require("../src/HashTable");
const _ = require("underscore");
let { 
  simpleHash, 
  getLastControlledArray, 
  clearLastControlledArray 
} = require("../src/utilities");

const people = [
  ["Anita", "Borg"],
  ["Grace", "Hopper"],
  ["Margaret", "Hamilton"],
  ["Katherine", "Johnson"],
  ["Hedy", "Lamarr"],
  ["Sheryl", "Sandberg"],
  ["Alan", "Turing"],
];
let hashTable;

describe.only("hashTable", () => {
  beforeEach(() => {
    hashTable = new HashTable();
  });

  it("should have methods named insert, remove, and retrieve", () => {
    expect(hashTable.insert).to.be.a("function");
    expect(hashTable.remove).to.be.a("function");
    expect(hashTable.retrieve).to.be.a("function");
  });

  it("should use the provided ControlledArray", () => {
    clearLastControlledArray();
    hashTable = new HashTable();
    hashTable.insert("foo", "bar");
    let controlledArray = getLastControlledArray();
    expect(controlledArray).to.not.be.null;
    let size = 0;
    controlledArray.each(value => {
      if (value) size++;
    });
    expect(size).to.be.equal(1);
  });

  it("should store values that were inserted", () => {
    hashTable.insert("Grace", "Hopper");
    expect(hashTable.retrieve("Grace")).to.equal("Hopper");
  });

  it("should not contain values that were not inserted", () => {
    hashTable.insert("Grace", "Lee Boggs");
    expect(hashTable.retrieve("Grace")).not.to.equal("Hopper");
  });

  it("should not contain values that were removed", () => {
    hashTable.insert("Grace", "Hopper");
    hashTable.remove("Grace");
    expect(hashTable.retrieve("Grace")).to.equal(null);
  });

  it("should return boolean when indicating value removed", () => {
    hashTable.insert("Grace", "Hopper");
    expect(hashTable.remove("Grace")).to.be.true;
    expect(hashTable.remove("Grace")).to.be.false;
  });

  it("should handle hash function collisions", () => {
    const v1 = "val1";
    const v2 = "val2";
    const oldHashFunction = simpleHash;
    simpleHash = () => 0;
    hashTable.insert(v1, v1);
    hashTable.insert(v2, v2);
    expect(hashTable.retrieve(v1)).to.equal(v1);
    expect(hashTable.retrieve(v2)).to.equal(v2);
    simpleHash = oldHashFunction;
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

  it("should double in size when needed", () => {
    _.each(people, (person) => {
      const firstName = person[0];
      const lastName = person[1];
      hashTable.insert(firstName, lastName);
    });
    expect(hashTable.limit).to.equal(16);
  });

  it("should halve in size when needed", () => {
    _.each(people, (person) => {
      const firstName = person[0];
      const lastName = person[1];
      hashTable.insert(firstName, lastName);
    });
    expect(hashTable.limit).to.equal(16);
    hashTable.remove("Grace");
    hashTable.remove("Katherine");
    hashTable.remove("Anita");
    hashTable.remove("Hedy");
    hashTable.remove("Margaret");
    expect(hashTable.limit).to.equal(8);
  });
});
