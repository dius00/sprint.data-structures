/*
+-------------------------+
|   HELPER FUNCTIONS!!!   |
| DO NOT CHANGE (UNLESS   |
| YOU ARE ABSOLUTELY SURE)|
+-------------------------+
*/

/* This is a simple hashing function. You don't need to worry about it, just use it
|* to turn any string into an integer.
*/

function simpleHash(str, tableSize) {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash += str.charCodeAt(i) * (i + 1);
  }
  return hash % tableSize;
}
// source: http://pmav.eu/stuff/javascript-hashing-functions/source.html

let lastControlledArrayInstance = null;
let clearLastControlledArray = () => { lastControlledArrayInstance = null };
let getLastControlledArray = () => lastControlledArrayInstance;

// This is a controlled array. Check it out!
function ControlledArray(limit) {
  const storage = [];
  const controlledArray = {};

  lastControlledArrayInstance = controlledArray;

  const checkLimit = (index) => {
    if (typeof index !== "number") {
      throw new Error(
        "Setter requires a numeric index for its first argument."
      );
    }

    if (limit <= index) {
      throw new Error("Error trying to access an over-the-limit index");
    }
  };

  controlledArray.get = (index) => {
    checkLimit(index);
    return storage[index];
  };

  controlledArray.set = (index, value) => {
    checkLimit(index);
    storage[index] = value;
  };

  controlledArray.each = (callback) => {
    for (let i = 0; i < storage.length; i += 1) {
      callback(storage[i], i, storage);
    }
  };

  return controlledArray;
}

module.exports = {
  ControlledArray,
  simpleHash,
  clearLastControlledArray,
  getLastControlledArray,
};
