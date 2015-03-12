'user strict';

// 交易流水
var traderecord1OneModule = angular.module("traderecord1OneModule", []);
var traderecord1OneController = function($scope, $http, $location, LoginService) {
	$scope.traderecord1One = function(e) {
		var traderecord1OneId = $location.search()['traderecord1OneId'];
		$http.post("api/trade/record/getTradeRecord/1/" + traderecord1OneId).success(function(data) {
			if (data.code == 1) {
				$scope.traderecord = data.result;
			} else {
				alert(data.message);
			}
		}).error(function(data) {

		});
	};
	$scope.init = function() {

		// 判断是否已登录
		if (LoginService.userid == 0) {
			window.location.href = '#/login';
		} else {
			$scope.$emit('changeshow', false);
		}

		$scope.traderecord1One();
	};
	$scope.init();
};
traderecord1OneModule.controller("traderecord1OneController", traderecord1OneController);