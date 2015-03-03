'user strict';

//系统设置模块
var cs_changeinfoModule = angular.module("cs_changeinfoModule",[]);

var cs_changeinfoController = function ($scope,$location, $http, LoginService) {
	$scope.req={};
	$scope.req.id=$location.search()['infoId'];
    $scope.getInfo = function () {
    	$http.post("api/cs/change/getChangeById", $scope.req).success(function (data) {  //绑定
            if (data.code==1) {
            	$scope.info=data.result;
            }
        }).error(function (data) {
            $("#serverErrorModal").modal({show: true});
        });
    };
    $scope.getInfo();

};

cs_changeinfoModule.controller("cs_changeinfoController", cs_changeinfoController);
