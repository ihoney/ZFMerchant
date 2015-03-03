'user strict';

//系统设置模块
var terminalModule = angular.module("terminalModule",[]);

var terminalController = function ($scope, $http, LoginService) {
	
	//获得终端列表
	$scope.getInfo = function () {
      $scope.req={
    		  customersId:80,
    		  indexPage:1,
    		  pageNum:8
    		  };
      
      $http.post("api/terminal/getApplyList", $scope.req).success(function (data) {  //绑定
          if (data != null && data != undefined) {
              $scope.list = data.result;
          }
      }).error(function (data) {
    	  alert("获取列表失败");
          /*$("#serverErrorModal").modal({show: true});*/
      });
  };
  
  $scope.getInfo();

};



terminalModule.$inject = ['$scope', '$http', '$cookieStore'];
terminalModule.controller("terminalController", terminalController);
