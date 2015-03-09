'user strict';

//系统设置模块
var orderModule = angular.module("orderModule",[]);

var orderController = function ($scope, $http, LoginService) {
	$("#leftRoute").show();
	initSystemPage($scope);// 初始化分页参数
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
	 
	//订单列表
	$scope.orderlist = function () {
        $scope.req={customer_id:80,
        		page:$scope.indexPage,
        		pageSize:$scope.rows};
        $http.post("api/order/getMyOrderAll", $scope.req).success(function (data) {  //绑定
            if (data != null && data != undefined) {
                $scope.list = data.result;
                calcSystemPage($scope, data.result.total);// 计算分页
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
	
	// 上一页
	$scope.prev = function() {
		if ($scope.indexPage > 1) {
			$scope.indexPage--;
			$scope.orderlist();
		}
	};

	// 当前页
	$scope.loadPage = function(currentPage) {
		$scope.indexPage = currentPage;
		$scope.orderlist();
	};

	// 下一页
	$scope.next = function() {
		if ($scope.indexPage < $scope.totalPage) {
			$scope.indexPage++;
			$scope.orderlist();
		}
	};

	// 跳转到XX页
	$scope.getPage = function() {
		$scope.indexPage = Math.ceil($scope.gotoPage);
		$scope.orderlist();
	};

    $scope.orderlist();
//    $scope.submitSearch();
//    $scope.orderinfo();
};

//myorderModule.$inject = ['$scope', '$http', '$cookieStore'];
orderModule.controller("orderController", orderController);
