let env = require('../common/environment')
let mapModule = require('../chapter2/map')
let listModule = require('../chapter2/list')

const pair = env.pair;
const tail = env.tail;
const head = env.head;
const isPair = env.isPair;
const list = env.list;
const listIsNull = env.listIsNull;
const listAppend = env.listAppend;
const listToString = env.listToString;
const listReverse = listModule.listReverse;
const map = mapModule.map;
const forEach = mapModule.forEach;

function treeCountLeaved(t) {
    return listIsNull(t) ? 0 :
        (! isPair(t) ? 1 :
            treeCountLeaved(head(t)) + treeCountLeaved(tail(t)))
}

function treeToString(t) {
    function toStringImpl(l0) {
        return listIsNull(l0) ? "" : 
            `${isPair(head(l0)) ? 
                treeToString(head(l0)) : 
                `${head(l0)}`}, ${toStringImpl(tail(l0))}`
    }
    return `[ ${toStringImpl(t)}]`

}

// -------------
// Exercise 2.27, p.95
// -------------
function treeDeepReverse(t) {
    return t == null ? t : 
        map(childTree => isPair(childTree) ? treeDeepReverse(childTree) 
            : childTree, listReverse(t))
}

function testReverse() {
    l = list(list(1, 2), list(3, 4))
    console.log(treeToString(l))
    reversedTree = treeDeepReverse(l)
    console.log(treeToString(reversedTree))
}

// testReverse()

// -------------
// Exercise 2.28, p.95
// -------------
function treeFringe(t) {
    // result = list()
    // listAppend()
    // // forEach(item => result = listAppend(result, isPair(item) ? treeFringe(item) : list(item)), t)
    // forEach(item => console.log(`hello ${isPair(item) ? listToString(item) : item}`), t)
    // return result
}

function testTreeFringe() {
    l = list(list(1, 2), list(3, 4), 5)
    // l = list(1)
    fringe = treeFringe(l)
    console.log(listToString(fringe))
}

testTreeFringe()
