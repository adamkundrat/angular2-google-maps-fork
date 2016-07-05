"use strict";
var core_1 = require('@angular/core');
exports.WINDOW_GLOBAL = new core_1.OpaqueToken('angular2-google-maps window_global');
exports.DOCUMENT_GLOBAL = new core_1.OpaqueToken('angular2-google-maps document_global');
exports.BROWSER_GLOBALS_PROVIDERS = [core_1.provide(exports.WINDOW_GLOBAL, { useValue: window }), core_1.provide(exports.DOCUMENT_GLOBAL, { useValue: document })];
//# sourceMappingURL=browser-globals.js.map