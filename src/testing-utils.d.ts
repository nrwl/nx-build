import { Observable } from 'rxjs/Observable';
export declare function readAll<T>(o: Observable<T>): Promise<T[]>;
export declare function readFirst<T>(o: Observable<T>): Promise<T>;
