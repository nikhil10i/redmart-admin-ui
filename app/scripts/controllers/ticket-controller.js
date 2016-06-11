'use strict';
angular.module('sbAdminApp').controller('ticketController', ['$modal', '$scope', 'ticketService', '$log',
function($modal, $scope, ticketService, $log) {

	/* pagination settings */
	var updatePaginationInfo = function() {
		$scope.pagination = {
			totalItems : $scope.tickets.length,
			maxVisiblePageLinks : 5,
			currentPage : 1,
			pageSize : 10
		};
	};

	$scope.getTickets = function() {
		ticketService.getTickets().then(function(response) {
			$scope.tickets = response;
		});
	};

	$scope.getTickets();

	$scope.addTicket = function() {
		var ticket = {
			"title" : "",
			"description" : "",
			"status" : {},
			"customer" : {},
			"user" : {},
			"module" : {},
			"resolution" : {},
			"createdBy" : 1000,
			"updatedBy" : 1000
		};

		var modalInstance = $modal.open({
			templateUrl : 'views/dashboard/addTicket.html',
			controller : 'addTicketInstanceController',
			size : 'md',
			resolve : {
				ticket : function() {
					return $scope.ticket;
				}
			}
		});

		modalInstance.result.then(function(ticket) {
			updatePaginationInfo();
		}, function(ticket) {
			$log.info('Modal dismissed at: ' + new Date());
		});

	};

	$scope.updateTicket = function(ticket) {
		var modalInstance = $modal.open({
			templateUrl : 'views/dashboard/addTicket.html',
			controller : 'addTicketInstanceController',
			size : 'md',
			resolve : {
				ticket : function() {
					return $scope.ticket;
				}
			}
		});
		modalInstance.result.then(function(ticket) {

		}, function(city) {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};
}]);

angular.module('sbAdminApp').controller('addTicketInstanceController', ['ticketService', 'ticket','$state', '$scope', '$modalInstance', '$http', '$modal', '$log',
function(ticketService, ticket,$state, $scope, $modalInstance, $http, $modal, $log) {

	$scope.getModules = function() {
		ticketService.getModules().then(function(response) {
			$scope.modules = response;
		});
	};

	$scope.getStatus = function() {
		ticketService.getStatus().then(function(response) {
			$scope.status = response;
		});
	};

	$scope.getResolutions = function() {
		ticketService.getResolution().then(function(response) {
			$scope.resolutions = response;
		});
	};

	$scope.getCustomers = function() {
		ticketService.getCustomers().then(function(response) {
			$scope.customers = response;
		});
	};
	$scope.getUsers = function() {
		ticketService.getUsers().then(function(response) {
			$scope.users = response;
		});
	};

	$scope.getModules();
	$scope.getStatus();
	$scope.getResolutions();
	$scope.getCustomers();
	$scope.getUsers();

	$scope.updateOrCreate = function(ticket) {
		ticketService.createTicket(ticket).then(function(data, response, headers) {
			console.log("checking the data " + data);
			$modalInstance.close(data);
		}, function(data, response) {

		});

	};

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};

}]);
