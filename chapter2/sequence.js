let env = require('../common/environment')
let listModule = require('../chapter2/list')
let numberModule = require('../chapter1/number')
let treeModule = require('../chapter2/tree')

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
const isPrime = numberModule.isPrime;
const treeToString = treeModule.treeToString;

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


// -------------
// Exercise 2.36, p.104
// -------------
function accumulateN(fn, initial, sequences) {
    return listIsNull(head(sequences)) ? null :
        pair(accumulate(fn, initial, listMap(seq => head(seq), sequences)),
             accumulateN(fn, initial, listMap(seq => tail(seq), sequences)));
}

function testAccumulateN() {
    d = list(
            list(1, 2, 3),
            list(4, 5, 6),
            list(7, 8, 9),
            list(10, 11, 12),
    )
    result = accumulateN((x, y) => x + y, 0, d)
    // expects : list(22, 26, 30)
    console.log(listToString(result))
}

// testAccumulateN()


// -------------
// Exercise 2.37, p.105
// -------------

function dotProduct(v, w) {
    return accumulate((x, y) => x + y, 0, accumulateN((x, y) => x * y, 1, list(v, w)))
}

// console.log(dotProduct(list(1, 2, 3), list(-2, 0, 5)))

function matrixToString(t) {
    function toStringImpl(l0) {
        return listIsNull(l0) ? "" : 
            `${isPair(head(l0)) ? 
                matrixToString(head(l0)) : 
                `${head(l0)}`}, ${toStringImpl(tail(l0))}`
    }
    return `[ ${toStringImpl(t)}]`

}

function matrixTimesVector(m, v) {
    return listMap(row => dotProduct(row, v), m)
}

function testMatrixTimesVector() {
    mat = list(list(1, 2, 3, 4),
               list(4, 5, 6, 6),
               list(6, 7, 8, 9),
    );
    v = list(1, 2, 3, 0)
    p = matrixTimesVector(mat, v) 
    // expects list(14, 32, 44)
    console.log(listToString(p))
}

// testMatrixTimesVector()

function transpose(mat) {
    return accumulateN((curr, prev) => pair(curr, prev), null, mat);
}

function testTranspose() {
    mat = list(list(1, 2, 3, 4),
               list(4, 5, 6, 6),
               list(6, 7, 8, 9),
    );
    transposedMat = transpose(mat)
    // console.log(matrixToString(mat))
    console.log(matrixToString(transposedMat))

}

// testTranspose()


function matrixTimesMatrix(m1, m2) {
    const cols = transpose(m2)
    // accumulateN(, , cols)
    return listMap(row => listMap(col => dotProduct(row, col), cols), m1)
}

function testMatrixTimesMatrix() {
    mat1 = list(list(1, 2, 4),
               list(4, 5, 6),
               list(6, 7, 9),
    );
    mat2 = list(list(0, 2, 1),
               list(1, 0, 1),
               list(3, 1, 2),
    );
    // expects: [ [14, 6, 11], [23, x, x], []]
    m3 = matrixTimesMatrix(mat1, mat2)
    console.log(matrixToString(m3))
}

// testMatrixTimesMatrix()


// -------------
// Exercise 2.39, p.106
// -------------

const foldRight = accumulate;

function foldLeft(op, initial, sequence) {
    function iter(result, rest) {
        return listIsNull(rest) ? result : 
            iter(op(result, head(result)), tail(rest));
    }
    return iter(initial, sequence)
}

function reverse(sequence) {
    // todo: ...
    // return foldRight((x, y) =>, null, sequence)
}


// ============================
// Nested Mapping
// ============================

function flatmap(fn, seq) {
    return accumulate(listAppend, null, listMap(fn, seq))
}

function isSumPrime(p) {
    return isPrime(head(p) + head(tail(p)) )
}

function testNestedMapping() {
    l = list(2, 3, 4, 5)
    console.log(listToString(listMap(x => x * x, l)))

    console.log(listToString(flatmap(x => list(x * x), l)))
}

// testNestedMapping()


// -------------
// Exercise 2.40, p.108
// -------------

function enumerateInterval(low, high) {
    return low > high ? null : pair(low, enumerateInterval(low + 1, high))
}

function uniquePairs(n) {
    return flatmap(i => listMap(j => list(i, j), enumerateInterval(1, i)), enumerateInterval(1, n))
}

function testUnqiuePairs() {
    console.log(treeToString(uniquePairs(10)))
}

// testUnqiuePairs()


// -------------
// Exercise 2.41, p.108
// -------------
function distinctTriples(n, s) {
    triples = 
        listMap(i => 
            listMap(j => 
                listMap(k => list(i, j, k), 
                    enumerateInterval(1, n)), 
                enumerateInterval(1, n))
        , enumerateInterval(1, n))
    // console.log(treeToString(triples))

    flatTriples = flatmap(x => x, flatmap(x => x, triples))
    // console.log(treeToString(flatTriples))
    return filter(ijk => listAt(ijk, 0) + listAt(ijk, 1) + listAt(ijk, 2) === s, flatTriples)
}

function testDistinctTriples() {
    // distinctTriples(2, 0)
    console.log(treeToString(distinctTriples(15, 30)))
}

// testDistinctTriples()


// -------------
// Exercise 2.42, p.108
// -------------
// Eight Queens Puzzle

// function queens(boardSize) {
//     function queensCols(k) {
//         return k === 0 ? list(emptyBoard) :
//             filter()
//     }
//     return queensCols(boardSize)
// }
