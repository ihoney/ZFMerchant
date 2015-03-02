'user strict';

//系统设置模块
var shopcartModule = angular.module("shopcartModule",[]);

var shopcartController = function ($scope,$location, $http, LoginService) {
	$scope.req={};
	$scope.selectCount=0;
	$scope.selectMoney=0;
	$scope.cartid=[];
	$scope.isSelectAll=false;
	$scope.req.customerId=LoginService.userid;
	$scope.init = function () {
		$("#leftRoute").hide();
		$scope.list();
		
    };
    $scope.list = function () {
		$http.post("api/cart/list", $scope.req).success(function (data) {  
            if (data.code==1) {
            	$scope.carts=data.result;
            }
        }).error(function (data) {
            $("#serverErrorModal").modal({show: true});
        });
    }; 
    $scope.checkAll= function () {
    	$scope.isSelectAll=!$scope.isSelectAll;
    	if($scope.isSelectAll){
	    	angular.forEach($scope.carts, function (cart) {
	    		cart.checked = true;
	        });
    	}else{
    		angular.forEach($scope.carts, function (cart) {
	    		cart.checked = false;
	        });
    	}
    	$scope.setCheck();
    }
    $scope.checkOne= function (one) {
    	$scope.isSelectAll=false;
    	one.checked=!one.checked;
    	$scope.setCheck();
    }
    $scope.setCheck= function (one) {
    	$scope.selectCount=0;
    	$scope.selectMoney=0;
    	$scope.cartid=[];
    	angular.forEach($scope.carts, function (cart) {
    		if(cart.checked){
    			$scope.selectCount++;
    			$scope.selectMoney+=(cart.opening_cost+cart.retail_price)*cart.quantity;
    			$scope.cartid.push(cart.id);
    		}
        });
    }
    $scope.init();

};





shopcartModule.controller("shopcartController", shopcartController);
