"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var data_persistence_1 = require("./data-persistence");
/**
 * @whatItDoes Provides services simplifying enterprise Angular development.
 */
var NxModule = (function () {
    function NxModule() {
    }
    NxModule.forRoot = function () {
        return { ngModule: NxModule, providers: [data_persistence_1.DataPersistence] };
    };
    NxModule.decorators = [
        { type: core_1.NgModule, args: [{},] },
    ];
    /** @nocollapse */
    NxModule.ctorParameters = function () { return []; };
    return NxModule;
}());
exports.NxModule = NxModule;
