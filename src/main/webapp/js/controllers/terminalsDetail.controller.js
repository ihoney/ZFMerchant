'user strict';

//系统设置模块
var terminalDetailModule = angular.module("terminalDetailModule",[]);

var terminalDetailController = function ($scope, $http,$location, LoginService) {
	$scope.terminalId=Math.ceil($location.search()['terminalId']);
	$scope.customerId = 80;
	$(".leaseExplain_tab").hide();
	$("#pass").hide();
	//查看终端详情
	$scope.terminalDetail = function () {
      $http.post("api/terminal/getApplyDetails", {terminalsId:$scope.terminalId,customerId:$scope.customerId}).success(function (data) {  //绑定
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
  
//租借說明弹出层
  $scope.popup = function(t,b){
	  /*$(".mask").show();
	  $(".leaseExplain_tab").show();*/
	  var doc_height = $(document).height();
		var doc_width = $(document).width();
		var win_height = $(window).height();
		var win_width = $(window).width();
		
		var layer_height = $(t).height();
		var layer_width = $(t).width();
		
		var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
		
		//tab
		$(b).bind('click',function(){
			    $(".mask").css({display:'block',height:doc_height});
				$(t).css('top',(win_height-layer_height)/2);
				$(t).css('left',(win_width-layer_width)/2);
				$(t).css('display','block');
				return false;
			}
		)
		$(".close").click(function(){
			$(t).css('display','none');
			$(".mask").css('display','none');
		})
  }
  
  //关闭弹出框
  $scope.closeDocument = function(obj){
	  $("#"+obj).hide();
	  $(".mask").hide ();
  }
//同步
  $scope.synchronous = function(){
	  $http.post("api/terminal/synchronous").success(function (data) {  //绑定
          if (data != null && data != undefined) {
        	  alert(data.code);
          }
      }).error(function (data) {
    	  alert("同步失败");
      });
  }
  
  //找回POS机密码
  $scope.findPassword = function(){
	  $http.post("api/terminal/Encryption", {terminalid:$scope.terminalId}).success(function (data) {  //绑定
          if (data != null && data != undefined) {
        	  $scope.pass = data.result;
        	  $(".mask").show();
        	  $("#pass").show();
          }
      }).error(function (data) {
    	  alert("获取列表失败");
      });
  }
  
  $scope.terminalDetail();

};





terminalDetailModule.$inject = ['$scope', '$http', '$cookieStore'];
terminalDetailModule.controller("terminalDetailController", terminalDetailController);
