"use strict";
var core_1 = require('@angular/core');
var testing_1 = require('@angular/core/testing');
var lazy_maps_api_loader_1 = require('../../../src/core/services/maps-api-loader/lazy-maps-api-loader');
var maps_api_loader_1 = require('../../../src/core/services/maps-api-loader/maps-api-loader');
var browser_globals_1 = require('../../../src/core/utils/browser-globals');
function main() {
    testing_1.describe('Service: LazyMapsAPILoader', function () {
        testing_1.beforeEachProviders(function () {
            return [
                core_1.provide(maps_api_loader_1.MapsAPILoader, { useClass: lazy_maps_api_loader_1.LazyMapsAPILoader }),
                core_1.provide(browser_globals_1.WINDOW_GLOBAL, { useValue: {} }), core_1.provide(browser_globals_1.DOCUMENT_GLOBAL, {
                    useValue: jasmine.createSpyObj('Document', ['createElement'])
                })
            ];
        });
        testing_1.it('should create the default script URL', testing_1.inject([maps_api_loader_1.MapsAPILoader, browser_globals_1.DOCUMENT_GLOBAL], function (loader, doc) {
            var scriptElem = {};
            doc.createElement.and.returnValue(scriptElem);
            doc.body = jasmine.createSpyObj('body', ['appendChild']);
            loader.load();
            testing_1.expect(doc.createElement).toHaveBeenCalled();
            testing_1.expect(scriptElem.type).toEqual('text/javascript');
            testing_1.expect(scriptElem.async).toEqual(true);
            testing_1.expect(scriptElem.defer).toEqual(true);
            testing_1.expect(scriptElem.src).toBeDefined();
            testing_1.expect(scriptElem.src).toContain('https://maps.googleapis.com/maps/api/js');
            testing_1.expect(scriptElem.src).toContain('v=3');
            testing_1.expect(scriptElem.src).toContain('callback=angular2GoogleMapsLazyMapsAPILoader');
            testing_1.expect(doc.body.appendChild).toHaveBeenCalledWith(scriptElem);
        }));
    });
}
exports.main = main;
//# sourceMappingURL=lazy-maps-api-loader.spec.js.map