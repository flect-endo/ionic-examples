angular.module('starter.controllers')
.controller('MediaCtrl', function($scope) {
  $scope.hoge = "hogehoge";

  document.addEventListener("deviseready", onDeviseReady, false);

  function onDeviseReady() {
    alert("devise readied!");
    var src = "hoge.mp3";
    var media = new Media(src,
      function() {
        alert("success");
      },
      function(err) {
        alert("error: " + err.code);
      }
    );
    media.startRecord();
  }
});
