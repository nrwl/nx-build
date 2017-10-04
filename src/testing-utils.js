"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var first_1 = require("rxjs/operator/first");
var toArray_1 = require("rxjs/operator/toArray");
var toPromise_1 = require("rxjs/operator/toPromise");
/**
 * @whatItDoes reads all the values from an observable and returns a promise
 * with an array of all values. This should be used in combination with async/await.
 *
 * ## Example
 *
 * ```typescript
 * const obs = of(1, 2, 3, 4);
 * const res = await readAll(obs)
 * expect(res).toEqual([1, 2, 3, 4]);
 * ```
 */
function readAll(o) {
    return toPromise_1.toPromise.call(toArray_1.toArray.call(o));
}
exports.readAll = readAll;
/**
 * @whatItDoes reads the first value from an observable and returns a promise
 * with it. This should be used in combination with async/await.
 *
 * ## Example
 *
 * ```typescript
 * const obs = of(1, 2, 3, 4);
 * const res = await readFirst(obs)
 * expect(res).toEqual(1);
 * ```
 */
function readFirst(o) {
    return toPromise_1.toPromise.call(first_1.first.call(o));
}
exports.readFirst = readFirst;
