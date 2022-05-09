const { listToString, listAppend, listMember, listAt, isNumber, isString, isPair, list, head, tail, pair, 
    listIsNull, setTail, setHead, error } 
    = require("../common/environment");
const {isPrime} = require("../chapter1/number");

/**
 * a stream (represents [val1, val2, val3]) will be a tuple like 
 *      (val1, ()=>(val2, ()=> (val3, null)))
 * @param {*} stream 
 * @returns 
 */
function streamTail(stream) {
    return tail(stream)();
}

/**
 * stream at
 * @param {*} stream 
 * @param {number} n 
 */
function streamRef(stream, n) {
    return n === 0 ? head(stream) :
        streamRef(streamTail(stream), n - 1);
}

function streamMap(fn, stream) {
    return stream === null ? null :
        pair(fn(head(stream)), () => streamMap(fn, streamTail(stream)));
}

function streamForEach(func, stream) {
    if (stream === null) return true;
    func(head(stream));
    return streamForEach(func, streamTail(stream));
}

function displayStream(stream) {
    let displayContent = '['
    streamForEach((v => displayContent += `${v}, `), stream)
    displayContent += ']';
    console.log(displayContent)
}

function testDisplayStream() {
    let s = pair(1, ()=>pair(2, ()=> pair(3, ()=> null)))
    displayStream(s)
}

// testDisplayStream()

function streamFilter(predicate, stream) {
    console.log("filter")
    return stream === null ? null :
        predicate(head(stream)) ? pair(head(stream), ()=> streamFilter(predicate, streamTail(stream))) :
        streamFilter(predicate, streamTail(stream))

}
// function filter(predicate, sequence) {
// }

function streamEnumerateInterval(low, high) {
    console.log("enumerate")
    return low > high ? null :
        pair(low, () => streamEnumerateInterval(low + 1, high))
}

function testPrime() {
    // displayStream(streamEnumerateInterval(1, 10))
    displayStream(streamFilter(isPrime, streamEnumerateInterval(1, 10)))
    // displayStream((streamFilter(isPrime, streamEnumerateInterval(10001, 1000000))))
    // head(streamTail(streamFilter(isPrime, streamEnumerateInterval(10001, 1000000))))
}

testPrime()
