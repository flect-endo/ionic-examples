angular.module('starter.controllers')
.controller('MediaCtrl', function($scope) {
  $scope.counter = 0;
  $scope.records = [];
  $scope.recordingStatus = "Stop";

  // capture プラグイン版
  init();

  function init() {
    var putRecord = function(entries) {
      for (var i=0; i<entries.length; i++) {
        var entry = entries[i];
        entry.file(function(file) {
          $scope.records.push(file);
        }, fail);
      }
    }

    var fsCallback = function(fs) {
      var directoryEntry = fs.root;
      var directoryReader = directoryEntry.createReader();
      directoryReader.readEntries(putRecord, fail);
    };

    if (typeof LocalFileSystem !== "undefined") {
      window.requestFileSystem(LocalFileSystem.TEMPORARY, 0, fsCallback, fail);
    }
  };

  function fail(err) {
    alert(err.code);
  }

  $scope.stopped = function() {
    return $scope.recordingStatus === "Stop";
  }

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
    $scope.recordingStatus = "Start";
  };

  $scope.stopRecord = function() {
    $scope.media.stopRecord();
    $scope.recordingStatus = "Stop";
    $scope.counter += 1;
    // $scope.records.push($scope.media);
    init();
  };

  function captureSuccess(mediaFiles) {
    // var i, len = mediaFiles.length;
    // for (i = 0; i < len; i++) {
      // console.log(mediaFiles[i].fullPath);
    // }
    init();
  };

  function captureError(err) {
    navigator.notification.alert('error: ' + err.code, null, 'Uh oh!');
  }

  $scope.play = function(name) {
    alert("playing..." + name);
    var media = new Media(name,
      function() { alert("play ok"); },
      function(err) { alert("play error: " + err); }
    );
    media.play();
  };

  $scope.deleteAll = function() {
    var removeFile = function(entries) {
      for (var i=0; i<entries.length; i++) {
        var entry = entries[i];
        entry.remove(function(e) {
          console.log("Removal succeeded.");
        }, function(err) {
          console.log("Error removing file: " + err.code);
        });
      }
    }

    var fsCallback = function(fs) {
      var directoryEntry = fs.root;
      var directoryReader = directoryEntry.createReader();
      directoryReader.readEntries(removeFile, fail);
    };

    if (typeof LocalFileSystem !== "undefined") {
      window.requestFileSystem(LocalFileSystem.TEMPORARY, 0, fsCallback, fail);
    }
  };

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
