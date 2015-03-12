'user strict';

// 系统设置模块
var myinfoupdatepasswordModule = angular.module("myinfoupdatepasswordModule", []);
var myinfoupdatepasswordController = function($scope, $http, LoginService) {
	$scope.updatepassword = function() {
		$scope.updateCustomer = {
			id : LoginService.userid,
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
	$scope.init = function() {

		// 判断是否已登录
		if (LoginService.userid == 0) {
			window.location.href = '#/login';
		} else {
			$scope.$emit('changeshow', false);
		}

	};
	$scope.init();
};
myinfoupdatepasswordModule.controller("myinfoupdatepasswordController", myinfoupdatepasswordController);