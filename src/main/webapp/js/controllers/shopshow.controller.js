'user strict';

var shopshowController = function($scope, $location,$http ) {
	$scope.req = {};
	$scope.creq = {};
	$scope.quantity = 1;
	$scope.req.goodId = $location.search()['goodId'];
	$scope.creq.goodId = $scope.req.goodId;
	$scope.req.city_id = 0;
	$scope.init = function() {
		initSystemPage($scope.creq);// 初始化分页参数
		$scope.getGoodInfo();

	};

	$scope.getGoodInfo = function() {
		$http.post("api/good/goodshow", $scope.req).success(function(data) { // 绑定
			if (data.code == 1) {
				$scope.good = data.result;
				$scope.$emit('topTitle',"华尔街金融平台-"+$scope.good.goodinfo.Title);
				$scope.paychannel = data.result.paychannelinfo;
				$scope.picList = data.result.picList;
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

shopModule.controller("shopshowController", shopshowController);
