
// -------------
// Exercise 2.54, p.125
// -------------

function listEqual(la, lb) {

}

// ==============================
// Symbolic Differentiation
// ==============================

function isNumber(e) {

}

/**
 * is e a varialbe ? 
 * @param {*} e 
 */
function isVariable(e) {

}

/**
 * 
 * @param {*} v1 
 * @param {*} v2 
 */
function isSameVariable(v1, v2) {

}

function isSum(e) {

}

/**
 * selector: get the addend of the sum e
 * @param {*} e the sum 
 */
function sumAddend(e) {

}

/**
 * selector: get the augend of the sum e
 * @param {*} e the sum 
 */
function sumAugend(e) {

}

/**
 * constructor: make a sum
 * @param {*} a1 addend?
 * @param {*} a2 augend?
 */
function makeSum(a1, a2) {

}

/**
 * constructor: make a product
 * @param {*} m1 multiplier ?
 * @param {*} m2 multiplicant ?
 */
function makeProduct(m1, m2) {

}

function isProduct(e) {

}

/**
 * selector: get multiplier of the product e
 * @param {*} e the product 
 */
function productMultiplier(e) {

}

/**
 * selector: get multiplicand of the product e
 * @param {*} e the product 
 */
function productMultiplicand(e) {

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
        isSum(exp) ? makeSum(deriv(sumAddend(exp), variable), 
                            deriv(sumAugend(exp), variable)) : 
            isProduct(exp) ? 
                makeSum(makeProduct(productMultiplier(exp), deriv(productMultiplicand(exp), variable)),
                        makeProduct(deriv(productMultiplier(exp), variable), productMultiplicand(exp))) :
        "ERROR";
}

function testDeriv() {
    
}

testDeriv()
