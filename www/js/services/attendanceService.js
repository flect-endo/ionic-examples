angular.module('starter.services')
.service('AttendanceService', function($q, Account, AsyncClient, Client) {

  return {
    all: function() {
      return AsyncClient.get("users/" + Account.id + "/attendances.json");
    },
    start: function() {
      return AsyncClient.post("users/" + Account.id + "/attendances/clock_in.json", {});
    },
    end: function() {
      return AsyncClient.post("users/" + Account.id + "/attendances/clock_out.json", {});
    }
  }
});