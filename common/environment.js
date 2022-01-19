
function pair(head, tail) {
    return {head, tail};
}

function head(p) {
    return p.head;
}

function tail(p) {
    return p.tail;
}

// -------------
// Exercise 2.4, p.80
// -------------
// function pair(x, y) {
//     return m => m(x, y);
// }

// function head(p) {
//     return p((x, y) => x);
// }

// function tail(p) {
//     return p((x, y) => y);
// }

function list(... args) {
    return args.length === 0 ? null :
        pair(args[0], list(... args.slice(1)))
}

function testEnv() {
    console.log(pair(1, 2));
    console.log(list(1, 2, 3));
    // console.log(list());
}

module.exports = {pair, head, tail};

// testEnv()