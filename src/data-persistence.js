"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var effects_1 = require("@ngrx/effects");
var router_store_1 = require("@ngrx/router-store");
var store_1 = require("@ngrx/store");
var of_1 = require("rxjs/observable/of");
var catch_1 = require("rxjs/operator/catch");
var concatMap_1 = require("rxjs/operator/concatMap");
var filter_1 = require("rxjs/operator/filter");
var map_1 = require("rxjs/operator/map");
var switchMap_1 = require("rxjs/operator/switchMap");
var withLatestFrom_1 = require("rxjs/operator/withLatestFrom");
/**
 * Provides convenience methods for implementing common NgRx/Router workflows
 *
 * * `navigation` handles fetching data when handling router navigation.
 * * `pessimisticUpdate` handles updating the server before or after the client has been updated.
 */
var DataPersistence = (function () {
    function DataPersistence(store, actions) {
        this.store = store;
        this.actions = actions;
    }
    /**
     *
     * Handles pessimistic updates (updating the server first).
     *
     * Example:
     *
     * ```
     * @Injectable()
     * class TodoEffects {
     *   @Effect() updateTodo = this.s.pessimisticUpdate('UPDATE_TODO', {
     *     // provides an action and the current state of the store
     *     run(a: UpdateTodo, state: TodosState) {
     *       // update the backend first, and then dispatch an action that will
     *       // update the client side
     *       return this.backend(state.user, a.payload).map(updated => ({
     *         type: 'TODO_UPDATED',
     *         payload: updated
     *       }));
     *     },
     *
     *     onError(a: UpdateTodo, e: any) {
     *       // we don't need to undo the changes on the client side.
     *       // we can dispatch an error, or simply log the error here and return `null`
     *       return null;
     *     }
     *   });
     *
     *   constructor(private s: DataPersistence<TodosState>, private backend: Backend) {}
     * }
     * ```
     *
     */
    DataPersistence.prototype.pessimisticUpdate = function (actionType, opts) {
        var nav = this.actions.ofType(actionType);
        var pairs = withLatestFrom_1.withLatestFrom.call(nav, this.store);
        return concatMap_1.concatMap.call(pairs, this.runWithErrorHandling(opts.run, opts.onError));
    };
    /**
     *
     * Handles optimistic updates (updating the client first).
     *
     * Example:
     *
     * ```
     * @Injectable()
     * class TodoEffects {
     *   @Effect() updateTodo = this.s.optimisticUpdate('UPDATE_TODO', {
     *     // provides an action and the current state of the store
     *     run(a: UpdateTodo, state: TodosState) {
     *       return this.backend(state.user, a.payload);
     *     },
     *
     *     undoAction(a: UpdateTodo, e: any): Action {
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
    DataPersistence.prototype.optimisticUpdate = function (actionType, opts) {
        var nav = this.actions.ofType(actionType);
        var pairs = withLatestFrom_1.withLatestFrom.call(nav, this.store);
        return concatMap_1.concatMap.call(pairs, this.runWithErrorHandling(opts.run, opts.undoAction));
    };
    /**
     *
     * Handles data fetching.
     *
     * Example:
     *
     * ```
     * @Injectable()
     * class TodoEffects {
     *   @Effect() loadTodo = this.s.fetch('GET_TODOS', {
     *     // provides an action and the current state of the store
     *     run(a: GetTodos, state: TodosState) {
     *       return this.backend(state.user, a.payload).map(r => ({
     *         type: 'TODOS',
     *         payload: r
     *       });
     *     },
     *
     *     onError(a: GetTodos, e: any): Action {
     *       // dispatch an undo action to undo the changes in the client state
     *       // return null;
     *     }
     *   });
     *
     *   constructor(private s: DataPersistence<TodosState>, private backend: Backend) {}
     * }
     * ```
     */
    DataPersistence.prototype.fetch = function (actionType, opts) {
        var nav = this.actions.ofType(actionType);
        var pairs = withLatestFrom_1.withLatestFrom.call(nav, this.store);
        return switchMap_1.switchMap.call(pairs, this.runWithErrorHandling(opts.run, opts.onError));
    };
    /**
     * Handles ROUTER_NAVIGATION event.
     *
     * This is useful for loading extra data needed for a router navigation.
     *
     * Example:
     * ```
     * @Injectable()
     * class TodoEffects {
     *   @Effect() loadTodo = this.s.navigation(TodoComponent, {
     *     run: (a: ActivatedRouteSnapshot, state: TodosState) => {
     *       return this.backend.fetchTodo(a.params['id']).map(todo => ({
     *         type: 'TODO_LOADED',
     *         payload: todo
     *       }));
     *     },
     *     onError: (a: ActivatedRouteSnapshot, e: any) => {
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
    DataPersistence.prototype.navigation = function (component, opts) {
        var nav = filter_1.filter.call(map_1.map.call(this.actions.ofType(router_store_1.ROUTER_NAVIGATION), function (a) { return findSnapshot(component, a.payload.routerState.root); }), function (s) { return !!s; });
        var pairs = withLatestFrom_1.withLatestFrom.call(nav, this.store);
        return switchMap_1.switchMap.call(pairs, this.runWithErrorHandling(opts.run, opts.onError));
    };
    DataPersistence.prototype.runWithErrorHandling = function (run, onError) {
        return function (a) {
            try {
                var r = wrapIntoObservable(run(a[0], a[1]));
                return catch_1._catch.call(r, function (e) { return wrapIntoObservable(onError(a[0], e)); });
            }
            catch (e) {
                return wrapIntoObservable(onError(a[0], e));
            }
        };
    };
    DataPersistence = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [store_1.Store, effects_1.Actions])
    ], DataPersistence);
    return DataPersistence;
}());
exports.DataPersistence = DataPersistence;
function findSnapshot(component, s) {
    if (s.routeConfig && s.routeConfig.component === component) {
        return s;
    }
    for (var _i = 0, _a = s.children; _i < _a.length; _i++) {
        var c = _a[_i];
        var ss = findSnapshot(component, c);
        if (ss) {
            return ss;
        }
    }
    return null;
}
function wrapIntoObservable(obj) {
    if (!!obj && typeof obj.subscribe === 'function') {
        return obj;
    }
    else if (!obj) {
        return of_1.of();
    }
    else {
        return of_1.of(obj);
    }
}
