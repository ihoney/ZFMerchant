'user strict';

// 公告
var webmessageModule = angular.module("webmessageModule", []);

var webmessageController = function($scope, $location, $http, LoginService) {
	$("#leftRoute").show();
	if(LoginService.userid == 0){
		window.location.href = '#/login';
	}else{
		//显示用户登录部分
		$scope.$emit('changeshow',false);
	}
	 $scope.getInfo = function () {
		$("#leftRoute").show();
		$scope.req={};
		$scope.req.id=$location.search()['infoId'];
    	$http.post("api/web/message/getById", $scope.req).success(function (data) { 
            if (data.code==1) {
            	$scope.info=data.result;
            }
        }).error(function (data) {
            $("#serverErrorModal").modal({show: true});
        });
	 };
	$scope.getInfo();
};

webmessageModule.controller("webmessageController", webmessageController);
