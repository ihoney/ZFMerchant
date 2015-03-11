'user strict';

// 商户详情
var merchantOneModule = angular.module("merchantOneModule", []);
var merchantOneController = function($scope, $http, $location, LoginService) {
	$scope.merchantOne = function(e) {
		var merchantId = $location.search()['merchantId'];
		$http.get("api/merchant/getOne/" + merchantId).success(function(data) {
			if (data.code == 1) {
				$scope.merchant = data.result;
			} else {
				alert(data.message);
			}
		}).error(function(data) {

		});
	};
	$scope.init = function() {
		$scope.merchantOne();
	};
	$scope.init();
};
merchantOneModule.controller("merchantOneController", merchantOneController);