'user strict';

//系统设置模块
var cs_updateModule = angular.module("cs_updateModule",[]);

var cs_updateController = function ($scope, $http, LoginService) {
	$("#leftRoute").show();
	//搜索
	$scope.submitSearch = function(){
		$scope.req={customer_id:80,search:$scope.search};
		$http.post("api/update/info/search", $scope.req).success(function (data) {  //绑定
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
		$http.post("api/update/info/search", $scope.req).success(function (data) {  //绑定
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
        $http.post("api/update/info/getAll", $scope.req).success(function (data) {  //绑定
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
    	window.location.href = '#/cs_updateinfo';
    };
    //取消
    $scope.cancelApply = function(o){
    	$scope.req={id:o.id};
		$http.post("api/update/info/cancelApply", $scope.req).success(function (data) {  
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
		$http.post("api/update/info/resubmitCancel", $scope.req).success(function (data) {   
			if (data != null && data != undefined) {
				$scope.orderlist();
			}
		}).error(function (data) {
			$("#serverErrorModal").modal({show: true});
		});
	};
    $scope.orderlist();
};

cs_updateModule.controller("cs_updateController", cs_updateController);
