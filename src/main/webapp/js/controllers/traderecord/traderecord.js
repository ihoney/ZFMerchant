'user strict';

// 交易流水
var traderecordModule = angular.module("traderecordModule", []);
var traderecordController = function($scope, $http, LoginService) {
	$scope.$emit('topTitle',"华尔街金融平台-交易流水");
	$scope.req={startTime:"",endTime:"",terminalNumber:""};
	if(LoginService.tradeTypeId==0){
		$scope.req.tradeTypeId=1
	}else{
		$scope.req.tradeTypeId=LoginService.tradeTypeId;
	}
	$scope.req.customerId=LoginService.userid;
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
		$scope.req.customerId=LoginService.userid;
		$scope.req.tradeTypeId=one.id;
		LoginService.tradeTypeId=one.id;
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
		if ($scope.req.startTime != undefined && $scope.req.endTime!= undefined) {
			var arr = new Array();
			var arr2 = new Array();
			var arr = $scope.req.startTime.split("-");
			var arr2 = $scope.req.endTime.split("-");
			var sDate = new Date(arr[0], arr[1] - 1, arr[2]);
			var eDate = new Date(arr2[0], arr2[1] - 1, arr2[2]);
			if (eDate < sDate) {
				alert("开始日期不能大于结束日期！");
				return;
			}
		}
		initSystemPage($scope);// 初始化分页参数
		$scope.list();
	};
	$scope.init = function() {
		// 判断是否已登录
		if (LoginService.userid == 0) {
			window.location.href = '#/login';
		} 
		$(".user_date input").datepicker();
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