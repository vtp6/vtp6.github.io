/**
 * Tests a condition and outputs an error message if false.
 * @param {Boolean} condition Condition to test.
 * @param {String} message Error message if failed.
 */
function assert(condition, message) {
    if (!condition) console.error("ERROR! " + message);
}

/**
 * Replaces potentially harmful characters in a string of text
 * with their HTML character reference equivalents,
 * so that the returned text can be used as an element's innerHTML.
 * @param {String} string The text to sanitise.
 * @returns {String} The sanitised string.
 */
function sanitise(string) {
    return string
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");
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

/**
 * Similar to Python's `random.shuffle` function
 * (returns a pseudo-random permutation of a given array)
 * @param {Any[]} arr The array to shuffle.
 * @returns {Any[]} A random permutation of `a`.
 */
function random_shuffle(arr) {
    return random_sample(arr, arr.length);
}

/**
 * Equivalent of Python's `zip` function
 * (transposes a 2D array of arrays)
 * @param {...Any[]} arrs Arrays to transpose.
 * @returns {Any[][]} The transposed 2D array.
 */
function zip(...arrs) {
    return arrs[0].map((_, i) => arrs.map(r => r[i]));
}

/**
 * Equivalent of Python's `str.title` function
 * (converts a string to title case)
 * @param {String} str The string to convert to title case.
 * @returns {String} The title-cased string.
 */
function title_case(str) {
    return str.replace(/\w\S*/g, (text) =>
        text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
}

/**
 * Keeps only alphanumeric characters in a given string
 * @param {String} str The string to remove punctuation from.
 * @returns {String} The alphanumeric string.
 */
function remove_punctuation(string) {
    return [...string]
        .map((c) => {
            let ord = c.charCodeAt(0);
            return (
                (47 < ord && ord < 58) || 
                (64 < ord && ord < 91) || 
                (96 < ord && ord < 123)
                || (ord > 127)) ? c : "";
            }
        ).join("");
}

/**
 * Expands parentheses (needed for input parsing)
 * - this is the helper function
 * @param {String} str The input string.
 * @returns {[String[], Number]} A list of options, and an index.
 */
function expand_parens_helper(str) {
    let ret = [""];
    for (let i = 0; i < str.length; i++) {
        let char = str[i]
        if (char === "(") {
            let [lst, j] = expand_parens_helper(str.slice(i + 1));
            ret.push(...ret.map(s => lst.map(t => s + t)).flat());
            i += j + 1
        } else if (char === ")") {
            return [ret, i];
        } else {
            ret = ret.map(s => s + char);
        }
    };
    return [ret, str.length - 1];
}

/**
 * Expands parentheses (needed for input parsing)
 * - this is the interface function
 * @param {String} str The input string.
 * @returns {String[]} A list of options.
 */
function expand_parens(str) {
    return expand_parens_helper(str)[0]
}