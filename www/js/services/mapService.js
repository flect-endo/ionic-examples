angular.module('starter.services')
.factory('MapService', function() {

    var RADIUS = { "north": 0, "west": -90, "south": -180, "east": 90 };

    var move = function(map, currentLatlng, polyline, distance, direction) {
        var radius = RADIUS[direction];
        var oldLatlng = currentLatlng;
        var newLatlng = google.maps.geometry.spherical.computeOffset(oldLatlng, distance, radius);

        if (polyline) {
          var path = polyline.getPath();
          path.push(newLatlng);
        } else {
          polyline = new google.maps.Polyline({
            path: [oldLatlng, newLatlng],
            strokeColor: "#0000FF",
            strokeOpacity: 0.5,
            strokeWeight: 10
          });
          polyline.setMap(map);
        }

        map.setCenter(newLatlng);
        return { polyline: polyline, latlng: newLatlng };
    };

    var searchRoute = function(directionsDisplay, map, origin, key) {
        var request = {
          address: key
        };
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode(request, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            var location = results[0].geometry.location;

            var marker = new google.maps.Marker({
              position: location,
              title: request.address,
              map: map
            });

            showRoute(directionsDisplay, origin, location);
          } else {
            alert('not found: ' + key + ", status = " + status);
          }
        });
    };

    var showRoute = function(directionsDisplay, origin, destination) {
        var routeRequest = {
          origin: origin,
          destination: destination,
          travelMode: google.maps.DirectionsTravelMode.WALKING, // google.maps.DirectionsTravelMode.DRIVING,
          unitSystem: google.maps.DirectionsUnitSystem.METRIC,
          optimizeWaypoints: true,
          avoidHighways: false,
          avoidTolls: false
        };
        var directionsService = new google.maps.DirectionsService();
        directionsService.route(routeRequest, function(response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
          }
        });
    };

    var searchPlaces = function(directionsDisplay, map, location) {
        var service = new google.maps.places.PlacesService(map);
        var request = {
          location: location,
          radius: '1000',
          types: ['train_station', 'subway_station']
        }
        var waypoints = [];
        service.search(request, function(results, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            var pointNum = Math.min(5, results.length);
            for (var i = 0; i < pointNum; i++) {
              waypoints.push({ location: results[i].geometry.location, stopover: true });
            }

            var routeRequest = {
              origin: location,
              destination: location,
              waypoints: waypoints,
              travelMode: google.maps.DirectionsTravelMode.WALKING
            };
            var directionsService = new google.maps.DirectionsService();
            directionsService.route(routeRequest, function(response, status) {
              if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
              }
            });
          }
        });
    };

    return {
        move: move,
        searchRoute: searchRoute,
        searchPlaces: searchPlaces
    }
});