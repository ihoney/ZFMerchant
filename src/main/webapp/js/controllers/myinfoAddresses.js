'user strict';

// 系统设置模块
var myinfoAddressesModule = angular.module("myinfoAddressesModule", []);
var myinfoAddressesController = function($scope, $http, LoginService) {
	$scope.list = function() {
		$http.get("api/customers/getAddressList/80").success(function(data) {
			if (data.code == 1) {
				$scope.addressList = data.result;
			} else {
				alert(data.message);
			}
		}).error(function(data) {

		});
	};
	$scope.openUpdateAddress = function(e) {
		$scope.address = e;
	};
	$scope.save = function() {
		$scope.address.customerId = 80;
		if ($scope.address.id == undefined) {
			$http.post("api/customers/insertAddress", $scope.address).success(function(data) {
				if (data.code == 1) {
					// alert("新增成功");
					$scope.init();
				} else {
					alert(data.message);
				}
			}).error(function(data) {

			});
		} else {
			$http.post("api/customers/updateAddress", $scope.address).success(function(data) {
				if (data.code == 1) {
					// alert("修改成功");
					$scope.init();
				} else {
					alert(data.message);
				}
			}).error(function(data) {

			});
		}
	};
	$scope.deleteAddress = function(e) {
		if (confirm('确定删除？')) {
			$http.get("api/customers/deleteAddress/" + e.id).success(function(data) {
				if (data.code == 1) {
					// alert("删除成功");
					$scope.init();
				} else {
					alert(data.message);
				}
			}).error(function(data) {

			});
		}
	};
	$scope.init = function() {
		$scope.address = {};
		$scope.address.isDefault = "2";
		$scope.list();
	};
	$scope.init();
};
myinfoAddressesModule.controller("myinfoAddressesController", myinfoAddressesController);