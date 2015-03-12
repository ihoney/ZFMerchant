'user strict';

// 积分管理
var myinfointegralModule = angular.module("myinfointegralModule", []);
var myinfointegralController = function($scope, $http, LoginService) {
	initSystemPage($scope);// 初始化分页参数
	$scope.list = function() {
		var query = LoginService.userid + "/" + $scope.indexPage + "/" + $scope.rows;
		$http.get("api/customers/getIntegralList/" + query).success(function(data) {
			if (data.code == 1) {
				$scope.integralList = data.result.list;
				calcSystemPage($scope, data.result.total);// 计算分页
			} else {
				// 提示错误信息
				alert(data.message);
			}
		}).error(function(data) {

		});
	};
	$scope.getIntegralTotal = function() {
		var customerId = LoginService.userid;
		$http.get("api/customers/getIntegralTotal/" + customerId).success(function(data) {
			if (data.code == 1) {
				$scope.integralTotal = data.result;
			} else {
				// 提示错误信息
				alert(data.message);
			}
		}).error(function(data) {

		});
	};
	$scope.openinsertIntegralConvert = function() {
		$scope.integral = {};
		popup(".creditsExchange_tab", ".ce_aaa");// 兑换积分
	};
	$scope.save = function() {
		if ($scope.integral.id == undefined) {
			$scope.integral.customerId = LoginService.userid;
			$http.post("api/customers/insertIntegralConvert", $scope.integral).success(function(data) {
				if (data.code == 1) {
					$(".close").click();
				} else {
					alert(data.message);
				}
			}).error(function(data) {

			});
		}
	};
	$scope.init = function() {
		$scope.list();
		$scope.getIntegralTotal();
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
myinfointegralModule.controller("myinfointegralController", myinfointegralController);