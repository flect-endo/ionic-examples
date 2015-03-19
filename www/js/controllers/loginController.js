angular.module('starter.controllers')
.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $ionicLoading, $state,
      Account, DEFAULT_EMAIL, DEFAULT_PASSWORD) {
  $scope.data = {
    // 開発時に毎回入力が面倒なので、値をセットしておく
    email: DEFAULT_EMAIL,
    password: DEFAULT_PASSWORD
  };

  $scope.login = function() {
    console.log("LOGIN");

    LoginService.loginUser($scope.data.email, $scope.data.password)
    .success(function(data) {
      Account.id = data.id;
      Account.email = data.email;
      Account.token = data.authentication_token;
      $state.go('app.home');
    })
    .error(function(data) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login Failed!',
        template: 'Please check your credentials!'
      });
    });
  }
})
