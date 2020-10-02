const { times } = require("underscore");
const { ControlledArray, simpleHash } = require("./utilities");

class HashTable {
  constructor(limit = 8) {
    this.limit = limit;
    this.storage = ControlledArray(this.limit);
  }

  insert(key, value) {
    const index = simpleHash(key, this.limit);
    this.storage.set(index, value);
  }

  retrieve(key) {
    const index = simpleHash(key, this.limit);
    const retrieved = this.storage.get(index);
    if (retrieved) return retrieved;
    else return null;
  }

  remove(key) {
    let found = false;
    const index = simpleHash(key, this.limit);
    const finder = (value, i, collection) => {
      if (i === index) {
        collection.splice(index, 1);
        found = true;
      }
    };
    this.storage.each(finder);
    return found;
  }
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
