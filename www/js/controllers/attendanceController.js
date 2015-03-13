angular.module('starter.controllers')
.controller('AttendanceCtrl', function($scope, $state, AttendanceService, Account, Client) {
  $scope.attendances = [];

  $scope.attendances = AttendanceService.all().success(function(data) {
    $scope.attendances = data;
  });

  $scope.start = function() {
    AttendanceService.start();
  };

  $scope.end = function() {
    AttendanceService.end();
  };

  $scope.getToday = function() {
    $state.go('app.today');
  };
});
