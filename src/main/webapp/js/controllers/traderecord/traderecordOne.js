'user strict';

// 交易流水
var traderecordOneModule = angular.module("traderecord1OneModule", []);
var traderecordOneController = function($scope, $http, $location, LoginService) {
	$scope.traderecord1One = function() {
		$scope.req={};
		$scope.req.id = $location.search()['id'];
		$http.post("api/web/trade/record/getTradeRecord",$scope.req).success(function(data) {
			if (data.code == 1) {
				$scope.traderecord = data.result;
			} else {
				alert(data.message);
			}
		});
	};
	$scope.init = function() {
		// 判断是否已登录
		if (LoginService.userid == 0) {
			window.location.href = '#/login';
		} 
		$scope.traderecord1One();
	};
	$scope.init();
};
traderecordOneModule.controller("traderecordOneController", traderecordOneController);