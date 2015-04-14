'user strict';

// 系统设置模块
var shopcartModule = angular.module("shopcartModule", []);

var shopcartController = function($scope,$http,LoginService) {
	$scope.carts=[];
	$scope.req = {};
	$scope.selectCount = 0;
	$scope.selectMoney = 0;
	$scope.cartid = [];
	$scope.isSelectAll = false;
	$scope.req.customerId = LoginService.userid;
	$scope.init = function() {
		if(LoginService.userid == 0){
			window.location.href = '#/login';
		}
		$scope.list();

	};
	$scope.list = function() {
		$http.post("api/cart/list", $scope.req).success(function(data) {
			if (data.code == 1) {
				$scope.carts = data.result;
			}
		}).error(function(data) {
			$("#serverErrorModal").modal({
				show : true
			});
		});
	};
	$scope.checkAll = function() {
		$scope.isSelectAll = !$scope.isSelectAll;
		if ($scope.isSelectAll) {
			angular.forEach($scope.carts, function(cart) {
				cart.checked = true;
			});
		} else {
			angular.forEach($scope.carts, function(cart) {
				cart.checked = false;
			});
		}
		$scope.setCheck();
	}
	$scope.checkOne = function(one) {
		$scope.isSelectAll = false;
		one.checked = !one.checked;
		$scope.setCheck();
	}
	$scope.setCheck = function() {
		$scope.selectCount = 0;
		$scope.selectMoney = 0;
		$scope.cartid = [];
		angular.forEach($scope.carts, function(cart) {
			if (cart.checked) {
				$scope.selectCount++;
				$scope.selectMoney += (cart.opening_cost + cart.retail_price) * cart.quantity;
				$scope.cartid.push(cart.id);
			}
		});
	}
	$scope.upadteCart = function(one, type) {
		if (type == 0) {
			if(one.quantity>0){
				one.quantity=parseInt(one.quantity);
	    	}else{
	    		one.quantity=1;
	    	}
			$http.post("api/cart/update", {id:one.id,quantity:one.quantity});
		} else {
			if (one.quantity != 1 || type != -1) {
				one.quantity += type;
				$http.post("api/cart/update", {id:one.id,quantity:one.quantity});
			}
		}
		$scope.setCheck();
	}
	$scope.del= function(id) {
		$http.post("api/cart/delete", {id:id});
		location.reload(); 
	}
	$scope.delAll= function() {
		if($scope.cartid.length>0){
			angular.forEach($scope.cartid, function(id) {
				$http.post("api/cart/delete", {id:id});
			});
			location.reload(); 
		}
	}
	$scope.next= function(){
		$scope.goods=[];
		angular.forEach($scope.carts, function(one) {
			if(one.checked){
				$scope.goods.push(one);
			}
		});
		LoginService.tomakeorder($scope.goods);
		//instance.list = $scope.goods;
		window.location.href = '#/cartmakeorder';
	}
	$scope.init();

};
shopcartModule.controller("shopcartController", shopcartController);
