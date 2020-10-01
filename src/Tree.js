class Tree {
  constructor(value) {
    this.value = value;
    this.children = [];
  }

  addChild(value) {
    const newTree = new Tree(value);
    this.children.push(newTree);
    return newTree;
  }

  contains(value) {
    let result = false;
    function searchValue(tree) {
      if (tree.value === value) result = true;
      if (tree.children !== []) {
        for (const child of tree.children) searchValue(child);
      }
    }
    searchValue(this);
    return result;
  }

  remove(value) {}

  /*
+-------------------------+
| Advanced Requirements!! |
+-------------------------+

The following are part of the advanced requirements.
Do not proceed until you are done with the basic
requirements for ALL data structures in this exercise.

*/
  traverseDepthFirst(fn) {}

  traverseBreadthFirst(fn) {}
}

/*
|XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
|X                               X
|X   What is the time complexity X
|X   of the above functions?     X
|X                               X
|XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
*/

module.exports = Tree;
