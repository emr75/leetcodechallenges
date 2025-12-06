// Week 8
// Question 416: Partition Equal Subset Sum

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function(nums) {
    let total = 0;
    for (let num of nums) {
        total += num;
    }

    // Edhge case: If total sum is odd
    if (total % 2 !== 0) return false;

    const target = total / 2;
    const dp = Array(target + 1).fill(false);
    dp[0] = true;

    for (let num of nums) {
        // traverse backwards
        for (let s = target; s >= num; s--) {
            if (dp[s - num]) {
                dp[s] = true;
            }
        }
    }

    return dp[target];
};



// Question 322: Coin Change

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
    const INF = amount + 1;
    const dp = new Array(amount + 1).fill(INF);
    dp[0] = 0;

    for (let coin of coins) {
        for (let a = coin; a <= amount; a++) {
            dp[a] = Math.min(dp[a], dp[a - coin] + 1);
        }
    }

    return dp[amount] === INF ? -1 : dp[amount];
};

// Question 53: Maximum Subarray

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let currentSum = nums[0];
    let maxSum = nums[0];

    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }

    return maxSum;
};
