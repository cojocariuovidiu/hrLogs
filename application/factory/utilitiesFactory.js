angular.module("researchApp")
	.factory("utilitiesFactory", utilitiesFactory);

	function utilitiesFactory(){
		return {
			formatCurrency:function(value){
				return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
			},
			formatDate:function(value){
				return this.formatCurrency(value);
			}
		}
	}