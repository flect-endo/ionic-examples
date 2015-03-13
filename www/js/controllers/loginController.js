angular.module('starter.controllers')
.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state, Account) {
  $scope.data = {};

  $scope.login = function() {
    console.log("LOGIN");

    LoginService.loginUser($scope.data.email, $scope.data.password)
    .success(function(data) {
      Account.id = data.id;
      Account.email = data.email;
      Account.token = data.authentication_token;
      $state.go('app.todo');
    })
    .error(function(data) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login Failed!',
        template: 'Please check your credentials!'
      });
    });
  }
})