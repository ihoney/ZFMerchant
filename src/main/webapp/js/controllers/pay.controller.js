'user strict';

// 系统设置模块
var payModule = angular.module("payModule", []);


var payController = function($scope, $http,$location) {
	$scope.req={};
	$scope.order={};
	$scope.payway=1;
	$scope.req.id=$location.search()['id'];
	$scope.init = function() {
		$("#leftRoute").hide();
		$scope.getOrder();
	};
	$scope.getOrder = function() {
		//$("#leftRoute").hide();
		$http.post("api/order/payOrder", $scope.req).success(function (data) {  //绑定
            if (data.code==1) {
            	$scope.order=data.result;
            }
        });
	};
	$scope.pay= function(){
		if(1==$scope.payway){
			//alert("支付宝");
		}else{
			//alert("银行");
		}
	}
	$scope.finish= function(){
		if(1==1){
			$('#payTab').hide();
			$('.mask').hide();
			window.location.href = '#/pay_success';
		}else{
			alert("支付失败")
		}
	};
	$scope.init();
};

payModule.controller("payController", payController);
