const {put, get, pair, head, tail, isPair, error,
    list, listMap, listAt, listToJavascriptArray, isNumber} = require("../common/environment")

// -------------
// Exercise 3.1, p.196
// -------------
function makeAccumulator(initial) {
    function doAccum(accum) {
        initial += accum
        return initial
    }
    return doAccum;
}

function testAccumulator() {
    const a = makeAccumulator(5)
    console.log(a(10))
    console.log(a(10))
}

// testAccumulator()

// -------------
// Exercise 3.2, p.196
// -------------
function makeMonitored(fn) {
    let callCount = 0
    function fn2(...args) {
        if (args[0] === "how many calls") return callCount
        if (args[1] === "reset count") {
            callCount = 0
            return
        }
        callCount = callCount + 1
        return fn(...args)
    }
    return fn2
}

function testMonitored() {
    const s = makeMonitored(Math.sqrt)
    console.log(s(100))
    console.log(s("how many calls"))
}

// testMonitored()

// -------------
// Exercise 3.3, p.196
// -------------
function makeAccount(balance, password, timesLimit) {
    let localLimit = 0

    function withdraw(amount) {
        if (balance >= amount) {
            balance = balance - amount;
            return balance;
        } else {
            return "Insufficient funds";
        }
    }

    function deposit(amount) {
        balance = balance + amount;
        return balance;
    }

    // -------------
    // Exercise 3.4, p.197
    // -------------
    function callTheCops() {
        console.log("oops, call cops")
    }

    function dispatch(inputPassword, m) {
        if (password !== inputPassword) {
            localLimit += 1;
            if (localLimit >= timesLimit) {
                callTheCops();
            }
            return () => "Incorrect password";
        } 
        localLimit = 0
        return m === "withdraw" ? withdraw :
            m === "deposit" ? deposit :
            error("unknown request");
    }
    return dispatch;
}

function testAccount() {
    const acc = makeAccount(100, "12345");
    console.log(acc("12345", "withdraw")(40));
    console.log(acc("123456", "deposit")(40));
}

// testAccount()
