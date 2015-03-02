angular.module('starter.controllers')
.controller('InAppBrowserCtrl', function($scope) {
  document.addEventListener("deviceready", onDeviceReady, false);

  function onDeviceReady() {
    var ref = window.open('http://www.flect.co.jp/', '_blank', 'location=yes');
    ref.addEventListener('loadstart', function(event) { alert('start: ' + event.url); });
    ref.addEventListener('loadstop', function(event) { alert('stop: ' + event.url); });
    ref.addEventListener('loaderror', function(event) { alert('error: ' + event.message); });
    ref.addEventListener('exit', function(event) { alert(event.type); });
  };
});