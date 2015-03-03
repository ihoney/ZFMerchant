'user strict';

// 系统设置模块
var messageModule = angular.module("messageModule", []);

var messageController = function($scope, $location, $http, LoginService) {
	$scope.req={};
	$scope.init = function() {
		$("#leftRoute").show();
		$scope.req.id=$location.search()['id'];
		if($scope.req.id>0){
			//alert("info");
		}else{
			//alert("list");
		}
		
	};
	$scope.req
	$scope.init();
};



messageModule.controller("messageController", messageController);
