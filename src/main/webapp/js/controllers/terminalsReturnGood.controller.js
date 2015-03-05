'user strict';

//系统设置模块
var terminalReturnGoodModule = angular.module("terminalReturnGoodModule",[]);

var terminalReturnGoodController = function ($scope, $http,$location, LoginService) {
	$scope.terminalId=$location.search()['terminalId'];
	//查看终端详情
	$scope.terminalDetail = function () {
		
      $http.post("api/terminal/getApplyToUpdate", {terminalsId:$scope.terminalId}).success(function (data) {  //绑定
          if (data != null && data != undefined) {
              //终端信息
              $scope.applyDetails = data.result.applyDetails;
          }
      }).error(function (data) {
    	  alert("获取列表失败");
      });
  };
  
  $scope.terminalDetail();
};



terminalReturnGoodModule.$inject = ['$scope', '$http', '$cookieStore'];
terminalReturnGoodModule.controller("terminalReturnGoodController", terminalReturnGoodController);
