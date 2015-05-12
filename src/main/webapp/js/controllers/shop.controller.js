'user strict';

//系统设置模块
var shopModule = angular.module("shopModule",[]);

var shopController = function ($scope, $http,$location, LoginService) {
	
	$scope.req={};
	$scope.req.keys=LoginService.keys;
	$scope.req.city_id=LoginService.city;
	
	//$scope.req.category=$location.search()['category'];
	if(undefined==$location.search()['category']){
		$scope.req.category=0;
	}else{
		$scope.req.category=$location.search()['category'];
	}
	
	$scope.req.has_purchase=false;
	//$scope.req.keys="";
	//$scope.req.minPrice=0;
	//$scope.req.maxPrice=0;
	
	$scope.req.brands_id=[];
	
	$scope.req.pay_channel_id=[];
	$scope.req.pay_card_id=[];
	$scope.req.trade_type_id=[];
	$scope.req.sale_slip_id=[];
	$scope.req.tDate=[];
	$scope.check2show=false;
	$scope.check2son=[];
	$scope.xxx="";
	$scope.sb=function(one){
		$('#xx').hide();
		$scope.xxx=one.value;
		$scope.req.tDate=[];
		if(one.id!=0){
			$scope.req.tDate.push(one.id);
		}
		$scope.list();
	}
	
	$scope.index=function() {
		window.location.href = '#/';
	};
	$scope.init = function () {
		$scope.$emit('changesearchview',false);
		initSystemPage($scope.req);// 初始化分页参数
		$scope.shopcartcount();
		$scope.searchinfo();
		$scope.list();
    };
    $scope.searchvalues=[];
    $scope.change2 = function() {
		if($scope.req.keys!=undefined&&$.trim($scope.req.keys)!=''){
			$http.post("api/good/value",{keys:$scope.req.keys}).success(function(data) {
				if (data.code == 1) {
					$scope.searchvalues=data.result;
				}
			});
		}else{
			$scope.searchvalues=[];
		}
	};
	$scope.enterchange2 =  function(e){
		var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
        	$scope.search();
        }
	}
    $scope.searchinfo=function(){
    	$http.post("api/good/search", $scope.req).success(function (data) {  //绑定
            if (data.code==1) {
            	$scope.brands=data.result.brands;
            	//$scope.category=data.result.webcategory;
            	$scope.category=data.result.category;
            	$scope.sale_slip=data.result.sale_slip;
            	$scope.pay_card=data.result.pay_card;
            	$scope.pay_channel=data.result.pay_channel;
            	$scope.trade_type=data.result.trade_type;
            	$scope.tDate=data.result.tDate;
            	$scope.all={id:0,value:"全部"};
            	$scope.tDate.unshift($scope.all);
            	if($scope.req.category>0){
            		if($scope.req.category<5){
            			angular.forEach($scope.category, function (one) {
            					if(one.id==$scope.req.category){
            						one.clazz="hover";
            						$scope.chli2val=one.value;
            			    		$scope.chli2show=true;
            					}
            	            });
            		}else if($scope.req.category<7){
            			angular.forEach($scope.category, function (one) {
        					if(one.id==1){
        						one.clazz="hover";
        						$scope.check2son=one.son;
        						angular.forEach(one.son, function (one2) {
                					if(one2.id==$scope.req.category){
                						one2.clazz="hover";
                						$scope.chli2val=one2.value;
                			    		$scope.chli2show=true;
                			    		$scope.check2show=true;
                					}
                	            });
        					}
        	            });
            		}else if($scope.req.category<9){
            			angular.forEach($scope.category, function (one) {
        					if(one.id==2){
        						one.clazz="hover";
        						$scope.check2son=one.son;
        						angular.forEach(one.son, function (one2) {
                					if(one2.id==$scope.req.category){
                						one2.clazz="hover";
                						$scope.chli2val=one2.value;
                			    		$scope.chli2show=true;
                			    		$scope.check2show=true;
                					}
                	            });
        					}
        	            });
            		}
            	}
            }
        });
    }
    $scope.gtoto = function(url,id) {
    	window.open(url+id);
	}
    $scope.search=function () {
	    $scope.req.indexPage=1;
	    LoginService.keys=$scope.req.keys;
	    $scope.list();
    };
    $scope.hotwords=function(xx) {
    	$scope.req.indexPage=1;
 	    $scope.req.keys=xx;
 	    $scope.list();
	};
    $scope.list = function () {
    	if($scope.req.has_purchase){
    		$scope.req.has_purchase=1;
    	}else{
    		$scope.req.has_purchase=0;
    	}
    	$scope.req.page=$scope.req.indexPage;
		$http.post("api/good/list", $scope.req).success(function (data) {  //绑定
            if (data.code==1) {
            	$scope.goodList=data.result.list;
            	calcSystemPage($scope.req, data.result.total);// 计算分页
            	if($scope.req.has_purchase==1){
            		$scope.req.has_purchase=true;
            	}else{
            		$scope.req.has_purchase=false;
            	}
            	
            }
        });
    };
    
 // 上一页
	$scope.prev = function() {
		if ($scope.req.indexPage > 1) {
			$scope.req.indexPage--;
			$scope.list();
		}
	};

	// 当前页
	$scope.loadPage = function(currentPage) {
		$scope.req.indexPage = currentPage;
		$scope.list();
	};

	// 下一页
	$scope.next = function() {
		if ($scope.req.indexPage < $scope.req.totalPage) {
			$scope.req.indexPage++;
			$scope.list();
		}
	};

	// 跳转到XX页
	$scope.getPage = function() {
		$scope.req.indexPage = Math.ceil($scope.req.gotoPage);
		$scope.list();
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
    	$scope.search();
    }
    $scope.chli1del=function () {
    	$scope.chli1show=false;
    	$scope.req.brands_id=[];
    	 angular.forEach($scope.brands, function (one) {
    		 one.clazz="";
         });
    	 $scope.search();
    }
    
  //POS机类型
    $scope.check2=function (p) {
    	if(p.clazz=="hover"){
    		$scope.check2show=false;
    		$scope.chli2show=false;
        	p.clazz="";
        	$scope.req.category=0;
    	}else{
    		angular.forEach($scope.category, function (one) {
       		 	one.clazz="";
            });
    		$scope.check2son=p.son;
    		angular.forEach($scope.check2son, function (one) {
       		 	one.clazz="";
            });
    		if(undefined!=$scope.check2son&&$scope.check2son.length>0){
    			$scope.check2show=true;
    		}else{
    			$scope.check2show=false;
    		}
    		$scope.chli2val=p.value;
    		$scope.chli2show=true;
    		$scope.req.category=p.id;
        	p.clazz="hover";
    	}
    	$scope.search();
    }
    $scope.check2sona=function (p) {
    	if(p.clazz=="hover"){
    		angular.forEach($scope.category, function (one) {
       		 	one.clazz="";
            });
    		$scope.check2show=false;
    		$scope.chli2show=false;
    		p.clazz="";
    		$scope.req.category=0;
    	}else{
    		angular.forEach($scope.check2son, function (one) {
       		 	one.clazz="";
            });
    		$scope.chli2val=p.value;
    		$scope.chli2show=true;
    		$scope.req.category=p.id;
    		p.clazz="hover";
    	}
    	$scope.search();
    }
    $scope.chli2del=function () {
    	$scope.chli2show=false;
    	$scope.req.category=0;
    	$scope.check2show=false;
    	angular.forEach($scope.category, function (one) {
   		 	one.clazz="";
        });
    	$scope.search();
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
    	$scope.search();
    }
    $scope.chli3del=function () {
    	$scope.chli3show=false;
    	$scope.req.pay_channel_id=[];
    	 angular.forEach($scope.pay_channel, function (one) {
    		 one.clazz="";
         });
    	 $scope.search();
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
    	$scope.search();
    }
    $scope.chli4del=function () {
    	$scope.chli4show=false;
    	$scope.req.pay_card_id=[];
    	 angular.forEach($scope.pay_card, function (one) {
    		 one.clazz="";
         });
    	 $scope.search();
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
    	$scope.search();
    }
    $scope.chli5del=function () {
    	$scope.chli5show=false;
    	$scope.req.trade_type_id=[];
    	 angular.forEach($scope.trade_type, function (one) {
    		 one.clazz="";
         });
    	 $scope.search();
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
    	$scope.search();
    }
    $scope.chli6del=function () {
    	$scope.chli6show=false;
    	$scope.req.sale_slip_id=[];
    	 angular.forEach($scope.sale_slip, function (one) {
    		 one.clazz="";
         });
    	 $scope.search();
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

};

var cartcount= function($scope, $http){
	
	$scope.shopcount=0;
	//alert(shopcartcount());
	
	$scope.$on('shopcartcountchange', function() {
		if(LoginService.userid>0){
    		$http.post("api/cart/total", {customerId:LoginService.userid}).success(function (data) {  //绑定
                if (data.code==1) {
                	alert(data.result);
                	$scope.shopcount= data.result;
                }
            });
    	}
	});
	
	//购物车数量
	$scope.shopcartcount=function () {
    	if(LoginService.userid>0){
    		$http.post("api/cart/total", {customerId:LoginService.userid}).success(function (data) {  //绑定
                if (data.code==1) {
                	alert(data.result);
                	$scope.shopcount= data.result;
                }
            });
    	}
    };
}

shopModule.controller("shopController", shopController);
shopModule.controller("cartcount", cartcount);