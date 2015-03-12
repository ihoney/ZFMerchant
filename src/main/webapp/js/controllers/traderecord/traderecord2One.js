'user strict';

// 交易流水详情
var traderecord2OneModule = angular.module("traderecord2OneModule", []);
var traderecord2OneController = function($scope, $http, $location, LoginService) {
	$scope.traderecord2One = function(e) {
		var traderecord2OneId = $location.search()['traderecord2OneId'];
		$http.get("api/trade/record/getTradeRecord/2/" + traderecord2OneId).success(function(data) {
			if (data.code == 1) {
				$scope.traderecord = data.result;
			} else {
				alert(data.message);
			}
		}).error(function(data) {

		});
	};
	$scope.init = function() {
		$scope.traderecord2One();
	};
	$scope.init();
};
traderecord2OneModule.controller("traderecord2OneController", traderecord2OneController);