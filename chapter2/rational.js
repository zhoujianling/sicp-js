let env = require('../common/environment')

const pair = env.pair;
const tail = env.tail;
const head = env.head;
// console.log(env.pair(1, 2))

// -------------------------
// constructor for rational
function makeRational(num, denom) {
    return pair(num, denom);
}

// selector for rational
function numerator(r) {
    return head(r);
}

// selector for rational
function denominator(r) {
    return tail(r);
}
// -------------------------

function addRational(a, b) {
    return makeRational(numerator(a) * denominator(b) + numerator(b) * denominator(a), 
        denominator(a) * denominator(b));
}

function subRational(a, b) {
    return makeRational(numerator(a) * denominator(b) - numerator(b) * denominator(a),
        denominator(a) * denominator(b));
}

function mulRational(a, b) {
    return makeRational(numerator(a) * numerator(b),
        denominator(a) * denominator(b));
}

function divRational(a, b) {
    return makeRational(numerator(a) * denominator(b),
        denominator(a) * numerator(b));
}

function equalRational(a, b) {
    return numerator(a) === numerator(b) && denominator(a) === denominator(b);
}

function testRational() {

}

