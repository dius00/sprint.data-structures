class Node {
  constructor(value) {
    this.next = null;
    this.value = value;
  }
}

class LinkedList {
  constructor(headValue) {
    if (headValue !== undefined) {
      this.head = new Node(headValue);
      this.tail = this.head;
    }
  }

  //O(1)
  appendToTail(value) {
    const newNode = new Node(value);
    if ("head" in this === false) {
      this.head = newNode;
    } else {
      this.tail.next = newNode;
    }
    this.tail = newNode;
    return newNode;
  }

  //O(1)
  removeHead() {
    const oldHead = this.head;
    this.head = this.head.next;
    return oldHead;
  }

  //O(n)
  findNode(value) {
    let iterator = this.head;
    while (iterator) {
      if (iterator.value === value) return iterator;
      iterator = iterator.next;
    }
    return null;
  }

  /*
+-------------------------+
| Advanced Requirements!! |
+-------------------------+

The following are part of the advanced requirements.
Do not proceed until you are done with the basic
requirements for ALL data structures in this exercise.
*/
  //O(n)
  forEach(callback) {
    let iterator = this.head;
    while (iterator) {
      callback(iterator.value);
      iterator = iterator.next;
    }
  }

  //O(n)
  print() {
    let nodePrint = "";
    function addToNodePrint(value) {
      nodePrint += `${value}, `;
    }
    this.forEach(addToNodePrint);
    return nodePrint.slice(0, -2);
  }

  //O(1)
  insertHead(value) {
    const newHead = new Node(value);
    newHead.next = this.head;
    return (this.head = newHead);
  }

  //O(n)
  insertAfter(refNode, value) {
    if (!refNode || !(refNode instanceof Node))
      throw new Error("Please supply a refNode");
    let iterator = this.head;
    const newNode = new Node(value);
    while (iterator) {
      if (iterator === refNode) {
        newNode.next = iterator.next;
        iterator.next = newNode;
        return newNode;
      }
      iterator = iterator.next;
    }
  }

  //O(n)
  removeAfter(refNode) {
    if (!refNode) return;
    let iterator = this.head;
    while (iterator) {
      if (iterator === refNode) {
        const toRemove = refNode.next;
        refNode.next = refNode.next.next;
        return toRemove;
      }
      iterator = iterator.next;
    }
  }
}

module.exports = LinkedList;
//added comment to test co commit
/*
|XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
|X                               X
|X   Basic Requirements:         X
|X   What is the time complexity X
|X   of the above functions?     X
|X                               X
|XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
*/
