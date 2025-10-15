// Strign to Int - atoi
/**
 * @param {string} s
 * @return {number}
 */
function myAtoi(s) {
  // Ignore whitespace:
  s = s.trimStart();

  // Edge case:
  if (s.length === 0) return 0;

  // Check for sign:
  let sign = 1;  // set to 1 to start
  let i = 0;     // pointer to read characters

  if (s[i] === '-') {
    sign = -1;
    i++;
  } else if (s[i] === '+') {
    i++;
  }

  // Read digits and form number
  let num = 0;
  while (i < s.length && s[i] >= '0' && s[i] <= '9') {
    // Convert char to int
    num = num * 10 + parseInt(s[i]);
    i++;
  }

  // Apply sign
  num = num * sign;

  // Clamp to the 32-bit signed integer range
  const intHigh = -2147483648; // -2^31
  const intLow = 2147483647;  // 2^31 - 1

  if (num < intHigh) return intHigh;
  if (num > intLow) return intLow;

  // Step 7: Return result
  return num;
}

// Q2 - Find all Anagrams in a string

/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function(s, p) {

// Hold the found anagrams
    const res = [];
    // test for length
  const n = s.length, m = p.length;
  //edge case: if not same length
  if (m > n) return res;

    // Create two frequency arrays (26 slots for a-z)
  // stores how many of each letter appear in pattern p
  const target = Array(26).fill(0);
  // store current letter frequency in a sliding window of s
  const window = Array(26).fill(0);

//   convert letter to index
  const letter = (ch) => ch.charCodeAt(0) - 97;

// Fill target array based on the pattern p
  for (let ch of p) target[letter(ch)]++;

  // Add the first m characters of s to window
  for (let i = 0; i < m; i++) window[letter(s[i])]++;

  // count how many letters match the needed frequency
  let matches = 0;
  for (let i = 0; i < 26; i++) if (target[i] === window[i]) matches++;

// If all 26 letters match, window = anagram
  if (matches === 26) res.push(0);

// Slide the window one character at a time across s
  for (let start = 1; start <= n - m; start++) {
    const outIdx = letter(s[start - 1]);
    const inIdx  = letter(s[start + m - 1]);

    // update for outgoing char
    if (window[outIdx] === target[outIdx]) matches--;
    window[outIdx]--;
    if (window[outIdx] === target[outIdx]) matches++;

    // update for incoming char
    if (window[inIdx] === target[inIdx]) matches--;
    window[inIdx]++;
    if (window[inIdx] === target[inIdx]) matches++;

    if (matches === 26) res.push(start);
  }
//   return indices where anagrams are found
  return res;
};

// Q3 - Reverse Words in a String

/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {

  // Trim trailing spaces, split into array of words using regex, reverse order, join into string
  // \s+ one or more whitespace characters
  return s.trim().split(/\s+/).reverse().join(' ');
};