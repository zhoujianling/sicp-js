let env = require('../common/environment')

const pair = env.pair;
const tail = env.tail;
const head = env.head;

let line = require('./line_segments')

const makePoint = line.makePoint;
const pointX = line.pointX;
const pointY = line.pointY;
const pointSub = line.pointSub;

// -------------
// Exercise 2.3, p.78
// -------------
function makeRectangle(minPoint, maxPoint) {
    return pair(minPoint, maxPoint);
}

function rectMinPoint(r) {
    return head(r);
}

function rectMaxPoint(r) {
    return tail(r);
}

function rectWidth(r) {
    return pointX(rectMaxPoint(r)) - pointX(rectMinPoint(r));
}

function rectHeight(r) {
    return pointY(rectMaxPoint(r)) - pointY(rectMinPoint(r));
}

// ----------- BARRIER --------------

function rectPerimeter(r) {
    return (rectWidth(r) + rectHeight(r)) * 2.0;
}

function rectArea(r) {
    return rectWidth(r) * rectHeight(r);
}

// ---------------------------------

function testRect() {
    let minPoint = makePoint(1, 2);
    let maxPoint = makePoint(3.5, 8);
    let r = makeRectangle(minPoint, maxPoint);
    console.log(`perimeter: ${rectPerimeter(r)}`);
    console.log(`area: ${rectArea(r)}`);
}

testRect()
