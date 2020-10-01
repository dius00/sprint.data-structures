class BinarySearchTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  insert(value) {
    let iterator = this;
    let insertedFlag = false;
    while (!insertedFlag) {
      if (iterator.value === value) break;
      if (value > iterator.value) {
        if (iterator.right !== null) iterator = iterator.right;
        else {
          iterator.right = new BinarySearchTree(value);
          insertedFlag = true;
        }
      } else {
        if (iterator.left !== null) iterator = iterator.left;
        else {
          iterator.left = new BinarySearchTree(value);
          insertedFlag = true;
        }
      }
    }
    return this;
  }

  traverseDepthFirstInOrder(callback) {}
}

/*
|XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
|X                               X
|X   Basic Requirements:         X
|X   What is the time complexity X
|X   of the above functions?     X
|X                               X
|XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
*/
module.exports = { BinarySearchTree };
