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
		$scope.address.id = e.id;
		$scope.selected ={id:e.city_parent_id,
						  name:e.city_parent_name};
		$scope.selected_city ={id:e.cityId,
								name:e.city_name}
	};
	$scope.save = function() {
		var addr       = $scope.address.address; //详细地址
		var zipCode  = $scope.address.zipCode; //邮编
		var receiver  = $scope.address.receiver; 
		var phone    = $scope.address.moblephone; 
		var  tel         = $scope.address.telphone;
	   if (typeof($scope.selected) == "undefined" || ($scope.selected) == "" || ($scope.selected) == null) { 
		   alert("请选择省份");
		   return false;
	   }else if(typeof($scope.selected_city) == "undefined"  || ($scope.selected_city) == ""  || ($scope.selected_city) == null){
		   alert("请选择城市");
		   return false;
	   }else if(typeof(addr) == "undefined"  || (addr) == ""  || (addr) == null){
		   alert("请输入详细地址");
		   return false;
	   }else if(typeof(zipCode) == "undefined"  || (zipCode) == ""  || (zipCode) == null){
		   alert("请输入正确的邮编");
		   return false;
	   }else if(typeof(receiver) == "undefined"  || (receiver) == ""  || (receiver) == null){
		   alert("请输入收货人");
		   return false;
	   }else if(typeof(phone) == "undefined"  || (phone) == ""  || (phone) == null){
		   alert("请输入正确的手机号！");
		   return false;
	   }else if(typeof(tel) == "undefined"  || (tel) == ""  || (tel) == null){
		   alert("请输入电话号码");
		   return false;
	   }else{
	    	if ($scope.address.id == undefined) {
				$scope.address.cityId = $scope.selected_city.id;
				$scope.address.customerId = LoginService.userid;
				$http.post("api/customers/insertAddress", $scope.address).success(function(data) {
					if (data.code == 1) {
						alert(data.message);
						$scope.init();
					} else {
						alert("请填写正确的数据");
					}
				}).error(function(data) {

				});
			} else {
				$scope.address.cityId = $scope.selected_city.id;
				$http.post("api/customers/updateAddress", $scope.address).success(function(data) {
					if (data.code == 1) {
						$scope.init();
					} else {
						alert(data.message);
					}
				}).error(function(data) {

				});
			}
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
		var idsReq = {
			ids : [ e.id ]
		};
		if (confirm('确定删除？')) {
			$http.post("api/customers/deleteAddress", idsReq).success(function(data) {
				if (data.code == 1) {
					$scope.init();
				} else {
					alert(data.message);
				}
			}).error(function(data) {

			});
		}
	};
	
	
	$scope.ch_city = function() {
		$scope.selected_city = "";
	}
	$scope.init = function() {
		// 判断是否已登录
		if (LoginService.userid == 0) {
			window.location.href = '#/login';
		} else {
			$scope.$emit('changeshow', false);
		}

//		$scope.address = {};
//		$scope.address.isDefault = "2";
		
		$scope.list();
		 $scope.address = {
				 isDefault: '2'
			      };
		$http.post("api/index/getCity").success(function (data) {   
            if (data != null && data != undefined) {
                $scope.city_list = data.result;
            }
        });
//		$scope.city_list();
	};
//	$scope.city_list = function(){
//		$http.post("api/index/getCity").success(function (data) {   
//            if (data != null && data != undefined) {
//                $scope.city_list = data.result;
//            }
//        });
//	};
	$scope.init();
};
myinfoAddressesModule.controller("myinfoAddressesController", myinfoAddressesController);