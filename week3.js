// Q1
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {
    if (!head || !head.next) return true;

    //  Find mid point using oneStep & twoStep pointers
    let oneStep = head, twoStep = head;
    while (twoStep && twoStep.next) {
        oneStep = oneStep.next;        // moves 1 node at a time
        twoStep = twoStep.next.next;   // moves 2 nodes at a time
    }

    // Reverse the second half of the list
    let prev = null;
    while (oneStep) {
        let nextNode = oneStep.next;
        oneStep.next = prev;
        prev = oneStep;
        oneStep = nextNode;
    }

    // Compare first and second halves
    let left = head, right = prev;
    while (right) {
        if (left.val !== right.val) return false;
        left = left.next;
        right = right.next;
    }

    return true;
};

//Q2

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
/**
 * Reorders list in-place: L0→L1→…→Ln-1→Ln  =>  L0→Ln→L1→Ln-1→L2→Ln-2→…
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function(head) {
    // Edge cases
  if (!head || !head.next || !head.next.next) return;

  // oneStep moves by 1 node
  // twoStep moves by two nodes
  let oneStep = head;
  let twoStep = head;

// move twoStep by two so that it reaches end and oneStep is at midpoint
  while (twoStep && twoStep.next) {
    oneStep = oneStep.next;          // +1
    twoStep = twoStep.next.next;     // +2
  }

  // Split the second half of list
  let second = oneStep.next;
  oneStep.next = null;

    // reverse the second half
  let prev = null, curr = second;
  while (curr) {
    let nxt = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nxt;
  }

  // Merge (head) and the reversed head (prev)
  let first = head, secondRev = prev;
  while (secondRev) {
    let n1 = first.next;
    let n2 = secondRev.next;

    // Connect one node from first half, then one from second half
    first.next = secondRev;
    secondRev.next = n1;

    //move both pointer forward
    first = n1;
    secondRev = n2;
  }

};

//Q3

/**
 * Modifies matrix in place so that any row/col containing a 0 is set entirely to 0.
 * @param {number[][]} matrix
 * @return {void}
 */
var setZeroes = function(matrix) {
  const m = matrix.length;
  const n = matrix[0].length;

  // Track if first row/col need to be zeroed
  let zeroFirstRow = false;
  let zeroFirstCol = false;

  // Check for zeros
  for (let i = 0; i < m; i++) {
    if (matrix[i][0] === 0) {
      zeroFirstCol = true;
      break;
    }
  }

  // Check first row for zeros
  for (let j = 0; j < n; j++) {
    if (matrix[0][j] === 0) {
      zeroFirstRow = true;
      break;
    }
  }

  // Use first row & col as markers for matrix
  // If cell (i, j) is zero, mark row i and column j
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][j] === 0) {
        matrix[i][0] = 0;
        matrix[0][j] = 0;
      }
    }
  }

  // Zero cells based on markers skipping first row/col
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][0] === 0 || matrix[0][j] === 0) {
        matrix[i][j] = 0;
      }
    }
  }

  // Zero out the first row if needed
  if (zeroFirstRow) {
    for (let j = 0; j < n; j++) matrix[0][j] = 0;
  }

  // Zero out the first column if needed
  if (zeroFirstCol) {
    for (let i = 0; i < m; i++) matrix[i][0] = 0;
  }
};
