angular.module("researchApp")
	.controller("dashboardController", dashboardController);

	function dashboardController($scope, $http, $rootScope, utilitiesService){
		var dataPromise = $http.get("http://localhost:3000/service/getData.json");
		var calculatePL = function(buy, sell){
			return (sell.Price*sell.Quantity - buy.Price*buy.Quantity).toFixed(2)
		}
		dataPromise.then(function(response){
			$scope.myData = response.data;
			var current = "";
			current = $scope.myData[0].Symbol;
			$scope.myData.forEach(function(a,b){
				$scope.myData[b]["pl"] = 0;
				if(b>0 && $scope.myData[b].Symbol == current){
					$scope.myData[b].Symbol = ""
					$scope.myData[b]["pl"] = calculatePL($scope.myData[b], $scope.myData[b-1])
				}
				else{
					current = $scope.myData[b].Symbol
				}
			})
		})
	}