angular.module('starter.controllers')
.controller('AppCtrl', function($scope, $ionicModal, $http, Account, APP_URL) {
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

    $http({
        method: 'POST',
        withCredentials: true,
        url: APP_URL + "users/sign_in.json",
        data: { user: $scope.loginData },
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json; charset=utf-8' // ,
            // 'Access-Control-Request-Headers': 'X-Requested-With, content-type, accept, origin, withcredentials'
        }
    })
    .success(function(data, status, headers, config) {
        console.log('success');
        Account.email = data.email;
        Account.token = data.authentication_token;
        $scope.closeLogin();
    })
    .error(function(data, status, headers, config) {
        console.log(data);
        $scope.closeLogin();
    });
  };
});
