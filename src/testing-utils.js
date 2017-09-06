"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var first_1 = require("rxjs/operator/first");
var toArray_1 = require("rxjs/operator/toArray");
var toPromise_1 = require("rxjs/operator/toPromise");
function readAll(o) {
    return toPromise_1.toPromise.call(toArray_1.toArray.call(o));
}
exports.readAll = readAll;
function readFirst(o) {
    return toPromise_1.toPromise.call(first_1.first.call(o));
}
exports.readFirst = readFirst;
