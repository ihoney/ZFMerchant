'user strict';

//系统设置模块
var cs_leaseinfoModule = angular.module("cs_leaseinfoModule",[]);

var cs_leaseinfoController = function ($scope,$location, $http, LoginService) {
	$scope.$emit('topTitle',"华尔街金融平台-租赁退还记录详情");
	$("#leftRoute").show();
	if(LoginService.userid == 0){
		window.location.href = '#/login';
	}else{
		//显示用户登录部分
		$scope.$emit('changeshow',false);
	}
	$scope.req={};
	$scope.req.id=$location.search()['infoId'];
    $scope.getInfo = function () {
    	$http.post("api/cs/lease/returns/getById", $scope.req).success(function (data) {  //绑定
            if (data.code==1) {
            	$scope.info=data.result;
            }
        }).error(function (data) {
            $("#serverErrorModal").modal({show: true});
        });
    };
    //取消
    $scope.cancelApply = function(o){
    	if(window.confirm('你确定要取消吗？')){
    		$scope.req={id:o.id};
    		$http.post("api/cs/lease/returns/cancelApply", $scope.req).success(function (data) {  //绑定
    			if (data != null && data != undefined) {
    				$scope.getInfo();
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
			$http.post("api/cs/lease/returns/resubmitCancel", $scope.req).success(function (data) {  //绑定
				if (data != null && data != undefined) {
					$scope.getInfo();
				}
			}).error(function (data) {
				$("#serverErrorModal").modal({show: true});
			});
	         
            return true;
         }else{
            return false;
        }
		
	};
    $scope.getInfo();

};

cs_leaseinfoModule.controller("cs_leaseinfoController", cs_leaseinfoController);
