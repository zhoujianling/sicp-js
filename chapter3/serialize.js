const { listToString, listAppend, listMember, listAt, isNumber, isString, isPair, list, head, tail, pair, 
    listIsNull, setTail, setHead, error } 
    = require("../common/environment");


function testAndSet(cell) { 
    if (head(cell)) { 
        return true;
    } else {
        setHead(cell, true); 
        return false;
    }
}

