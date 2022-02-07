let env = require('../common/environment')
let listModule = require('../chapter2/list')
// let mapModule = require('../chapter2/map')

const pair = env.pair;
const tail = env.tail;
const head = env.head;
const isPair = env.isPair;
const list = env.list;
const listIsNull = env.listIsNull;
const listAppend = env.listAppend;
const listToString = env.listToString;
const listReverse = listModule.listReverse;
const listAt = env.listAt;
const listMap = env.listMap;
const forEach = listModule.listForEach;

function treeCountLeaved(t) {
    return listIsNull(t) ? 0 :
        (! isPair(t) ? 1 :
            treeCountLeaved(head(t)) + treeCountLeaved(tail(t)))
}

function treeToString(t) {
    // todo: remove it
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
    if (t == null) return t
    return isPair(t) ? listAppend(treeFringe(head(t)), treeFringe(tail(t))) : list(t)
}

function testTreeFringe() {
    l = list(list(1, 2), list(3, 4), 5)
    // l = list(1)
    fringe = treeFringe(l)
    console.log(listToString(fringe))
}

// testTreeFringe()

// -------------
// Exercise 2.29, p.96
// -------------
/**
 * 
 * @param {*} left left branch
 * @param {*} right right branch
 * @returns 
 */
function makeMobile(left, right) {
    return list(left, right)
}

/**
 * return total weight 
 * @param {*} m a mobile 
 */
function mobileTotalWeight(m) {
    return branchTotalWeight(mobileLeftBranch(m)) + 
        branchTotalWeight(mobileRightBranch(m))
}

function mobileIsBalanced(m) {
    leftStructure = branchStructure(mobileLeftBranch(m))
    rightStructure = branchStructure(mobileRightBranch(m))
    return (typeof(leftStructure) == 'number' || mobileIsBalanced(leftStructure)) &&
        (typeof(rightStructure) == 'number' || mobileIsBalanced(rightStructure)) &&
        (leftStructure * branchLength(mobileLeftBranch(m)) === 
        rightStructure * branchLength(mobileRightBranch(m))) ;
}

/**
 * the constructor for a mobile branch
 * @param {*} length 
 * @param {number|any} structure represent branch weight as number, or another mobile 
 * @returns 
 */
function makeMobileBranch(length, structure) {
    return list(length, structure)
}

/**
 * the selector for mobile
 * @param {*} m a mobile 
 * @returns 
 */
function mobileLeftBranch(m) {
    return listAt(m, 0)
}

function mobileRightBranch(m) {
    return listAt(m, 1)
}

function branchLength(b) {
    return listAt(b, 0)
}

function branchStructure(b) {
    return listAt(b, 1)
}

function branchTotalWeight(b) {
    return typeof(branchStructure(b)) == 'number' ? b : mobileTotalWeight(branchStructure(b))
}

function testMobile() {
    // ... 
}

// testMobile()



// -------------
// Exercise 2.30, p.97
// -------------
function treeSquare(t) {
    return isPair(t) ? listMap(item => treeSquare(item), t) : t * t
}

function testTreeSquare() {
    t = list(1, list(2, list(3, 4), 5), list(6, 7))
    t2 = treeSquare(t)
    console.log(treeToString(t2))
}

// testTreeSquare()


// -------------
// Exercise 2.31, p.97
// -------------
function treeMap(fn, t) {
    return isPair(t) ? listMap(item => treeMap(fn, item), t) : fn(t)
}

function testTreeMap() {
    t = list(1, list(2, list(3, 4), 5), list(6, 7))
    t2 = treeMap(x => x * x, t)
    console.log(treeToString(t2))
}

// testTreeMap()


// -------------
// Exercise 2.32, p.98
// -------------

/**
 * return all subsets of the list
 * @param {*} s a list of distinct elements
 */
function subsets(s) {
    if (s == null) return list(null)
    const rest = subsets(tail(s))
    return listAppend(rest, listMap(
        subset => listIsNull(subset) ? list(head(s)) : listAppend(subset, list(head(s))), rest))
}

function testSubsets() {
    l = list(1, 2, 3)
    allSubsets = subsets(l)
    console.log(treeToString(allSubsets))
}

// testSubsets()

module.exports = { treeToString}
