const { ControlledArray, simpleHash } = require("./utilities");

class HashTable {
  constructor(limit = 8) {
    this.limit = limit;
    this.storage = ControlledArray(this.limit);
  }

  insert(key, value) {
    const index = simpleHash(k, this.limit);
  }

  retrieve(key) {
    const idx = simpleHash(k, this.limit);
  }

  remove(key) {}
}

module.exports = HashTable;

/*
|XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
|X                               X
|X   What is the time complexity X
|X   of the above functions?     X
|X                               X
|XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
*/
