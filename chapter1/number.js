const { isPair } = require("../common/environment");


// ====================================
function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b)
}

function square(a) {
    return a * a
}

function divides(a, b) {
    return b % a === 0;
}

function findDivisor(n, testDivisor) {
    return square(testDivisor) > n ? n :
        divides(testDivisor, n) ? testDivisor : 
        findDivisor(n, testDivisor + 1)
}

function smallestDivisor(n) {
    return findDivisor(n, 2)
}

function isPrime(n) {
    return n === smallestDivisor(n);
}

function numberEqual(exp, num) {
    return isNumber(exp) && exp === num
}

function testNumbers() {
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].forEach(n => 
        console.log(`${n} is ${isPrime(n) ? "" : "not"} prime`))
}

// testNumbers()

module.exports = { gcd, isPrime, square, numberEqual }