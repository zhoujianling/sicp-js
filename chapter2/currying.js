let env = require('../common/environment')

const pair = env.pair;
const tail = env.tail;
const head = env.head;
const list = env.list;
const listIsNull = env.listIsNull;
const listLength = env.listLength;


function plusCurried(x) {
    return y => x + y;
}

// -------------
// Exercise 2.20, p.90
// -------------
function brooks(fn, args) {
    return listIsNull(args) ? fn : brooks(fn(head(args)), tail(args));
}

function brooksCurried(args) {
    // ??????????????????
}

function testCurry() {
    console.log(brooks(plusCurried, list(3, 8)));
}

// testCurry()