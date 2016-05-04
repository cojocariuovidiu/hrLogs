angular.module("researchApp")
	.controller("loginController", loginController);

	function loginController($scope, $http, $rootScope, userService){
		$scope.user = {};
	}