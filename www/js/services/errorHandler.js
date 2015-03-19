angular.module('starter.services')
.factory('ErrorHandler', function() {

  return {
    alert: function(error) {
      navigator.notification.alert('Error: ' + error.code, null, 'Uh oh!');
    }
  };
});