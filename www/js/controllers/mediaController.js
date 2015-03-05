angular.module('starter.controllers')
.controller('MediaCtrl', function($scope) {
  $scope.counter = 0;
  $scope.records = [];
  $scope.recordingStatus = "None";

  // capture プラグイン版

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

  function captureSuccess(mediaFiles) {
    var i, len = mediaFiles.length;
    for (i = 0; i < len; i++) {
      console.log(mediaFiles[i].fullPath);
    }
  };

  function captureError(err) {
    navigator.notification.alert('error: ' + err.code, null, 'Uh oh!');
  }

  // media-capture プラグイン版

  $scope.captureImage = function() {
    var options = {}; // { limit: 3 };
    navigator.device.capture.captureImage(captureSuccess, captureError, options);
  };

  $scope.captureAudio = function() {
    var options = {}; // { limit: 3 };
    navigator.device.capture.captureAudio(captureSuccess, captureError, options);
  };
});
