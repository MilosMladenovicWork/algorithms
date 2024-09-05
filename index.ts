const array = [-100, 1, 20, 500, 0];

function linearSearch(array: number[], element: number) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === element) {
      return i;
    }
  }

  return -1;
}

function binarySearch(sortedArray: number[], target: number) {
  let min = 0;
  let max = sortedArray.length - 1;

  while (min <= max) {
    let mid = Math.floor((max + min) / 2);

    if (sortedArray[mid] === target) {
      return mid;
    } else if (sortedArray[mid] > target) {
      max = mid - 1;
    } else if (sortedArray[mid] < target) {
      min = mid + 1;
    }
  }

  return -1;
}

function interpolationSearch(sortedArray: number[], target: number) {
  let low = 0;
  let high = sortedArray.length - 1;

  while (
    low <= high &&
    sortedArray[high] >= target &&
    sortedArray[low] <= target
  ) {
    if (low === high) {
      if (sortedArray[low] === target) {
        return low;
      }

      return -1;
    }

    let probablePos =
      low +
      ((target - sortedArray[low]) * (high - low)) /
        (sortedArray[high] - sortedArray[low]);

    if (sortedArray[probablePos] === target) {
      return probablePos;
    } else if (sortedArray[probablePos] > target) {
      high = probablePos - 1;
    } else {
      low = probablePos + 1;
    }
  }

  return -1;
}

function jumpSearch(sortedArray: number[], target: number) {
  const arrayLength = sortedArray.length;

  const blockSize = Math.floor(Math.sqrt(arrayLength));
  let leftIndex = 0;
  let rightIndex = blockSize - 1;

  while (rightIndex < arrayLength && sortedArray[rightIndex] < target) {
    leftIndex = rightIndex - 1;
    rightIndex = Math.min(leftIndex + blockSize, arrayLength - 1);
  }

  for (let i = rightIndex; i >= leftIndex; i--) {
    if (sortedArray[i] === target) {
      return i;
    }
  }

  return -1;
}

function merge(left: number[], right: number[]) {
  let sortedArray: number[] = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] > right[rightIndex]) {
      sortedArray.push(right[rightIndex]);
      rightIndex++;
    } else {
      sortedArray.push(left[leftIndex]);
      leftIndex++;
    }
  }

  return sortedArray
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex));
}

function mergeSort(array: number[]): number[] {
  if (array.length <= 1) {
    return array;
  }

  const middle = Math.floor(array.length / 2);
  const left = array.slice(0, middle);
  const right = array.slice(middle);

  return merge(mergeSort(left), mergeSort(right));
}

function partition(array: number[], low: number, high: number): number {
  let pivot = array[high];
  let markerIndex = low - 1;

  for (let i = low; i < high; i++) {
    if (array[i] <= pivot) {
      markerIndex++;
      swap(array, markerIndex, i);
    }
  }

  swap(array, markerIndex + 1, high);

  return markerIndex + 1;
}

function swap(array: number[], i: number, j: number) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

function quickSort(
  array: number[],
  low: number = 0,
  high: number = array.length - 1
) {
  if (low < high) {
    const pivotIndex = partition(array, low, high);

    quickSort(array, low, pivotIndex - 1);
    quickSort(array, pivotIndex + 1, high);
  }
}

function heapSort(array: number[]) {
  const n = array.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(array, n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    [array[0], array[i]] = [array[i], array[0]];

    heapify(array, i, 0);
  }

  return array;
}

function heapify(array: number[], heapSize: number, parentNodeIndex: number) {
  let largestIndex = parentNodeIndex;
  const leftChildIndex = 2 * parentNodeIndex + 1;
  const rightChildIndex = 2 * parentNodeIndex + 2;

  if (
    leftChildIndex < heapSize &&
    array[leftChildIndex] > array[parentNodeIndex]
  ) {
    largestIndex = leftChildIndex;
  }

  if (
    rightChildIndex < heapSize &&
    array[rightChildIndex] > array[parentNodeIndex]
  ) {
    largestIndex = rightChildIndex;
  }

  if (largestIndex !== parentNodeIndex) {
    [array[parentNodeIndex], array[largestIndex]] = [
      array[largestIndex],
      array[parentNodeIndex],
    ];

    heapify(array, heapSize, largestIndex);
  }
}

function countingSort(array: number[]) {
  const maxElement = Math.max(...array);

  const countArray = new Array(maxElement + 1).fill(0);

  for (let i = 0; i < array.length; i++) {
    countArray[array[i]]++;
  }

  for (let i = 1; i <= maxElement; i++) {
    countArray[i] = countArray[i - 1] + countArray[i];
  }

  const outputArray: number[] = [];

  for (let i = 0; i < array.length; i++) {
    outputArray[countArray[array[i]] - 1] = array[i];
    countArray[array[i]]--;
  }

  return outputArray;
}

function bubbleSort(array: number[]) {
  let lastIndexForSwapping = array.length - 1;

  for (
    lastIndexForSwapping;
    lastIndexForSwapping >= 0;
    lastIndexForSwapping--
  ) {
    for (let j = 0; j < lastIndexForSwapping; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }

  return array;
}

function insertionSort(array: number[]) {
  for (let i = 1; i < array.length; i++) {
    const currentElement = array[i];
    let minElementIndex = i;

    for (let j = i - 1; j >= 0; j--) {
      if (array[j] > currentElement) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        minElementIndex = j;
      }
    }

    array[minElementIndex] = currentElement;
  }

  return array;
}

function selectionSort(array: number[]) {
  for (let i = 0; i < array.length - 1; i++) {
    let minElementIndex = i;

    for (let j = i + 1; j < array.length; j++) {
      if (array[minElementIndex] > array[j]) {
        minElementIndex = j;
      }
    }

    [array[i], array[minElementIndex]] = [array[minElementIndex], array[i]];
  }

  return array;
}

function mergeSortPractice(array: number[]): number[] {
  if (array.length <= 1) {
    return array;
  }

  const middle = Math.floor(array.length / 2);

  const leftArray = array.slice(0, middle);
  const rightArray = array.slice(middle);

  return mergePractice(
    mergeSortPractice(leftArray),
    mergeSortPractice(rightArray)
  );
}

function mergePractice(leftArray: number[], rightArray: number[]) {
  let leftIndex = 0;
  let rightIndex = 0;
  let outputArray: number[] = [];

  while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
    if (array[leftIndex] < array[rightIndex]) {
      outputArray.push(array[leftIndex]);
      leftIndex++;
    } else {
      outputArray.push(array[rightIndex]);
      rightIndex++;
    }
  }

  return outputArray
    .concat(leftArray.slice(leftIndex))
    .concat(rightArray.slice(rightIndex));
}
