angular.module('starter.controllers', [])

.controller('TodoCtrl', function($scope, $ionicModal) {
  $scope.tasks = [
    { title: 'Collect coints' },
    { title: 'Eat mushrooms' },
    { title: 'Get high enough to grab the flag' },
    { title: 'Find the princess' }
  ];

  $ionicModal.fromTemplateUrl('templates/new-task.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  $scope.createTask = function(task) {
    $scope.tasks.push({
      title: task.title
    });
    $scope.taskModal.hide();
    task.title = "";
  };

  $scope.newTask = function() {
    $scope.taskModal.show();
  };

  $scope.closeNewTask = function() {
    $scope.taskModal.hide();
  };
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('MapCtrl', function($scope, $ionicLoading, $compile) {
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
    var radius = { "north": 0, "west": -90, "south": -180, "east": 90 }[direction];
    var oldLatlng = $scope.latlng;
    var newLatlng = google.maps.geometry.spherical.computeOffset(oldLatlng, distance, radius);

    if ($scope.polyline) {
      var path = $scope.polyline.getPath();
      path.push(newLatlng);
    } else {
      $scope.polyline = new google.maps.Polyline({
        path: [oldLatlng, newLatlng],
        strokeColor: "#0000FF",
        strokeOpacity: 0.5,
        strokeWeight: 10
      });
      $scope.polyline.setMap($scope.map);
    }

    $scope.map.setCenter(newLatlng);
    $scope.latlng = newLatlng;
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
    var request = {
      address: $scope.searchKey
    };
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode(request, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var marker = new google.maps.Marker({
          position: results[0].geometry.location,
          title: request.address,
          map: $scope.map
        });

        // search route from home
        // TODO: move to service.
        var routeRequest = {
          origin: $scope.home,
          destination: results[0].geometry.location,
          travelMode: google.maps.DirectionsTravelMode.WALKING, // google.maps.DirectionsTravelMode.DRIVING,
          unitSystem: google.maps.DirectionsUnitSystem.METRIC,
          optimizeWaypoints: true,
          avoidHighways: false,
          avoidTolls: false
        };
        var directionsService = new google.maps.DirectionsService();
        directionsService.route(routeRequest, function(response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            $scope.directionsDisplay.setDirections(response);
          }
        });
      } else {
        alert('not found: ' + $scope.searchKey);
      }
    });
  }

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
})

.controller('PlaylistsCtrl', function($scope, PlaylistService) {
  $scope.playlists = PlaylistService.all();
})

.controller('PlaylistCtrl', function($scope, $stateParams, PlaylistService) {
  $scope.playlist = PlaylistService.get($stateParams.playlistId);
})

.controller('DialogsCtrl', function($scope) {
  document.addEventListener("deviceready", onDeviceReady, false);

  function alertDismissed(buttonIndex) {
  };

  function onDeviceReady() {
    console.log(navigator.notification);
  };

  $scope.alert1 = function() {
    navigator.notification.alert(
      'You are the winner!',
      alertDismissed,
      'Game Over',
      'Done'
    );
  };
})

.controller('InAppBrowserCtrl', function($scope) {
  document.addEventListener("deviceready", onDeviceReady, false);

  function onDeviceReady() {
    var ref = window.open('http://www.flect.co.jp/', '_blank', 'location=yes');
    ref.addEventListener('loadstart', function(event) { alert('start: ' + event.url); });
    ref.addEventListener('loadstop', function(event) { alert('stop: ' + event.url); });
    ref.addEventListener('loaderror', function(event) { alert('error: ' + event.message); });
    ref.addEventListener('exit', function(event) { alert(event.type); });
  };
});
