import { Observable } from 'rxjs/Observable';
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
export declare function readAll<T>(o: Observable<T>): Promise<T[]>;
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
export declare function readFirst<T>(o: Observable<T>): Promise<T>;
