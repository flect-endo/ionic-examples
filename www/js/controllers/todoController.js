angular.module('starter.controllers')
.controller('TodoCtrl', function($scope, $ionicModal, Client) {
  $scope.tasks = [];

  Client.get("checklists.json", function(data, status, headers, config) {
      $scope.tasks = data;
      $scope.tasks.forEach(function(task) {
        task.checked = false;
      });
  }, function(data, status, headers, config) {
      console.log(data);
  });

  $ionicModal.fromTemplateUrl('templates/new-task.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.taskModal = modal;
  });

  $scope.submit = function() {
    Client.post("users/checklists.json", { tasks: $scope.tasks },
      function(data, status, headers, config) {
        console.log('success');
        console.log(data);
      },
      function(data, status, headers, config) {
        console.log(data);
      }
    );
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