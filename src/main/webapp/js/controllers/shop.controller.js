'user strict';

//系统设置模块
var shopModule = angular.module("shopModule",[]);

var shopController = function ($scope, $http, LoginService) {
	
	$scope.req={page:1,rows:10};
	$scope.req.city_id=LoginService.city;
	$scope.req.orderType=1;
	
	//$scope.req.has_purchase=1;
	//$scope.req.keys=0;
	//$scope.req.minPrice=0;
	//$scope.req.maxPrice=0;
	
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
            	$scope.category=data.result.webcategory;
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
            	$scope.goodList=data.result.list;
            }
        }).error(function (data) {
            $("#serverErrorModal").modal({show: true});
        });
    };
    //POS机品牌
    $scope.check1=function (p) {
    	if(p.clazz=="hover"){
    		p.clazz="";
    		$scope.chli1val="";
    		$scope.req.brands_id=[];
    		angular.forEach($scope.brands, function (one) {
       		  if(one.clazz=="hover"){
       			$scope.chli1val=$scope.chli1val+one.value+",";
       			$scope.req.brands_id.push(one.id);
       		  }
            });
    		if($scope.chli1val==""){
    			$scope.chli1show=false;
    		}else{
    			var s=$scope.chli1val;
    			s=s.substring(0,s.length-1);
    			$scope.chli1val=s;
    		}
    	}else{
    		if($scope.chli1show){
    			$scope.chli1val=$scope.chli1val+","+p.value;
    		}else{
    			$scope.chli1val=p.value;
    		}
    		$scope.chli1show=true;
    		$scope.req.brands_id.push(p.id);
    		p.clazz="hover";
    	}
    	$scope.list();
    }
    $scope.chli1del=function () {
    	$scope.chli1show=false;
    	$scope.req.brands_id=[];
    	 angular.forEach($scope.brands, function (one) {
    		 one.clazz="";
         });
    	 $scope.list();
    }
    
  //POS机类型
    $scope.check2=function (p) {
    	if(p.clazz=="hover"){
    		p.clazz="";
    		$scope.chli2val="";
    		$scope.req.category=[];
    		angular.forEach($scope.category, function (one) {
       		  if(one.clazz=="hover"){
       			$scope.chli2val=$scope.chli2val+one.value+",";
       			$scope.req.category.push(one.id);
       		  }
            });
    		if($scope.chli2val==""){
    			$scope.chli2show=false;
    		}else{
    			var s=$scope.chli2val;
    			s=s.substring(0,s.length-1);
    			$scope.chli2val=s;
    		}
    	}else{
    		if($scope.chli2show){
    			$scope.chli2val=$scope.chli2val+","+p.value;
    		}else{
    			$scope.chli2val=p.value;
    		}
    		$scope.chli2show=true;
    		$scope.req.category.push(p.id);
    		p.clazz="hover";
    	}
    	$scope.list();
    }
    $scope.chli2del=function () {
    	$scope.chli2show=false;
    	$scope.req.category=[];
    	 angular.forEach($scope.category, function (one) {
    		 one.clazz="";
         });
    	 $scope.list();
    }
  //支付通道
    $scope.check3=function (p) {
    	if(p.clazz=="hover"){
    		p.clazz="";
    		$scope.chli3val="";
    		$scope.req.pay_channel_id=[];
    		angular.forEach($scope.pay_channel, function (one) {
       		  if(one.clazz=="hover"){
       			$scope.chli3val=$scope.chli3val+one.value+",";
       			$scope.req.pay_channel_id.push(one.id);
       		  }
            });
    		if($scope.chli3val==""){
    			$scope.chli3show=false;
    		}else{
    			var s=$scope.chli3val;
    			s=s.substring(0,s.length-1);
    			$scope.chli3val=s;
    		}
    	}else{
    		if($scope.chli3show){
    			$scope.chli3val=$scope.chli3val+","+p.value;
    		}else{
    			$scope.chli3val=p.value;
    		}
    		$scope.chli3show=true;
    		$scope.req.pay_channel_id.push(p.id);
    		p.clazz="hover";
    	}
    	$scope.list();
    }
    $scope.chli3del=function () {
    	$scope.chli3show=false;
    	$scope.req.pay_channel_id=[];
    	 angular.forEach($scope.pay_channel, function (one) {
    		 one.clazz="";
         });
    	 $scope.list();
    }
    
  //支持卡类型
    $scope.check4=function (p) {
    	if(p.clazz=="hover"){
    		p.clazz="";
    		$scope.chli4val="";
    		$scope.req.pay_card_id=[];
    		angular.forEach($scope.pay_card, function (one) {
       		  if(one.clazz=="hover"){
       			$scope.chli4val=$scope.chli4val+one.value+",";
       			$scope.req.pay_card_id.push(one.id);
       		  }
            });
    		if($scope.chli4val==""){
    			$scope.chli4show=false;
    		}else{
    			var s=$scope.chli4val;
    			s=s.substring(0,s.length-1);
    			$scope.chli4val=s;
    		}
    	}else{
    		if($scope.chli4show){
    			$scope.chli4val=$scope.chli4val+","+p.value;
    		}else{
    			$scope.chli4val=p.value;
    		}
    		$scope.chli4show=true;
    		$scope.req.pay_card_id.push(p.id);
    		p.clazz="hover";
    	}
    	$scope.list();
    }
    $scope.chli4del=function () {
    	$scope.chli4show=false;
    	$scope.req.pay_card_id=[];
    	 angular.forEach($scope.pay_card, function (one) {
    		 one.clazz="";
         });
    	 $scope.list();
    }
    
    //支持交易类型
    $scope.check5=function (p) {
    	if(p.clazz=="hover"){
    		p.clazz="";
    		$scope.chli5val="";
    		$scope.req.trade_type_id=[];
    		angular.forEach($scope.trade_type, function (one) {
       		  if(one.clazz=="hover"){
       			$scope.chli5val=$scope.chli5val+one.value+",";
       			$scope.req.trade_type_id.push(one.id);
       		  }
            });
    		if($scope.chli5val==""){
    			$scope.chli5show=false;
    		}else{
    			var s=$scope.chli5val;
    			s=s.substring(0,s.length-1);
    			$scope.chli5val=s;
    		}
    	}else{
    		if($scope.chli5show){
    			$scope.chli5val=$scope.chli5val+","+p.value;
    		}else{
    			$scope.chli5val=p.value;
    		}
    		$scope.chli5show=true;
    		$scope.req.trade_type_id.push(p.id);
    		p.clazz="hover";
    	}
    	$scope.list();
    }
    $scope.chli5del=function () {
    	$scope.chli5show=false;
    	$scope.req.trade_type_id=[];
    	 angular.forEach($scope.trade_type, function (one) {
    		 one.clazz="";
         });
    	 $scope.list();
    }
    
    //签购单方式
    $scope.check6=function (p) {
    	if(p.clazz=="hover"){
    		p.clazz="";
    		$scope.chli6val="";
    		$scope.req.sale_slip_id=[];
    		angular.forEach($scope.sale_slip, function (one) {
       		  if(one.clazz=="hover"){
       			$scope.chli6val=$scope.chli6val+one.value+",";
       			$scope.req.sale_slip_id.push(one.id);
       		  }
            });
    		if($scope.chli6val==""){
    			$scope.chli6show=false;
    		}else{
    			var s=$scope.chli6val;
    			s=s.substring(0,s.length-1);
    			$scope.chli6val=s;
    		}
    	}else{
    		if($scope.chli6show){
    			$scope.chli6val=$scope.chli6val+","+p.value;
    		}else{
    			$scope.chli6val=p.value;
    		}
    		$scope.chli6show=true;
    		$scope.req.sale_slip_id.push(p.id);
    		p.clazz="hover";
    	}
    	$scope.list();
    }
    $scope.chli6del=function () {
    	$scope.chli6show=false;
    	$scope.req.sale_slip_id=[];
    	 angular.forEach($scope.sale_slip, function (one) {
    		 one.clazz="";
         });
    	 $scope.list();
    }
    
    $scope.order=function (p) {
    	$scope.req.orderType=p;
    	$scope.list();
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
