// function findLargestCommonSequence(a: any[], b: any[]) {
//   const dpTable = Array.from({ length: a.length + 1 }, () =>
//     Array(b.length + 1).fill(0)
//   );

//   for (let i = 0; i < a.length; i++) {
//     for (let j = 0; j < b.length; j++) {
//       if (a[i] === b[j]) {
//         dpTable[i + 1][j + 1] = dpTable[i][j] + 1;
//       } else {
//         dpTable[i + 1][j + 1] = Math.max(dpTable[i][j + 1], dpTable[i + 1][j]);
//       }
//     }
//   }

//   console.log(dpTable[1]);
//   console.log(dpTable[2]);
//   console.log(dpTable[3]);

//   let sequence: number[] = [];

//   let maxJ = b.length;

//   for (let i = a.length; i > 0; i--) {
//     for (maxJ; maxJ > 0 && i > 0; maxJ--) {
//       if (dpTable[i][maxJ] > dpTable[i - 1][maxJ - 1]) {
//         sequence.unshift(b[maxJ - 1]);
//         i--;
//       }
//     }
//   }

//   return sequence;
// }

const findLargestCommonSequence = (sequences: { [key: string]: any }[]) => {
  const results: number[][] = [];

  for (const { sequence1, sequence2 } of sequences) {
    const dpTable = Array.from({ length: sequence2.length + 1 }, () =>
      Array(sequence1.length + 1).fill(0)
    );

    for (let i = 0; i < sequence2.length; i++) {
      for (let j = 0; j < sequence1.length; j++) {
        if (sequence2[i] === sequence1[j]) {
          dpTable[i + 1][j + 1] = dpTable[i][j] + 1;
        } else {
          dpTable[i + 1][j + 1] = Math.max(
            dpTable[i + 1][j],
            dpTable[i][j + 1]
          );
        }
      }
    }

    let sequence: number[] = [];

    let i = sequence2.length;
    let j = sequence1.length;

    while (i > 0 && j > 0) {
      if (dpTable[i][j] === dpTable[i - 1][j]) {
        i--;
      } else if (dpTable[i][j] === dpTable[i][j - 1]) {
        j--;
      } else if (dpTable[i][j] > dpTable[i - 1][j - 1]) {
        sequence.unshift(sequence2[i - 1]);
        i--;
        j--;
      }
    }

    console.log(dpTable);

    results.push(sequence);
  }

  return results;
};

const sequence = findLargestCommonSequence([
  {
    sequence1: ["a", "b", "c", "d", "e"],
    sequence2: ["a", "c", "e"],
    expected_lcs: ["a", "c", "e"],
  },
  {
    sequence1: ["a", "b", "c"],
    sequence2: ["a", "b", "c"],
    expected_lcs: ["a", "b", "c"],
  },
  {
    sequence1: ["a", "b", "c"],
    sequence2: ["d", "e", "f"],
    expected_lcs: [],
  },
  {
    sequence1: ["a", "b", "c", "d", "g", "h"],
    sequence2: ["a", "e", "d", "f", "h", "r"],
    expected_lcs: ["a", "d", "h"],
  },
  {
    sequence1: ["a", "g", "g", "t", "a", "b"],
    sequence2: ["g", "x", "t", "x", "a", "y", "b"],
    expected_lcs: ["g", "t", "a", "b"],
  },
  {
    sequence1: ["a", "b", "c", "d", "e", "f", "g"],
    sequence2: ["x", "y", "z", "a", "b", "c", "p", "q", "r", "f", "g"],
    expected_lcs: ["a", "b", "c", "f", "g"],
  },
  {
    sequence1: ["A", "A", "B", "B", "A", "A", "C", "C"],
    sequence2: ["C", "B", "A", "C", "C", "C"],
    expected_lcs: ["B", "A", "C", "C"],
  },
  {
    sequence1: ["a", "a", "a", "a"],
    sequence2: ["a", "a"],
    expected_lcs: ["a", "a"],
  },
  {
    sequence1: ["X", "M", "J", "Y", "A", "U", "Z"],
    sequence2: ["M", "Z", "J", "A", "W", "X", "U"],
    expected_lcs: ["M", "J", "A", "U"],
  },
  {
    sequence1: ["a", "c", "d", "b"],
    sequence2: ["c", "d", "a", "b"],
    expected_lcs: ["c", "d"],
  },
]);

console.log(sequence);
