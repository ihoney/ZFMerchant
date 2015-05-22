'user strict';

//系统设置模块
var headModule = angular.module("headModule",['headRouteModule']);

var headController = function ($scope,LoginService) {
	$scope.shopcount=LoginService.shopcount;
	$scope.searchShop=function(){
		window.location.href = '#/shop';
	};
};
var lowstocksController = function ($scope) {
	$scope.$emit('topTitle',"华尔街金融平台-库存不足");
};
var lowstocksController = function ($scope) {
	$scope.$emit('topTitle',"华尔街金融平台-库存不足");
};
var userdownController = function ($scope) {
	$scope.$emit('topTitle',"华尔街金融平台-app下载");
};
headController.$inject = ['$scope','LoginService'];
headModule.controller("headController", headController);

