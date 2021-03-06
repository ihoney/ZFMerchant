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
            	$scope.$emit('topTitle',"华尔街金融平台-维修支付"+$scope.order.apply_num);
            	if(data.result.paytype>0){
            		$scope.pay=false;
            		$scope.payway=data.result.paytype;
            	}
            }else{
            	alert("维修单不存在");
            	window.location.href = '#/cs_repair';
            }
        });
	};
	$scope.pay= function(){
		$http.post("api/cs/repair/repairPayFinish", $scope.req).success(function (data) {  //绑定
            if (data.code==1) {
            	if(data.result.paytype>0){
            		alert("当前订单已支付成功，请不要重复支付");
            		$scope.pay=false;
            		$scope.payway=data.result.paytype;
            		$('#payTab').hide();
            		$('.mask').hide();
            		return;
            	}
            }
        });
		$('#payTab').show();
		if(1==$scope.payway){
			//alert("支付宝");
			window.open("repairalipayapi.jsp?WIDtotal_fee="+
					$scope.order.repair_price/100+"&WIDsubject="+$scope.order.miaoshu
					+"&WIDout_trade_no="+$scope.order.apply_num);  
		}else if(2==$scope.payway){
			window.open("unionpay.jsp?WIDtotal_fee="+
					$scope.order.total_price/100+"&WIDsubject="+$scope.order.title
					+"&WIDout_trade_no="+$scope.order.order_number);  
		}else{
			//alert("银行");
			alert("暂不支持，请联系系统管理员。");
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
            		alert("尚未支付,如有疑问请联系400-009-0876");
            	}
            	
            }
        });
	};
	$scope.payproblem= function(){
		window.open("help/payproblem.html");
	};
	$scope.init();
};

repair_payModule.controller("repair_payController", repair_payController);
