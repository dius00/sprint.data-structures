class Heap {
  constructor() {
    this.storage = [];
  }

  insert(value) {
    // O(log n)
    this.storage.push(value);
    this.sortInsert();
  }

  sortInsert() {
    let childIndex = this.storage.length - 1; //selects last index
    let childValue = this.storage[childIndex]; //select last index

    while (childIndex > 0) {
      //while loop
      let parentIndex = Math.floor((childIndex - 1) / 2); //select parent index
      let parent = this.storage[parentIndex]; //select parent value
      if (childValue > parent) {
        //if the child is bigger
        //swaps the value
        this.storage[parentIndex] = childValue;
        this.storage[childIndex] = parent;
        //now, since this is ordered, we move onto the parent
        childIndex = parentIndex;
      }
      //if the child is smaller, escapes the loop
      if (childValue <= parent) break;
    }
  }

  removeMax() {
    //it's important for this step to move the rightmost element
    //to be moved to the first position
    let removed = this.storage[0];
    let end = this.storage.pop();
    if (this.storage.length > 0) {
      this.storage[0] = end;
      this.sortRemoval();
    }
    return removed;
  }

  sortRemoval() {
    let parentIndex = 0;
    while (true) {
      //selects parent
      let parent = this.storage[parentIndex];
      //selects children indexes and values
      let leftChildIndex = parentIndex * 2 + 1;
      let rightChildIndex = parentIndex * 2 + 2;
      let left = this.storage[leftChildIndex];
      let right = this.storage[rightChildIndex];
      //temp variable
      let swap = null;
      //checks the left child
      if (leftChildIndex < this.storage.length && parent < left) {
        swap = leftChildIndex;
      }
      //checks the right child
      if (
        rightChildIndex < this.storage.length &&
        parent < right &&
        left < right
      ) {
        swap = rightChildIndex;
      }
      //if no change in needed than it is already ordered and break is used to escape
      if (swap === null) break;
      //if it does not escapes
      this.storage[parentIndex] = this.storage[swap];
      this.storage[swap] = parent;
      parentIndex = swap;
    }
  }
}
//}
module.exports = Heap;
// 1 4 7 5 3
// 0 1 2 3 4 index

// 3 4 0 1 2

// RESULT :   1 3 7 5 4
//NEW RESULT  1 3 4 5 7
// EXPECTED : 7 5 4 1 3
// Left child of 1 (index 0)
// = element in (2*0+1) index
// = element in 1 index
// = 12

// Right child of 1
// = element in (2*0+2) index
// = element in 2 index
// = 9
