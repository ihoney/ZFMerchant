'user strict';

//系统设置模块
var terminalToUpdateModule = angular.module("terminalToUpdateModule",[]);

var terminalToUpdateController = function ($scope, $http,$location, LoginService) {
	$scope.terminalId=$location.search()['terminalId'];
	$(".leaseExplain_tab").hide();
	//查看终端详情
	$scope.terminalDetail = function () {
      alert($scope.terminalId);
      $http.post("api/terminal/getApplyDetails", {terminalsId:$scope.terminalId}).success(function (data) {  //绑定
          if (data != null && data != undefined) {
              //终端信息
              $scope.applyDetails = data.result.applyDetails;
              //交易
              $scope.rateList = data.result.rates;
              //租赁
              $scope.tenancy  = data.result.tenancy;
              //追踪记录
              $scope.trackRecord = data.result.trackRecord;
              //资料
              $scope.openingDetails = data.result.openingDetails;
          }
      }).error(function (data) {
    	  alert("获取列表失败");
          /*$("#serverErrorModal").modal({show: true});*/
      });
  };
  
//弹出层
  $scope.popup = function(t,b){
	  $(".mask").show();
	  $(".leaseExplain_tab").show();
  }
  
  $scope.terminalDetail();

};



terminalToUpdateModule.$inject = ['$scope', '$http', '$cookieStore'];
terminalToUpdateModule.controller("terminalToUpdateController", terminalToUpdateController);
