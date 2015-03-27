'user strict';

//系统设置模块
var ordermarkModule = angular.module("ordermarkModule",[]);

var ordermarkController = function ($scope,$location, $http, LoginService) {
	$scope.req={};
	$scope.req.id=$location.search()['orderId'];
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
  
    //batchSaveComment     
    /**
     *     private Integer customer_id;
    private Integer good_id;
    private Integer score;
    private String content;
     */
    $scope.saveContent= function () {
//    	var goodid = $("#com_good_id").val();
//    	$scope.req.content = $scope.content;
//    	$scope.req.good_id = goodid;
//    	var score = $("#com_score").val();
//    	if(score == ""){
//    		score = 3;
//    	}
//    	$scope.req.score = score*10;
//    	$scope.req.customer_id = LoginService.userid;
//    	
//    	$http.post("api/order/saveComment", $scope.req).success(function (data) {  
//    		if (data.code==1) {
////    			 $(".tab").css('display','none');
//    			 $("#od_pj_div").css('display','none');
//    		}
//    	}).error(function (data) {
//    		$("#serverErrorModal").modal({show: true});
//    	});
    };
    
    $scope.getOrdermark();

};

ordermarkModule.controller("ordermarkController", ordermarkController);
