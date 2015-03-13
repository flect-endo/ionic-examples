angular.module('starter.services')
.service('LoginService', function($q, Client) {

  return {
    loginUser: function(email, password) {
      var deferred = $q.defer();
      var promise = deferred.promise;

      Client.post("users/sign_in.json", { user: { email: email, password: password} },
        function(data, status, headers, config) {
          deferred.resolve(data);
        },
        function(data, status, headers, config) {
          deferred.reject('Wrong credentials.');
        }
      );

      promise.success = function(fn) {
        promise.then(fn);
        return promise;
      }
      promise.error = function(fn) {
        promise.then(null, fn);
        return promise;
      }
      return promise;
    }
  }
});