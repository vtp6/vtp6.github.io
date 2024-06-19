function assert(condition, message) {
    if (!condition) console.error("ERROR! " + message);
}

function sum(arr) {
    return arr.reduce((b, a) => b + a, 0);
}