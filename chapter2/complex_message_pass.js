const { listToString, listAppend, listAt, isNumber, isString, isPair, list, head, tail, pair
    , put, get, error} 
    = require("../common/environment");
const { applyGeneric } = require("../common/generic_types")
const { square } = require("../chapter1/number")

/**
 * apply generic in `message-passing` style
 * @param {string} op operation name
 * @param {*} arg is the dispatch func in the functional object
 * @returns 
 */
function applyGeneric2(op, arg) {
    return head(arg)(op)
}

function makeComplexFromRealImagine(x, y) {
    function dispatch(op) {
        return op === "realPart" ? x :
            op === "imaginePart" ? y :
            op === "magnitude" ? Math.sqrt(square(x) + square(y)) :
            op === "angle" ? Math.atan2(y, x) :
            error("unknown operator")
    } 
    return dispatch
}

// -------------
// Exercise 2.75 p.163
// -------------
function makeComplexFromMagAngle(r, a) {
    function dispatch(op) {
        return op === "realPart" ? r * Math.cos(a) :
            op === "imaginePart" ? r * Math.sin(a) :
            op === "magnitude" ? r :
            op === "angle" ? a :
            error("unknown operator")
    } 
    return dispatch
}
