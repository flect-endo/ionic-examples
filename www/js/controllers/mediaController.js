angular.module('starter.controllers')
.controller('MediaCtrl', function($scope) {
  $scope.counter = 0;
  $scope.records = [];
  $scope.recordingStatus = "None";

  $scope.startRecord = function() {
    var src = "record" + $scope.counter + ".wav";
    $scope.media = new Media(src,
      function() {
        alert("OK");
      },
      function(err) {
        alert("ERROR")
        alert(err);
      }
    );

    $scope.media.startRecord();
    $scope.recordingStatus = "record start...";
  };

  $scope.stopRecord = function() {
    $scope.media.stopRecord();
    $scope.recordingStatus = "record stopped";
    $scope.counter += 1;
    $scope.records.push($scope.media);
  };
});
