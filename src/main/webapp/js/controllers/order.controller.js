'user strict';
//订单
var orderModule = angular.module("orderModule",[]);
var orderController = function ($scope, $http, LoginService) {

	initSystemPage($scope);// 初始化分页参数
 
	// 搜索
	$scope.submitSearch = function(){
		$scope.req = {
				customer_id : LoginService.userid,
				search : $scope.search,
				page : $scope.indexPage,
				rows : $scope.rows
			};
			$http.post("api/order/orderSearch", $scope.req).success(function (data) {  // 绑定
	            if (data != null && data != undefined) {
	                $scope.list = data.result;
	                calcSystemPage($scope, data.result.total);// 计算分页
	            }
	        }).error(function (data) {
	            $("#serverErrorModal").modal({show: true});
	        });
	};
	//筛选
	$scope.submitScreen = function(){
		initSystemPage($scope);// 初始化分页参数
		$scope.req = {
				customer_id : LoginService.userid,
				search : $scope.search,
				q : $scope.screen,
				page : $scope.indexPage,
				rows : $scope.rows
			};
			$http.post("api/order/orderSearch", $scope.req).success(function (data) {  //绑定
	            if (data != null && data != undefined) {
	                $scope.list = data.result;
	                calcSystemPage($scope, data.result.total);// 计算分页
	            }
	        }).error(function (data) {
	            $("#serverErrorModal").modal({show: true});
	        });
	};
	
	$scope.submitPage = function(){
		$scope.req={customer_id:LoginService.userid,search:$scope.search,q:$scope.screen,page:$scope.indexPage,
				rows:$scope.rows};
		$http.post("api/order/orderSearch", $scope.req).success(function (data) {  //绑定
			if (data != null && data != undefined) {
				$scope.list = data.result;
				calcSystemPage($scope, data.result.total);// 计算分页
			}
		}).error(function (data) {
			$("#serverErrorModal").modal({show: true});
		});
	};
	 
	//订单列表
	$scope.orderlist = function () {
		initSystemPage($scope);// 初始化分页参数
        $scope.req={customer_id:LoginService.userid,
        		page:$scope.indexPage,
        		rows:$scope.rows};
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
    	
    	if(window.confirm('你确定要取消吗？')){
    		$http.post("api/order/cancelMyOrder", $scope.req).success(function (data) {  //绑定
                if (data != null && data != undefined) {
                	$scope.submitPage();
                }
            }).error(function (data) {
                $("#serverErrorModal").modal({show: true});
            });
            return true;
         }else{
            return false;
        }
	
	};
    //详情
    $scope.orderinfo=function (p) {
    	LoginService.poscd=p.id;
    	$scope.poscd=p.id;
    	window.location.href = '#/orderinfo';
    };
    $scope.topay = function(o) {
    	window.open("#/pay?id="+o.order_id) ;  
	};

	// 上一页
	$scope.prev = function() {
		if ($scope.indexPage > 1) {
			$scope.indexPage--;
			$scope.submitPage();
		}
	};

	// 当前页
	$scope.loadPage = function(currentPage) {
		$scope.indexPage = currentPage;
		$scope.submitPage();
	};

	// 下一页
	$scope.next = function() {
		if ($scope.indexPage < $scope.totalPage) {
			$scope.indexPage++;
			$scope.submitPage();
		}
	};

	// 跳转到XX页
	$scope.getPage = function() {
		$scope.indexPage = Math.ceil($scope.gotoPage);
		$scope.submitPage();
	};

    $scope.submitPage();
};

orderModule.controller("orderController", orderController);
