'user strict';

//系统设置模块
var terminalRentalReturnModule = angular.module("terminalRentalReturnModule",['loginServiceModule']);

var terminalRentalReturnController = function ($scope, $http,$location, LoginService) {
	$scope.$emit('topTitle',"华尔街金融平台-申请租赁退还");
	$scope.terminalId=Math.ceil($location.search()['terminalId']);
	$scope.customerId = Math.ceil(LoginService.userid);
	//查看终端详情
	$scope.terminalDetail = function () {
		if(LoginService.userid == 0){
			window.location.href = '#/login';
		}else{
			//显示用户登录部分
			$scope.$emit('changeshow',false);
		}
		//1 注销， 2 更新
		  $scope.types = 1;
      $http.post("api/terminal/getWebApplyDetails", {types:$scope.types,terminalsId:$scope.terminalId,customerId:$scope.customerId}).success(function (data) {  //绑定
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
  			 if($("#up_"+i).val() != null && $("#up_"+i).val() !=""){
  				$scope.array[i] = {
  	  					id:$("#upId_"+i).val(),
  	  					path:$("#up_"+i).val()
  	  			};
  			 }
  		 }
  		
  		 $scope.map = {
   				terminalId : Math.ceil($scope.terminalId),
   				status : 1,
   				templeteInfoXml :JSON.stringify($scope.array),
   				type : 3,
   				customerId:$scope.customerId,
   				orderTypes : 1,
   				contact : $scope.username,
   				phone : $scope.phone,
   				modelStatus : $("#modelStatus").val(),
   				
   		 }
  		 if($scope.username == undefined){
  			 alert("请输入联系人！");
  		 }else if($scope.phone == undefined){
  			 alert("请输入联系号码！");
  		 }else{
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
  	}
  };
  $scope.terminalDetail();
};

//改变上传按钮
function setSpanName(obj){
	//改变下载模板初始状态
	
	$(obj).parent("a").parent("form").attr("action","api/terminal/upload/tempRentalFile/"+$("#terid").val());
	$(obj).parent("a").parent("form").ajaxSubmit({
		success : function(data) {
			if(data.code == -1){
				alert(data.message);
			}else if(data.code == 1){
				$("#modelStatus").val(1);
				$(obj).parent("a").children("span").html("重新上传");
				$(obj).siblings("span").parent("a").siblings("i").attr("class","on");
				$(obj).siblings("input").val(data.result);
			}
		}
	});
}



terminalRentalReturnModule.$inject = ['$scope', '$http', '$cookieStore'];
terminalRentalReturnModule.controller("terminalRentalReturnController", terminalRentalReturnController);
