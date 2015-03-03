'user strict';

//系统设置模块
var cs_updateinfoModule = angular.module("cs_updateinfoModule",[]);

var cs_updateinfoController = function ($scope,$location, $http, LoginService) {
	$scope.req={};
	$scope.req.id=$location.search()['infoId'];
    $scope.getInfo = function () {
    	$http.post("api/update/info/getInfoById", $scope.req).success(function (data) {  //绑定
            if (data.code==1) {
            	$scope.info=data.result;
            }
        }).error(function (data) {
            $("#serverErrorModal").modal({show: true});
        });
    };
    $scope.getInfo();

};

cs_updateinfoModule.controller("cs_updateinfoController", cs_updateinfoController);
