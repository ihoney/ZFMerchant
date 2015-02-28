'user strict';

//系统设置模块
var headModule = angular.module("headModule",['headRouteModule']);

var headController = function ($scope, $http, LoginService) {
	$scope.searchShop=function(){
		window.location.href = '#/shop';
	};
};

headModule.controller("headController", headController);

