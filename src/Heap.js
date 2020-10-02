class Heap {
  constructor() {
    this.storage = [];
  }
  insert(value) {
    this.storage.push(value);

    function swap(heapList, lrgIndex, smlIndex) {
      let temp = heapList.storage[lrgIndex];
      heapList.storage[lrgIndex] = heapList.storage[smlIndex];
      heapList.storage[smlIndex] = temp;
    }

    for (
      let i = this.storage.length - 1;
      i > Math.floor(this.storage.length / 2) - 1;
      i--
    ) {
      let parent, parentIndex;
      parentIndex = Math.floor((i - 1) / 2);
      parent = this.storage[parentIndex];
      if (parent < this.storage[i]) swap(this, i, parentIndex);
    }
  }

  removeMax() {}
}

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
