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
			"comments" : [{}],
			"createdBy" : 1000,
			"updatedBy" : 1000
		};

		var modalInstance = $modal.open({
			templateUrl : 'views/dashboard/addTicket.html',
			controller : 'addTicketInstanceController',
			size : 'md',
			resolve : {
				selectedTicket : function() {
					return $scope.addTicket;
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
			templateUrl : 'views/dashboard/updateTicket.html',
			controller : 'addTicketInstanceController',
			size : 'md',
			resolve : {
				selectedTicket : function() {
					return angular.copy(ticket);
				}
			}
		});
		modalInstance.result.then(function(ticket) {

		}, function(city) {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};
}]);

angular.module('sbAdminApp').controller('addTicketInstanceController', ['ticketService', 'selectedTicket','$state', '$scope', '$modalInstance', '$http', '$modal', '$log',
function(ticketService, selectedTicket,$state, $scope, $modalInstance, $http, $modal, $log) {

	$scope.getModules = function() {
		ticketService.getModules().then(function(response) {
			$scope.modules = response;
			angular.forEach($scope.modules, function(value, key){
$scope.modulesMap[value.id] = {};
				$scope.modulesMap[value.id]= value;

			});
		});
	};

	$scope.getStatus = function() {
		ticketService.getStatus().then(function(response) {
			$scope.status = response;

			angular.forEach($scope.status, function(value){

$scope.statusMap[value.id] = {};
				$scope.statusMap[value.id] = value;
			});
		});
	};

	$scope.getResolutions = function() {
		ticketService.getResolution().then(function(response) {
			$scope.resolutions = response;

			angular.forEach($scope.resolutions, function(value){
$scope.resolutionsMap[value.id] = {};
				$scope.resolutionsMap[value.id] = value;
			});
		});
	};

	$scope.getCustomers = function() {
		ticketService.getCustomers().then(function(response) {
			$scope.customers = response;

			angular.forEach($scope.customers, function(value, key){
				$scope.customersMap[value.id] = {};
				$scope.customersMap[value.id] = value;

				});
		});
	};
	$scope.getUsers = function() {
		ticketService.getUsers().then(function(response) {
			$scope.users = response;

			angular.forEach($scope.users, function(value, key){
$scope.usersMap[value.id] = {};
				$scope.usersMap[value.id]= value;

				});
		});
	};

	$scope.getModules();
	$scope.getStatus();
	$scope.getResolutions();
	$scope.getCustomers();
	$scope.getUsers();

	$scope.ticket = selectedTicket;

	$scope.updateOrCreate = function(ticket, isCreate) {

		if(isCreate != 'true' && angular.isDefined(ticket.tempComment)){
			var tempComment = {
			     "ticketId": ticket.id,
			     "createdBy": 1000,
			     "text": ticket.tempComment
		   };

			 ticket.comments.push(tempComment);
  		 delete ticket.tempComment;
		};

		ticket.module = modulesMap[ticket.module.id];
		ticket.user = usersMap[ticket.user.id];
		ticket.customer = customersMap[ticket.customer.id];
		ticket.resolution = resolutionsMap[ticket.resolution.id];

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
