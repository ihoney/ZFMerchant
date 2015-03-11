'user strict';

// 创建商户
var merchantAddModule = angular.module("merchantAddModule", []);
var merchantAddController = function($scope, $http, $location, LoginService) {
	$scope.merchantAdd = function() {
		$scope.merchant.customerId = 80;
		$http.post("api/merchant/insert", $scope.merchant).success(function(data) {
			if (data.code == 1) {

			} else {
				alert(data.message);
			}
		}).error(function(data) {

		});
	};
	$scope.init = function() {

	};
	$scope.init();
};
merchantAddModule.controller("merchantAddController", merchantAddController);