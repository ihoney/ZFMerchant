'user strict';

//系统设置模块
var orderModule = angular.module("orderModule",[]);

var orderController = function ($scope, $http, LoginService) {
	$("#leftRoute").show();
	
	// 搜索
	$scope.submitSearch = function(){
		$scope.req={customer_id:80,search:$scope.search};
		$http.post("api/order/orderSearch", $scope.req).success(function (data) {  // 绑定
            if (data != null && data != undefined) {
                $scope.list = data.result;
            }
        }).error(function (data) {
            $("#serverErrorModal").modal({show: true});
        });
	};
	//筛选
	$scope.submitScreen = function(){
		$scope.req={customer_id:80,search:$scope.search,q:$scope.screen};
		$http.post("api/order/orderSearch", $scope.req).success(function (data) {  //绑定
            if (data != null && data != undefined) {
                $scope.list = data.result;
            }
        }).error(function (data) {
            $("#serverErrorModal").modal({show: true});
        });
	};
	//分页
	$scope.submitpage = function(){
		var input_page = $scope.input_page;
		var strP = /^\d+(\.\d+)?$/;
		if (!strP.test(input_page)) {
			alert("请输入正确的页数");
			return false;
		} 
		$scope.req={customer_id:80,search:$scope.search,q:$scope.screen,page:input_page};
		$http.post("api/order/orderSearch", $scope.req).success(function (data) {  //绑定
			if (data != null && data != undefined) {
				$scope.list = data.result;
			}
		}).error(function (data) {
			$("#serverErrorModal").modal({show: true});
		});
	};
	//订单列表
	$scope.orderlist = function () {
        $scope.req={customer_id:80};
        
        $http.post("api/order/getMyOrderAll", $scope.req).success(function (data) {  //绑定
            if (data != null && data != undefined) {
                $scope.list = data.result;
            }
        }).error(function (data) {
            $("#serverErrorModal").modal({show: true});
        });
    };
    //取消
    $scope.cancelApply = function(id){
    	$scope.req={id:id};
		$http.post("api/order/cancelMyOrder", $scope.req).success(function (data) {  //绑定
            if (data != null && data != undefined) {
            	$scope.orderlist();
            }
        }).error(function (data) {
            $("#serverErrorModal").modal({show: true});
        });
	};
    //详情
    $scope.orderinfo=function (p) {
    	LoginService.poscd=p.id;
    	$scope.poscd=p.id;
    	window.location.href = '#/orderinfo';
    };
    $scope.topay = function(o) {
    	var g_name = $("#g_name").val();
    	window.open("alipayapi.jsp?WIDtotal_fee="+o.order_totalPrice/100+"&WIDsubject="+g_name+"&WIDout_trade_no="+o.order_number);  
	};
    $scope.orderlist();
//    $scope.submitSearch();
//    $scope.orderinfo();
};

//myorderModule.$inject = ['$scope', '$http', '$cookieStore'];
orderModule.controller("orderController", orderController);
