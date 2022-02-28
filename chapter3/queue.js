const { listToString, listAppend, listAt, isNumber, isString, isPair, list, head, tail, pair, 
    listIsNull, setTail, setHead, error } 
    = require("../common/environment");

// -------------
// Exercise 3.22, p.235
// -------------
function makeQueue() {
    let frontPtr = null;
    let rearPtr = null;

    function isEmpty() {
        return frontPtr === null;
    }

    function queueFrontPtr() {
        return frontPtr;
    }

    function queueRearPtr(q) {
        return rearPtr;
    }

    function queueFront(q) {
        return head(queueFrontPtr())
    }

    /**
     * insert to the rear of the queue
     * @param {*} item value 
     */
    function queueInsert(item) {
        if (isEmpty()) {
            frontPtr = pair(item, null);
            rearPtr = frontPtr;
        } else {
            setTail(rearPtr, pair(item, null));
            rearPtr = tail(rearPtr);
        }
    }

    /**
     * pop the front of queue
     * @param {*} q queue 
     */
    function queueDelete() {
        if (frontPtr === null) return error("Fail to delete item from queue");
        if (frontPtr === rearPtr) rearPtr = null;
        frontPtr = tail(frontPtr);
    }

    function queueDisplay() {
        return listToString(frontPtr);
    }

    function dispatch(m) {
        if (m === "frontPtr") return queueFrontPtr;
        else if (m === "queueInsert") return queueInsert;
        else if (m === "queueDelete") return queueDelete;
        else if (m === "queueDisplay") return queueDisplay;
    }
    return dispatch;
}

function testQueue() {
    const q1 = makeQueue();

    q1("queueInsert")("a");
    console.log(q1("queueDisplay")());

    q1("queueInsert")("b");
    console.log(q1("queueDisplay")());

    q1("queueDelete")();
    console.log(q1("queueDisplay")());
}

// testQueue();
