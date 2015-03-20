'user strict';

//系统设置模块
var terminalReturnGoodModule = angular.module("terminalReturnGoodModule",['loginServiceModule']);

var terminalReturnGoodController = function ($scope, $http,$location, LoginService) {
	$scope.terminalId=Math.ceil($location.search()['terminalId']);
	$scope.customerId = LoginService.userid;
	//查看终端详情
	$scope.terminalDetail = function () {
		if(LoginService.userid == 0){
			window.location.href = '#/login';
		}else{
			//显示用户登录部分
			$scope.$emit('changeshow',false);
		}
		//0 注销， 1 更新
		  $scope.types = 0;
      $http.post("api/terminal/getWebApplyDetails", {types:$scope.types,terminalsId:$scope.terminalId,customerId:$scope.customerId}).success(function (data) {  //绑定
          if (data != null && data != undefined) {
              //终端信息
              $scope.applyDetails = data.result.applyDetails;
              //下载模板
              $scope.ReModel = data.result.ReModel;
          }
      }).error(function (data) {
    	  alert("获取列表失败");
      });
  };
//提交
	$scope.subReturn = function () {
		
		$scope.array = [];
		 for(var i=0;i<$scope.ReModel.length;i++){
			$scope.array[i] = {
					id:$("#upId_"+i).val(),
					path:$("#up_"+i).val()
			};
		 }
		
		$scope.message = {
				reason:$scope.reason,
				terminalsId:Math.ceil($scope.terminalId),
				customerId:Math.ceil($scope.customerId),
				returnPrice:$scope.returnPrice,
				status:1,
				templeteInfoXml :JSON.stringify($scope.array),
				type : 3,
				modelStatus:$("#modelStatus").val()
				};
		
    $http.post("api/terminal/subReturn", $scope.message).success(function (data) {  //绑定
        if (data != null && data != undefined) {
          window.location.href ='#/terminalDetail?terminalId='+$scope.terminalId;
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
	$("#modelStatus").val(1);
	$(obj).parent("a").children("span").html("重新上传")
	$(obj).siblings("span").parent("a").siblings("i").attr("class","on");
	$(obj).parent("a").parent("form").ajaxSubmit({
		success : function(data) {
			$(obj).siblings("input").val(data.result);
		}
	});
}



terminalReturnGoodModule.$inject = ['$scope', '$http', '$cookieStore'];
terminalReturnGoodModule.controller("terminalReturnGoodController", terminalReturnGoodController);
