
// -------------
// Exercise 1.5
// -------------

function p() {return p();}

function test(x, y) {
    return x === 0 ? 0 : y;
}

let result = test(0, p());
console.log(result);
