'user strict';

// 系统设置模块
var tomakeorderModule = angular.module("tomakeorderModule", []);

var cartmakeorderController = function($scope, $location, $http, LoginService) {
	$scope.order={invoice_type:1};
	$scope.order.customerId=LoginService.userid;
	//$scope.order.addressId=1;
	
	
	
	$scope.totalMoney=0;
	$scope.init = function() {
		if(LoginService.userid == 0){
			window.location.href = '#/login';
		}else if(LoginService.goods.length==0){
			window.location.href = '#/shopcart';
		}else{
			$scope.list=LoginService.goods;
			$scope.order.cartid=[];
			angular.forEach($scope.list, function(one) {
				$scope.order.cartid.push(one.id);
				$scope.totalMoney+=(one.opening_cost+one.retail_price)*one.quantity;
			});
		}
	};
	$scope.ctype=function(v){
		$scope.order.invoice_type=v;
	}
	$scope.submit = function() {
		if($scope.order.is_need_invoice){
			$scope.order.is_need_invoice=1;
		}else{
			$scope.order.is_need_invoice=0;
		}
		$http.post("api/order/cart", $scope.order).success(function(data) {
			if (data.code == 1) {
				window.location.href = '#/pay?id='+data.result;
			}else if(data.code == -2){
				window.location.href = '#/lowstocks';
			}
		});
		
	};
	$scope.init();
};

var shopmakeorderController = function($scope, $location, $http, LoginService) {
	$scope.order={invoice_type:1};
	$scope.order.customerId=LoginService.userid;
	//$scope.order.addressId=1;
	$scope.init = function() {
		if(LoginService.userid == 0){
			window.location.href = '#/login';
		}
		$scope.order.goodId=$location.search()['goodId'];
		$scope.order.type=parseInt($location.search()['type']);
		//$scope.order.quantity=$location.search()['quantity'];
		$scope.order.paychannelId=$location.search()['paychannelId'];
		$scope.getGood();
	};
	$scope.getGood = function() {
		$http.post("api/makeorder/shop", $scope.order).success(function(data) {
			if (data.code == 1) {
				$scope.shop = data.result;
				$scope.order.quantity=parseInt($location.search()['quantity']);
			}
		});
	};
	$scope.upadteCart = function(type) {
			if ($scope.order.quantity != 1 || type != -1) {
				$scope.order.quantity += type;
			}
	};
	$scope.submit = function() {
		if($scope.order.is_need_invoice){
			$scope.order.is_need_invoice=1;
		}else{
			$scope.order.is_need_invoice=0;
		}
		if(2==$scope.order.type){
			$http.post("api/order/lease", $scope.order).success(function(data) {
				if (data.code == 1) {
					window.location.href = '#/pay?id='+data.result;
				}else if(data.code == -2){
					window.location.href = '#/lowstocks';
				}
			});
		}else{
			$http.post("api/order/shop", $scope.order).success(function(data) {
				if (data.code == 1) {
					window.location.href = '#/pay?id='+data.result;
				}else if(data.code == -2){
					window.location.href = '#/lowstocks';
				}
			});
		}
	};
	$scope.ctype=function(v){
		$scope.order.invoice_type=v;
	}
	
	$scope.init();
};


var addressController=function($scope, $location, $http, LoginService){
	$scope.list = function() {
		$http.post("api/customers/getAddressList/"+LoginService.userid).success(function(data) {
			if (data.code == 1) {
				$scope.addressList = data.result;
			} else {
				// 提示错误信息
				alert(data.message);
			}
		});
	};
	$scope.addad = function(id) {
		$scope.ad.customerId=LoginService.userid;
		$scope.ad.isDefault=2;
		$scope.ad.cityId=$scope.city.id;
		$http.post("api/customers/insertAddress", $scope.ad).success(function(data) {
			if (data.code == 1) {
				$scope.init();
			} else {
				alert(data.message);
			}
		});
	};
	$scope.setDefaultAddress = function(e) {
		$http.post("api/customers/setDefaultAddress/", e).success(function(data) {
			if (data.code == 1) {
				$scope.init();
			} else {
				alert(data.message);
			}
		});
	};
	$scope.init = function() {
		$scope.address = {};
		$scope.ad = {};
		$scope.address.isDefault = "2";
		$scope.list();
	};
	
	$scope.city_list = function(){
		$http.post("api/index/getCity").success(function (data) {   
			if (data != null && data != undefined) {
				$scope.city_list = data.result;
			}
		});
	};
	
	$scope.init();
}

tomakeorderModule.controller("cartmakeorderController", cartmakeorderController);
tomakeorderModule.controller("shopmakeorderController", shopmakeorderController);
