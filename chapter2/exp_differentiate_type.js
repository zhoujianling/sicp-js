
const { listToString, listAppend, listAt, isNumber, isString, isPair, list, head, tail, pair, get} 
    = require("../common/environment");
const { numberEqual } = require("../chapter1/number")

const { treeToString } = require("./tree")


// ==============================
// Symbolic Differentiation
// ==============================


/**
 * is e a varialbe ? 
 * @param {*} e 
 */
function isVariable(e) {
    return isString(e)
}

/**
 * 
 * @param {*} v1 
 * @param {*} v2 
 */
function isSameVariable(v1, v2) {
    return isVariable(v1) && isVariable(v2) && v1 === v2
}

function isSum(e) {
    return isPair(e) && head(e) === "+"
}

/**
 * selector: get the addend of the sum e
 * @param {*} e the sum 
 */
function sumAddend(e) {
    return listAt(e, 1)
}

/**
 * selector: get the augend of the sum e
 * @param {*} e the sum 
 */
function sumAugend(e) {
    return listAt(e, 2)
}

/**
 * constructor: make a sum
 * @param {*} a1 addend?
 * @param {*} a2 augend?
 */
function makeSum(a1, a2) {
    return numberEqual(a1, 0) ? a2 :
        numberEqual(a2, 0) ? a1 : 
        isNumber(a1) && isNumber(a2) ? a1 + a2 :
        list("+", a1, a2)
}

/**
 * constructor: make a product
 * @param {*} m1 multiplier ?
 * @param {*} m2 multiplicant ?
 */
function makeProduct(m1, m2) {
    return numberEqual(m1, 0) || numberEqual(m2, 0) ? 0 :
        numberEqual(m1, 1) ? m2 :
        numberEqual(m2, 1) ? m1 :
        isNumber(m1) && isNumber(m2) ? m1 * m2 :
        list("*", m1, m2)
}

function isProduct(e) {
    return isPair(e) && head(e) === "*"
}

/**
 * selector: get multiplier of the product e
 * @param {*} e the product 
 */
function productMultiplier(e) {
    return listAt(e, 1)
}

/**
 * selector: get multiplicand of the product e
 * @param {*} e the product 
 */
function productMultiplicand(e) {
    // return listAt(e, 2)
    return tail(tail(tail(e))) === null ? listAt(e, 2) :
        pair("*", pair(listAt(e, 2), tail(tail(tail(e))))) 
}

function isExp(e) {
    return isPair(e) && head(e) === "**"
}

/**
 * constructor exponent
 * @param {*} base 
 * @param {*} expo 
 * @returns 
 */
function makeExp(base, expo) {
    return numberEqual(expo, 0) ? 1 :
        numberEqual(expo, 1) ? base :
        list("**", base, expo)
}

function expBase(e) {
    return listAt(e, 1)
}

function expExponent(e) {
    return listAt(e, 2)
}


function operator(exp) {
    return head(exp)
}

function operands(exp) {
    return tail(exp)
}

/**
 * 
 * @param {*} exp an algebraic expression, e.g. "ax^2 + bx + c", 
 * @param {*} variable the symbol of the variable, e.g. "x"
 * @returns the derivative of the expression, e.g. "2ax + b" 
 */
function deriv(exp, variable) {
    return isNumber(exp) ? 0 :
        isVariable(exp) ? isSameVariable(exp, variable) ? 1 : 0 :
        get("deriv", operator(exp))(operands(exp), variable)
        error("ERROR");
}

// -------------
// Exercise 2.73 p.160
// -------------
function installSumDerivativePackage() {

    function derivImpl(exp, variable) {
        return isNumber(exp) ? 0 :
            isVariable(exp) ? isSameVariable(exp, variable) ? 1 : 0 :
            makeSum(deriv(sumAddend(exp), variable), 
                deriv(sumAugend(exp), variable))  
    }

    // interface
    put("deriv", list("+"), derivImpl)
}

function installProductDerivativePackage() {

    function derivImpl(exp, variable) {
        return isNumber(exp) ? 0 :
            isVariable(exp) ? isSameVariable(exp, variable) ? 1 : 0 :
            makeSum(makeProduct(productMultiplier(exp), deriv(productMultiplicand(exp), variable)),
                makeProduct(deriv(productMultiplier(exp), variable), productMultiplicand(exp))); 
    }

    // interface
    put("deriv", list("*"), derivImpl)
}

function installExponentDerivativePackage() {

    function derivImpl(exp, variable) {
        return isNumber(exp) ? 0 :
            isVariable(exp) ? isSameVariable(exp, variable) ? 1 : 0 :
            makeProduct(makeProduct(expExponent(exp), makeExp(expBase(exp), makeSum(expExponent(exp), - 1))),
                deriv(expBase(exp), variable)); 
    }

    // interface
    put("deriv", list("**"), derivImpl)
}

installSumDerivativePackage()
installProductDerivativePackage()
installExponentDerivativePackage()

function testDeriv() {
    // console.log("a is variable: " + isVariable("a"))
    // console.log("a is same variable with b: " + isSameVariable("a", "b"))
    // console.log("a is same variable with a: " + isSameVariable("a", "a"))
    // console.log("* a b is product: " + isProduct(list("*", "a", "b")))
    // console.log("+ a b is product: " + isProduct(list("+", "a", "b")))
    // console.log("+ a b is sum: " + isSum(list("+", "a", "b")))

    res = deriv(list("+", "x", 3), "x") 
    // expects: 1

    console.log(res)

    res = deriv(list("*", "x", "y"), "x") 
    // expects: "y"

    console.log(res)


    exp = list("*", list("*", "x", "y"), list("+", "x", 3))
    res = deriv(exp, "x") 
    // f(x) = xy(x+3) 
    // expects: list("+", list("*", "x", "y"), list("*", "y", list("+", "x", "3")))

    console.log(`the derivative of ${listToString(exp)} is ${listToString(res)}`)

    exp = list("*", "x", "y", list("+", "x", 3))
    res = deriv(exp, "x") 
    // f(x) = xy(x+3) 
    // expects: list("+", list("*", "x", "y"), list("*", "y", list("+", "x", "3")))

    console.log(`the derivative of ${listToString(exp)} is ${listToString(res)}`)
}

// todo: test ...
testDeriv()


function testDerivExp() {
    exp = list("**", "x", "y")
    res = deriv(exp, "x") 

    console.log(`the derivative of ${listToString(exp)} is ${listToString(res)}`)

    exp = list("**", "x", 1)
    res = deriv(exp, "x") 

    console.log(`the derivative of ${listToString(exp)} is ${listToString(res)}`)
}


// testDerivExp()
