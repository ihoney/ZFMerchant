'user strict';

//系统设置模块
var terminalToUpdateModule = angular.module("terminalToUpdateModule",['loginServiceModule']);

var terminalToUpdateController = function ($scope, $http,$location, LoginService) {
	$scope.terminalId=Math.ceil($location.search()['terminalId']);
	$scope.customerId = LoginService.userid;
	$(".leaseExplain_tab").hide();
	//查看终端详情
	$scope.terminalDetail = function () {
		if(LoginService.userid == 0){
			window.location.href = '#/login';
		}else{
			//显示用户登录部分
			$scope.$emit('changeshow',false);
		}
		//1 注销， 2 更新
	  $scope.types = 2;
      $http.post("api/terminal/getWebApplyDetails", {types:$scope.types,terminalsId:$scope.terminalId,customerId:$scope.customerId}).success(function (data) {  //绑定
          if (data != null && data != undefined) {
              //终端信息
              $scope.applyDetails = data.result.applyDetails;
            //下载模板
              $scope.ReModel = data.result.ReModel;
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
  
//提交
	$scope.subToUpdate = function () {
		
		$scope.array = [];
		 for(var i=0;i<$scope.ReModel.length;i++){
			$scope.array[i] = {
					id:$("#upId_"+i).val(),
					path:$("#up_"+i).val()
			};
		 }
		
		$scope.message = {
				terminalsId:Math.ceil($scope.terminalId),
				customerId:Math.ceil($scope.customerId),
				status:1,
				templeteInfoXml :JSON.stringify($scope.array),
				};
		
  $http.post("api/terminal/getApplyToUpdate", $scope.message).success(function (data) {  //绑定
      if (data != null && data != undefined) {
    	  if(data.code == 1){
    		  window.location.href ='#/terminalDetail?terminalId='+$scope.terminalId;
    	  }else{
    		  alert("更新失败！");
    	  }
        
      }
  }).error(function (data) {
	  alert("操作失败");
  });
  
};
  $scope.terminalDetail();

};


//改变上传按钮
function setSpanName(obj){
	//改变下载模板初始状态
	$(obj).parent("a").children("span").html("重新上传")
	$(obj).parent("a").parent("form").attr("action","api/terminal/upload/tempUpdateFile/"+$("#terid").val());
	$(obj).siblings("span").parent("a").siblings("i").attr("class","on");
	
	$(obj).parent("a").parent("form").ajaxSubmit({
		success : function(data) {
			$(obj).siblings("input").val(data.result);
		}
	});
}




terminalToUpdateModule.$inject = ['$scope', '$http', '$cookieStore'];
terminalToUpdateModule.controller("terminalToUpdateController", terminalToUpdateController);
