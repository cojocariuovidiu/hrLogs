angular.module("researchApp")
	.config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('home', {
            url: '/',
            templateUrl: 'views/dashboard.html',
            controller: 'dashboardController'
          })
        $urlRouterProvider.otherwise('/');   
    })