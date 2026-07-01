export function calculatePriorityScore(notification) {
  const timestamp = Number(notification.timestamp);
  let boost = 0;
  const category = notification.category?.toLowerCase();

  if (category === 'placement') {
    boost = 24 * 60 * 60 * 1000; // 86,400,000 ms
  } else if (category === 'result') {
    boost = 12 * 60 * 60 * 1000; // 43,200,000 ms
  }

  return timestamp + boost;
}

export class MinHeap {
  constructor(compareFn) {
    this.heap = [];
    this.compare = compareFn || ((a, b) => a - b);
  }

  size() {
    return this.heap.length;
  }

  peek() {
    return this.heap[0];
  }

  push(val) {
    this.heap.push(val);
    this._bubbleUp(this.heap.length - 1);
  }

  pop() {
    if (this.heap.length === 0) return null;
    const top = this.heap[0];
    const bottom = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = bottom;
      this._bubbleDown(0);
    }
    return top;
  }

  _bubbleUp(idx) {
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      if (this.compare(this.heap[idx], this.heap[parentIdx]) < 0) {
        this._swap(idx, parentIdx);
        idx = parentIdx;
      } else {
        break;
      }
    }
  }

  _bubbleDown(idx) {
    const length = this.heap.length;
    while (true) {
      let smallestIdx = idx;
      const leftIdx = 2 * idx + 1;
      const rightIdx = 2 * idx + 2;

      if (leftIdx < length && this.compare(this.heap[leftIdx], this.heap[smallestIdx]) < 0) {
        smallestIdx = leftIdx;
      }
      if (rightIdx < length && this.compare(this.heap[rightIdx], this.heap[smallestIdx]) < 0) {
        smallestIdx = rightIdx;
      }

      if (smallestIdx !== idx) {
        this._swap(idx, smallestIdx);
        idx = smallestIdx;
      } else {
        break;
      }
    }
  }

  _swap(i, j) {
    const temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }
}

/**
 * Streaming Algorithm: Maintain top n elements using Min-Heap
 * @param {Array} stream - Array of notifications
 * @param {number} n - Target size
 * @returns {Array} - Top n notifications sorted in descending order of priority score
 */
export function getTopNNotifications(stream, n) {
  if (n <= 0) return [];
  
  // Compare function: returns negative if a has smaller score than b
  const compareFn = (a, b) => a.priorityScore - b.priorityScore;
  const heap = new MinHeap(compareFn);

  for (const item of stream) {
    const score = calculatePriorityScore(item);
    const itemWithScore = { ...item, priorityScore: score };

    if (heap.size() < n) {
      heap.push(itemWithScore);
    } else {
      if (itemWithScore.priorityScore > heap.peek().priorityScore) {
        heap.pop();
        heap.push(itemWithScore);
      }
    }
  }

  const result = [];
  while (heap.size() > 0) {
    result.push(heap.pop());
  }
  return result.reverse();
}
