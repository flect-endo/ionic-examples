angular.module('starter.controllers')
.controller('TodoCtrl', function($scope, $ionicModal, Account, Client) {
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
    // バックエンドのAPI仕様に合わせ、チェックした項目のIDだけを送る
    var checkedIds = $scope.tasks.filter(function(task, index, array) {
      return task.checked;
    }).map(function(task, index, array) {
      return task.id;
    });
    var requestData = { user: { user_checklists: checkedIds } };
    Client.post("users/" + Account.id + "/checklists.json", requestData,
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