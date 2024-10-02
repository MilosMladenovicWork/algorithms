const findLargestCommonSequence = (
  sequences: {
    sequence1: string[];
    sequence2: string[];
    expected_lcs: string[];
  }[]
) => {
  const results: string[] = [];

  sequences.forEach(({ sequence1, sequence2 }) => {
    const dpTable = Array.from({ length: sequence2.length + 1 }, () =>
      new Array(sequence1.length + 1).fill(0)
    );

    for (let i = 1; i <= sequence2.length; i++) {
      for (let j = 1; j <= sequence1.length; j++) {
        if (sequence2[i - 1] === sequence1[j - 1]) {
          dpTable[i][j] = dpTable[i - 1][j - 1] + 1;
        } else {
          dpTable[i][j] = Math.max(dpTable[i - 1][j], dpTable[i][j - 1]);
        }
      }
    }

    const longestCommonSequence: string[] = [];

    let i = sequence2.length;
    let j = sequence1.length;

    while (i > 0 && j > 0) {
      if (dpTable[i][j] === dpTable[i - 1][j]) {
        i--;
      } else if (dpTable[i][j] === dpTable[i][j - 1]) {
        j--;
      } else if (dpTable[i][j] > dpTable[i - 1][j - 1]) {
        longestCommonSequence.unshift(sequence2[i - 1]);
        i--;
        j--;
      }
    }

    console.log(longestCommonSequence);

    return longestCommonSequence;
  });
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
    expected_lcs: ["c", "d", "b"],
  },
]);

console.log(sequence);
