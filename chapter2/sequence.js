let env = require('../common/environment')
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
const listAt = env.listAt;

/**
 * 
 * @param {*} predicate 
 * @param {*} sequence a list
 * @returns the filtered list
 */
function filter(predicate, sequence) {
    return listIsNull(sequence) ? null :
        predicate(head(sequence)) ? pair(head(sequence), filter(predicate, tail(sequence))) :
        filter(predicate, tail(sequence))
}

function testFilter() {
    console.log(listToString(filter(x => x % 2 == 1, list(1, 2, 3, 4, 5))))
}

// testFilter()


/**
 * 
 * @param {*} op function accepts two parameters, 
 * @param {*} initial default element when sequence is null
 * @param {*} sequence 
 * @returns one element
 */
function accumulate(op, initial, sequence) {
    return listIsNull(sequence) ? initial : 
        op(head(sequence), accumulate(op, initial, tail(sequence)))
}

function testAccumulate() {
    console.log(accumulate((x, y) => x + y, 0, list(1, 2, 3, 4, 5)))    
}

// testAccumulate()


// -------------
// Exercise 2.33, p.103
// -------------
function listMap(f, sequence) {
    return accumulate((x, y) => pair(f(x), y), null, sequence)
}

function listAppend2(seq1, seq2) {
    return accumulate(pair, seq2, seq1)
}

function listLength2(seq) {
    return accumulate((x, y) => y + 1, 0, seq)
}

function testListOpVersion2() {
    console.log(listToString(listMap(x => x * x, list(1, 2, 3, 4, 5))))

    console.log(listToString(listAppend2(list(8, 8, 8), list(1, 2, 3, 4, 5))))

    console.log(listLength2(list(8, 8, 8)))
}

// testListOpVersion2()

//#region Horner

// -------------
// Exercise 2.34, p.103
// -------------
function hornerEval(x, coefficientSequence) {
    return accumulate((thisCoeff, higherTerms) => higherTerms * x + thisCoeff, 
    0, coefficientSequence)
}

function testHornerEval() {
    // to compute  1 + 3x + 5x^3 + x^5, (x = 2)
    console.log(hornerEval(2, list(1, 3, 0, 5, 0, 1)))
}

// testHornerEval()

//#endregion

