import ko from 'knockout';
import { locale } from 'core-js/library/web/timers';

function cloneObject(object) {
    return JSON.parse(JSON.stringify(object));
}

function viewModel(locations) {
    let self = this;
    /***************************
     * We need to call cloneObject method to clear the locations reference.
     ***************************/
    self.locationList = ko.observableArray(cloneObject(locations));

    /***************************
     *  Property to store the filter
     ***************************/
    self.filter = ko.observable('');

    /***************************
     * Method responsible for filter all locations. 
     * We just call this method passing a term as parameter to filter all locations.
     ***************************/

    self.filterLocations = ko.computed({
        read: () => {},
        write: (filterValue) => {
            if (!filterValue || filterValue == undefined) {
                self.locationList.removeAll();
                ko.utils.arrayPushAll(self.locationList, locations);
            } else {
                // remove all items to prevent duplicate items on list
                self.locationList.removeAll();
                locations.forEach(function(item) {
                    // To do a case insensitive comparison we need to call toUpperCase or toLowerCase method
                    if (item.name.toUpperCase().indexOf(filterValue.toUpperCase()) !== -1) {
                        self.locationList.push(item);
                    }
                })

            }
        }
    }).extend({ throttle: 400 });

    self.filter.subscribe((searchTerm) => {
        self.filterLocations(searchTerm);
    });

    self.showLocation = function(location) {};

}

export default viewModel;