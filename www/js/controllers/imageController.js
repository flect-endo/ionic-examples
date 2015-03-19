angular.module('starter.controllers')
.controller('ImageCtrl', function($scope, ErrorHandler) {

  $scope.imageFiles = [];

  var onFileSystemSuccess = function(fileSystem) {
    var directoryEntry = fileSystem.root;
    var directoryReader = directoryEntry.createReader();
    directoryReader.readEntries(onFileEntrySuccess, ErrorHandler.alert);
  };

  var onFileEntrySuccess = function(entries) {
    console.log("read entries succeeded.");
    for (var i=0; i<entries.length; i++) {
      var entry = entries[i];
      entry.src = entry.toURL();
      console.log(entry.src);
      $scope.imageFiles.push(entry);

      entry.file(function(file) {
        for (var j=0; j<$scope.imageFiles.length; j++) {
          if (file.name === $scope.imageFiles[j].name) {
            $scope.imageFiles[j].size = file.size;
            $scope.imageFiles[j].lastModifiedDate = file.lastModifiedDate;
          }
        }
      }, ErrorHandler.alert);
    }
  }

  function captureSuccess(mediaFiles) {
    console.log("success capture!!");
    console.log(mediaFiles[0]);
    var file = mediaFiles[0];
    file.src = "file://" + file.fullPath;
    $scope.imageFiles.push(file);
  };

  var readEntries = function() {
    $scope.imageFiles = [];
    if (typeof LocalFileSystem !== "undefined") {
      window.requestFileSystem(LocalFileSystem.TEMPORARY, 0, onFileSystemSuccess, ErrorHandler.alert);
    }
  };
  readEntries();

  $scope.takePicture = function() {
    var options = {}; // { limit: 3 };
    if (navigator.device) {
      navigator.device.capture.captureImage(captureSuccess, ErrorHandler.alert, options);
    } else {
      // dummy
      $scope.imageFiles.push({ name: "aaa.jpg" });
    }
  };
});
