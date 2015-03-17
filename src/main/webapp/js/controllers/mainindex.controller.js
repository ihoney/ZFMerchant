'user strict';

// 系统设置模块
var mainindexModule = angular.module("shopModule", []);

var mainindexController = function($scope, $http) {

	$scope.req = {};

	$scope.addBuy = function() {
		$http.post("api/paychannel/intention/add", $scope.req).success(function(data) { // 绑定
			if (data.code == 1) {
				$('.buyIntention_tab').hide();
				$('.mask').hide();
			}
		});
	}

	$scope.searchhh = function() {
		$http.post("api/terminal/openStatus", {
			type : 8,
			phone : $scope.req.phone2
		}).success(function(data) { // 绑定
			if (data.code == 1) {
				$scope.ttt = data.result;
			}
		});
	};
	$scope.close = function() {
		$('.mask').hide();
		$('#qwert').hide();
	};

	// 公告
	$scope.web_message_list = function() {
		$scope.req = {
			rows : 7
		};
		$http.post("api/web/message/getAll", $scope.req).success(function(data) {
			if (data != null && data != undefined) {
				$scope.web_list = data.result.content;
			}
		});
	};
	// 热卖POS
	$scope.web_pos_list = function() {
		$scope.req = {
			rows : 6
		};
		$http.post("api/index/pos_list", $scope.req).success(function(data) {
			if (data != null && data != undefined) {
				$scope.pos_list = data.result;
			}
		});
	};
	// 收单机构
	$scope.factory_list = function() {
		$http.post("api/index/factory_list", $scope.req).success(function(data) {
			if (data != null && data != undefined) {
				$scope.factory_list = data.result;
			}
		});
	};

	// 轮播图
	$scope.pic_list = function() {
		$http.post("api/index/sysshufflingfigure/getList", $scope.req).success(function(data) {
			if (data != null && data != undefined) {
				$scope.pic_list = data.result;
				$scope.pic_0 = $scope.pic_list[0].picture_url;
				$scope.pic_1 = $scope.pic_list[1].picture_url;
				$scope.pic_2 = $scope.pic_list[2].picture_url;
				$scope.pic_3 = $scope.pic_list[3].picture_url;
			}
		});
	};
	$scope.gotoo = function(url) {
		window.open(url);
		// window.location.href = url;
	};
	$scope.init = function() {
		$scope.web_message_list();
		$scope.factory_list();
		$scope.web_pos_list();
		$scope.pic_list();
	};
	$scope.init();
	
	$scope.getBackgroundStyle= function(imagepath){
	    return {
	        'background-image':'url(' + imagepath + ')',
	        'cursor': 'pointer'
	    }
	}
};


mainindexModule.controller("mainindexController", mainindexController);
