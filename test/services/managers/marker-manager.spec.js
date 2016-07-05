"use strict";
var core_1 = require('@angular/core');
var testing_1 = require('@angular/core/testing');
var google_map_marker_1 = require('../../../src/core/directives/google-map-marker');
var google_maps_api_wrapper_1 = require('../../../src/core/services/google-maps-api-wrapper');
var marker_manager_1 = require('../../../src/core/services/managers/marker-manager');
function main() {
    testing_1.describe('MarkerManager', function () {
        testing_1.beforeEachProviders(function () {
            return [core_1.provide(core_1.NgZone, { useFactory: function () { return new core_1.NgZone({ enableLongStackTrace: true }); } }),
                marker_manager_1.MarkerManager, google_map_marker_1.SebmGoogleMapMarker, core_1.provide(google_maps_api_wrapper_1.GoogleMapsAPIWrapper, {
                    useValue: jasmine.createSpyObj('GoogleMapsAPIWrapper', ['createMarker'])
                })];
        });
        testing_1.describe('Create a new marker', function () {
            testing_1.it('should call the mapsApiWrapper when creating a new marker', testing_1.inject([marker_manager_1.MarkerManager, google_maps_api_wrapper_1.GoogleMapsAPIWrapper], function (markerManager, apiWrapper) {
                var newMarker = new google_map_marker_1.SebmGoogleMapMarker(markerManager);
                newMarker.latitude = 34.4;
                newMarker.longitude = 22.3;
                newMarker.label = 'A';
                markerManager.addMarker(newMarker);
                testing_1.expect(apiWrapper.createMarker).toHaveBeenCalledWith({
                    position: { lat: 34.4, lng: 22.3 },
                    label: 'A',
                    draggable: false,
                    icon: undefined
                });
            }));
        });
        testing_1.describe('Delete a marker', function () {
            testing_1.it('should set the map to null when deleting a existing marker', testing_1.inject([marker_manager_1.MarkerManager, google_maps_api_wrapper_1.GoogleMapsAPIWrapper], function (markerManager, apiWrapper) {
                var newMarker = new google_map_marker_1.SebmGoogleMapMarker(markerManager);
                newMarker.latitude = 34.4;
                newMarker.longitude = 22.3;
                newMarker.label = 'A';
                var markerInstance = jasmine.createSpyObj('Marker', ['setMap']);
                apiWrapper.createMarker.and.returnValue(Promise.resolve(markerInstance));
                markerManager.addMarker(newMarker);
                markerManager.deleteMarker(newMarker).then(function () { testing_1.expect(markerInstance.setMap).toHaveBeenCalledWith(null); });
            }));
        });
        testing_1.describe('set marker icon', function () {
            testing_1.it('should update that marker via setIcon method when the markerUrl changes', testing_1.async(testing_1.inject([marker_manager_1.MarkerManager, google_maps_api_wrapper_1.GoogleMapsAPIWrapper], function (markerManager, apiWrapper) {
                var newMarker = new google_map_marker_1.SebmGoogleMapMarker(markerManager);
                newMarker.latitude = 34.4;
                newMarker.longitude = 22.3;
                newMarker.label = 'A';
                var markerInstance = jasmine.createSpyObj('Marker', ['setMap', 'setIcon']);
                apiWrapper.createMarker.and.returnValue(Promise.resolve(markerInstance));
                markerManager.addMarker(newMarker);
                testing_1.expect(apiWrapper.createMarker).toHaveBeenCalledWith({
                    position: { lat: 34.4, lng: 22.3 },
                    label: 'A',
                    draggable: false,
                    icon: undefined
                });
                var iconUrl = 'http://angular-maps.com/icon.png';
                newMarker.iconUrl = iconUrl;
                return markerManager.updateIcon(newMarker).then(function () { testing_1.expect(markerInstance.setIcon).toHaveBeenCalledWith(iconUrl); });
            })));
        });
    });
}
exports.main = main;
//# sourceMappingURL=marker-manager.spec.js.map