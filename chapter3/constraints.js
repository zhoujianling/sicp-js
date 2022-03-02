const { listToString, listAppend, listMember, listAt, isNumber, isString, isPair, list, head, tail, pair, 
    listIsNull, setTail, setHead, error } 
    = require("../common/environment");


/**
 * 
 * @param {*} exception 
 * @param {*} fun  
 * @param {*} list list of constraints
 * @returns 
 */
function forEachExcept(exception, fun, list) {
    function loop(items) {
        if ((items) === null) {
            return "done";
        } else if (head(items) === exception) {
            return loop(tail(items));
        } else {
            fun(head(items)); 
            return loop(tail(items));
        }
    } 

    return loop(list);
}

function informAboutValue(constraint) { 
    return constraint("I have a value.");
}

function informAboutNoValue(constraint) { 
    return constraint("I lost my value.");
}

function makeConnector() {
    let value = false; 
    let informant = false; 
    let constraints = null; 

    function setMyValue(newval, setter) {
        if (!hasValue(self)) {
            value = newval; 
            informant = setter; 
            return forEachExcept(setter, informAboutValue, constraints);
        } else if (value !== newval) {
            error(list(value, newval), "contradiction");
        } else { 
            return "ignored"; 
        }
    }
    function forgetMyValue(retractor) {
        if (retractor === informant) {
            informant = false; 
            return forEachExcept(retractor, informAboutNoValue, constraints);
        } else { 
            return "ignored"; 
        }
    }
    function connect(constraint) {
        if (null === (listMember(constraint, constraints))) {
            constraints = pair(constraint, constraints);
        } else { 

        } 
        if (hasValue(self)) {
            informAboutValue(constraint);
        } else { 

        } 
        // return "done";
    }
    function self(request) {
        if (request === "hasValue") {
            return informant !== false;
        } else if (request === "getValue") {
            return value;
        } else if (request === "setValue") {
            return setMyValue;
        } else if (request === "forget") {
            return forgetMyValue;
        } else if (request === "connect") {
            return connect;
        } else { 
            error(request, "unknown operation -- connector, " + request); 
        }
    } 
    return self;
}

function hasValue(connector) {
    return connector("hasValue");
}

function getValue(connector) {
    return connector("getValue");
}

function setValue(connector, val, informant) {
    return connector("setValue")(val, informant);
}

function forgetValue(connector, retractor) {
    return connector("forgetValue")(retractor);
}

function connect(connector, constraint) {
    return connector("connect")(constraint);
}

function constant(value, connector) {
    function me(request) {
        error(request, "unknown request -- constant");
    }
    connect(connector, me); 
    setValue(connector, value, me); 
    return me;
}

function adder(a1, a2, sum) { 
    function processNewValue() { 
        if (hasValue(a1) && hasValue(a2)) { 
            setValue(sum, getValue(a1) + getValue(a2), me);
        } else if (hasValue(a1) && hasValue(sum)) { 
            setValue(a2, getValue(sum) - getValue(a1), me);
        } else if (hasValue(a2) && hasValue(sum)) { 
            setValue(a1, getValue(sum) - getValue(a2), me);
        } else {

        } 
    }
    function processForgetValue() { 
        forgetValue(sum, me); 
        forgetValue(a1, me); 
        forgetValue(a2, me); 
        processNewValue();
    }
    function me(request) { 
        if (request === "I have a value.") { 
            processNewValue();
        } else if (request === "I lost my value.") { 
            processForgetValue();
        } else { 
            error(request, "unknown request -- adder"); 
        } 
    }
    
    connect(a1, me); 
    connect(a2, me); 
    connect(sum, me); 
    return me;
}

function multiplier(m1, m2, product) {
    function processNewValue() {
        if ((hasValue(m1) && getValue(m1) === 0) || (hasValue(m2) && getValue(m2) === 0)) {
            setValue(product, 0, me);
        } else if (hasValue(m1) && hasValue(m2)) {
            setValue(product, getValue(m1) * getValue(m2), me);
        } else if (hasValue(product) && hasValue(m1)) {
            setValue(m2, getValue(product) / getValue(m1), me);
        } else if (hasValue(product) && hasValue(m2)) {
            setValue(m1, getValue(product) / getValue(m2), me);
        } else { }
    }
    function processForgetValue() {
        forgetValue(product, me); 
        forgetValue(m1, me); 
        forgetValue(m2, me); 
        processNewValue();
    }
    function me(request) {
        if (request === "I have a value.") {
            processNewValue();
        } else if (request === "I lost my value.") {
            processForgetValue();
        } else { 
            error(request, "unknown request -- multiplier"); 
        }
    }
    connect(m1, me); 
    connect(m2, me); 
    connect(product, me); 
    return me;
}


function celsiusFahrenheitConverter(c, f) { 
    const u = makeConnector(); 
    const v = makeConnector(); 
    const w = makeConnector(); 
    const x = makeConnector(); 
    const y = makeConnector(); 
    multiplier(c, w, u); 
    multiplier(v, x, u); 
    adder(v, y, f); 
    constant(9, w); 
    constant(5, x); 
    constant(32, y); 
    // return "ok";
}

function testConstraints() {
    const C = makeConnector(); 
    const F = makeConnector();
    celsiusFahrenheitConverter(C, F);

    setValue(C, 25, "user");
    const fval = getValue(F); // expects 77
    console.log(fval);
}

// testConstraints();

// -------------
// Exercise 3.33, p.261
// -------------
function averager(m1, m2, average) {
    function processNewValue() {
        if (hasValue(m1) && hasValue(m2)) {
            setValue(average, (getValue(m1) + getValue(m2)) * 0.5, me);
        } else if (hasValue(average) && hasValue(m1)) {
            setValue(m2, getValue(average) * 2 - getValue(m1), me);
        } else if (hasValue(average) && hasValue(m2)) {
            setValue(m1, getValue(average) * 2 - getValue(m2), me);
        } else { }
    }
    function processForgetValue() {
        forgetValue(product, me); 
        forgetValue(m1, me); 
        forgetValue(m2, me); 
        processNewValue();
    }
    function me(request) {
        if (request === "I have a value.") {
            processNewValue();
        } else if (request === "I lost my value.") {
            processForgetValue();
        } else { 
            error(request, "unknown request -- multiplier"); 
        }
    }
    connect(m1, me); 
    connect(m2, me); 
    connect(average, me); 
    return me;
}

function testAverager() {
    // (a + (b + c) / 2) = d * 2
    const a = makeConnector(); 
    const b = makeConnector(); 
    const c = makeConnector(); 
    const d = makeConnector(); 
    const u = makeConnector(); 
    averager(b, c, u); 
    averager(a, u, d); 
    constant(2, b); 
    constant(10, c); 
    // constant(18, a); 

    setValue(a, 18, "user");
    const dval = getValue(d); // expects 12
    console.log(dval);
}

// testAverager()

// -------------
// Exercise 3.34, p.261
// -------------
// a * a = b
function squarer(a, b) {
    function processNewValue() {
        if (hasValue(b)) {
            if (getValue(b) < 0) {
                error(getValue(b), "square less then 0");
            } else {
                setValue(a, Math.sqrt(getValue(b)), me);
            }
        } else if (hasValue(a)) {
            setValue(b, getValue(a) * getValue(a), me);
        } else {}
    }
    function processForgetValue() {
        forgetValue(a, me); 
        forgetValue(b, me); 
        processNewValue();
    }
    function me(request) {
        if (request === "I have a value.") {
            processNewValue();
        } else if (request === "I lost my value.") {
            processForgetValue();
        } else { 
            error(request, "unknown request -- multiplier"); 
        }
    }
    connect(a, me); 
    connect(b, me); 
    return me;
}

function testSquarer() {
    // (a * a + (b + c) / 2) = d 
    const a = makeConnector(); 
    const b = makeConnector(); 
    const c = makeConnector(); 
    const d = makeConnector(); 
    const u = makeConnector(); 
    const w = makeConnector(); 
    averager(b, c, u); 
    squarer(a, w); 
    adder(w, u, d); 
    constant(2, b); 
    constant(10, c); 
    // constant(18, a); 

    setValue(a, 3, "user");
    const dval = getValue(d); // expects 9
    console.log(dval);

}

// testSquarer()
