angular.module('starter.services', [])

.factory('PlaylistService', function() {

    var playlists = [
        { title: 'Reggae', id: 1 },
        { title: 'Chill', id: 2 },
        { title: 'Dubstep', id: 3 },
        { title: 'Indie', id: 4 },
        { title: 'Rap', id: 5 },
        { title: 'Cowbell', id: 6 }
    ];

    return {
        all: function() {
            return playlists;
        },
        get: function(playlistId) {
            return playlists[playlistId-1];
        }
    }
});