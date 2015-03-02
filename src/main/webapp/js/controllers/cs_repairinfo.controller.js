'user strict';

//系统设置模块
var cs_repairinfoModule = angular.module("cs_repairinfoModule",[]);

var cs_repairinfoController = function ($scope,$location, $http, LoginService) {
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
    $scope.getInfo();

};

cs_repairinfoModule.controller("cs_repairinfoController", cs_repairinfoController);
