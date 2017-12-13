import ko from 'knockout';
import $ from 'jquery';
import { default as locations } from './models/locations';
import { default as neighborhoodVm } from './viewModels/neighborhood';
import { default as gMapsApi } from './helpers/googlemaps';

let vm = new neighborhoodVm(locations);
window.initMap = new gMapsApi(vm.locationList, vm).createInitMap();
ko.applyBindings(vm);

$(document).ready(() => {
    $("#map").css("height", $(window).height());

})