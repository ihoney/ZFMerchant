'user strict';

// 积分管理
var myinfointegralModule = angular.module("myinfointegralModule", []);
var myinfointegralController = function($scope, $http, LoginService) {
	$scope.list = function() {
		$http.get("api/customers/getIntegralList/80/1/10").success(function(data) {
			if (data.code == 1) {
				$scope.integralList = data.result;
			} else {
				// 提示错误信息
				alert(data.message);
			}
		}).error(function(data) {

		});
	};
	$scope.getIntegralTotal = function() {
		$http.get("api/customers/getIntegralTotal/80").success(function(data) {
			if (data.code == 1) {
				$scope.integralTotal = data.result;
			} else {
				// 提示错误信息
				alert(data.message);
			}
		}).error(function(data) {

		});
	};
	$scope.openinsertIntegralConvert = function() {
		$scope.integral = {};
		popup(".creditsExchange_tab", ".ce_aaa");// 兑换积分
	};
	$scope.save = function() {
		if ($scope.integral.id == undefined) {
			$scope.integral.customerId = 80;
			$http.post("api/customers/insertIntegralConvert", $scope.integral).success(function(data) {
				if (data.code == 1) {
					$(".close").click();
				} else {
					alert(data.message);
				}
			}).error(function(data) {

			});
		}
	};
	$scope.init = function() {
		$scope.list();
		$scope.getIntegralTotal();
	};
	$scope.init();
};
myinfointegralModule.controller("myinfointegralController", myinfointegralController);