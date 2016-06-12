'use strict';
angular.module('sbAdminApp').factory('ticketService', ['$q', '$http',
function($q, $http) {

	var getModules = function() {
		var deferred = $q.defer();
		$http.get('https://ticketing-system-api.herokuapp.com/api/v1/' + 'modules').success(function(response) {
			deferred.resolve(response);
		}).error(function(response) {
			deferred.reject(response);
		});
		return deferred.promise;
	};

	var getStatus = function() {
		var deferred = $q.defer();
		$http.get('https://ticketing-system-api.herokuapp.com/api/v1/status').success(function(response) {
			deferred.resolve(response);
		}).error(function(response) {
			deferred.reject(response);
		});
		return deferred.promise;
	};

	var getResolution = function() {
		var deferred = $q.defer();
		$http.get('https://ticketing-system-api.herokuapp.com/api/v1/resolutions').success(function(response) {
			deferred.resolve(response);
		}).error(function(response) {
			deferred.reject(response);
		});
		return deferred.promise;
	};

	var getCustomers = function() {
		var deferred = $q.defer();
		$http.get('https://ticketing-system-api.herokuapp.com/api/v1/customers').success(function(response) {
			deferred.resolve(response);
		}).error(function(response) {
			deferred.reject(response);
		});
		return deferred.promise;
	};

	var getUsers = function() {
		var deferred = $q.defer();
		$http.get('https://ticketing-system-api.herokuapp.com/api/v1/users').success(function(response) {
			deferred.resolve(response);
		}).error(function(response) {
			deferred.reject(response);
		});
		return deferred.promise;
	};

	var getTickets = function() {
		var deferred = $q.defer();
		$http.get('https://ticketing-system-api.herokuapp.com/api/v1/tickets').success(function(response) {
			deferred.resolve(response);
		}).error(function(response) {
			deferred.reject(response);
		});
		return deferred.promise;
	};

	var getComments = function() {
		var deferred = $q.defer();
		$http.get('https://ticketing-system-api.herokuapp.com/api/v1/comments').success(function(response) {
			deferred.resolve(response);
		}).error(function(response) {
			deferred.reject(response);
		});
		return deferred.promise;
	};

	var createTicket = function(ticket) {
		var deferred = $q.defer();
		$http.post('https://ticketing-system-api.herokuapp.com/api/v1/tickets', ticket).success(function(response) {
			deferred.resolve(response);
		}).error(function(response) {
			deferred.reject(response);
		});
		return deferred.promise;
	};

	return {
		getModules : getModules,
		getStatus : getStatus,
		getResolution : getResolution,
		getCustomers : getCustomers,
		getUsers : getUsers,
		getTickets : getTickets,
		getComments : getComments,
		createTicket : createTicket
	};
}]);
