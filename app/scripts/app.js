'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
angular.module('sbAdminApp', ['oc.lazyLoad', 'ui.router', 'ui.bootstrap', 'angular-loading-bar','smart-table']).config(['$httpProvider','$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider',
function($httpProvider,$stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

	$ocLazyLoadProvider.config({
		debug : false,
		events : true,
	});

	$urlRouterProvider.otherwise('/dashboard/home');

	$stateProvider.state('dashboard', {
		url : '/dashboard',
		templateUrl : 'views/dashboard/main.html',
		resolve : {
			loadMyDirectives : function($ocLazyLoad) {
				return $ocLazyLoad.load({
					name : 'sbAdminApp',
					files : ['scripts/directives/header/header.js', 'scripts/config.app.js', 'scripts/controllers/ticket-controller.js', 'scripts/controllers/ticket-service.js', 'scripts/directives/sidebar/sidebar.js']
				}), $ocLazyLoad.load({
					name : 'toggle-switch',
					files : ["bower_components/angular-toggle-switch/angular-toggle-switch.min.js", "bower_components/angular-toggle-switch/angular-toggle-switch.css"]
				}), $ocLazyLoad.load({
					name : 'ngAnimate',
					files : ['bower_components/angular-animate/angular-animate.js']
				});
				$ocLazyLoad.load({
					name : 'ngCookies',
					files : ['bower_components/angular-cookies/angular-cookies.js']
				});

				$ocLazyLoad.load({
					name : 'ngResource',
					files : ['bower_components/angular-resource/angular-resource.js']
				});

				$ocLazyLoad.load({
					name : 'ngSanitize',
					files : ['bower_components/angular-sanitize/angular-sanitize.js']
				});

				$ocLazyLoad.load({
					name : 'ngTouch',
					files : ['bower_components/angular-touch/angular-touch.js']
				});
			}
		}
	}).state('dashboard.home', {
		url : '/home',
		controller : 'MainCtrl',
		templateUrl : 'views/dashboard/home.html',
		resolve : {
			loadMyFiles : function($ocLazyLoad) {
				return $ocLazyLoad.load({
					name : 'sbAdminApp',
					files : ['scripts/controllers/main.js', 'scripts/directives/timeline/timeline.js', 'scripts/directives/notifications/notifications.js', 'scripts/directives/chat/chat.js', 'scripts/directives/dashboard/stats/stats.js']
				});
			}
		}
	});
}]);
