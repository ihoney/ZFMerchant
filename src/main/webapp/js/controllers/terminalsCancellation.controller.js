'user strict';

//系统设置模块
var terminalCancellationModule = angular.module("terminalCancellationModule",[]);

var terminalCancellationController = function ($scope, $http,$location, LoginService) {
	$scope.terminalId=$location.search()['terminalId'];
	$scope.customerId = 80;
	//查看终端详情
	$scope.terminalDetail = function () {
		
      $http.post("api/terminal/getApplyToUpdate", {terminalsId:$scope.terminalId,customerId:$scope.customerId}).success(function (data) {  //绑定
          if (data != null && data != undefined) {
              //终端信息
              $scope.applyDetails = data.result.applyDetails;
              //注销模板
              $scope.ReModel = data.result.ReModel;
          }
      }).error(function (data) {
    	  alert("获取列表失败");
      });
  };
  
//提交注销申请
	$scope.subRentalReturn = function(){
		
		/* $scope.map = {
				terminalId : $scope.terminalId,
				status : 1,
				templeteInfoXml :[{name:$scope.name,phone:$scope.phone,id:1,path:$scope.patch}],
				type : 3,
				customerId:80
		 }
		 */
		
		 $scope.map = {
 				terminalId : $scope.terminalId,
 				status : 1,
 				templeteInfoXml :"[{id:1,path:'d:img/patch.tupian.jsp'}]",
 				type : 3,
 				customerId:80
 		 }
		 $http.post("api/terminal/subRentalReturn", $scope.map).success(function (data) {  //绑定
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
  $scope.terminalDetail();
};

//改变上传按钮
function setSpanName(obj,obj1,obj2){
	$(obj).siblings("span").parent("a").siblings("i").attr("class","on");
	$(obj).siblings("span").html("重新上传")
	
	$('#'+obj1).ajaxSubmit({
		success : function(data) {
			alert(data.result);
			$('#'+obj2).val(data.result);
		}
	});
}

terminalCancellationModule.$inject = ['$scope', '$http', '$cookieStore'];
terminalCancellationModule.controller("terminalCancellationController", terminalCancellationController);
