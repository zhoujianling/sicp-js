let env = require('../common/environment')

const pair = env.pair;
const tail = env.tail;
const head = env.head;
const list = env.list;
const listIsNull = env.listIsNull;
const listLength = env.listLength;
const listToString = env.listToString;
const listAt = env.listAt;
const listAppend = env.listAppend;
const listMap = env.listMap;

// -------------
// Exercise 2.17, p.89
// -------------

function listLastPair(l) {
    // maybe we should not assume that list is made of pair now?
    return listIsNull(l) ? null :
        pair(listAt(l, listLength(l) - 1), null)
}

// -------------
// Exercise 2.18, p.89
// -------------
function listReverse(l) {
    return listIsNull(l) ? null : listAppend(listReverse(tail(l)), pair(head(l), null))
    // return l.tail === null ? l : pair(listReverse(tail(l)), head(l))
}

function test() {
    l = list(2, 3, 4, 0, "dd")
    // console.log(listLength(l))
    // console.log(listAt(l, 4))
    // console.log(listLastPair(l))
    console.log(listToString(listReverse(l)))
}

// test()

// -------------
// Exercise 2.21, p.92
// -------------
function listSquareVersion1(l) {
    return listIsNull(l) ? null : 
        pair(head(l) * head(l), listSquareVersion1(tail(l)));
}

function listSquareVersion2(l) {
    return listMap(x => x * x, l)
}

// -------------
// Exercise 2.23, p.92
// -------------
function listForEach(fn, l) {
    return listIsNull(l) ? false : fn(head(l)) || listForEach(fn, tail(l))
}

function testForEach() {
    l = list(1, 2, 3, -2, 0, 8)
    console.log(listToString(listSquareVersion1(l)))    
    console.log(listToString(listSquareVersion2(l)))    

    listForEach(x => console.log(`hello ${x}`), l)
}

// testForEach()


module.exports = { listReverse, listForEach };