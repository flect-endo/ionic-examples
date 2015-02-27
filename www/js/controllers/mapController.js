angular.module('starter.controllers')
.controller('MapCtrl', function($scope, $ionicLoading, $compile, MapService) {
  function initialize() {
    loadCurrentPosition(function(latlng, err) {
      if (err) { return; }

      $scope.home = $scope.latlng = latlng;

      var mapOptions = {
        center: latlng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(document.getElementById("map"), mapOptions);

      var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
      var compiled = $compile(contentString)($scope);

      var infowindow = new google.maps.InfoWindow({content: compiled[0]});

      var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        title: 'Uluru (Ayers Rock)',
        icon: new google.maps.MarkerImage(
          "./img/house.png",
          new google.maps.Size(32, 32), // size
          new google.maps.Point(0, 0), // origin
          new google.maps.Point(0, 16) // anchor
        )
      });

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
      });

      $scope.directionsDisplay.setMap(map);
      google.maps.event.addListener($scope.directionsDisplay, 'directions_changed', function(){});

      $scope.map = map;
    });
  };

  $scope.directionsDisplay = new google.maps.DirectionsRenderer({
    draggable: true,
    preserveViewpoint: false
  });

  google.maps.event.addDomListener(window, 'load', initialize());

  function move(distance, direction) {
    var results = MapService.move($scope.map, $scope.latlng, $scope.polyline, distance, direction);
    $scope.polyline = results.polyline;
    $scope.latlng = results.latlng;
  }

  $scope.moveUp = function() {
    move(150, "north");
  };

  $scope.moveRight = function() {
    move(150, "east");
  };

  $scope.moveDown = function() {
    move(150, "south");
  };

  $scope.moveLeft = function() {
    move(150, "west");
  };

  $scope.moveRandom = function() {
    move(
      Math.floor((Math.random() * 100) + 1),
      ["north", "east", "south", "west"][Math.floor(Math.random() * 4)]
    );
  };

  $scope.search = function() {
    MapService.searchRoute($scope.directionsDisplay, $scope.map, $scope.home, $scope.searchKey);
  };

  $scope.searchPlaces = function() {
    MapService.searchPlaces($scope.map, $scope.home);
  };

  function loadCurrentPosition(callback) {
    if (navigator.geolocation) {
    } else {
      alert("Your browser doesn't support geolocation.")
      callback(null, "error");
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function(pos) {
      // $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      callback(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      $ionicLoading.hide();
    }, function(error) {
      alert('Unable to get location: ' + error.message);
      $ionicLoading.hide();
      callback(null, "error");
    });
  };
});