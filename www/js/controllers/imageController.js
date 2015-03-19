angular.module('starter.controllers')
.controller('ImageCtrl', function($scope, ErrorHandler, APP_URL) {

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

      // FileEntry はサイズや更新時刻をプロパティに持たないので、
      // FileEntry.file() で File を取得
      entry.file(function(file) {
        for (var j=0; j<$scope.imageFiles.length; j++) {
          if (file.name === $scope.imageFiles[j].name) {
            $scope.imageFiles[j].localURL = file.localURL;
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

  $scope.uploadPicture = function(fileURI) {
    console.log("uploading file " + fileURI);

    var win = function(r) {
      console.log("upload success");
      console.log("Code = " + r.responseCode);
      console.log("Response = " + r.response);
      console.log("Sent = " + r.bytesSent);
    };
    var fail = function (error) {
      alert("An error has occurred: Code = " + error.code);
      console.log("upload error source " + error.source);
      console.log("upload error target " + error.target);
    };

    // ドキュメント的には FileUploadOptions オブジェクトが必要だが、
    // ソースを見る限り普通のオブジェクトでよい模様
    // (というか FileUploadOptions は undefined )
    var options = {};
    options.fileKey = "file";
    options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";

    var destination = encodeURI(APP_URL + "pictures.json");
    console.log("destination = " + destination);

    var ft = new FileTransfer();
    ft.upload(fileURI, destination, win, fail, options);
  };
});
