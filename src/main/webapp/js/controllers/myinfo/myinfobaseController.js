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
		$scope.req = {
				customer_id : LoginService.userid
			};
		 $scope.selected={};
		 $scope.selected_city={};
		 $http.post("api/customers/findCustById", $scope.req).success(function (data) {
			if (data.code == 1) {
				$scope.customer = data.result;
			    $scope.selected.id = data.result.parent_id;
			    $scope.selected.name = data.result.p_name;
		        $scope.selected_city.id = data.result.id;
		        $scope.selected_city.name = data.result.c_name;
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
	
	$scope.changePhone_show = function(){
		$("#show_phone_input").css('display', 'block');
	};
	
	$scope.save = function() {
		$scope.req = {
			"id" : LoginService.userid,
			"name" : $scope.customer.name,
			"phone" : $scope.customer.phone,
			"email" : $scope.customer.email,
			"cityId" : $scope.selected_city.id
		};
		$http.post("api/customers/cust_update", $scope.req).success(function(data) {
			if (data.code == 1) {
				alert("保存成功");
			} else {
//				alert(data.message);
			}
		}).error(function(data) {

		});
	};
	$scope.init();
	$scope.city_list();
};
myinfobaseModule.controller("myinfobaseController", myinfobaseController);