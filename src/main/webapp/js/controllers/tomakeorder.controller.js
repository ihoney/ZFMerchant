'user strict';

// 系统设置模块
var tomakeorderModule = angular.module("tomakeorderModule", []);

var cartmakeorderController = function($scope, $location, $http, LoginService) {
	$scope.order={invoice_type:1,invoice_info:'发票抬头'};
	$scope.order.customerId=LoginService.userid;
	$scope.order.addressId=1;
	$scope.init = function() {
		if(LoginService.goods.length==0){
			window.location.href = '#/shopcart';
		}else{
			$("#leftRoute").hide();
			$scope.list=LoginService.goods;
			$scope.order.cartid=[];
			angular.forEach($scope.list, function(one) {
				$scope.order.cartid.push(one.id);
			});
		}
	};
	$scope.ctype=function(v){
		$scope.order.invoice_type=v;
	}
	$scope.submit = function(type) {
		if($scope.order.is_need_invoice){
			$scope.order.is_need_invoice=1;
		}else{
			$scope.order.is_need_invoice=0;
		}
		$http.post("api/order/cart", $scope.order).success(function(data) {
			if (data.code == 1) {
				alert("cart")
			}
		});
		
	};
	$scope.init();
};

var shopmakeorderController = function($scope, $location, $http, LoginService) {
	$scope.order={invoice_type:1,invoice_info:'发票抬头'};
	$scope.order.customerId=LoginService.userid;
	$scope.order.addressId=1;
	$scope.init = function() {
		$("#leftRoute").hide();
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
	$scope.submit = function(type) {
		if($scope.order.is_need_invoice){
			$scope.order.is_need_invoice=1;
		}else{
			$scope.order.is_need_invoice=0;
		}
		if(2==$scope.order.type){
			$http.post("api/order/lease", $scope.order).success(function(data) {
				if (data.code == 1) {
					alert("shop")
				}
			});
		}else{
			$http.post("api/order/shop", $scope.order).success(function(data) {
				if (data.code == 1) {
					alert("lease")
				}
			});
		}
	};
	$scope.ctype=function(v){
		$scope.order.invoice_type=v;
	}
	
	$scope.init();
};

tomakeorderModule.controller("cartmakeorderController", cartmakeorderController);
tomakeorderModule.controller("shopmakeorderController", shopmakeorderController);
