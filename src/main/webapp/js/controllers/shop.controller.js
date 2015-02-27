'user strict';

//系统设置模块
var shopModule = angular.module("shopModule",[]);

var shopController = function ($scope, $http, LoginService) {
	
	$scope.req={};
	$scope.req.city_id=LoginService.city;
	$scope.req.orderType=1;
	$scope.req.city_id=1;
	$scope.req.city_id=1;
	
	$scope.req.brands_id=[];
	$scope.req.category=[];
	$scope.req.pay_channel_id=[];
	$scope.req.pay_card_id=[];
	$scope.req.trade_type_id=[];
	$scope.req.sale_slip_id=[];
	$scope.req.tDate=[];
	
	$scope.init = function () {
		$("#leftRoute").hide();
		$http.post("api/good/search", $scope.req).success(function (data) {  //绑定
            if (data.code==1) {
            	$scope.brands=data.result.brands;
            	$scope.category=data.result.category;
            	$scope.sale_slip=data.result.sale_slip;
            	$scope.pay_card=data.result.pay_card;
            	$scope.pay_channel=data.result.pay_channel;
            	$scope.trade_type=data.result.trade_type;
            	$scope.tDate=data.result.tDate;
            	
            }
        }).error(function (data) {
            $("#serverErrorModal").modal({show: true});
        });
    };
    $scope.list = function () {
		$http.post("api/good/list", $scope.req).success(function (data) {  //绑定
            if (data.code==1) {
            	$scope.goodList=data.result;
            }
        }).error(function (data) {
            $("#serverErrorModal").modal({show: true});
        });
    };
    $scope.check=function (p) {
    	if(p.clazz=="hover"){
    		p.clazz="";
    	}else{
    		p.clazz="hover";
    	}
    }
    $scope.shopinfo=function (p) {
    	LoginService.poscd=p.id;
    	$scope.poscd=p.id;
    	window.location.href = '#/shopinfo';
    }
    
    $scope.init();
    $scope.list();

};
shopModule.controller("shopController", shopController);
