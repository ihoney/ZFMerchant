'user strict';

//系统设置模块
var terminalExchangeGoodsModule = angular.module("terminalExchangeGoodsModule",[]);

var terminalExchangeGoodsController = function ($scope, $http,$location, LoginService) {
	$scope.terminalId=$location.search()['terminalId'];
	$scope.customerId = 80;
	//查看终端详情
	$scope.terminalDetail = function () {
		
      $http.post("api/terminal/getApplyToUpdate", {terminalsId:$scope.terminalId,customerId:$scope.customerId}).success(function (data) {  //绑定
          if (data != null && data != undefined) {
              //终端信息
              $scope.applyDetails = data.result.applyDetails;
            //用户收货地址
              $scope.addressList = data.result.address;
              //下载模板
              $scope.ReModel = data.result.ReModel;
          }
      }).error(function (data) {
    	  alert("获取列表失败");
      });
  };
  
  //替换添加新地址
	$scope.citOffOn = function (obj) {
		$scope.citOn = obj;
		if(!obj){
			$(".addAddr_box").hide();
		}else{
			$(".addAddr_box").show();
		}
	}
	
	//单选按钮地址
  	$scope.diAddre = function (num) {
  		$scope.num = num;
  		}
  	
  //提交
	$scope.subDetail = function () {
		for(var i = 0; i<$scope.addressList.length;i++){
			
			if($scope.addressList[i].id ==$scope.num){
				$scope.address = $scope.addressList[i].address;
				$scope.phone = $scope.addressList[i].phone;
				$scope.zipCode = $scope.addressList[i].zipCode;
				$scope.receiver = $scope.addressList[i].receiver;
				$scope.returnAddressId = $scope.addressList[i].id;
			}
		}
		$scope.message = {
				reason:$scope.reason,
				terminalsId:$scope.terminalId,
				customerId:$scope.customerId,
				address:$scope.address,
				phone:$scope.phone,
				zipCode:$scope.zipCode,
				receiver:$scope.receiver,
				returnAddressId:$scope.returnAddressId,
				status:1,
				templeteInfoXml :"[{id:1,path:'d:img/patch.tupian.jsp'}]",
				type : 3
				};
		
	/* $scope.map = {
			terminalId : $scope.terminalId,
			status : 1,
			templeteInfoXml :[{name:$scope.name,phone:$scope.phone,id:1,path:$scope.patch}],
			type : 3,
			customerId:80
	 }
	 */
      $http.post("api/terminal/subChange", $scope.message).success(function (data) {  //绑定
          if (data != null && data != undefined) {
            window.location.href ='#/terminalDetail?terminalId='+$scope.terminalId;
          }
      }).error(function (data) {
    	  alert("操作失败");
      });
      
  };
  
//改变上传按钮
	function setSpanName(obj,obj1,obj2){
		$(obj).siblings("span").parent("a").siblings("i").attr("class","on");
		$(obj).siblings("span").html("重新上传")
		
		$('#'+obj1).ajaxSubmit({
			success : function(data) {
				$('#'+obj2).val(data.result);
			}
		});
	}
	
  
  $scope.terminalDetail();
  $scope.citOffOn(false);
};



terminalExchangeGoodsModule.$inject = ['$scope', '$http', '$cookieStore'];
terminalExchangeGoodsModule.controller("terminalExchangeGoodsController", terminalExchangeGoodsController);
