

// -------------
// Exercise 2.6
// -------------

const zero = f => x => x; 
const one = f => x => f(x);
const two = f => x => f(f(x));

function addOne(n) {
	return f => x => f(n(f)(x));
}

function add(a, b) {
    return f => x => b(a(f))(x);
}

const two0 = add(one, one);