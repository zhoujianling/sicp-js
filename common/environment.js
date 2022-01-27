
function pair(head, tail) {
    return {head, tail};
}

function head(p) {
    return p.head;
}

function tail(p) {
    return p.tail;
}

function isPair(p) {
    return p == null ? false :
        head(p) !== undefined && tail(p) !== undefined;
}


// -------------
// Exercise 2.4, p.80
// -------------
// function pair(x, y) {
//     return m => m(x, y);
// }

// function head(p) {
//     return p((x, y) => x);
// }

// function tail(p) {
//     return p((x, y) => y);
// }

// -------------------
// list
// -------------------
/**
 * make a list
 * @param  {...any} args items of list
 * @returns a list made of args
 */
function list(... args) {
    return args.length === 0 ? null :
        pair(args[0], list(... args.slice(1)))
}

/**
 * check if a list is null
 * @param {*} l a list 
 * @returns 
 */
function listIsNull(l) {
    return l == null;
}

function listToString(l) {
    function toStringImpl(l0) {
        return listIsNull(l0) ? "" : `${head(l0)}, ${toStringImpl(tail(l0))}`
    }
    return `[ ${toStringImpl(l)}]`
}

function listAt(l, index) {
    return index === 0 ? head(l) : listAt(tail(l), index - 1)
}

function listLength(l) {
    return l === null ? 0 : listLength(tail(l)) + 1;
}

/**
 * append l2 elements to l1
 * @param {*} l1 
 * @param {*} l2 
 */
function listAppend(l1, l2) {
    return listIsNull(l1) ? l2 : pair(head(l1), listAppend(tail(l1), l2))  
}

/**
 * apply mapper function to the list, get a new list
 * @param {*} fn mapper function 
 * @param {*} l  a list
 * @returns new list
 */
function listMap(fn, l) {
    return listIsNull(l) ? null : pair(fn(head(l)), listMap(fn, tail(l)))
}

function testEnv() {
    console.log(pair(1, 2));
    console.log(list(1, 2, 3));
    // console.log(list());
}

function testList() {
    l = list(1, "abc", 3.5, 999)
    console.log(`list length is ${listLength(l)}`)
    console.log(`list at 0 is ${listAt(l, 0)}.`)
    console.log(`list at 1 is ${listAt(l, 1)}.`)
    console.log(`list at 2 is ${listAt(l, 2)}.`)

    l2 = list("hello", 0x222)
    // console.log(listToString(l))
    console.log(listToString(listAppend(l, l2)))
}

module.exports = {pair, head, tail, isPair, list, listToString, listIsNull, listLength,
    listAppend, listAt, listMap
};

// testEnv()
// testList()