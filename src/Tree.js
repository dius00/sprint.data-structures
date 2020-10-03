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

  remove(value) {
    let removedValue;
    function searchValue(tree) {
      let childHasValue = false;
      if (tree.children !== []) {
        for (const child of tree.children) {
          if (child.value === value) {
            childHasValue = true;
            removedValue = child;
          }
          if (childHasValue) {
            tree.children.splice(tree.children.indexOf(removedValue), 1);
          } else {
            for (const child of tree.children) searchValue(child);
          }
        }
      }
    }
    searchValue(this);
    return removedValue;
  }

  /*
+-------------------------+
| Advanced Requirements!! |
+-------------------------+

The following are part of the advanced requirements.
Do not proceed until you are done with the basic
requirements for ALL data structures in this exercise.

*/
  traverseDepthFirst(fn) {
    function inOrder(fn, tree) {
      if (tree.left !== null) inOrder(fn, tree.left);
      fn(tree);
      if (tree.right !== null) inOrder(fn, tree.right);
    }
    inOrder(fn, this);
  }

  traverseBreadthFirst(fn) {
    fn(this);
    function traverseBreadth(callback, tree) {
      for (const child of tree.children) callback(child);
      for (const child of tree.children) traverseBreadth(callback, child);
    }
    traverseBreadth(fn, this);
  }
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
