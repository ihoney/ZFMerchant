'user strict';

// 系统设置模块
var myinfoupdatepasswordModule = angular.module("myinfoupdatepasswordModule", []);
var myinfoupdatepasswordController = function($scope, $http, LoginService) {
	$scope.customer = {};
	$scope.updatepassword = function() {
		var p = $scope.customer.password;
		var po = $scope.customer.passwordOld;
		if (typeof(po) == "undefined" || po=="") { 
			alert("请输入原密码");
			return false;
		}
		if (typeof(p) == "undefined" || p=="") { 
			alert("请输入新密码");
			return false;
		}else if(p.length <6  || p.length >20){
			alert("密码必须在6-20位之间");
			return false;
		}
		if($scope.customer.password !=$scope.customer.repassword){
			alert("输入的密码不一致！");
			return ;
		}
		$scope.updateCustomer = {
			id : LoginService.userid,
			passwordOld : $scope.customer.passwordOld,
			password : $scope.customer.password
		};
		$http.post("api/customers/changePassword", $scope.updateCustomer).success(function(data) {
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