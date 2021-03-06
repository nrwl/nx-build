import { Type } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
/**
 * See {@link DataPersistence.pessimisticUpdate} for more information.
 */
export interface PessimisticUpdateOpts<T, A> {
    run(a: A, state?: T): Observable<Action> | Action | void;
    onError(a: A, e: any): Observable<any> | any;
}
/**
 * See {@link DataPersistence.pessimisticUpdate} for more information.
 */
export interface OptimisticUpdateOpts<T, A> {
    run(a: A, state?: T): Observable<Action> | Action | void;
    undoAction(a: A, e: any): Observable<Action> | Action;
}
/**
 * See {@link DataPersistence.navigation} for more information.
 */
export interface FetchOpts<T, A> {
    id?(a: A, state?: T): any;
    run(a: A, state?: T): Observable<Action> | Action | void;
    onError?(a: A, e: any): Observable<any> | any;
}
/**
 * See {@link DataPersistence.navigation} for more information.
 */
export interface HandleNavigationOpts<T> {
    run(a: ActivatedRouteSnapshot, state?: T): Observable<Action> | Action | void;
    onError?(a: ActivatedRouteSnapshot, e: any): Observable<any> | any;
}
/**
 * @whatItDoes Provides convenience methods for implementing common operations of persisting data.
 */
export declare class DataPersistence<T> {
    store: Store<T>;
    actions: Actions;
    constructor(store: Store<T>, actions: Actions);
    /**
     *
     * @whatItDoes Handles pessimistic updates (updating the server first).
     *
     * Update the server implemented naively suffers from race conditions and poor error handling.
     *
     * `pessimisticUpdate` addresses these problems--it runs all fetches in order, which removes race conditions
     * and forces the developer to handle errors.
     *
     * ## Example:
     *
     * ```typescript
     * @Injectable()
     * class TodoEffects {
     *   @Effect() updateTodo = this.s.pessimisticUpdate<UpdateTodo>('UPDATE_TODO', {
     *     // provides an action and the current state of the store
     *     run(a, state) {
     *       // update the backend first, and then dispatch an action that will
     *       // update the client side
     *       return this.backend(state.user, a.payload).map(updated => ({
     *         type: 'TODO_UPDATED',
     *         payload: updated
     *       }));
     *     },
     *
     *     onError(a, e: any) {
     *       // we don't need to undo the changes on the client side.
     *       // we can dispatch an error, or simply log the error here and return `null`
     *       return null;
     *     }
     *   });
     *
     *   constructor(private s: DataPersistence<TodosState>, private backend: Backend) {}
     * }
     * ```
     */
    pessimisticUpdate<A = Action>(actionType: string, opts: PessimisticUpdateOpts<T, A>): Observable<any>;
    /**
     *
     * @whatItDoes Handles optimistic updates (updating the client first).
     *
     * `optimisticUpdate` addresses these problems--it runs all fetches in order, which removes race conditions
     * and forces the developer to handle errors.
     *
     * `optimisticUpdate` is different from `pessimisticUpdate`. In case of a failure, when using `optimisticUpdate`,
     * the developer already updated the state locally, so the developer must provide an undo action.
     *
     * The error handling must be done in the callback, or by means of the undo action.
     *
     * ## Example:
     *
     * ```typescript
     * @Injectable()
     * class TodoEffects {
     *   @Effect() updateTodo = this.s.optimisticUpdate<UpdateTodo>('UPDATE_TODO', {
     *     // provides an action and the current state of the store
     *     run: (a, state) => {
     *       return this.backend(state.user, a.payload);
     *     },
     *
     *     undoAction: (a, e: any) => {
     *       // dispatch an undo action to undo the changes in the client state
     *       return ({
     *         type: 'UNDO_UPDATE_TODO',
     *         payload: a
     *       });
     *     }
     *   });
     *
     *   constructor(private s: DataPersistence<TodosState>, private backend: Backend) {}
     * }
     * ```
     */
    optimisticUpdate<A = Action>(actionType: string, opts: OptimisticUpdateOpts<T, A>): Observable<any>;
    /**
     *
     * @whatItDoes Handles data fetching.
     *
     * Data fetching implemented naively suffers from race conditions and poor error handling.
     *
     * `fetch` addresses these problems--it runs all fetches in order, which removes race conditions
     * and forces the developer to handle errors.
     *
     * ## Example:
     *
     * ```typescript
     * @Injectable()
     * class TodoEffects {
     *   @Effect() loadTodos = this.s.fetch<GetTodos>('GET_TODOS', {
     *     // provides an action and the current state of the store
     *     run: (a, state) => {
     *       return this.backend(state.user, a.payload).map(r => ({
     *         type: 'TODOS',
     *         payload: r
     *       });
     *     },
     *
     *     onError: (a, e: any) => {
     *       // dispatch an undo action to undo the changes in the client state
     *     }
     *   });
     *
     *   constructor(private s: DataPersistence<TodosState>, private backend: Backend) {}
     * }
     * ```
     *
     * This is correct, but because it set the concurrency to 1, it may not be performant.
     *
     * To fix that, you can provide the `id` function, li ke this:
     *
     * ```typescript
     * @Injectable()
     * class TodoEffects {
     *   @Effect() loadTodo = this.s.fetch<GetTodo>('GET_TODO', {
     *     id: (a, state) => {
     *       return a.payload.id;
     *     }
     *
     *     // provides an action and the current state of the store
     *     run: (a, state) => {
     *       return this.backend(state.user, a.payload).map(r => ({
     *         type: 'TODO',
     *         payload: r
     *       });
     *     },
     *
     *     onError: (a, e: any) => {
     *       // dispatch an undo action to undo the changes in the client state
     *       return null;
     *     }
     *   });
     *
     *   constructor(private s: DataPersistence<TodosState>, private backend: Backend) {}
     * }
     * ```
     *
     * With this setup, the requests for Todo 1 will run concurrently with the requests for Todo 2.
     *
     * In addition, if DataPersistence notices that there are multiple requests for Todo 1 scheduled,
     * it will only run the last one.
     */
    fetch<A = Action>(actionType: string, opts: FetchOpts<T, A>): Observable<any>;
    /**
     * @whatItDoes Handles data fetching as part of router navigation.
     *
     * Data fetching implemented naively suffers from race conditions and poor error handling.
     *
     * `navigation` addresses these problems.
     *
     * It checks if an activated router state contains the passed in component type, and, if it does, runs the `run`
     * callback. It provides the activated snapshot associated with the component and the current state. And it only runs
     * the last request.
     *
     * ## Example:
     *
     * ```typescript
     * @Injectable()
     * class TodoEffects {
     *   @Effect() loadTodo = this.s.navigation(TodoComponent, {
     *     run: (a, state) => {
     *       return this.backend.fetchTodo(a.params['id']).map(todo => ({
     *         type: 'TODO_LOADED',
     *         payload: todo
     *       }));
     *     },
     *     onError: (a, e: any) => {
     *       // we can log and error here and return null
     *       // we can also navigate back
     *       return null;
     *     }
     *   });
     *   constructor(private s: DataPersistence<TodosState>, private backend: Backend) {}
     * }
     * ```
     *
     */
    navigation(component: Type<any>, opts: HandleNavigationOpts<T>): Observable<any>;
    private runWithErrorHandling(run, onError);
}
