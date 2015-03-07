'user strict';

//系统设置模块
var terminalRentalReturnModule = angular.module("terminalRentalReturnModule",[]);

var terminalRentalReturnController = function ($scope, $http,$location, LoginService) {
	$scope.terminalId=$location.search()['terminalId'];
	$scope.customerId = 80;
	//查看终端详情
	$scope.terminalDetail = function () {
		
      $http.post("api/terminal/getApplyDetails", {terminalsId:$scope.terminalId,customerId:$scope.customerId}).success(function (data) {  //绑定
          if (data != null && data != undefined) {
              //终端信息
              $scope.applyDetails = data.result.applyDetails;
              //租赁
              $scope.tenancy = data.result.tenancy;
              //注销模板
              $scope.ReModel = data.result.ReModel;
          }
      }).error(function (data) {
    	  alert("获取列表失败");
      });
      
    //提交退还申请
  	$scope.subRentalReturn = function(obj){
  		
  		$scope.array = [];
  		 for(var i=0;i<$scope.ReModel.length;i++){
  			$scope.array[i] = {
  					id:$scope.terminalId,
  					path:$("#up_"+i).val()
  			};
  		 }
  		
  		 $scope.map = {
   				terminalId : $scope.terminalId,
   				status : 1,
   				templeteInfoXml :$scope.array,
   				type : 3,
   				customerId:$scope.customerId,
   				orderTypes : 1,
   				contact : $scope.username,
   				phone : $scope.phone,
   				modelStatus : $("#modelStatus").val(),
   				
   		 }
   		 
  		 $http.post("api/terminal/subLeaseReturn", $scope.map).success(function (data) {  //绑定
  	          if (data != null && data != undefined) {
  	        	  if(data.code == 1){
  	        		  window.location.href ='#/terminalDetail?terminalId='+$scope.terminalId;
  	        	  }else{
  	        		alert("提交失败！");
  	        	  }
  	          }
  	      }).error(function (data) {
  	    	  alert("获取列表失败");
  	      });
  	}
  };
  
  
  
  $scope.terminalDetail();
};

//改变上传按钮
function setSpanName(obj){
	//改变下载模板初始状态
	$("#modelStatus").val(1);
	$(obj).parent("a").children("span").html("重新上传")
	$(obj).siblings("span").parent("a").siblings("i").attr("class","on");
	$(obj).parent("a").parent("form").ajaxSubmit({
		success : function(data) {
			$(obj).siblings("input").val(data.result);
		}
	});
}



terminalRentalReturnModule.$inject = ['$scope', '$http', '$cookieStore'];
terminalRentalReturnModule.controller("terminalRentalReturnController", terminalRentalReturnController);
