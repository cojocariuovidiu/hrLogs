angular.module("researchApp")
	.config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('login', {
            url: '/',
            templateUrl: 'views/login.html',
            controller: 'loginController'
          })
          .state('home', {
            url: '/home',
            templateUrl: 'views/dashboard.html',
            controller: 'dashboardController'
          })
        $urlRouterProvider.otherwise('/');   
    })