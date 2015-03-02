'user strict';

//系统设置模块
var cs_cencelModule = angular.module("cs_cencelModule",[]);

var cs_cencelController = function ($scope, $http, LoginService) {
	//搜索
	$scope.submitSearch = function(){
		$scope.req={customer_id:16,search:$scope.search};
		$http.post("api/cs/cancels/search", $scope.req).success(function (data) {  //绑定
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
		$http.post("api/cs/cancels/search", $scope.req).success(function (data) {  //绑定
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
        $http.post("api/cs/cancels/getAll", $scope.req).success(function (data) {  //绑定
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
    	window.location.href = '#/cs_cencelinfo';
    };
    //取消
    $scope.cancelApply = function(o){
    	$scope.req={id:o.id};
//    	$scope.req=  {id:$scope.infoId}
		$http.post("api/cs/cancels/cancelApply", $scope.req).success(function (data) {  //绑定
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
		$http.post("api/cs/cancels/resubmitCancel", $scope.req).success(function (data) {  //绑定
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

cs_cencelModule.controller("cs_cencelController", cs_cencelController);
