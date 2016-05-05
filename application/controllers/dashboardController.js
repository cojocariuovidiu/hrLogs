angular.module("researchApp")
	.controller("dashboardController", dashboardController);

	function dashboardController($scope, $http, $rootScope, userService){
		$scope.gridOptions = {
		    columnDefs: [
				{ field: '_id', visible: false, displayName: 'ID' },
				{ field: 'emp_id', displayName: 'Emp ID' },
				{ field: 'First Name', displayName: 'First name' },
				{ field: 'Last Name', displayName: 'Last name' },
				{ field: 'Manager Name', displayName: 'Manager name' },
				{ field: 'Date of joining', displayName: 'DOJ' },
				{ field: 'Education', displayName: 'Education' },
				{ field: 'Work Experience', displayName: 'Work Exp' },
			],
			paginationPageSizes: [10, 15, 25, 50],
		    paginationPageSize: 10,	
		    enableGridMenu: true,
		    enableSelectAll: true,
		    exporterCsvFilename: 'employees.csv',
		    exporterPdfDefaultStyle: {fontSize: 9},
		    exporterPdfTableStyle: {margin: [30, 30, 30, -20]},
		    exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: false, color: 'red'},
		    exporterPdfHeader: { text: "List of Employees", style: 'headerStyle' },
		    exporterPdfFooter: function ( currentPage, pageCount ) {
		      return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
		    },
		    exporterPdfCustomFormatter: function ( docDefinition ) {
		      docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
		      docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
		      return docDefinition;
		    },
		    exporterPdfOrientation: 'portrait',
		    exporterPdfPageSize: 'LETTER',
		    exporterPdfMaxGridWidth: 500,
		    exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
		    onRegisterApi: function(gridApi){
		      $scope.gridApi = gridApi;
		      // gridApi.selection.on.rowSelectionChanged($scope,function(row){
		      //   var msg = 'row selected ' + row.isSelected;
		      //   console.log(msg);
		      // });

		      // gridApi.selection.on.rowSelectionChangedBatch($scope,function(rows){
		      //   var msg = 'rows changed ' + rows.length;
		      //   console.log(msg);
		      // });
		    }	    
		};
		$scope.showData = true;
		
		$scope.deleteSelected = function(){
	      angular.forEach($scope.gridApi.selection.getSelectedRows(), function (data, index) {
	      	$http.delete("http://localhost:3000/employees/"+data._id).then(function(response){
	      		if(response.data.isSuccess){
	      			console.log(response.data.recordsDeleted+" employees deleted");
	      			$scope.gridOptions.data.splice($scope.gridOptions.data.lastIndexOf(data), 1);
	      		}
	      		else{
	      			console.log("Couldn't find the record or something went wrong");
	      		}
	      	})	        
	      });
	    }

	    $scope.authenticate = function(){
	    	var data = {
             	"username":"manager",
             	"password":"test@123"
           	}
	    	$http.post("http://localhost:3000/authenticate", data).then(function(response){
	    		userService.setUserObj(response.data);
	    		$scope.populateData();
	    	})
	    }
	    $scope.populateData = function(){
	    	var dataPromise = $http({method: 'GET', url: 'http://localhost:3000/employees/', headers: {
			    "X-access-token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0MTE5MjcyMDAzNjl9.cuUKFKsf2qhQJHToP-zBmObhMwi84rhnrhH03OdyzSA"}
			});
			dataPromise.then(function(response){
				$scope.showData = true;				
				$scope.gridOptions.data = response.data;
			})
	    }		
		$scope.populateData();
	}