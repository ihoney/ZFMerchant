'user strict';

var shopinfoController = function($scope, $location, $http, LoginService, $cookieStore) {
	$scope.req = {};
	$scope.creq = {};
	$scope.quantity = 1;
	$scope.req.goodId = $location.search()['goodId'];
	$scope.creq.goodId = $scope.req.goodId;
	$scope.req.city_id = LoginService.city;
	$scope.init = function() {
		initSystemPage($scope.creq);// 初始化分页参数
		// LoginService.hadLoginShow();
		// $("#leftRoute").hide();
		$scope.getGoodInfo();

	};

	$scope.getGoodInfo = function() {
		$http.post("api/good/goodinfo", $scope.req).success(function(data) { // 绑定
			if (data.code == 1) {
				$scope.good = data.result;
				$scope.paychannel = data.result.paychannelinfo;
				$scope.picList = data.result.picList;
			} else {
				window.location.href = "#/noshop";
			}
		});
	};
	$scope.getPayChannelInfo = function(id) {
		$http.post("api/paychannel/info", {
			pcid : id
		}).success(function(data) { // 绑定
			if (data.code == 1) {
				$scope.paychannel = data.result;
			}
		});
	};
	$scope.addCart = function() {
		$scope.cartreq = {
			goodId : $scope.good.goodinfo.id,
			paychannelId : $scope.paychannel.id,
			quantity : $scope.quantity
		};
		if (LoginService.userid == 0) {
			$scope.shopcart =[];
			$scope.shopcart = typeof ($cookieStore.get("shopcart")) == 'undefined' ? [] : $cookieStore.get("shopcart");
			var flag=true;
			angular.forEach($scope.shopcart, function(one) {
				if(one.goodId==$scope.cartreq.goodId&&one.paychannelId==$scope.cartreq.paychannelId){
					one.quantity+=$scope.cartreq.quantity;
					flag=false;
				}
			});
			if(flag){
				$scope.shopcart.push($scope.cartreq);
			}
			$cookieStore.put("shopcart", $scope.shopcart);
		} else {
			$scope.cartreq.customerId = LoginService.userid;
			$http.post("api/cart/add", $scope.cartreq);
		}
		$scope.$emit('shopcartcountchange');
		window.location.href = '#/shopcart';
	};
	$scope.checkQ = function() {
		if ($scope.quantity > 0) {
			$scope.quantity = parseInt($scope.quantity);
		} else {
			$scope.quantity = 1;
		}
	};
	$scope.count = function(type) {
		if ($scope.quantity != 1 || type != -1) {
			$scope.quantity += type;
		}
	}
	$scope.commentList = function() {
		$scope.creq.page = $scope.creq.indexPage;
		$http.post("api/comment/list", $scope.creq).success(function(data) { // 绑定
			if (data.code == 1) {
				$scope.comment = data.result.list;
				calcSystemPage($scope.creq, data.result.total);// 计算分页
			}
		});
	}
	$scope.gtoto = function(url) {
		window.open(url);
	}
	$scope.init();

	// 上一页
	$scope.prev = function() {
		if ($scope.creq.indexPage > 1) {
			$scope.creq.indexPage--;
			$scope.commentList();
		}
	};

	// 当前页
	$scope.loadPage = function(currentPage) {
		$scope.creq.indexPage = currentPage;
		$scope.commentList();
	};

	// 下一页
	$scope.next = function() {
		if ($scope.creq.indexPage < $scope.creq.totalPage) {
			$scope.creq.indexPage++;
			$scope.commentList();
		}
	};

	// 跳转到XX页
	$scope.getPage = function() {
		$scope.req.indexPage = Math.ceil($scope.req.gotoPage);
		$scope.commentList();
	};

	// 跳转到XX页
	$scope.picnb = 0;
	$scope.tt = function(nb) {
		$scope.picnb = nb;
	};
};

shopModule.controller("shopinfoController", shopinfoController);
