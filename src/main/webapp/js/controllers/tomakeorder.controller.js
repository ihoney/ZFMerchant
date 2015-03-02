'user strict';

// 系统设置模块
var tomakeorderModule = angular.module("tomakeorderModule", []);

var tomakeorderController = function($scope, $location, $http, LoginService) {
	$scope.list=LoginService.goods;
};

tomakeorderModule.controller("tomakeorderController", tomakeorderController);
