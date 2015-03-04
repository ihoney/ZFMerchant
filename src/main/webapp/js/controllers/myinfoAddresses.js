'user strict';

// 系统设置模块
var myinfoAddressesModule = angular.module("myinfoAddressesModule", []);
var myinfoAddressesController = function($scope, $http, LoginService) {
	$scope.updatepassword = function() {
		$scope.updateCustomer = {
			id : 8,
			passwordOld : $scope.customer.passwordOld,
			password : $scope.customer.password
		};
		$http.post("api/customers/updatePassword", $scope.updateCustomer).success(function(data) {
			if (data.code == 1) {
				// 提示保存成功
				alert("修改成功");
			} else {
				// 提示错误信息
				alert(data.message);
			}
		}).error(function(data) {

		});
	};
};
myinfoAddressesModule.controller("myinfoAddressesController", myinfoAddressesController);