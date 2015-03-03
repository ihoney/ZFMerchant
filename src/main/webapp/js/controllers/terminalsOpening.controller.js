'user strict';

//系统设置模块
var terminalOpenModule = angular.module("terminalOpenModule",[]);

var terminalOpenController = function ($scope, $http,$location, LoginService) {
	$scope.terminalId=$location.search()['terminalId'];
	$scope.customerId = 80;
	$scope.merchantNamed = "";
	$(".leaseExplain_tab").hide();
	//查看终端详情
	$scope.terminalDetail = function () {
      alert($scope.terminalId);
      $http.post("api/terminal/getApplyOpenDetails", {customerId:$scope.customerId,terminalsId:$scope.terminalId}).success(function (data) {  //绑定
          if (data != null && data != undefined) {
              //终端信息
              $scope.applyDetails = data.result.applyDetails;
              //获得商户集合
              $scope.merchantList = data.result.merchants;
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
  
  //动态显示
  $scope.angu = function(obj){
	  $scope.merchantNamed = obj;
  }
  
//动态加载银行
  $scope.bankName ="";
  $scope.bank = function(){
	  $("#backapen").html("");
	/*  $http.post("api/terminal/ChooseBank", {}).success(function (data) {  //绑定
          if (data != null && data != undefined) {
              //终端信息
              $scope.applyDetails = data.result.applyDetails;
              //获得商户集合
              $scope.merchantList = data.result.merchants;
          }
      }).error(function (data) {
    	  alert("获取列表失败");
          $("#serverErrorModal").modal({show: true});
      });*/
	  $scope.bankCode=[1,2,3,4,5];
	  for(var i=0;i< $scope.bankCode.length;i++){
		  $("#backapen").append("<a href='#'>支付通道"+i+"</a>");
	  }
  }
  
  $scope.terminalDetail();

};



terminalOpenModule.$inject = ['$scope', '$http', '$cookieStore'];
terminalOpenModule.controller("terminalOpenController", terminalOpenController);
