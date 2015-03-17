'user strict';

// 交易流水
var traderecordModule = angular.module("traderecordModule", []);
var traderecordController = function($scope, $http, LoginService) {
	$scope.req={tradeTypeId:1,startTime:"",endTime:"",terminalNumber:""};
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
	$scope.getTradeType = function() {
		$http.post("api/web/trade/record/getTradeType").success(function(data) {
			if (data.code == 1) {
				$scope.tradeType=data.result;
				$scope.typeName=$scope.tradeType[0].value;
			} else {
				// 提示错误信息
				alert(data.message);
			}
		});
	};
	$scope.changeType = function(one) {
		$scope.req={startTime:"",endTime:"",terminalNumber:""};
		$scope.req.tradeTypeId=one.id;
		initSystemPage($scope.req);// 初始化分页参数
		$scope.typeName=one.value;
		$scope.list();
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
		initSystemPage($scope);// 初始化分页参数
		$scope.list();
	};
	$scope.init = function() {
		// 判断是否已登录
		if (LoginService.userid == 0) {
			window.location.href = '#/login';
		} 
		initSystemPage($scope.req);// 初始化分页参数
		$scope.getTerminals();
		$scope.getTradeType();
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
traderecordModule.controller("traderecordController", traderecordController);