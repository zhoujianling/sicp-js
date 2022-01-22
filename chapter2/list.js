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