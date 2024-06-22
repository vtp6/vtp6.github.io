/**
 * Tests a condition and outputs an error message if false.
 * @param {Boolean} condition Condition to test.
 * @param {String} message Error message if failed.
 */
function assert(condition, message) {
    if (!condition) console.error("ERROR! " + message);
}

/**
 * Equivalent of Python's `sum` function
 * (returns the total of the elements of an array)
 * @param {Number[]} arr The array to sum.
 * @returns {Number} The sum of the array.
 */
function sum(arr) {
    return arr.reduce((b, a) => b + a, 0);
}

/**
 * Similar to Python's `list.remove` function
 * (removes the first instance of an element from an array,
 *  modifying the array in place and returning the removed element)
 * @param {Any[]} arr The array to remove an element from.
 * @param {Any} elem The element to remove from the array.
 * @returns {Any} The element that was removed from the array.
 */
function remove(arr, elem) {
    arr.splice(arr.indexOf(elem), 1);
    return elem;
}

/**
 * Equivalent of Python's `random.randint` function
 * (returns a pseudo-random integer between `a` and `b` inclusive)
 * @param {Number} a Lower bound.
 * @param {Number} b Upper bound.
 * @returns {Number} Random integer between `a` and `b` inclusive.
 */
function randint(a, b) {
    return a + Math.floor(Math.random() * (b + 1 - a));
}

/**
 * Equivalent of Python's `random.choice` function
 * (returns a pseudo-random element from a given array)
 * @param {Any[]} arr The array to choose an item from.
 * @returns {Any} A random element from the given array.
 */
function random_choice(arr) {
    return arr[randint(0, arr.length - 1)];
}

/**
 * Equivalent of Python's `random.sample` function
 * (returns `k` pseudo-random elements from `arr`)
 * @param {Any[]} arr The array to choose items from.
 * @param {Number} k The number of items to choose.
 * @returns {Any[]} A random subset of `arr` with length `k`.
 */
function random_sample(arr, k) {
    ret = [];
    while (k-- > 0) ret.push(remove(arr, random_choice(arr)));
    return ret;
}