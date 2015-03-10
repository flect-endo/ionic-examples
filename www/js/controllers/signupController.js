angular.module('starter.controllers')
.controller('SignupCtrl', function($scope, Client) {

  // Form data for the login modal
  $scope.loginData = {};

  // Perform the login action when the user submits the login form
  $scope.doRegistration = function() {
    var requestData = { user: $scope.loginData };

    Client.post("users.json", { user: $scope.loginData },
      function(data, status, headers, config) {
        console.log('success');
        console.log(data);
      },
      function(data, status, headers, config) {
        console.log(data);
      }
    );
  };
});
