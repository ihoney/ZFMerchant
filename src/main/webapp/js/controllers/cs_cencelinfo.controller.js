'user strict';

//系统设置模块
var cs_cencelinfoModule = angular.module("cs_cencelinfoModule",[]);

var cs_cencelinfoController = function ($scope,$location, $http, LoginService) {
	$scope.req={};
	$scope.req.id=$location.search()['infoId'];
    $scope.getInfo = function () {
    	$http.post("api/cs/cancels/getCanCelById", $scope.req).success(function (data) {  //绑定
            if (data.code==1) {
            	$scope.info=data.result;
            }
        }).error(function (data) {
            $("#serverErrorModal").modal({show: true});
        });
    };
    $scope.getInfo();

};

cs_cencelinfoModule.controller("cs_cencelinfoController", cs_cencelinfoController);
