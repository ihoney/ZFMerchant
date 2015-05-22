'user strict';

// 商户列表
var merchantListModule = angular.module("merchantListModule", []);
var merchantListController = function($scope, $http, LoginService) {
	$scope.$emit('topTitle',"华尔街金融平台-我的商户");
	initSystemPage($scope);// 初始化分页参数
	$scope.list = function() {
		var customerId = LoginService.userid;
		var query = customerId + "/" + $scope.indexPage + "/" + $scope.rows;
		$http.post("api/merchant/getList/" + query).success(function(data) {
			if (data.code == 1) {
				$scope.merchantList = data.result.list;
				calcSystemPage($scope, data.result.total);// 计算分页
			} else {
				// 提示错误信息
				alert(data.message);
			}
		}).error(function(data) {

		});
	};
	$scope.merchantDelete = function(e) {
		var idsReq = {
			ids : [ e.id ]
		};
		if (confirm('确定删除？')) {
			$http.post("api/merchant/delete", idsReq).success(function(data) {
				if (data.code == 1) {
					$scope.init();
				} else {
					alert(data.message);
				}
			}).error(function(data) {

			});
		}
	};
	$scope.init = function() {

		// 判断是否已登录
		if (LoginService.userid == 0) {
			window.location.href = '#/login';
		} else {
			$scope.$emit('changeshow', false);
		}

		$scope.list();
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
merchantListModule.controller("merchantListController", merchantListController);