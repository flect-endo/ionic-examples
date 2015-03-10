angular.module('starter.controllers')
.controller('TodoCtrl', function($scope, $ionicModal, $http, Account, APP_URL) {
  $scope.tasks = [];

  $http({
      method: 'GET',
      withCredentials: true,
      url: APP_URL + "checklists.json?email=" + Account.email + "&token=" + Account.token,
      headers:{
          'Accept':'application/json',
          'Content-Type':'application/json; charset=utf-8',
          'Access-Control-Request-Headers': 'X-Requested-With, content-type, accept, origin, withcredentials'
      }
  })
  .success(function(data, status, headers, config) {
      $scope.tasks = data;
      $scope.tasks.forEach(function(task) {
        task.checked = false;
      });
  })
  .error(function(data, status, headers, config) {
      console.log(data);
  });

  $ionicModal.fromTemplateUrl('templates/new-task.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.taskModal = modal;
  });

  $scope.submit = function() {
    $http({
        method: 'POST',
        withCredentials: true,
        url: APP_URL + "users/checklists.json?email=" + Account.email + "&=token=" + Account.token,
        data: { tasks: $scope.tasks },
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

  $scope.createTask = function(task) {
    $scope.tasks.push({
      title: task.title
    });
    $scope.taskModal.hide();
    task.title = "";
  };

  $scope.newTask = function() {
    $scope.taskModal.show();
  };

  $scope.closeNewTask = function() {
    $scope.taskModal.hide();
  };
});