'user strict';

// 系统设置模块
var payModule = angular.module("payModule", []);


var payController = function($scope, $http,$location) {
	$scope.pay=true;
	$scope.req={};
	$scope.order={};
	$scope.payway=1;
	$scope.req.id=$location.search()['id'];
	$scope.init = function() {
		$("#leftRoute").hide();
		$scope.getOrder();
	};
	$scope.getOrder = function() {
		$http.post("api/order/payOrder", $scope.req).success(function (data) {  //绑定
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
			$scope.order.title="";
        	var count=0;
        	 angular.forEach($scope.order.good, function (one) {
                 if(count<2){
                	 $scope.order.title+=one.title+" "+one.pcname+"("+one.quantity+"件)";
                 }
                 count++;
             });
        	 if(count>2){
        		 $scope.order.title+="..";
        	 }
			window.open("alipayapi.jsp?WIDtotal_fee="+
					$scope.order.total_price/100+"&WIDsubject="+$scope.order.title
					+"&WIDout_trade_no="+$scope.order.order_number);  
		}else{
			//alert("银行");
			window.open("http://www.taobao.com");  
		}
	}
	$scope.finish= function(){
		if(1==1){
			$('#payTab').hide();
			$('.mask').hide();
			$scope.pay=false;
			//window.location.href = '#/pay_success?id='+$scope.req.id;
		}else{
			alert("支付失败")
		}
	};
	$scope.init();
};

payModule.controller("payController", payController);
