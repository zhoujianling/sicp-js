const { listToString, listAppend, listAt, isNumber, isString, isPair, list, head, tail, pair} 
    = require("../common/environment");
const { square } = require("../chapter1/number")

/**
 * constructor for complex number (representation of rectanguler form)
 * @param {*} real real part
 * @param {*} imag  imagine part
 */
function makeComplexFromRealImagine(real, imag) {
    return pair(real, imag)
}

/**
 * constructor for complex number
 * @param {*} mag magnitude
 * @param {*} angle  angle
 */
function makeComplexFromMagAngle(mag, angle) {
    // return pair
}

function complexRealPart(z) {
    return head(z)
}

function complexImaginePart(z) {
    return tail(z)
}

function complexMagnitude(z) {
    return Math.sqrt(square(complexRealPart(z)) + square(complexImaginePart(z)))
}

function complexAngle(z) {
    return Math.atan2(complexImaginePart(z), complexRealPart(z))
}

function complexAdd(z1, z2) {
    return makeComplexFromRealImagine(complexRealPart(z1) + complexRealPart(z2),
        complexImaginePart(z1) + complexImaginePart(z2));
}

function complexSub(z1, z2) {
    return makeComplexFromRealImagine(complexRealPart(z1) - complexRealPart(z2),
        complexImaginePart(z1) - complexImaginePart(z2));
}

function complexMul(z1, z2) {
    return makeComplexFromMagAngle(complexMagnitude(z1) * complexMagnitude(z2),
        complexAngle(z1) + complexAngle(z2));
}

function complexDiv(z1, z2) {
    return makeComplexFromMagAngle(complexMagnitude(z1) / complexMagnitude(z2),
        complexAngle(z1) - complexAngle(z2));
}

function testComplex() {
    z1 = makeComplexFromRealImagine(compl)
}

testComplex()
