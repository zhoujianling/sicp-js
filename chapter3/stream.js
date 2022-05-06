const { listToString, listAppend, listMember, listAt, isNumber, isString, isPair, list, head, tail, pair, 
    listIsNull, setTail, setHead, error } 
    = require("../common/environment");


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
