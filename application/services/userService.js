angular.module("researchApp")
	.service("userService", userService);

	function userService(){
		this.user = null;
		this.getUserObj = function(){
			if(this.user){
				return this.user;
			}
		}
		this.setUserObj = function(obj){
			if(obj){
				this.user = obj;
			}
		}
	}