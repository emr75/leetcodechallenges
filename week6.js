
// Week 6
//236. Lowest Common Ancestor of a Binary Tree

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    if (root === null || root === p || root === q) {
        return root;
    }

    let left = lowestCommonAncestor(root.left, p, q);
    let right = lowestCommonAncestor(root.right, p, q);

    if (left !== null && right !== null) {
        return root;
    }

    return left !== null ? left : right;
};



// Q.347 Top K frequent Elements


var topKFrequent = function(nums, k) {

    const freqMap = new Map();
    for (let num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }

    const buckets = Array(nums.length + 1).fill(null).map(() => []);

    for (let [num, freq] of freqMap.entries()) {
        buckets[freq].push(num);
    }

    const result = [];
    for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
        if (buckets[i].length > 0) {
            result.push(...buckets[i]);
        }
    }

    return result.slice(0, k);
};

// Q. Word Break
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
    const words = new Set(wordDict);
    const queue = [0];
    const seen = new Set([0]);

    while (queue.length > 0) {
        const start = queue.shift();


        if (start === s.length) return true;

        for (let end = start + 1; end <= s.length; end++) {
            if (!seen.has(end) && words.has(s.slice(start, end))) {
                queue.push(end);
                seen.add(end);
            }
        }
    }

    return false;
};
