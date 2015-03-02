'user strict';

//系统设置模块
var orderinfoModule = angular.module("orderinfoModule",[]);

var orderinfoController = function ($scope,$location, $http, LoginService) {
	$scope.req={};
	$scope.req.id=$location.search()['orderId'];
    $scope.getOrderInfo = function () {
    	$http.post("api/order/getMyOrderById", $scope.req).success(function (data) {  //绑定
            if (data.code==1) {
            	$scope.orderInfo=data.result;
            }
        }).error(function (data) {
            $("#serverErrorModal").modal({show: true});
        });
    };
    $scope.getOrderInfo();

};

orderinfoModule.controller("orderinfoController", orderinfoController);
