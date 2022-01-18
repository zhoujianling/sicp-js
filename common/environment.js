
// function pair(head, tail) {
//     return {head, tail};
// }

// function head(p) {
//     return p.head;
// }

// function tail(p) {
//     return p.tail;
// }

// -------------
// Exercise 2.4, p.80
// -------------
function pair(x, y) {
    return m => m(x, y);
}

function head(p) {
    return p((x, y) => x);
}

function tail(p) {
    return p((x, y) => y);
}

module.exports = {pair, head, tail};
// console.log(pair(1, 2));