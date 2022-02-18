const { listToString, listAppend, listAt, isNumber, isString, isPair, list, head, tail, pair
    , put, get, error} 
    = require("../common/environment");
const { applyGeneric } = require("../common/generic_types")
const { square } = require("../chapter1/number")


function installRectangularPackage() {

    /**
     * constructor for complex number (representation of rectanguler form)
     * @param {*} real real part
     * @param {*} imag  imagine part
     */
    function makeComplexFromRealImagine(real, imag) {
        return pair(real, imag)
    }

    function makeComplexFromMagAngle(mag, angle) {
        return pair(mag * Math.cos(angle), mag * Math.sin(angle))
    }

    function realPart(z) {
        return head(z)
    }

    function imaginePart(z) {
        return tail(z)
    }

    function magnitude(z) {
        return Math.sqrt(square(realPart(z)) + square(imaginePart(z)))
    }

    function angle(z) {
        return Math.atan2(imaginePart(z), realPart(z))
    }

    // interface to the rest of system
    function tag(x) { return attachTag("rectangular", x)}
    put("realPart", list("rectangular"), realPart)
    put("imaginePart", list("rectangular"), imaginePart)
    put("magnitude", list("rectangular"), magnitude)
    put("angle", list("rectangular"), angle)
    put("makeComplexFromRealImagine", list("rectangular"), (x, y) => 
        tag(makeComplexFromRealImagine(x, y)))
    put("makeComplexFromMagAngle", list("rectangular"), (x, y) =>
        tag(makeComplexFromMagAngle(x, y)))

}

function installPolarPackage() {

    /**
     * constructor for complex number
     * @param {*} mag magnitude
     * @param {*} angle  angle
     */
    function makeComplexFromMagAngle(mag, angle) {
        return pair(mag, angle)
    }

    function magnitude(z) {
        return head(z)
    }

    function angle(z) {
        return tail(z)
    }

    function realPart(z) {
        return magnitude(z) * Math.cos(angle(z))
    }

    function imaginePart(z) {
        return magnitude(z) * Math.sin(angle(z))
    }

    function makeComplexFromRealImagine(real, imagine) {
        return pair(Math.sqrt(square(real) + square(imagine)),
            Math.atan2(imagine, real))
    }

    // interface to the rest of system
    function tag(x) { return attachTag("polar", x)}
    put("realPart", list("polar"), realPart)
    put("imaginePart", list("polar"), imaginePart)
    put("magnitude", list("polar"), magnitude)
    put("angle", list("polar"), angle)
    put("makeComplexFromRealImagine", list("polar"), (x, y) =>
        tag(makeComplexFromRealImagine(x, y)))
    put("makeComplexFromMagAngle", list("polar"), (x, y) =>
        tag(makeComplexFromMagAngle(x, y)))
}

function realPart(z) {
    return applyGeneric("realPart", list(z))
}

function imaginePart(z) {
    return applyGeneric("imaginePart", list(z))
}

function magnitude(z) {
    return applyGeneric("magnitude", list(z))
}

function angle(z) {
    return applyGeneric("angle", list(z))
}


installRectangularPackage()
installPolarPackage()

function testComplex() {
    // z1 = makeComplexFromRealImagine(compl)
}

// testComplex()

module.exports = {realPart, imaginePart, magnitude, angle}