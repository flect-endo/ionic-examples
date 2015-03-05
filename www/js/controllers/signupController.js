angular.module('starter.controllers')
.controller('SignupCtrl', function($scope, $http) {
  // FIXME: 検証コード。Controller が直接 $resource に依存するのはアンチパターン

  // Form data for the login modal
  $scope.loginData = {};

  // Perform the login action when the user submits the login form
  $scope.doRegistration = function() {
    var requestData = { user: $scope.loginData };

    $http({
        method: 'POST',
        withCredentials: true,
        url: "http://localhost:3000/users.json",
        data: requestData,
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json; charset=utf-8',
            'Access-Control-Request-Headers': 'X-Requested-With, content-type, accept, origin, withcredentials'
        }
    })
    .success(function(data, status, headers, config) {
        console.log('success');
        console.log(data);
    })
    .error(function(data, status, headers, config) {
        console.log(data);
    });
  };
});
