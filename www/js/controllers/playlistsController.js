angular.module('starter.controllers')
.controller('PlaylistsCtrl', function($scope, PlaylistService) {
  $scope.playlists = PlaylistService.all();
});