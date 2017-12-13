export default googleMapsApi;

function googleMapsApi(locations, viewModel) {

    let icon1 = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
    let icon2 = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
    /*******************************
     * External Api. In this object i'll add all public properties and methods. 
     *******************************/
    let Api = {
        map: null,
        markers: null,
        infoWindow: null,
        createInitMap() {
            return () => {
                InternalApi.createInfoWindowInstance();
                InternalApi.createMapInstance();
                InternalApi.initializeMarkers();
                locations.subscribe(InternalApi.updateMarkers);
                viewModel.showLocation = function(selectedLocation) {
                    Api.changeLocation(selectedLocation);
                }
            }
        },
        changeLocation(location) {

            let currentMarker = InternalApi.getMarkerByLocation(location.location);
            if (location.name && currentMarker != undefined) {
                Api.map.panTo(location.location); // Pan to correct marker when list view item is clicked
                InternalApi.populateInfoWindow(currentMarker);
            }
            setTimeout(function() {
                currentMarker.setAnimation(null); // End animation on marker after 2 seconds
            }, 2000);
        }
    };

    let InternalApi = {

        initializeMarkers() {
            InternalApi.deleteAllMarkers();
            locations().forEach((location, index) => {
                Api.markers.push(InternalApi.createEachMarker(location, index));
            })
        },
        /*******************************
         *  Method responsible for create each marker object
         *******************************/
        createEachMarker(location, index) {
            let marker = new google.maps.Marker({
                map: Api.map,
                position: location.location,
                title: location.name,
                address: location.address,
                animation: google.maps.Animation.DROP,
                id: index,
                icon: icon1
            });

            marker.addListener('click', function() {

                InternalApi.populateInfoWindow(this);
                Api.map.panTo(new google.maps.LatLng(this.position.lat(), this.position.lng()));


                this.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(function() {
                    marker.setAnimation(null); // End animation on marker after 2 seconds
                }, 2000);
            });

            marker.addListener('mouseover', function() {
                this.setIcon(icon2);
            });

            marker.addListener('mouseout', function() {
                this.setIcon(icon1);
            });
            location.marker = marker;
            return marker;
        },
        /*******************************
         * Method responsible for update visible markers on map.
         *******************************/
        updateMarkers() {
            InternalApi.initializeMarkers();
        },
        /*******************************
         * Method responsible for delete all markers and remove from map.
         ********************************/
        deleteAllMarkers() {
            if (Api.markers) {
                Api.markers.forEach((marker) => {
                    marker.setMap(null);
                });
                Api.markers.length = 0;
            } else {
                Api.markers = [];
            }
        },
        /*******************************
         * populate one infowindow when the marker is clicked.
         *******************************/
        populateInfoWindow(marker) {
            if (Api.infoWindow.marker != marker) {
                Api.infoWindow.setContent('');
                Api.infoWindow.marker = marker;

                Api.infoWindow.addListener('closeclick', function() {
                    Api.infoWindow.marker = null;
                });
                let streetViewService = new google.maps.StreetViewService();
                let radius = 50;

                function getStreetView(data, status) {
                    if (status == google.maps.StreetViewStatus.OK) {
                        let nearStreetViewLocation = data.location.latLng;
                        let heading = google.maps.geometry.spherical.computeHeading(
                            nearStreetViewLocation, marker.position);
                        Api.infoWindow.setContent('<h1 class="text-center">' + marker.title + '</h1><div id="pano"></div>');
                        let panoramaOptions = {
                            position: nearStreetViewLocation,
                            pov: {
                                heading: heading,
                                pitch: 30
                            }
                        };
                        let panorama = new google.maps.StreetViewPanorama(
                            document.getElementById('pano'), panoramaOptions);
                    } else {
                        Api.infoWindow.setContent('<div>' + marker.title + '</div>' +
                            '<div>No Street View Found</div>');
                    }
                }
                streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
                Api.infoWindow.open(map, marker);
            }
        },

        /*******************************
         * 
         *      Create Instance Methods
         * 
         *******************************/

        createInfoWindowInstance() {
            Api.infoWindow = new google.maps.InfoWindow();
        },

        createMapInstance() {
            Api.map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: 38.889939, lng: -77.00905 },
                zoom: 13,
                styles: [
                    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
                    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
                    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
                    {
                        featureType: 'administrative.locality',
                        elementType: 'labels.text.fill',
                        stylers: [{ color: '#d59563' }]
                    },
                    {
                        featureType: 'poi',
                        elementType: 'labels.text.fill',
                        stylers: [{ color: '#d59563' }]
                    },
                    {
                        featureType: 'poi.park',
                        elementType: 'geometry',
                        stylers: [{ color: '#263c3f' }]
                    },
                    {
                        featureType: 'poi.park',
                        elementType: 'labels.text.fill',
                        stylers: [{ color: '#6b9a76' }]
                    },
                    {
                        featureType: 'road',
                        elementType: 'geometry',
                        stylers: [{ color: '#38414e' }]
                    },
                    {
                        featureType: 'road',
                        elementType: 'geometry.stroke',
                        stylers: [{ color: '#212a37' }]
                    },
                    {
                        featureType: 'road',
                        elementType: 'labels.text.fill',
                        stylers: [{ color: '#9ca5b3' }]
                    },
                    {
                        featureType: 'road.highway',
                        elementType: 'geometry',
                        stylers: [{ color: '#746855' }]
                    },
                    {
                        featureType: 'road.highway',
                        elementType: 'geometry.stroke',
                        stylers: [{ color: '#1f2835' }]
                    },
                    {
                        featureType: 'road.highway',
                        elementType: 'labels.text.fill',
                        stylers: [{ color: '#f3d19c' }]
                    },
                    {
                        featureType: 'transit',
                        elementType: 'geometry',
                        stylers: [{ color: '#2f3948' }]
                    },
                    {
                        featureType: 'transit.station',
                        elementType: 'labels.text.fill',
                        stylers: [{ color: '#d59563' }]
                    },
                    {
                        featureType: 'water',
                        elementType: 'geometry',
                        stylers: [{ color: '#17263c' }]
                    },
                    {
                        featureType: 'water',
                        elementType: 'labels.text.fill',
                        stylers: [{ color: '#515c6d' }]
                    },
                    {
                        featureType: 'water',
                        elementType: 'labels.text.stroke',
                        stylers: [{ color: '#17263c' }]
                    }
                ]
            });
        },
        getMarkerByLocation(location) {
            let latLng = new google.maps.LatLng(location.lat, location.lng);
            let markersFiltered = Api.markers.filter((marker) => {
                return marker.position.lat() == latLng.lat() && marker.position.lng() == latLng.lng();
            });
            return markersFiltered.length >= 0 ? markersFiltered[0] : undefined;
        }
    };

    return Api;
};