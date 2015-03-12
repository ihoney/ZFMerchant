'user strict';

// 地址管理
var myinfoAddressesModule = angular.module("myinfoAddressesModule", []);
var myinfoAddressesController = function($scope, $http, LoginService) {
	$scope.list = function() {
		var customerId = LoginService.userid;
		$http.post("api/customers/getAddressList/" + customerId).success(function(data) {
			if (data.code == 1) {
				$scope.addressList = data.result;
			} else {
				// 提示错误信息
				alert(data.message);
			}
		}).error(function(data) {

		});
	};
	$scope.openUpdateAddress = function(e) {
		$scope.address = e;
	};
	$scope.save = function() {
		if ($scope.address.id == undefined) {
			$scope.address.customerId = LoginService.userid;
			$http.post("api/customers/insertAddress", $scope.address).success(function(data) {
				if (data.code == 1) {
					$scope.init();
				} else {
					alert(data.message);
				}
			}).error(function(data) {

			});
		} else {
			$http.post("api/customers/updateAddress", $scope.address).success(function(data) {
				if (data.code == 1) {
					$scope.init();
				} else {
					alert(data.message);
				}
			}).error(function(data) {

			});
		}
	};
	$scope.setDefaultAddress = function(e) {
		$http.post("api/customers/setDefaultAddress/", e).success(function(data) {
			if (data.code == 1) {
				$scope.init();
			} else {
				alert(data.message);
			}
		}).error(function(data) {

		});
	};
	$scope.deleteAddress = function(e) {
		var ids = [ e.id ];
		if (confirm('确定删除？')) {
			$http.post("api/customers/deleteAddress", ids).success(function(data) {
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

		$scope.address = {};
		$scope.address.isDefault = "2";
		$scope.list();
	};
	$scope.init();
};
myinfoAddressesModule.controller("myinfoAddressesController", myinfoAddressesController);