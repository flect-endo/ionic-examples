angular.module('starter.controllers')
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
});
