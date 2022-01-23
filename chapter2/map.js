let env = require('../common/environment')

const pair = env.pair;
const tail = env.tail;
const head = env.head;
const list = env.list;
const listIsNull = env.listIsNull;
const listLength = env.listLength;
const listToString = env.listToString;
const map = env.map;

// -------------
// Exercise 2.21, p.92
// -------------
function listSquareVersion1(l) {
    return listIsNull(l) ? null : 
        pair(head(l) * head(l), listSquareVersion1(tail(l)));
}

function listSquareVersion2(l) {
    return map(x => x * x, l)
}

// -------------
// Exercise 2.23, p.92
// -------------
function forEach(fn, l) {
    return listIsNull(l) ? false : fn(head(l)) || forEach(fn, tail(l))
}

function test() {
    l = list(1, 2, 3, -2, 0, 8)
    console.log(listToString(listSquareVersion1(l)))    
    console.log(listToString(listSquareVersion2(l)))    

    forEach(x => console.log(`hello ${x}`), l)
}

// test()

