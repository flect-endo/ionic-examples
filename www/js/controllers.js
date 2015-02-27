angular.module('starter.controllers', [])

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

.controller('PlaylistsCtrl', function($scope, PlaylistService) {
  $scope.playlists = PlaylistService.all();
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
