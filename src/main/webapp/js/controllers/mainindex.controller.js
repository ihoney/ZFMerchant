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
		if($scope.req.phone2==undefined||""==$scope.req.phone2.trim()){
			$scope.searchhherror="请输入手机号";
			return;
		}
		$http.post("api/terminal/openStatus", {
			type : 8,
			phone : $scope.req.phone2
		}).success(function(data) { // 绑定
			if (data.code == 1) {
				$scope.searchhherror="";
				$scope.ttt = data.result;
			}else{
				$scope.searchhherror=data.message;
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
	//公告显示
	$scope.notice_show = function(e){
		$("#notice_title").html(e.title);
		$("#notice_time").html(e.create_at);
		$("#notice_contnet").html(e.content);
		var doc_height = $(document).height();
		var doc_width = $(document).width();
		var win_height = $(window).height();
		var win_width = $(window).width();

		var layer_height = $(".notice_tab").height();
		var layer_width = $(".notice_tab").width();

		var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;

		$(".mask").css({
			display : 'block',
			height : doc_height
		});
		$(".notice_tab").css('top', (win_height - layer_height) / 2);
		$(".notice_tab").css('left', (win_width - layer_width) / 2);
		$(".notice_tab").css('display', 'block');
		return false;
	};
	
	$scope.notice_close = function(){
		$(".notice_tab").css('display','none');
		$(".mask").css('display','none');
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
		$http.post("api/index/sysshufflingfigure/getList2", $scope.req).success(function(data) {
			if (data != null && data != undefined) {
				$scope.pic_list = data.result.list;
				$scope.pic_total = data.result.total;
			}
		});
	};
	$scope.gotoo = function(url) {
		//window.open(url);
		 window.location.href = url;
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

indexModule.directive('onFinishRender3Filters', function ($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function() {
                	$('.banner').unslider({
    					speed : 500,
    					delay : 3000,
    					complete : function() {
    					},
    					keys : true,
    					dots : true,
    					fluid : false
    				});
                });
            }
        }
    };
});
