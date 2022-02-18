const {put, get, pair, head, tail, isPair, 
    list, listMap, listAt, listToJavascriptArray} = require("./environment")
// const {map } = require("../chapter2/list")

function attachTag(tag, contents) {
    return pair(tag, contents)
}

function typeTag(datum) {
    return isPair(datum) ? head(datum) : error("bad tag datum")
}

function contents(datum) {
    return isPair(datum) ? tail(datum) : error("bad tag contents")
}

function applyInUnderlyingJavascript(func, args) {
    argsArray = listToJavascriptArray(args)
    return func(...argsArray)
}

/**
 * call a method of generic type
 * @param {string} op method name 
 * @param {*} args list of args, e.g. list(complexNumber), all elements in the list has type tag 
 * @returns result of function call
 */
function applyGeneric(op, args) {
    const tags = listMap(typeTag, args)
    const func = get(op, tags)
    return func === undefined ? error("Fail to find method in table") :
        applyInUnderlyingJavascript(func, listMap(contents, args))
    
}

function testApplyGeneric() {
    function add(x, y) {
        // console.log("?")
        return x + y
    }
    put("add", list("testTypeName"), add);
    x1 = attachTag("testTypeName", 1)
    y1 = attachTag("testTypeName", 2)
    let res = applyGeneric("add", list(x1, y1));
    console.log("x1 add y1 is " + res);
}

// testApplyGeneric()

module.exports = {applyGeneric, typeTag, contents, attachTag }
