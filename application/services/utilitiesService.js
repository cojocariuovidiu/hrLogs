angular.module("researchApp")
	.service("utilitiesService", utilitiesService);

	function utilitiesService(){
		this.sum = 10000;
		this.formatCurrency = function(value){
			return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
		}
		this.formatDate = function(value){
			return this.formatCurrency(value);
		}
	}