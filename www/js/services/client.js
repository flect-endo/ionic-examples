angular.module('starter.services')
.factory('Client', function($http, Account, APP_URL) {

  // アクセスURLを組み立てる。
  // 認証パラメータが必要なAPI(サインアップ、ログイン、ログアウト以外全て)は
  // 認証トークン用のクエリパラメータを付与して返す。
  function buildUrl(path) {
    var url = APP_URL + path;
    if (Account.email && Account.token) {
      url = url + "?email=" + Account.email + "&token=" + Account.token;
    };
    return url;
  };

  var headers = {
    'Accept':'application/json',
    'Content-Type':'application/json; charset=utf-8',
    'Access-Control-Request-Headers': 'X-Requested-With, content-type, accept, origin, withcredentials'
  };

  var get = function(path, successCallback, errorCallback) {
    $http({
        method: 'GET',
        withCredentials: true,
        url: buildUrl(path),
        headers: headers
    })
    .success(successCallback)
    .error(errorCallback);
  };

  var post = function(path, data, successCallback, errorCallback) {
    $http({
        method: 'POST',
        withCredentials: true,
        url: buildUrl(path),
        data: data,
        headers: headers
    })
    .success(successCallback)
    .error(errorCallback);
  };

  return {
    get: get,
    post: post
  };
});