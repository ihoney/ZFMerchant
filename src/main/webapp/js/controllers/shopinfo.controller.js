'user strict';

//系统设置模块
var shopinfoModule = angular.module("shopinfoModule",[]);

var shopinfoController = function ($scope,$location, $http, LoginService) {
	$scope.req={};
	$scope.req.goodId=$location.search()['goodId'];
	$scope.req.city_id=LoginService.city;
	$scope.init = function () {
		$("#leftRoute").hide();
		$scope.getGoodInfo();
		
    };
    $scope.getGoodInfo = function () {
    	$http.post("api/good/goodinfo", $scope.req).success(function (data) {  //绑定
            if (data.code==1) {
            	$scope.good=data.result;
            	$scope.paychannel=data.result.paychannelinfo;
            }
        }).error(function (data) {
           // $("#serverErrorModal").modal({show: true});
        });
    };
    $scope.getPayChannelInfo = function () {
    	$http.post("api/paychannel/info", $scope.req).success(function (data) {  //绑定
            if (data.code==1) {
            	$scope.paychannel=data.result;
            }
        }).error(function (data) {
        	//$("#serverErrorModal").modal({show: true});
        });
    };
    $scope.addCart = function () {
    	$scope.cartreq={customerId:LoginService.userid,goodId:$scope.good.goodinfo.id,paychannelId:$scope.paychannel.id};
    	$http.post("api/cart/add",$scope.cartreq ).success(function (data) {  //绑定
            if (data.code==1) {
            	//$scope.paychannel=data.result;
            	LoginService.shopcount+=1;
            }
        }).error(function (data) {
        	//$("#serverErrorModal").modal({show: true});
        });
    };
    $scope.init();

};





shopinfoModule.controller("shopinfoController", shopinfoController);
