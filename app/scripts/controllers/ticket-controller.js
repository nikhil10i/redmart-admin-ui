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
			$scope.displayedTickets = $scope.tickets;
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
			"createdBy" : 1000,
			"updatedBy" : 1000
		};

		var modalInstance = $modal.open({
			templateUrl : 'views/dashboard/addTicket.html',
			controller : 'addTicketInstanceController',
			size : 'md',
			resolve : {
				selectedTicket : function() {
					return angular.copy(ticket);
				}
			}
		});

		modalInstance.result.then(function(ticket) {
			$scope.getTickets();
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
			$scope.getTickets();
		}, function(city) {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};

	$scope.viewTicket = function(ticket) {
		var modalInstance = $modal.open({
			templateUrl : 'views/dashboard/viewTicket.html',
			controller : 'addTicketInstanceController',
			size : 'md',
			resolve : {
				selectedTicket : function() {
					return angular.copy(ticket);
				}
			}
		});
		modalInstance.result.then(function(ticket) {
			$scope.getTickets();
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

			$scope.modulesMap = [{}];
			angular.forEach($scope.modules, function(value, key){
				$scope.modulesMap[value.id] = {};
				$scope.modulesMap[value.id]= value;

			});
		});
	};

	$scope.getStatus = function() {
		ticketService.getStatus().then(function(response) {
			$scope.statuss = response;

			$scope.statusMap = [{}];
			angular.forEach($scope.statuss, function(value){

				$scope.statusMap[value.id] = {};
				$scope.statusMap[value.id] = value;
			});
		});
	};

	$scope.getResolutions = function() {
		ticketService.getResolution().then(function(response) {
			$scope.resolutions = response;

			$scope.resolutionsMap = [{}];
			angular.forEach($scope.resolutions, function(value){
				$scope.resolutionsMap[value.id] = {};
				$scope.resolutionsMap[value.id] = value;
			});
		});
	};

	$scope.getCustomers = function() {
		ticketService.getCustomers().then(function(response) {
			$scope.customers = response;

			$scope.customersMap = [{}];
			angular.forEach($scope.customers, function(value, key){
				$scope.customersMap[value.id] = {};
				$scope.customersMap[value.id] = value;

				});
		});
	};
	$scope.getUsers = function() {
		ticketService.getUsers().then(function(response) {
			$scope.users = response;

			$scope.usersMap = [{}];
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



		if(isCreate == 'true' || isCreate =='false'){
			if(angular.isDefined(ticket.module.id))
				ticket.module = $scope.modulesMap[ticket.module.id];

			if(angular.isDefined(ticket.status.id))
				ticket.status = $scope.statusMap[ticket.status.id];

			if(angular.isDefined(ticket.user.id))
				ticket.user = $scope.usersMap[ticket.user.id];

			if(angular.isDefined(ticket.customer.id))
				ticket.customer = $scope.customersMap[ticket.customer.id];

			if(angular.isDefined(ticket.resolution))
				ticket.resolution = $scope.resolutionsMap[ticket.resolution.id];
	  }

		if(isCreate != 'true' && angular.isDefined(ticket.tempComment)){
			var tempComment = {
			     "ticketId": ticket.id,
			     "createdBy": 1000,
			     "text": ticket.tempComment
		   };

			 ticket.comments.push(tempComment);
  		 delete ticket.tempComment;
		};

		if(isCreate == 'true'){
			ticketService.createTicket(ticket).then(function(data, response, headers) {
				console.log("checking the data " + data);
				$modalInstance.close(data);
			}, function(data, response) {

			});

		} else if (isCreate == 'false'){
			ticketService.updateTicket(ticket).then(function(data, response, headers) {
				console.log("checking the data " + data);
				$modalInstance.close(data);
			}, function(data, response) {

			});

		}

	};

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};

}]);

angular.module('sbAdminApp').directive('searchWatchModel',function(){
  return {
    require:'^stTable',
    scope:{
      searchWatchModel:'='
    },
    link:function(scope, ele, attr, ctrl){
      var table=ctrl;

      scope.$watch('searchWatchModel',function(val){
        ctrl.search(val);
      });

    }
  };
});
