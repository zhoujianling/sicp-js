const { listToString, listAppend, listAt, isNumber, isString, isPair, list, head, tail, pair
    , put, get, error} 
    = require("../common/environment");
const { applyGeneric, attachTag } = require("../common/generic_types")
const { square, gcd } = require("../chapter1/number");
const { realPart, imaginePart, magnitude, angle } = require("./complex_number");

// ===============================
// javascript number arithmetic
// ===============================
function installJavascriptNumberPackage() {
    const typeName = "javascriptNumber"
    const tag = x => attachTag(typeName, x)
    put("add", list(typeName, typeName), (x, y) => tag(x + y))
    put("sub", list(typeName, typeName), (x, y) => tag(x - y))
    put("mul", list(typeName, typeName), (x, y) => tag(x * y))
    put("div", list(typeName, typeName), (x, y) => tag(x / y))
    put("make", list(typeName), x => tag(x))
}

function makeJavascriptNumber(n) {
    return get("make", "javascriptNumber")(n)
}

// ===============================
// rational number arithmetic
// ===============================
function installRationalPackage() {
    function number(x) { return head(x); }
    function denom(x) { return tail(x); }

    function makeRational(n, d) {
        const g = gcd(n, d);
        return pair(n / g, d / g);
    }

    function addRat(x, y) {
        return makeRational(number(x) * denom(y) + number(y) * denom(x),
            denom(x) * denom(y));
    }

    function subRat(x, y) {
        return makeRational(number(x) * denom(y) - number(y) * denom(x),
            denom(x) * denom(y));
    }

    function mulRat(x, y) {
        return makeRational(number(x) * number(y), denom(x) * denom(y))
    }

    function divRat(x, y) {
        return makeRational(number(x) * denom(y), denom(x) * number(y))
    }

    // interfaces
    function tag(x) { return attachTag("rational", x); }
    const typeName = "rational";
    put("add", list(typeName, typeName), (x, y) => tag(addRat(x, y)));
    put("sub", list(typeName, typeName), (x, y) => tag(subRat(x, y)));
    put("mul", list(typeName, typeName), (x, y) => tag(mulRat(x, y)));
    put("div", list(typeName, typeName), (x, y) => tag(divRat(x, y)));
    put("make", typeName, (n, d) => tag(makeRational(n, d)))
}

function makeRational(n, d) {
    return get("make", "rational")(n, d)
}

// ===============================
// complex number package
// ===============================

function installComplexPackage() {
    // installRectangularPackage()
    // installPolarPackage()

    function makeComplexFromRealImagine(x, y) {
        return get("makeComplexFromRealImagine", "rectangular")(x, y)
    }

    function makeComplexFromMagAngle(m, a) {
        return get("makeComplexFromMagAngle", "polar")(m, a)
    }

    // internal functions
    function complexAdd(z1, z2) {
        return makeComplexFromRealImagine(realPart(z1) + realPart(z2),
            imaginePart(z1) + imaginePart(z2));
    }

    function complexSub(z1, z2) {
        return makeComplexFromRealImagine(realPart(z1) - realPart(z2),
            imaginePart(z1) - imaginePart(z2));
    }

    function complexMul(z1, z2) {
        return makeComplexFromMagAngle(magnitude(z1) * magnitude(z2),
            angle(z1) + angle(z2));
    }

    function complexDiv(z1, z2) {
        return makeComplexFromMagAngle(magnitude(z1) / magnitude(z2),
            angle(z1) - angle(z2));
    }

    // interfaces 
    function tag(x) { return attachTag("complex", z); }
    put("add", list("complex", "complex"), (z1, z2) => tag(complexAdd(z1, z2)));
    put("sub", list("complex", "complex"), (z1, z2) => tag(complexSub(z1, z2)));
}

// ===============================
// generic operations
// ===============================
function add(x, y) {
    return applyGeneric("add", list(x, y))
}

function sub(x, y) {
    return applyGeneric("sub", list(x, y))
}

function mul(x, y) {
    return applyGeneric("mul", list(x, y))
}

function div(x, y) {
    return applyGeneric("div", list(x, y))
}
