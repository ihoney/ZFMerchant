'user strict';

// 系统设置模块
var myinfobaseModule = angular.module("myinfobaseModule", []);
var myinfobaseController = function($scope, $http, LoginService) {
	var customerId = LoginService.userid;
	$scope.init = function() {
		$http.get("api/customers/getOne/" + customerId).success(function(data) {
			if (data.code == 1) {
				$scope.customer = data.result;
			}
		}).error(function(data) {

		});
	};
	$scope.save = function() {
		$scope.updateCustomer = {
			id : $scope.req.id,
			name : $scope.customer.name,
			phone : $scope.customer.phone,
			email : $scope.customer.email,
			cityId : $scope.customer.city_id
		};
		$http.post("api/customers/update", $scope.updateCustomer).success(function(data) {
			if (data.code == 1) {
				alert("保存成功");
			} else {
				alert(data.message);
			}
		}).error(function(data) {

		});
	};
	$scope.init();
};
myinfobaseModule.controller("myinfobaseController", myinfobaseController);