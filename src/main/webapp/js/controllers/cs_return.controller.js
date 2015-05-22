'user strict';

//系统设置模块
var cs_returnModule = angular.module("cs_returnModule",[]);

var cs_returnController = function ($scope, $http, LoginService) {
	$scope.$emit('topTitle',"华尔街金融平台-退货记录");
	$("#leftRoute").show();
	if(LoginService.userid == 0){
		window.location.href = '#/login';
	}else{
		//显示用户登录部分
		$scope.$emit('changeshow',false);
	}
	//搜索
	$scope.submitSearch = function(){
		initSystemPage($scope);// 初始化分页参数
		$scope.req={customer_id:LoginService.userid,search:$scope.search,
				page : $scope.indexPage,
				rows : $scope.rows};
		$http.post("api/return/search", $scope.req).success(function (data) {  //绑定
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
				page : $scope.indexPage,
				rows : $scope.rows};
		$http.post("api/return/search", $scope.req).success(function (data) {  //绑定
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
				page : $scope.indexPage,
				rows : $scope.rows};
		$http.post("api/return/search", $scope.req).success(function (data) {  //绑定
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
				page : $scope.indexPage,
				rows : $scope.rows};
        $http.post("api/return/getAll", $scope.req).success(function (data) {  //绑定
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
    	window.location.href = '#/cs_returninfo';
    };
    //取消
    $scope.cancelApply = function(o){
    	if(window.confirm('你确定要取消吗？')){
    		$scope.req={id:o.id};
    		$http.post("api/return/cancelApply", $scope.req).success(function (data) {  //绑定
    			if (data != null && data != undefined) {
    				$scope.orderlist();
    			}
    		}).error(function (data) {
    			$("#serverErrorModal").modal({show: true});
    		});
	         
            return true;
         }else{
            return false;
        }
    	
	};
	//重新提交
	$scope.resubmitCancel = function(o){
		if(window.confirm('你确定要重新提交吗？')){
			
			$scope.req={id:o.id};
			$http.post("api/return/resubmitCancel", $scope.req).success(function (data) {  //绑定
				if (data != null && data != undefined) {
					$scope.orderlist();
				}
			}).error(function (data) {
				$("#serverErrorModal").modal({show: true});
			});
	         
            return true;
         }else{
            return false;
        }
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

		$http.post("api/return/addMark", $scope.req).success(function(data) {
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

cs_returnModule.controller("cs_returnController", cs_returnController);
