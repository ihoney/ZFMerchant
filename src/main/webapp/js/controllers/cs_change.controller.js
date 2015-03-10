'user strict';

//系统设置模块
var cs_changeModule = angular.module("cs_changeModule",[]);

var cs_changeController = function ($scope, $http, LoginService) {
	$("#leftRoute").show();
	//搜索
	$scope.submitSearch = function(){
		initSystemPage($scope);// 初始化分页参数
		$scope.req={customer_id:LoginService.userid,search:$scope.search,
				page : $scope.indexPage,
				pageSize : $scope.rows};
		$http.post("api/cs/change/search", $scope.req).success(function (data) {  //绑定
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
		$scope.req={customer_id:LoginService.userid,search:$scope.search,q:$scope.screen,
				q : $scope.screen,
				page : $scope.indexPage,
				pageSize : $scope.rows};
		$http.post("api/cs/change/search", $scope.req).success(function (data) {  //绑定
            if (data != null && data != undefined) {
                $scope.list = data.result;
                calcSystemPage($scope, data.result.total);// 计算分页
            }
        }).error(function (data) {
            $("#serverErrorModal").modal({show: true});
        });
	};
	
	$scope.submitPage = function(){
		$scope.req={customer_id:LoginService.userid,search:$scope.search,q:$scope.screen,
				q : $scope.screen,
				page : $scope.indexPage,
				pageSize : $scope.rows};
		$http.post("api/cs/change/search", $scope.req).success(function (data) {  //绑定
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
        		pageSize:$scope.rows};
        $http.post("api/cs/change/getAll", $scope.req).success(function (data) {  //绑定
            if (data != null && data != undefined) {
                $scope.list = data.result;
                calcSystemPage($scope, data.result.total);// 计算分页
            }
        }).error(function (data) {
            $("#serverErrorModal").modal({show: true});
        });
    };
    //详情
    $scope.orderinfo=function (p) {
    	LoginService.poscd=p.id;
    	$scope.poscd=p.id;
    	window.location.href = '#/cs_changeinfo';
    };
    //取消
    $scope.cancelApply = function(o){
    	$scope.req={id:o.id};
		$http.post("api/cs/change/cancelApply", $scope.req).success(function (data) {  //绑定
            if (data != null && data != undefined) {
            	$scope.orderlist();
            }
        }).error(function (data) {
            $("#serverErrorModal").modal({show: true});
        });
	};
	//重新提交
	$scope.resubmitCancel = function(o){
		$scope.req={id:o.id};
		$http.post("api/cs/change/resubmitCancel", $scope.req).success(function (data) {  //绑定
			if (data != null && data != undefined) {
				$scope.orderlist();
			}
		}).error(function (data) {
			$("#serverErrorModal").modal({show: true});
		});
	};
	// 关闭
	$scope.close_wlxx = function() {
		$(".tab").css('display', 'none');
	};
	// 打开
	$scope.click_wlxx = function(o) {
		$("#info_id").val(o.id);
		$(".tab").css('display', 'block');
	};
	// 提交
	$scope.save_wlxx = function() {
		var id = $("#info_id").val();
		$scope.req.id = id;
		$scope.req.computer_name = $scope.computer_name;
		$scope.req.track_number = $scope.track_number;
		$scope.req.customer_id = LoginService.userid;

		$http.post("api/cs/change/addMark", $scope.req).success(function(data) {
			if (data.code == 1) {
				$(".tab").css('display', 'none');
			}
		}).error(function(data) {
			$("#serverErrorModal").modal({
				show : true
			});
		});
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
    $scope.orderlist();
};

cs_changeModule.controller("cs_changeController", cs_changeController);
