'user strict';

// 系统设置模块
var myinfobaseModule = angular.module("myinfobaseModule", []);
var myinfobaseController = function($scope, $http, LoginService) {
	var customerId = LoginService.userid;
	$scope.init = function() {

		// 判断是否已登录
		if (LoginService.userid == 0) {
			window.location.href = '#/login';
		} else {
			$scope.$emit('changeshow', false);
		}
		$scope.selected={};
		$scope.selected_city={};
	    $scope.selected.id = "1";
	    $scope.selected.name = "江苏省";
        $scope.selected_city.id = "2";
        $scope.selected_city.name = "苏州市";
        $scope.req = { id : customerId }
		$http.post("api/customers/findCustById" + $scope.req).success(function(data) {
			if (data.code == 1) {
				$scope.customer = data.result;
			}
		}).error(function(data) {

		});

	};
	
	$scope.city_list = function(){
		$http.post("api/index/getCity").success(function (data) {   
            if (data != null && data != undefined) {
                $scope.city_list = data.result;
            }
        });
	};
	
	$scope.ch_city = function(){
//		$scope.selected_city = "";
	};
	
	$scope.save = function() {
		console.log("==>"+$scope.selected_city.name);
		console.log("==>"+$scope.selected_city.id);
		return ;
		$scope.updateCustomer = {
			id : $scope.req.id,
			name : $scope.customer.name,
			phone : $scope.customer.phone,
			email : $scope.customer.email,
			cityId : $scope.selected_city.id
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
	$scope.city_list();
};
myinfobaseModule.controller("myinfobaseController", myinfobaseController);