'user strict';

// 交易流水
var traderecord2Module = angular.module("traderecord2Module", []);
var traderecord2Controller = function($scope, $http, LoginService) {
	initSystemPage($scope);// 初始化分页参数
	$scope.getTerminals = function() {
		var customerId = LoginService.userid;
		$http.post("api/trade/record/getTerminals/" + customerId).success(function(data) {
			if (data.code == 1) {
				$scope.terminals = data.result;
			} else {
				alert(data.message);
			}
		}).error(function(data) {

		});
	};
	$scope.getTradeRecordTotal = function() {// 交易笔数和交易总额
		var query = 2 + "/" + $scope.terminalNumber.serialNum + "/" + $scope.startTime + "/" + $scope.endTime;
		$http.post("api/trade/record/getTradeRecordTotal/" + query).success(function(data) {
			if (data.code == 1) {
				$scope.tradeRecordTotal = data.result;
			} else {
				alert(data.message);
			}
		}).error(function(data) {

		});
	};
	$scope.list = function() {
		var query = 2 + "/" + $scope.terminalNumber.serialNum + "/" + $scope.startTime + "/" + $scope.endTime + "/" + $scope.indexPage + "/" + $scope.rows;
		$http.post("api/trade/record/getTradeRecords/" + query).success(function(data) {
			if (data.code == 1) {
				$scope.tradeRecords = data.result.list;
				calcSystemPage($scope, data.result.total);// 计算分页
			} else {
				// 提示错误信息
				alert(data.message);
			}
		}).error(function(data) {

		});
	};
	$scope.search = function() {
		$scope.getTradeRecordTotal();

		initSystemPage($scope);// 初始化分页参数
		$scope.list();
	};
	$scope.init = function() {

		// 判断是否已登录
		if (LoginService.userid == 0) {
			window.location.href = '#/login';
		} else {
			$scope.$emit('changeshow', false);
		}
		
		$scope.getTerminals();
	};
	$scope.init();

	// 上一页
	$scope.prev = function() {
		if ($scope.indexPage > 1) {
			$scope.indexPage--;
			$scope.list();
		}
	};

	// 当前页
	$scope.loadPage = function(currentPage) {
		$scope.indexPage = currentPage;
		$scope.list();
	};

	// 下一页
	$scope.next = function() {
		if ($scope.indexPage < $scope.totalPage) {
			$scope.indexPage++;
			$scope.list();
		}
	};

	// 跳转到XX页
	$scope.getPage = function() {
		$scope.indexPage = Math.ceil($scope.gotoPage);
		$scope.list();
	};

};
traderecord2Module.controller("traderecord2Controller", traderecord2Controller);