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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/operator/delay");
var core_1 = require("@angular/core");
var testing_1 = require("@angular/core/testing");
var router_1 = require("@angular/router");
var testing_2 = require("@angular/router/testing");
var effects_1 = require("@ngrx/effects");
var testing_3 = require("@ngrx/effects/testing");
var router_store_1 = require("@ngrx/router-store");
var store_1 = require("@ngrx/store");
var of_1 = require("rxjs/observable/of");
var throw_1 = require("rxjs/observable/throw");
var Subject_1 = require("rxjs/Subject");
var index_1 = require("../index");
var nx_module_1 = require("../src/nx.module");
var testing_4 = require("../testing");
// reducers
function todosReducer(state, action) {
    if (action.type === 'TODO_LOADED') {
        return { selected: action.payload };
    }
    else {
        return state;
    }
}
function userReducer(state, action) {
    return 'bob';
}
var RootCmp = /** @class */ (function () {
    function RootCmp() {
    }
    RootCmp = __decorate([
        core_1.Component({ template: "ROOT[<router-outlet></router-outlet>]" })
    ], RootCmp);
    return RootCmp;
}());
var TodoComponent = /** @class */ (function () {
    function TodoComponent(store) {
        this.store = store;
        this.todo = this.store.select('todos', 'selected');
    }
    TodoComponent = __decorate([
        core_1.Component({
            template: "\n      Todo [\n        <div *ngIf=\"(todo|async) as t\">\n           ID {{t.id}}\n           User {{t.user}}\n        </div>\n      ]\n    "
        }),
        __metadata("design:paramtypes", [store_1.Store])
    ], TodoComponent);
    return TodoComponent;
}());
describe('DataPersistence', function () {
    describe('navigation', function () {
        beforeEach(function () {
            testing_1.TestBed.configureTestingModule({
                declarations: [RootCmp, TodoComponent],
                imports: [
                    store_1.StoreModule.forRoot({ todos: todosReducer, user: userReducer }),
                    router_store_1.StoreRouterConnectingModule,
                    testing_2.RouterTestingModule.withRoutes([{ path: 'todo/:id', component: TodoComponent }]),
                    nx_module_1.NxModule.forRoot()
                ]
            });
        });
        describe('successful navigation', function () {
            var TodoEffects = /** @class */ (function () {
                function TodoEffects(s) {
                    this.s = s;
                    this.loadTodo = this.s.navigation(TodoComponent, {
                        run: function (a, state) {
                            return {
                                type: 'TODO_LOADED',
                                payload: { id: a.params['id'], user: state.user }
                            };
                        },
                        onError: function () { return null; }
                    });
                }
                __decorate([
                    effects_1.Effect(),
                    __metadata("design:type", Object)
                ], TodoEffects.prototype, "loadTodo", void 0);
                TodoEffects = __decorate([
                    core_1.Injectable(),
                    __metadata("design:paramtypes", [index_1.DataPersistence])
                ], TodoEffects);
                return TodoEffects;
            }());
            beforeEach(function () {
                testing_1.TestBed.configureTestingModule({
                    providers: [TodoEffects],
                    imports: [effects_1.EffectsModule.forRoot([TodoEffects])]
                });
            });
            it('should work', testing_1.fakeAsync(function () {
                var root = testing_1.TestBed.createComponent(RootCmp);
                var router = testing_1.TestBed.get(router_1.Router);
                router.navigateByUrl('/todo/123');
                testing_1.tick(0);
                root.detectChanges(false);
                expect(root.elementRef.nativeElement.innerHTML).toContain('ID 123');
                expect(root.elementRef.nativeElement.innerHTML).toContain('User bob');
            }));
        });
        describe('`run` throwing an error', function () {
            var TodoEffects = /** @class */ (function () {
                function TodoEffects(s) {
                    this.s = s;
                    this.loadTodo = this.s.navigation(TodoComponent, {
                        run: function (a, state) {
                            if (a.params['id'] === '123') {
                                throw new Error('boom');
                            }
                            else {
                                return {
                                    type: 'TODO_LOADED',
                                    payload: { id: a.params['id'], user: state.user }
                                };
                            }
                        },
                        onError: function (a, e) { return ({ type: 'ERROR', payload: { error: e } }); }
                    });
                }
                __decorate([
                    effects_1.Effect(),
                    __metadata("design:type", Object)
                ], TodoEffects.prototype, "loadTodo", void 0);
                TodoEffects = __decorate([
                    core_1.Injectable(),
                    __metadata("design:paramtypes", [index_1.DataPersistence])
                ], TodoEffects);
                return TodoEffects;
            }());
            beforeEach(function () {
                testing_1.TestBed.configureTestingModule({
                    providers: [TodoEffects],
                    imports: [effects_1.EffectsModule.forRoot([TodoEffects])]
                });
            });
            it('should work', testing_1.fakeAsync(function () {
                var root = testing_1.TestBed.createComponent(RootCmp);
                var router = testing_1.TestBed.get(router_1.Router);
                var action;
                testing_1.TestBed.get(effects_1.Actions).subscribe(function (a) { return (action = a); });
                router.navigateByUrl('/todo/123');
                testing_1.tick(0);
                root.detectChanges(false);
                expect(root.elementRef.nativeElement.innerHTML).not.toContain('ID 123');
                expect(action.type).toEqual('ERROR');
                expect(action.payload.error.message).toEqual('boom');
                // can recover after an error
                router.navigateByUrl('/todo/456');
                testing_1.tick(0);
                root.detectChanges(false);
                expect(root.elementRef.nativeElement.innerHTML).toContain('ID 456');
            }));
        });
        describe('`run` returning an error observable', function () {
            var TodoEffects = /** @class */ (function () {
                function TodoEffects(s) {
                    this.s = s;
                    this.loadTodo = this.s.navigation(TodoComponent, {
                        run: function (a, state) {
                            if (a.params['id'] === '123') {
                                return throw_1._throw('boom');
                            }
                            else {
                                return {
                                    type: 'TODO_LOADED',
                                    payload: { id: a.params['id'], user: state.user }
                                };
                            }
                        },
                        onError: function (a, e) { return ({ type: 'ERROR', payload: { error: e } }); }
                    });
                }
                __decorate([
                    effects_1.Effect(),
                    __metadata("design:type", Object)
                ], TodoEffects.prototype, "loadTodo", void 0);
                TodoEffects = __decorate([
                    core_1.Injectable(),
                    __metadata("design:paramtypes", [index_1.DataPersistence])
                ], TodoEffects);
                return TodoEffects;
            }());
            beforeEach(function () {
                testing_1.TestBed.configureTestingModule({
                    providers: [TodoEffects],
                    imports: [effects_1.EffectsModule.forRoot([TodoEffects])]
                });
            });
            it('should work', testing_1.fakeAsync(function () {
                var root = testing_1.TestBed.createComponent(RootCmp);
                var router = testing_1.TestBed.get(router_1.Router);
                var action;
                testing_1.TestBed.get(effects_1.Actions).subscribe(function (a) { return (action = a); });
                router.navigateByUrl('/todo/123');
                testing_1.tick(0);
                root.detectChanges(false);
                expect(root.elementRef.nativeElement.innerHTML).not.toContain('ID 123');
                expect(action.type).toEqual('ERROR');
                expect(action.payload.error).toEqual('boom');
                router.navigateByUrl('/todo/456');
                testing_1.tick(0);
                root.detectChanges(false);
                expect(root.elementRef.nativeElement.innerHTML).toContain('ID 456');
            }));
        });
    });
    describe('fetch', function () {
        beforeEach(function () {
            testing_1.TestBed.configureTestingModule({ providers: [index_1.DataPersistence] });
        });
        describe('no id', function () {
            var TodoEffects = /** @class */ (function () {
                function TodoEffects(s) {
                    this.s = s;
                    this.loadTodos = this.s.fetch('GET_TODOS', {
                        run: function (a, state) {
                            // we need to introduce the delay to "enable" switchMap
                            return of_1.of({
                                type: 'TODOS',
                                payload: { user: state.user, todos: 'some todos' }
                            }).delay(1);
                        },
                        onError: function (a, e) { return null; }
                    });
                }
                __decorate([
                    effects_1.Effect(),
                    __metadata("design:type", Object)
                ], TodoEffects.prototype, "loadTodos", void 0);
                TodoEffects = __decorate([
                    core_1.Injectable(),
                    __metadata("design:paramtypes", [index_1.DataPersistence])
                ], TodoEffects);
                return TodoEffects;
            }());
            function userReducer() {
                return 'bob';
            }
            var actions;
            beforeEach(function () {
                actions = new Subject_1.Subject();
                testing_1.TestBed.configureTestingModule({
                    providers: [TodoEffects, testing_3.provideMockActions(function () { return actions; })],
                    imports: [store_1.StoreModule.forRoot({ user: userReducer })]
                });
            });
            it('should work', function (done) { return __awaiter(_this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            actions = of_1.of({ type: 'GET_TODOS', payload: {} }, { type: 'GET_TODOS', payload: {} });
                            _a = expect;
                            return [4 /*yield*/, testing_4.readAll(testing_1.TestBed.get(TodoEffects).loadTodos)];
                        case 1:
                            _a.apply(void 0, [_b.sent()]).toEqual([
                                { type: 'TODOS', payload: { user: 'bob', todos: 'some todos' } },
                                { type: 'TODOS', payload: { user: 'bob', todos: 'some todos' } }
                            ]);
                            done();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('id', function () {
            var TodoEffects = /** @class */ (function () {
                function TodoEffects(s) {
                    this.s = s;
                    this.loadTodo = this.s.fetch('GET_TODO', {
                        id: function (a, state) { return a.payload.id; },
                        run: function (a, state) { return of_1.of({ type: 'TODO', payload: a.payload }).delay(1); },
                        onError: function (a, e) { return null; }
                    });
                }
                __decorate([
                    effects_1.Effect(),
                    __metadata("design:type", Object)
                ], TodoEffects.prototype, "loadTodo", void 0);
                TodoEffects = __decorate([
                    core_1.Injectable(),
                    __metadata("design:paramtypes", [index_1.DataPersistence])
                ], TodoEffects);
                return TodoEffects;
            }());
            function userReducer() {
                return 'bob';
            }
            var actions;
            beforeEach(function () {
                actions = new Subject_1.Subject();
                testing_1.TestBed.configureTestingModule({
                    providers: [TodoEffects, testing_3.provideMockActions(function () { return actions; })],
                    imports: [store_1.StoreModule.forRoot({ user: userReducer })]
                });
            });
            it('should work', function (done) { return __awaiter(_this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            actions = of_1.of({ type: 'GET_TODO', payload: { id: 1, value: '1' } }, { type: 'GET_TODO', payload: { id: 2, value: '2a' } }, { type: 'GET_TODO', payload: { id: 2, value: '2b' } });
                            _a = expect;
                            return [4 /*yield*/, testing_4.readAll(testing_1.TestBed.get(TodoEffects).loadTodo)];
                        case 1:
                            _a.apply(void 0, [_b.sent()]).toEqual([
                                { type: 'TODO', payload: { id: 1, value: '1' } },
                                { type: 'TODO', payload: { id: 2, value: '2b' } }
                            ]);
                            done();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe('pessimisticUpdate', function () {
        beforeEach(function () {
            testing_1.TestBed.configureTestingModule({ providers: [index_1.DataPersistence] });
        });
        describe('successful', function () {
            var TodoEffects = /** @class */ (function () {
                function TodoEffects(s) {
                    this.s = s;
                    this.loadTodo = this.s.pessimisticUpdate('UPDATE_TODO', {
                        run: function (a, state) {
                            return ({
                                type: 'TODO_UPDATED',
                                payload: { user: state.user, newTitle: a.payload.newTitle }
                            });
                        },
                        onError: function (a, e) { return null; }
                    });
                }
                __decorate([
                    effects_1.Effect(),
                    __metadata("design:type", Object)
                ], TodoEffects.prototype, "loadTodo", void 0);
                TodoEffects = __decorate([
                    core_1.Injectable(),
                    __metadata("design:paramtypes", [index_1.DataPersistence])
                ], TodoEffects);
                return TodoEffects;
            }());
            function userReducer() {
                return 'bob';
            }
            var actions;
            beforeEach(function () {
                actions = new Subject_1.Subject();
                testing_1.TestBed.configureTestingModule({
                    providers: [TodoEffects, testing_3.provideMockActions(function () { return actions; })],
                    imports: [store_1.StoreModule.forRoot({ user: userReducer })]
                });
            });
            it('should work', function (done) { return __awaiter(_this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            actions = of_1.of({
                                type: 'UPDATE_TODO',
                                payload: { newTitle: 'newTitle' }
                            });
                            _a = expect;
                            return [4 /*yield*/, testing_4.readAll(testing_1.TestBed.get(TodoEffects).loadTodo)];
                        case 1:
                            _a.apply(void 0, [_b.sent()]).toEqual([
                                {
                                    type: 'TODO_UPDATED',
                                    payload: { user: 'bob', newTitle: 'newTitle' }
                                }
                            ]);
                            done();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('`run` throws an error', function () {
            var TodoEffects = /** @class */ (function () {
                function TodoEffects(s) {
                    this.s = s;
                    this.loadTodo = this.s.pessimisticUpdate('UPDATE_TODO', {
                        run: function (a, state) {
                            throw new Error('boom');
                        },
                        onError: function (a, e) {
                            return ({
                                type: 'ERROR',
                                payload: { error: e }
                            });
                        }
                    });
                }
                __decorate([
                    effects_1.Effect(),
                    __metadata("design:type", Object)
                ], TodoEffects.prototype, "loadTodo", void 0);
                TodoEffects = __decorate([
                    core_1.Injectable(),
                    __metadata("design:paramtypes", [index_1.DataPersistence])
                ], TodoEffects);
                return TodoEffects;
            }());
            function userReducer() {
                return 'bob';
            }
            var actions;
            beforeEach(function () {
                actions = new Subject_1.Subject();
                testing_1.TestBed.configureTestingModule({
                    providers: [TodoEffects, testing_3.provideMockActions(function () { return actions; })],
                    imports: [store_1.StoreModule.forRoot({ user: userReducer })]
                });
            });
            it('should work', function (done) { return __awaiter(_this, void 0, void 0, function () {
                var a;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            actions = of_1.of({
                                type: 'UPDATE_TODO',
                                payload: { newTitle: 'newTitle' }
                            });
                            return [4 /*yield*/, testing_4.readAll(testing_1.TestBed.get(TodoEffects).loadTodo)];
                        case 1:
                            a = (_a.sent())[0];
                            expect(a.type).toEqual('ERROR');
                            expect(a.payload.error.message).toEqual('boom');
                            done();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('`run` returns an observable that errors', function () {
            var TodoEffects = /** @class */ (function () {
                function TodoEffects(s) {
                    this.s = s;
                    this.loadTodo = this.s.pessimisticUpdate('UPDATE_TODO', {
                        run: function (a, state) {
                            return throw_1._throw('boom');
                        },
                        onError: function (a, e) {
                            return ({
                                type: 'ERROR',
                                payload: { error: e }
                            });
                        }
                    });
                }
                __decorate([
                    effects_1.Effect(),
                    __metadata("design:type", Object)
                ], TodoEffects.prototype, "loadTodo", void 0);
                TodoEffects = __decorate([
                    core_1.Injectable(),
                    __metadata("design:paramtypes", [index_1.DataPersistence])
                ], TodoEffects);
                return TodoEffects;
            }());
            function userReducer() {
                return 'bob';
            }
            var actions;
            beforeEach(function () {
                actions = new Subject_1.Subject();
                testing_1.TestBed.configureTestingModule({
                    providers: [TodoEffects, testing_3.provideMockActions(function () { return actions; })],
                    imports: [store_1.StoreModule.forRoot({ user: userReducer })]
                });
            });
            it('should work', function (done) { return __awaiter(_this, void 0, void 0, function () {
                var a;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            actions = of_1.of({
                                type: 'UPDATE_TODO',
                                payload: { newTitle: 'newTitle' }
                            });
                            return [4 /*yield*/, testing_4.readAll(testing_1.TestBed.get(TodoEffects).loadTodo)];
                        case 1:
                            a = (_a.sent())[0];
                            expect(a.type).toEqual('ERROR');
                            expect(a.payload.error).toEqual('boom');
                            done();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe('optimisticUpdate', function () {
        beforeEach(function () {
            testing_1.TestBed.configureTestingModule({ providers: [index_1.DataPersistence] });
        });
        describe('`run` throws an error', function () {
            var TodoEffects = /** @class */ (function () {
                function TodoEffects(s) {
                    this.s = s;
                    this.loadTodo = this.s.optimisticUpdate('UPDATE_TODO', {
                        run: function (a, state) {
                            throw new Error('boom');
                        },
                        undoAction: function (a, e) {
                            return ({
                                type: 'UNDO_UPDATE_TODO',
                                payload: a.payload
                            });
                        }
                    });
                }
                __decorate([
                    effects_1.Effect(),
                    __metadata("design:type", Object)
                ], TodoEffects.prototype, "loadTodo", void 0);
                TodoEffects = __decorate([
                    core_1.Injectable(),
                    __metadata("design:paramtypes", [index_1.DataPersistence])
                ], TodoEffects);
                return TodoEffects;
            }());
            function userReducer() {
                return 'bob';
            }
            var actions;
            beforeEach(function () {
                actions = new Subject_1.Subject();
                testing_1.TestBed.configureTestingModule({
                    providers: [TodoEffects, testing_3.provideMockActions(function () { return actions; })],
                    imports: [store_1.StoreModule.forRoot({ user: userReducer })]
                });
            });
            it('should work', function (done) { return __awaiter(_this, void 0, void 0, function () {
                var a;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            actions = of_1.of({
                                type: 'UPDATE_TODO',
                                payload: { newTitle: 'newTitle' }
                            });
                            return [4 /*yield*/, testing_4.readAll(testing_1.TestBed.get(TodoEffects).loadTodo)];
                        case 1:
                            a = (_a.sent())[0];
                            expect(a.type).toEqual('UNDO_UPDATE_TODO');
                            expect(a.payload.newTitle).toEqual('newTitle');
                            done();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
});
function createRoot(router, type) {
    return testing_1.TestBed.createComponent(type);
}
