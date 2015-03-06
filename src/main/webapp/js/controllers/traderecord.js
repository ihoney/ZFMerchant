'user strict';

// 交易流水
var traderecordModule = angular.module("traderecordModule", []);
var traderecordController = function($scope, $http, LoginService) {
	$scope.list = function() {
		var customerId = 80;
		$http.get("api/trade/record/getTerminals/" + customerId).success(function(data) {
			if (data.code == 1) {
				$scope.terminals = data.result;
			} else {
				// 提示错误信息
				alert(data.message);
			}
		}).error(function(data) {

		});
	};
	$scope.getTerminals = function() {
		var customerId = 80;
		$http.get("api/trade/record/getTerminals/" + customerId).success(function(data) {
			if (data.code == 1) {
				$scope.terminals = data.result;
			} else {
				// 提示错误信息
				alert(data.message);
			}
		}).error(function(data) {

		});
	};
	$scope.getTradeRecordTotal = function() {
		var query = 1 + "/" + $scope.terminalNumber + "/" + $scope.startTime + "/" + $scope.endTime;
		$http.get("api/customers/getTradeRecordTotal/" + query).success(function(data) {
			if (data.code == 1) {
				$scope.tradeRecordTotal = data.result;
			} else {
				// 提示错误信息
				alert(data.message);
			}
		}).error(function(data) {

		});
	};
	$scope.search = function() {
		$scope.getTradeRecordTotal();
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
		$scope.getTerminals();
		// $scope.list();
	};
	$scope.init();
};
traderecordModule.controller("traderecordController", traderecordController);