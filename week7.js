// Week 7
// Q 199. binary Tree Right Side View

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function(root) {
    if (!root) return [];

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;
        let rightMostVal = null;

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            rightMostVal = node.val;

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        result.push(rightMostVal);
    }

    return result;
};



// Q994. Rotting Oranges

/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function(grid) {
    const rows = grid.length;
    const cols = grid[0].length;

    const queue = [];
    let fresh = 0;


    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 2) {
                queue.push([r, c]);
            } else if (grid[r][c] === 1) {
                fresh++;
            }
        }
    }


    if (fresh === 0) return 0;

    const directions = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ];

    let minutes = 0;


    while (queue.length > 0 && fresh > 0) {
        const size = queue.length;

        for (let i = 0; i < size; i++) {
            const [r, c] = queue.shift();

            for (let [dr, dc] of directions) {
                const nr = r + dr;
                const nc = c + dc;


                if (
                    nr >= 0 && nr < rows &&
                    nc >= 0 && nc < cols &&
                    grid[nr][nc] === 1
                ) {

                    grid[nr][nc] = 2;
                    fresh--;
                    queue.push([nr, nc]);
                }
            }
        }
        minutes++;
    }


    return fresh === 0 ? minutes : -1;
};

// Q210 Course Schedule II

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function(numCourses, prerequisites) {

    const graph = Array.from({ length: numCourses }, () => []);
    const indegree = Array(numCourses).fill(0);

    for (let [course, pre] of prerequisites) {
        graph[pre].push(course);
        indegree[course]++;
    }

    const queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (indegree[i] === 0) queue.push(i);
    }

    const order = [];

    while (queue.length > 0) {
        const curr = queue.shift();
        order.push(curr);

        for (let next of graph[curr]) {
            indegree[next]--;
            if (indegree[next] === 0) {
                queue.push(next);
            }
        }
    }

    return order.length === numCourses ? order : [];
};
