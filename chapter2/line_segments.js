let env = require('../common/environment')

const pair = env.pair;
const tail = env.tail;
const head = env.head;

// -------------
// Exercise 2.2, p.77
// -------------
function makePoint(x, y) {
    return pair(x, y);
}

function pointX(p) {
    return head(p);
}

function pointY(p) {
    return tail(p);
}

function pointSub(p1, p2) {
    return makePoint(
        pointX(p1) - pointX(p2),
        pointY(p1) - pointY(p2));
}

function pointToString(p) {
    return `(${pointX(p)},${pointY(p)});`;
}

function midCoordinate(x1, x2) {
    return (x1 + x2) / 2.0;
}

function makeSegment(start, end) {
    return pair(start, end);
}

function startPoint(seg) {
    return head(seg);
}

function endPoint(seg) {
    return tail(seg);
}

function midPoint(seg) {
    return makePoint(
            midCoordinate(pointX(startPoint(seg)), pointX(endPoint(seg))),
            midCoordinate(pointY(startPoint(seg)), pointY(endPoint(seg)))
        );
}

function testSegment() {
    p1 = makePoint(0, 0);
    p2 = makePoint(2, 3);
    seg = makeSegment(p1, p2);
    console.log(pointToString(midPoint(seg)));
}

// testSegment();

module.exports = {
    makePoint, pointX, pointY, midPoint, pointSub
};