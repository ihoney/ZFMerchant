'user strict';

// 交易流水详情
var traderecord5OneModule = angular.module("traderecord5OneModule", []);
var traderecord5OneController = function($scope, $http, $location, LoginService) {
	$scope.traderecord5One = function(e) {
		var traderecord5OneId = $location.search()['traderecord5OneId'];
		$http.get("api/trade/record/getTradeRecord/5/" + traderecord5OneId).success(function(data) {
			if (data.code == 1) {
				$scope.traderecord = data.result;
			} else {
				alert(data.message);
			}
		}).error(function(data) {

		});
	};
	$scope.init = function() {
		$scope.traderecord5One();
	};
	$scope.init();
};
traderecord5OneModule.controller("traderecord5OneController", traderecord5OneController);