'user strict';

//系统设置模块
var shopcartModule = angular.module("shopcartModule",[]);

var shopcartController = function ($scope,$location, $http, LoginService) {
	$scope.req={};
	$scope.req.goodId=$location.search()['goodId'];
	$scope.req.city_id=LoginService.city;
	$scope.init = function () {
		$("#leftRoute").hide();
		
		
    };
   
    $scope.init();

};





shopcartModule.controller("shopcartController", shopcartController);
