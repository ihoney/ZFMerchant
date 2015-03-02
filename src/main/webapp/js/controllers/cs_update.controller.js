'user strict';

//系统设置模块
var cs_updateModule = angular.module("cs_updateModule",[]);

var cs_updateController = function ($scope, $http, LoginService) {
	//搜索
	$scope.submitSearch = function(){
		$scope.req={customer_id:16,search:$scope.search};
		$http.post("api/order/orderSearch", $scope.req).success(function (data) {  //绑定
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
		$http.post("api/order/orderSearch", $scope.req).success(function (data) {  //绑定
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
        
        $http.post("api/order/getMyOrderAll", $scope.req).success(function (data) {  //绑定
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
    	window.location.href = '#/orderinfo';
    };
    $scope.orderlist();
//    $scope.submitSearch();
//    $scope.orderinfo();
};

cs_updateModule.controller("cs_updateController", cs_updateController);
