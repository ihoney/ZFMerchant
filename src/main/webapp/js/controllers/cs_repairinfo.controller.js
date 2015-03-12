'user strict';

//系统设置模块
var cs_repairinfoModule = angular.module("cs_repairinfoModule",[]);

var cs_repairinfoController = function ($scope,$location, $http, LoginService) {
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
    	$http.post("api/cs/repair/getRepairById", $scope.req).success(function (data) {  //绑定
            if (data.code==1) {
            	$scope.info=data.result;
            }
        }).error(function (data) {
            $("#serverErrorModal").modal({show: true});
        });
    };
    //取消
    $scope.cancelApply = function(o){
    	$scope.req={id:o.id};
		$http.post("api/cs/repair/cancelApply", $scope.req).success(function (data) {  //绑定
            if (data != null && data != undefined) {
            	$scope.getInfo();
            }
        }).error(function (data) {
            $("#serverErrorModal").modal({show: true});
        });
	};
	//重新提交
	$scope.resubmitCancel = function(o){
		$scope.req={id:o.id};
		$http.post("api/cs/repair/resubmitCancel", $scope.req).success(function (data) {  //绑定
			if (data != null && data != undefined) {
				$scope.getInfo();
			}
		}).error(function (data) {
			$("#serverErrorModal").modal({show: true});
		});
	};
	   $scope.topay = function(id) {
	    	window.open("#/repair_pay?repair_id="+id) ;  
		};
    $scope.getInfo();

};

cs_repairinfoModule.controller("cs_repairinfoController", cs_repairinfoController);
