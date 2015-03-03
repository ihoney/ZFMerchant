'user strict';

//系统设置模块
var cs_changeModule = angular.module("cs_changeModule",[]);

var cs_changeController = function ($scope, $http, LoginService) {
	//搜索
	$scope.submitSearch = function(){
		$scope.req={customer_id:16,search:$scope.search};
		$http.post("api/cs/change/search", $scope.req).success(function (data) {  //绑定
            if (data != null && data != undefined) {
                $scope.list = data.result.content;
            }
        }).error(function (data) {
            $("#serverErrorModal").modal({show: true});
        });
	};
	//筛选
	$scope.submitScreen = function(){
		$scope.req={customer_id:16,search:$scope.search,q:$scope.screen};
		$http.post("api/cs/change/search", $scope.req).success(function (data) {  //绑定
            if (data != null && data != undefined) {
                $scope.list = data.result.content;
            }
        }).error(function (data) {
            $("#serverErrorModal").modal({show: true});
        });
	};
	//订单列表
	$scope.orderlist = function () {
        $scope.req={customer_id:16};
        $http.post("api/cs/change/getAll", $scope.req).success(function (data) {  //绑定
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
    	window.location.href = '#/cs_changeinfo';
    };
    //取消
    $scope.cancelApply = function(o){
    	$scope.req={id:o.id};
//    	$scope.req=  {id:$scope.infoId}
		$http.post("api/cs/change/cancelApply", $scope.req).success(function (data) {  //绑定
            if (data != null && data != undefined) {
            	console.log("data.message==>"+data.message);
//                $scope.list = data.message;
            }
        }).error(function (data) {
            $("#serverErrorModal").modal({show: true});
        });
	};
	//重新提交
	$scope.resubmitCancel = function(o){
		$scope.req={id:o.id};
//    	$scope.req=  {id:$scope.infoId}
		$http.post("api/cs/change/resubmitCancel", $scope.req).success(function (data) {  //绑定
			if (data != null && data != undefined) {
				console.log("data.message==>"+data.message);
//                $scope.list = data.message;
			}
		}).error(function (data) {
			$("#serverErrorModal").modal({show: true});
		});
	};
    $scope.orderlist();
};

cs_changeModule.controller("cs_changeController", cs_changeController);
