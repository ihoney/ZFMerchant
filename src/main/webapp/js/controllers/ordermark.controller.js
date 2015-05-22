'user strict';

//系统设置模块
var ordermarkModule = angular.module("ordermarkModule",[]);

var ordermarkController = function ($scope,$location, $http, LoginService) {
	$scope.$emit('topTitle',"华尔街金融平台-商品评价");
	$scope.req={};
	$scope.order_id = $location.search()['orderId'];
	$scope.req.id=$scope.order_id;
	$scope.req.q="1";
    $scope.getOrdermark = function () {
    	$http.post("api/order/getMyOrderById", $scope.req).success(function (data) {  //绑定
            if (data.code==1) {
            	$scope.orderInfo=data.result;
               	 $("#isOk").val("1");
            }
        }).error(function (data) {
            $("#serverErrorModal").modal({show: true});
        });
    };
  
    //批量评价并且更新状态为已评论
    $scope.saveContent= function () {
    	var size = $("#goods_size").val();
    	var marks = new Array();
    	 for(var i = 0;i<size ;i++){
    			var g_id = $("#goodid_"+i).val();
    	    	var score = $("#score_"+i).val();
    	    	if(score ==""){
    	    		score= 30;
    	    	}else{
    	    		score = score*10; 
    	    	}
    	    	var content = $("#content_"+i).val();
    	    	if(content ==""){
    	    		alert("请输入评价内容");
    	    		return false;
    	    	}
    	    	var obj = {};
    	    	obj = {
    	    			"customer_id": LoginService.userid,
    	    			"good_id":  g_id , 
    	    			"score":  score,
    	    		    "content":content
    	    		    };
    	    	marks[i]=obj;
    	 }
    	var json_req =  {
    						 "id" : $scope.order_id, 
    						"json":marks			 
    						};
    	json_req =  JSON.stringify(json_req);
    	$scope.req = json_req;
    	$http.post("api/order/batchSaveComment", $scope.req).success(function (data) {  
    		alert(data.message);
    		if (data.code==1) {
    			window.location.href = '#/orderinfo?orderId='+$scope.order_id;
    		} 
    	}).error(function (data) {
    	});
    };
    
    $scope.getOrdermark();

};

ordermarkModule.controller("ordermarkController", ordermarkController);
