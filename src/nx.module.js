"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var data_persistence_1 = require("./data-persistence");
/**
 * @whatItDoes Provides services for enterprise Angular applications.
 *
 * See {@link DataPersistence} for more information.
 */
var NxModule = /** @class */ (function () {
    function NxModule() {
    }
    NxModule_1 = NxModule;
    NxModule.forRoot = function () {
        return { ngModule: NxModule_1, providers: [data_persistence_1.DataPersistence] };
    };
    /**
     * @whatItDoes Provides services for enterprise Angular applications.
     *
     * See {@link DataPersistence} for more information.
     */
    NxModule = NxModule_1 = __decorate([
        core_1.NgModule({})
    ], NxModule);
    return NxModule;
    var NxModule_1;
}());
exports.NxModule = NxModule;
