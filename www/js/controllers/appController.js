angular.module('starter.controllers')
.controller('AppCtrl', function($scope, $ionicModal, Client, Account) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    Client.post("users/sign_in.json", { user: $scope.loginData },
      function(data, status, headers, config) {
        console.log('success');
        Account.id = data.id;
        Account.email = data.email;
        Account.token = data.authentication_token;
        $scope.closeLogin();
      },
      function(data, status, headers, config) {
        console.log(data);
        $scope.closeLogin();
      }
    );
  };
});
