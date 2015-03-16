'user strict';

// 交易流水
var traderecord2Module = angular.module("traderecord2Module", []);
var traderecord2Controller = function($scope, $http, LoginService) {
	$scope.req={tradeTypeId:2,startTime:"",endTime:"",terminalNumber:""};
	$scope.show={};
	$scope.getTerminals = function() {
		var customerId = LoginService.userid;
		$http.post("api/trade/record/getTerminals/" + customerId).success(function(data) {
			if (data.code == 1) {
				$scope.terminals = data.result;
			} else {
				alert(data.message);
			}
		});
	};
	
	$scope.list = function() {
		$scope.req.page=$scope.req.indexPage;
		$http.post("api/web/trade/record/getTradeRecords/" ,$scope.req).success(function(data) {
			if (data.code == 1) {
				$scope.tradeRecords = data.result;
				$scope.show.startTime=$scope.req.startTime;
				$scope.show.endTime=$scope.req.endTime;
				calcSystemPage($scope.req, data.result.total);// 计算分页
			} else {
				// 提示错误信息
				alert(data.message);
			}
		});
	};
	$scope.search = function() {
		initSystemPage($scope.req);// 初始化分页参数
		$scope.list();
	};
	$scope.init = function() {
		// 判断是否已登录
		if (LoginService.userid == 0) {
			window.location.href = '#/login';
		} else {
			$scope.$emit('changeshow', false);
		}
		initSystemPage($scope.req);// 初始化分页参数
		$scope.getTerminals();
		$scope.list();
	};
	$scope.init();

	// 上一页
	$scope.prev = function() {
		if ($scope.req.indexPage > 1) {
			$scope.req.indexPage--;
			$scope.list();
		}
	};

	// 当前页
	$scope.loadPage = function(currentPage) {
		$scope.req.indexPage = currentPage;
		$scope.list();
	};

	// 下一页
	$scope.next = function() {
		if ($scope.req.indexPage < $scope.req.totalPage) {
			$scope.req.indexPage++;
			$scope.list();
		}
	};

	// 跳转到XX页
	$scope.getPage = function() {
		$scope.req.indexPage = Math.ceil($scope.req.gotoPage);
		$scope.list();
	};

};
traderecord2Module.controller("traderecord2Controller", traderecord2Controller);