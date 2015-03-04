'user strict';

// 公告
var webmessageModule = angular.module("webmessageModule", []);

var webmessageController = function($scope, $location, $http, LoginService) {
	$("#leftRoute").show();
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
