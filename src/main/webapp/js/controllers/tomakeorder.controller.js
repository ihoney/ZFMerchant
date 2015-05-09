'user strict';

// 系统设置模块
var tomakeorderModule = angular.module("tomakeorderModule", []);

var cartmakeorderController = function($scope, $location, $http, LoginService) {
	$scope.order = {
		invoice_type : 1,
		addressId : 0
	};
	$scope.order.customerId = LoginService.userid;
	// $scope.order.addressId=1;

	$scope.totalMoney = 0;
	$scope.init = function() {
		if (LoginService.userid == 0) {
			window.location.href = '#/login';
		} else if (LoginService.goods.length == 0) {
			window.location.href = '#/shopcart';
		} else {
			$scope.list = LoginService.goods;
			$scope.order.cartid = [];
			angular.forEach($scope.list, function(one) {
				$scope.order.cartid.push(one.id);
				$scope.totalMoney += (one.opening_cost + one.retail_price) * one.quantity;
			});
		}
	};
	$scope.ctype = function(v) {
		$scope.order.invoice_type = v;
	}
	$scope.submit = function() {
		if ($scope.order.addressId == 0) {
			alert("请选择收货地址");
			return;
		}
		if ($scope.order.is_need_invoice) {
			$scope.order.is_need_invoice = 1;
		} else {
			$scope.order.is_need_invoice = 0;
		}
		$http.post("api/order/cart", $scope.order).success(function(data) {
			if (data.code == 1) {
				window.location.href = '#/pay?id=' + data.result;
			} else if (data.code == -2) {
				window.location.href = '#/lowstocks';
			}
		});

	};
	$scope.init();
};

var shopmakeorderController = function($scope, $location, $http, LoginService) {
	$scope.order = {
		invoice_type : 1,
		addressId : 0
	};
	$scope.order.customerId = LoginService.userid;
	// $scope.order.addressId=1;
	$scope.init = function() {
		if (LoginService.userid == 0) {
			window.location.href = '#/login';
		}
		$scope.order.goodId = $location.search()['goodId'];
		$scope.order.type = parseInt($location.search()['type']);
		// $scope.order.quantity=$location.search()['quantity'];
		$scope.order.paychannelId = $location.search()['paychannelId'];
		$scope.getGood();
	};
	$scope.getGood = function() {
		$http.post("api/makeorder/shop", $scope.order).success(function(data) {
			if (data.code == 1) {
				$scope.shop = data.result;
				$scope.order.quantity = parseInt($location.search()['quantity']);
			}
		});
	};
	$scope.checkQ = function() {
		if ($scope.order.quantity > 0) {
			$scope.order.quantity = parseInt($scope.order.quantity);
		} else {
			$scope.order.quantity = 1;
		}
	};
	$scope.upadteCart = function(type) {
		if ($scope.order.quantity != 1 || type != -1) {
			$scope.order.quantity += type;
		}
	};
	$scope.submit = function() {
		if ($scope.order.addressId == 0) {
			alert("请选择收货地址");
			return;
		}
		if ($scope.order.is_need_invoice) {
			$scope.order.is_need_invoice = 1;
		} else {
			$scope.order.is_need_invoice = 0;
		}
		if (2 == $scope.order.type) {
			$http.post("api/order/lease", $scope.order).success(function(data) {
				if (data.code == 1) {
					window.location.href = '#/pay?id=' + data.result;
				} else if (data.code == -2) {
					window.location.href = '#/lowstocks';
				}
			});
		} else {
			$http.post("api/order/shop", $scope.order).success(function(data) {
				if (data.code == 1) {
					window.location.href = '#/pay?id=' + data.result;
				} else if (data.code == -2) {
					window.location.href = '#/lowstocks';
				}
			});
		}
	};
	$scope.ctype = function(v) {
		$scope.order.invoice_type = v;
	}

	$scope.init();
};

var addressController = function($scope, $location, $http, LoginService) {
	$scope.adid=0;
	$scope.getadlist = function() {
		$http.post("api/customers/getAddressList/" + LoginService.userid).success(function(data) {
			if (data.code == 1) {
				$scope.addressList = data.result;
				if($scope.adid!=0){
					$scope.order.addressId = $scope.adid;
				}else{
					angular.forEach($scope.addressList, function(one) {
						 if (one.isDefault == 1) {
							$scope.order.addressId = one.id;
						}
					});
				}
			} else {
				// 提示错误信息
				alert(data.message);
			}
		});
	};
	
	$scope.adinit = function() {
		$scope.ad={receiver:"收件人姓名",address:"详细地址",zipCode:"邮编",moblephone:"手机号码"};
		$scope.addadd=true;
		$scope.getcity_list();
	}
	$scope.addad = function() {
		if($scope.ad.receiver=="收件人姓名"){
			alert("请输入收件人!");
			return;
		}
		if($scope.city==undefined){
			alert("请选择城市!");
			return;
		}
		if($scope.ad.address=="详细地址"){
			alert("请输入地址!");
			return;
		}
		if($scope.ad.zipCode=="邮编"){
			//alert("请输入邮编!");
			//return;
		}else{
			var reg=/[1-9]\d{5}(?!\d)/;
			if(!reg.test($scope.ad.zipCode)){
				alert("邮编不正确!");
				return;
			}
		}
		if($scope.ad.moblephone=="手机号码"){
			alert("请输入手机号码!");
			return;
		}else{
			var reg=/^(13[0-9]|14(5|7)|15(0|1|2|3|5|6|7|8|9)|18[0-9])\d{8}$/;
			if(!reg.test($scope.ad.moblephone)){
				alert("手机不正确!");
				return;
			}
		}
		if($scope.ad.zipCode=="邮编"){
			$scope.ad.zipCode="";
		}
		$scope.ad.customerId = LoginService.userid;
		$scope.ad.isDefault = 2;
		$scope.ad.cityId = $scope.city.id;
		$http.post("api/customers/insertAddress", $scope.ad).success(function(data) {
			if (data.code == 1) {
				$scope.addadd=false;
				$scope.adid=data.result;
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
		$scope.getadlist();
	};

	$scope.getcity_list = function() {
		$http.post("api/index/getCity").success(function(data) {
			if (data != null && data != undefined) {
				$scope.city_list = data.result;
			}
		});
	};

	$scope.init();
}

tomakeorderModule.controller("cartmakeorderController", cartmakeorderController);
tomakeorderModule.controller("shopmakeorderController", shopmakeorderController);
