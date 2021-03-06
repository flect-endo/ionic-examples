// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.services', 'starter.controllers'])

.constant('APP_URL', 'http://localhost:3000/')
.constant('DEFAULT_EMAIL', '')
.constant('DEFAULT_PASSWORD', '')

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('login', {
    url: "/login",
    templateUrl: "templates/login.html",
    controller: "LoginCtrl"
  })

  .state('signup', {
    url: "/signup",
    templateUrl: "templates/signup.html",
    controller: 'SignupCtrl'
  })

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html"
  })

  .state('app.home', {
    url: "/home",
    views: {
      'menuContent': {
        templateUrl: "templates/home.html"
      }
    }
  })

  .state('app.todo', {
    url: "/todo",
    views: {
      'menuContent': {
        templateUrl: "templates/todo.html",
        controller: 'TodoCtrl'
      }
    }
  })

  .state('app.attendance', {
    url: "/attendance",
    views: {
      'menuContent': {
        templateUrl: "templates/attendance.html",
        controller: 'AttendanceCtrl'
      }
    }
  })

  .state('app.today', {
    url: "/attendance/today",
    views: {
      'menuContent': {
        templateUrl: "templates/today-attendance.html",
        controller: 'AttendanceCtrl'
      }
    }
  })

  .state('app.map', {
    url: "/map",
    views: {
      'menuContent': {
        templateUrl: "templates/map.html",
        controller: 'MapCtrl'
      }
    }
  })

  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html"
      }
    }
  })

  .state('app.playlists', {
    url: "/playlists",
    views: {
      'menuContent': {
        templateUrl: "templates/playlists.html",
        controller: 'PlaylistsCtrl'
      }
    }
  })

  .state('app.single', {
    url: "/playlists/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    }
  })

  .state('app.image', {
    url: "/image",
    views: {
      'menuContent': {
        templateUrl: "templates/image.html",
        controller: 'ImageCtrl'
      }
    }
  })

  .state('app.inappbrowser', {
    url: "/inappbrowser",
    views: {
      'menuContent': {
        templateUrl: "templates/inappbrowser.html",
        controller: 'InAppBrowserCtrl'
      }
    }
  })

  .state('app.media', {
    url: "/media",
    views: {
      'menuContent': {
        templateUrl: "templates/media.html",
        controller: 'MediaCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
