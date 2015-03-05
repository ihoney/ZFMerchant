'user strict';

//系统设置模块
var shopinfoModule = angular.module("shopinfoModule",[]);

var shopinfoController = function ($scope,$location, $http, LoginService) {
	$scope.req={};
	$scope.quantity=1;
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
    $scope.getPayChannelInfo = function (id) {
    	$http.post("api/paychannel/info", {pcid:id}).success(function (data) {  //绑定
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
            	//LoginService.shopcount+=1;
            	window.location.href = '#/shopcart';
            }
        });
    };
    $scope.count = function(type) {
		if ($scope.quantity != 1 || type != -1) {
			$scope.quantity += type;
		}
	}
    $scope.comment = function() {
    	$http.post("api/comment/list",{goodId:$scope.req.goodId} ).success(function (data) {  //绑定
            if (data.code==1) {
            	$scope.comment=data.result.list;
            }
        });
	}
    $scope.init();

};





shopinfoModule.controller("shopinfoController", shopinfoController);
