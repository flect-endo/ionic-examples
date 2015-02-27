angular.module('starter.controllers')
.controller('PlaylistCtrl', function($scope, $stateParams, PlaylistService) {
  $scope.playlist = PlaylistService.get($stateParams.playlistId);
});
