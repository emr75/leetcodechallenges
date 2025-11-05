// 232. Implement Queue using Stacks


var MyQueue = function() {
    // Stack used for pushing to queue
    this.inStack = [];
    // Stack used for removing from/peeking in queue
    this.outStack = [];
};

/**
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
    // add the element to inStack
    this.inStack.push(x);
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function() {
    // remove oldest element from queue
    this._move();
    return this.outStack.pop();
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function() {
    // look at front element using move() without removing
    this._move();
    return this.outStack[this.outStack.length - 1];
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
    // return true when both stacks empty
    return this.inStack.length === 0 && this.outStack.length === 0;
};

// Function to move elements from inStack to outStack if outStack is empty using push() and pop()
MyQueue.prototype._move = function() {
    if (this.outStack.length === 0) {
        while (this.inStack.length > 0) {
            this.outStack.push(this.inStack.pop());
        }
    }
};
/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */

// 73. Daily Temperatures

/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function(temperatures) {
    // holdd length of days of temperatures
    const n = temperatures.length;
    // hold how many future days
    const result = Array(n).fill(0);
    // hold indecies of previous days
    const stack = [];

    // loop through days
    for (let i = 0; i < n; i++) {
        // while stack si not empty and the current temp is warmer than previosu one on stack pop it off
        while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            const j = stack.pop();
            // check how many days its been since
            result[j] = i - j;
        }
        // now current index waits for a warmer day
        stack.push(i);
    }
    return result;
};

// 2327. Number of People Aware of a Secret

/**
 * @param {number} n
 * @param {number} delay
 * @param {number} forget
 * @return {number}
 */
var peopleAwareOfSecret = function(n, delay, forget) {
    const MOD = 1_000_000_007;
    // hold number of people knowing per day
    const days = Array(n + 1).fill(0);

    // collect number of know people
    const secretKnown = Array(n + 1).fill(0)
    // first person
    days[1] = 1;
    let shares = 0
    // loop through days of sharing
    for (let day = 2; day <= n; day++) {
        // next person after delay can share
        shares = (shares + days[day - delay]) % MOD;

        // People who forget today stop sharing
        if (day - forget >= 1) {
            shares = (shares - days[day - forget]) % MOD;
            // if shares is negative, fix mod
            if (shares < 0) shares += MOD;
        };
        // Those sharers each tell one new person today
        days[day] = shares;
    };
    // Count people who still remember on day n
    let result = 0;
    for (let day = Math.max(1, n - forget + 1); day <= n; day++) {
        result = (result + days[day]) % MOD;
    }
    return result;
};