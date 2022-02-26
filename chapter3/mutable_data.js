const { listToString, listAppend, listAt, isNumber, isString, isPair, list, head, tail, pair, 
    listIsNull, setTail, setHead } 
    = require("../common/environment");


function lastPair(x) {
    return listIsNull(tail(x)) ? x :
        lastPair(tail(x));
}

/**
 * similar to listAppend()
 * @param {*} x a list 
 * @param {*} y 
 */
function listAppendMutator(x, y) {
    setTail(lastPair(x), y)
    return x;
}


// -------------
// Exercise 3.16, p.229
// -------------
/**
 * count the number of pairs in a list
 * @param {*} x a list 
 */
function countPairs0(x) {
    return isPair(x) ? 1 + countPairs0(head(x)) + countPairs0(tail(x)) : 0 
}

/**
 * why is not correct ?
 */
function testIncorrectCountPairs() {
    // 3
    const l = list(1, 2, 3)
    console.log("count pairs: " + countPairs0(l))

    // 4
    let l1 = list(1, 2, 3)
    let lp = lastPair(l1)
    setHead(l1, lp)
    console.log("count pairs: " + countPairs0(l1))

    // 7
    let l2 = list(1, 2, 3)
    let mp = tail(l2);  // mid pair
    let lpp = lastPair(l2)
    setHead(mp, lpp);
    setHead(l2, mp)
    console.log("count pairs: " + countPairs0(l2))

    // unfinity
    let l3 = list(1, 2, 3)
    setHead(l3, l3)
    // console.log("count pairs: " + countPairs0(l3))
}

// testIncorrectCountPairs()


// -------------
// Exercise 3.17, p.229
// -------------
/**
 * count the number of pairs in a list
 * @param {*} x a list 
 */
function countPairs(x) {
    let auxData = new Set()
    function countPairsImpl(x) {
        if (auxData.has(x)) return 0;
        auxData.add(x);
        return isPair(x) ? 1 + countPairsImpl(head(x)) + countPairsImpl(tail(x)) : 0 
    }
    return countPairsImpl(x)
}

function testCountPairs() {
    // 3
    const l = list(1, 2, 3)
    console.log("count pairs: " + countPairs(l))

    // 4
    let l1 = list(1, 2, 3)
    let lp = lastPair(l1)
    setHead(l1, lp)
    console.log("count pairs: " + countPairs(l1))

    // 7
    let l2 = list(1, 2, 3)
    let mp = tail(l2);  // mid pair
    let lpp = lastPair(l2)
    setHead(mp, lpp);
    setHead(l2, mp)
    console.log("count pairs: " + countPairs(l2))

    // unfinity
    let l3 = list(1, 2, 3)
    setHead(l3, l3)
    // console.log("count pairs: " + countPairs0(l3))
}

// testCountPairs()


// -------------
// Exercise 3.18, p.229
// -------------
function checkCycle(l) {
    let vals = new Set();
    function checkImpl(l) {
        if (l === null) return false;
        // let h = head(l);
        if (vals.has(l)) {
            return true;
        }
        vals.add(l)
        return checkImpl(tail(l));
    }

    return checkImpl(l)
}

function testCheckCycle() {
    let l = list(1, 2, 3, 4);
    console.log(checkCycle(l));

    let l2 = list(1, 2, 3, 4);
    let lp = lastPair(l2);
    setTail(lp, l2)
    console.log(checkCycle(l2));
}

// testCheckCycle()


// -------------
// Exercise 3.19, p.229
// -------------
function checkCycle2(l) {
    let slow = l
    let fast = l
    while (slow !== null && fast !== null) {
        slow = tail(slow)
        fast = tail(fast)
        if (fast !== null) fast = tail(fast)
        if (slow === fast) return true;
    }

    return false
}

function testCheckCycle2() {
    let l = list(1, 2, 3, 4);
    console.log(checkCycle2(l));

    let l2 = list(1, 2, 3, 4);
    let lp = lastPair(l2);
    setTail(lp, l2)
    console.log(checkCycle2(l2));
}

// testCheckCycle2()

