const {put, get, list, listMap, listAt} = require("./environment")
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
    const self = contents(listAt(args, 0))
    console.log("todo ................")
}

/**
 * call a method of generic type
 * @param {string} op method name 
 * @param {*} args list of args, e.g. list(complexNumber), first element is  
 * @returns result of function call
 */
function applyGeneric(op, args) {
    const tag = typeTag(listAt(args, 0))
    const func = get(op, tag)
    return func === undefined ? error("Fail to find method in table") :
        applyInUnderlyingJavascript(func, args)
    
}

module.exports = {applyGeneric, typeTag, contents }
