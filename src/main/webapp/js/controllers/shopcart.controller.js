'user strict';

// 系统设置模块
var shopcartModule = angular.module("shopcartModule", []);

var shopcartController = function($scope, $http, LoginService, $cookieStore) {
	$scope.$emit('topTitle',"华尔街金融平台-购物车");
	$scope.carts = [];
	$scope.req = {};
	$scope.selectCount = 0;
	$scope.selectMoney = 0;
	$scope.cartid = [];
	$scope.isSelectAll = false;
	$scope.req.customerId = LoginService.userid;
	$scope.init = function() {
		if (LoginService.userid == 0) {
			// window.location.href = '#/login';
			$scope.shopcart = [];
			$scope.shopcart = typeof ($cookieStore.get("shopcart")) == 'undefined' ? [] : $cookieStore.get("shopcart");
			$scope.list2();
		} else {
			$scope.list();
		}
	}
	$scope.list = function() {
		$http.post("api/cart/list", $scope.req).success(function(data) {
			if (data.code == 1) {
				$scope.carts = data.result;
			}
		});
	};
	$scope.list2 = function() {
		$http.post("api/cart/getunLoginList", {
			cart : $scope.shopcart
		}).success(function(data) {
			if (data.code == 1) {
				$scope.carts = data.result;
			}
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
			if (one.quantity > 0) {
				one.quantity = parseInt(one.quantity);
			} else {
				one.quantity = 1;
			}
		} else {
			if (one.quantity != 1 || type != -1) {
				one.quantity += type;
			}
		}
		if (LoginService.userid == 0) {
			$scope.shopcart[one.id-1].quantity=one.quantity;
			$cookieStore.put("shopcart", $scope.shopcart);
		}else{
			$http.post("api/cart/update", {
				id : one.id,
				quantity : one.quantity
			});
		}
		$scope.setCheck();
		$scope.$emit('shopcartcountchange');
	}
	$scope.del = function(id) {
		if (LoginService.userid == 0) {
			$scope.shopcart.splice(id - 1, 1);
			$scope.carts.splice(id - 1, 1);
			$cookieStore.put("shopcart", $scope.shopcart);
		} else {
			$http.post("api/cart/delete", {
				id : id
			});
			location.reload();
		}
		$scope.$emit('shopcartcountchange');
	}
	$scope.delAll = function() {
		$scope.cartid.reverse();
		if ($scope.cartid.length > 0) {
			
			angular.forEach($scope.cartid, function(id) {
				if (LoginService.userid == 0) {
					$scope.shopcart.splice(id - 1, 1);
					$scope.carts.splice(id - 1, 1);
				} else {
					$http.post("api/cart/delete", {
						id : id
					});
				}
			});
			if (LoginService.userid == 0) {
				$cookieStore.put("shopcart", $scope.shopcart);
			} else {

				location.reload();
			}
		}
		$scope.$emit('shopcartcountchange');
	}
	$scope.next = function() {
		$scope.goods = [];
		angular.forEach($scope.carts, function(one) {
			if (one.checked) {
				$scope.goods.push(one);
			}
		});
		LoginService.tomakeorder($scope.goods);
		// instance.list = $scope.goods;
		window.location.href = '#/cartmakeorder';
	}
	$scope.init();

};
shopcartModule.controller("shopcartController", shopcartController);
