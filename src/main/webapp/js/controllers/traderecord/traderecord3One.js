'user strict';

// 交易流水详情
var traderecord3OneModule = angular.module("traderecord3OneModule", []);
var traderecord3OneController = function($scope, $http, $location, LoginService) {
	$scope.traderecord3One = function(e) {
		var traderecord3OneId = $location.search()['traderecord3OneId'];
		$http.post("api/trade/record/getTradeRecord/3/" + traderecord3OneId).success(function(data) {
			if (data.code == 1) {
				$scope.traderecord = data.result;
			} else {
				alert(data.message);
			}
		}).error(function(data) {

		});
	};
	$scope.init = function() {
		$scope.traderecord3One();
	};
	$scope.init();
};
traderecord3OneModule.controller("traderecord3OneController", traderecord3OneController);