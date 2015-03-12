'user strict';

// 交易流水详情
var traderecord4OneModule = angular.module("traderecord4OneModule", []);
var traderecord4OneController = function($scope, $http, $location, LoginService) {
	$scope.traderecord4One = function(e) {
		var traderecord4OneId = $location.search()['traderecord4OneId'];
		$http.get("api/trade/record/getTradeRecord/4/" + traderecord4OneId).success(function(data) {
			if (data.code == 1) {
				$scope.traderecord = data.result;
			} else {
				alert(data.message);
			}
		}).error(function(data) {

		});
	};
	$scope.init = function() {
		$scope.traderecord4One();
	};
	$scope.init();
};
traderecord4OneModule.controller("traderecord4OneController", traderecord4OneController);