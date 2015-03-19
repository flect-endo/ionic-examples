angular.module('starter.services')
.factory('AsyncClient', function($q, $http, Client, Account, APP_URL) {

  function proceed(proc) {
    var deferred = $q.defer();
    var promise = deferred.promise;

    var onSuccess = function(data, status, headers, config) {
      deferred.resolve(data);
    };
    var onError = function(data, status, headers, config) {
      deferred.reject('Wrong credentials.');
    }

    proc(onSuccess, onError);

    promise.success = function(fn) {
      promise.then(fn);
      return promise;
    }
    promise.error = function(fn) {
      promise.then(null, fn);
      return promise;
    }
    return promise;
  };

  return {
    get: function(path) {
      return proceed(function(onSuccess, onError) {
        Client.get(path, onSuccess, onError);
      });
    },
    post: function(path, data) {
      return proceed(function(onSuccess, onError) {
        Client.post(path, data, onSuccess, onError);
      });
    }
  };
});