'user strict';

// 系统设置模块
var repair_payModule = angular.module("repair_payModule", []);

var repair_payController = function($scope, $http,$location) {
	$scope.pay=true;
	$scope.req={};
	$scope.order={};
	$scope.payway=1;
	$scope.req.id=$location.search()['repair_id'];
	$scope.init = function() {
		$("#leftRoute").hide();
		$scope.getOrder();
	};
	$scope.getOrder = function() {
		$http.post("api/cs/repair/repairPay", $scope.req).success(function (data) {  //绑定
            if (data.code==1) {
            	$scope.order=data.result;
            	if(data.result.paytype>0){
            		$scope.pay=false;
            		$scope.payway=data.result.paytype;
            	}
            	
            }
        });
	};
	$scope.pay= function(){
		$('#payTab').show();
		if(1==$scope.payway){
			//alert("支付宝");
			window.open("repairalipayapi.jsp?WIDtotal_fee="+
					$scope.order.repair_price/100+"&WIDsubject="+$scope.order.miaoshu
					+"&WIDout_trade_no="+$scope.req.id);  
		}else{
			//alert("银行");
			window.open("http://www.taobao.com");  
		}
	}
	$scope.finish= function(){
		$http.post("api/cs/repair/repairPayFinish", $scope.req).success(function (data) {  //绑定
            if (data.code==1) {
            	$scope.order=data.result;
            	if(data.result.paytype>0){
            		$scope.pay=false;
            		$scope.payway=data.result.paytype;
            		$('#payTab').hide();
            		$('.mask').hide();
            	}else{
            		alert("尚未支付,如有疑问请联系888-88888");
            	}
            	
            }
        });
	};
	$scope.init();
};

repair_payModule.controller("repair_payController", repair_payController);
