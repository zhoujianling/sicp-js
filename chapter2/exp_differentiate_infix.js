const { listToString, listAppend, listAt, isNumber, isString, isPair, list, head, tail, pair} 
    = require("../common/environment");

// -------------
// Exercise 2.58, p.131
// -------------

function numberEqual(exp, num) {
    return isNumber(exp) && exp === num
}

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
    return isPair(e) && head(tail(e)) === "+"
}

/**
 * selector: get the addend of the sum e
 * @param {*} e the sum 
 */
function sumAddend(e) {
    return listAt(e, 0)
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
        list(a1, "+", a2)
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
        list(m1, "*", m2)
}

function isProduct(e) {
    return isPair(e) && head(tail(e)) === "*"
}

/**
 * selector: get multiplier of the product e
 * @param {*} e the product 
 */
function productMultiplier(e) {
    return listAt(e, 0)
}

/**
 * selector: get multiplicand of the product e
 * @param {*} e the product 
 */
function productMultiplicand(e) {
    return listAt(e, 2) 
}

// // -------------
// // Exercise 2.56, p.130
// // -------------
// function isExp(e) {
//     return isPair(e) && head(e) === "**"
// }

// /**
//  * constructor exponent
//  * @param {*} base 
//  * @param {*} expo 
//  * @returns 
//  */
// function makeExp(base, expo) {
//     return numberEqual(expo, 0) ? 1 :
//         numberEqual(expo, 1) ? base :
//         list("**", base, expo)
// }

// function expBase(e) {
//     return listAt(e, 1)
// }

// function expExponent(e) {
//     return listAt(e, 2)
// }


/**
 * 
 * @param {*} exp an algebraic expression, e.g. "ax^2 + bx + c", 
 * @param {*} variable the symbol of the variable, e.g. "x"
 * @returns the derivative of the expression, e.g. "2ax + b" 
 */
function deriv(exp, variable) {
    return isNumber(exp) ? 0 :
        isVariable(exp) ? isSameVariable(exp, variable) ? 1 : 0 :
        isSum(exp) ? makeSum(deriv(sumAddend(exp), variable), 
                            deriv(sumAugend(exp), variable)) : 
        isProduct(exp) ? makeSum(
            makeProduct(productMultiplier(exp), deriv(productMultiplicand(exp), variable)),
            makeProduct(deriv(productMultiplier(exp), variable), productMultiplicand(exp))) :
        // // ----------------
        // // Exercise 2.56
        // // ----------------
        // isExp(exp) ? makeProduct(
        //     makeProduct(expExponent(exp), makeExp(expBase(exp), makeSum(expExponent(exp), - 1))),
        //     deriv(expBase(exp), variable)) :
        // // isExp(exp) ? "...." :
        "ERROR";
}

function testDeriv() {
    // console.log("a is variable: " + isVariable("a"))
    // console.log("a is same variable with b: " + isSameVariable("a", "b"))
    // console.log("a is same variable with a: " + isSameVariable("a", "a"))
    // console.log("* a b is product: " + isProduct(list("*", "a", "b")))
    // console.log("+ a b is product: " + isProduct(list("+", "a", "b")))
    // console.log("+ a b is sum: " + isSum(list("+", "a", "b")))

    res = deriv(list("x", "+", 3), "x") 
    // expects: 1

    console.log(listToString(res))

    res = deriv(list("x", "*", "y"), "x") 
    // expects: "y"

    console.log(listToString(res))

    exp = list(list("x", "*", "y"), "*", list("x", "+", 3))
    res = deriv(exp, "x") 
    // f(x) = xy(x+3) 
    // expects: list("+", list("*", "x", "y"), list("*", "y", list("+", "x", "3")))

    console.log(`the derivative of ${listToString(exp)} is ${listToString(res)}`)

    exp = list(list("x", "*", "y"), "+", list("x", "+", 3))
    res = deriv(exp, "x") 
    // f(x) = xy(x+3) 
    // expects: list("+", list("*", "x", "y"), list("*", "y", list("+", "x", "3")))

    console.log(`the derivative of ${listToString(exp)} is ${listToString(res)}`)
}

testDeriv()
