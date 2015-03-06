'user strict';

//系统设置模块
var cs_leaseModule = angular.module("cs_leaseModule",[]);

var cs_leaseController = function ($scope, $http, LoginService) {
	$("#leftRoute").show();
	//搜索
	$scope.submitSearch = function(){
		$scope.req={customer_id:80,search:$scope.search};
		$http.post("api/cs/lease/returns/search", $scope.req).success(function (data) {  //绑定
            if (data != null && data != undefined) {
                $scope.list = data.result.content;
            }
        }).error(function (data) {
            $("#serverErrorModal").modal({show: true});
        });
	};
	//筛选
	$scope.submitScreen = function(){
		$scope.req={customer_id:80,search:$scope.search,q:$scope.screen};
		$http.post("api/cs/lease/returns/search", $scope.req).success(function (data) {  //绑定
            if (data != null && data != undefined) {
                $scope.list = data.result.content;
            }
        }).error(function (data) {
            $("#serverErrorModal").modal({show: true});
        });
	};
	//订单列表
	$scope.orderlist = function () {
        $scope.req={customer_id:80};
        $http.post("api/cs/lease/returns/getAll", $scope.req).success(function (data) {  //绑定
            if (data != null && data != undefined) {
                $scope.list = data.result.content;
            }
        }).error(function (data) {
            $("#serverErrorModal").modal({show: true});
        });
    };
    //详情
    $scope.orderinfo=function (p) {
    	LoginService.poscd=p.id;
    	$scope.poscd=p.id;
    	window.location.href = '#/cs_leaseinfo';
    };
    //取消
    $scope.cancelApply = function(o){
    	$scope.req={id:o.id};
		$http.post("api/cs/lease/returns/cancelApply", $scope.req).success(function (data) {  //绑定
            if (data != null && data != undefined) {
            	$scope.orderlist();
            }
        }).error(function (data) {
            $("#serverErrorModal").modal({show: true});
        });
	};
	//重新提交
	$scope.resubmitCancel = function(o){
		$scope.req={id:o.id};
		$http.post("api/cs/lease/returns/resubmitCancel", $scope.req).success(function (data) {  //绑定
			if (data != null && data != undefined) {
				$scope.orderlist();
			}
		}).error(function (data) {
			$("#serverErrorModal").modal({show: true});
		});
	};
	// 关闭
	$scope.close_wlxx = function() {
		$(".tab").css('display', 'none');
	};
	// 打开
	$scope.click_wlxx = function(o) {
		$("#info_id").val(o.id);
		$(".tab").css('display', 'block');
	};
	// 提交
	$scope.save_wlxx = function() {
		var id = $("#info_id").val();
		$scope.req.id = id;
		$scope.req.computer_name = $scope.computer_name;
		$scope.req.track_number = $scope.track_number;
		$scope.req.customer_id = 80;

		$http.post("api/cs/lease/returns/addMark", $scope.req).success(function(data) {
			if (data.code == 1) {
				$(".tab").css('display', 'none');
			}
		}).error(function(data) {
			$("#serverErrorModal").modal({
				show : true
			});
		});
	};
    $scope.orderlist();
};

cs_leaseModule.controller("cs_leaseController", cs_leaseController);
