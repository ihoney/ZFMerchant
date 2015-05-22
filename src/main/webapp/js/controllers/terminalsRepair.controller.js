'user strict';

//系统设置模块
var terminalRepairModule = angular.module("terminalRepairModule",['loginServiceModule']);

var terminalRepairController = function ($scope, $http,$location, LoginService) {
	$scope.$emit('topTitle',"华尔街金融平台-申请维修");
	$scope.terminalId=Math.ceil($location.search()['terminalId']);
	$scope.customerId = LoginService.userid;
	$scope.citOn = false;
	$scope.num = -1;
	
	//查看终端详情
	$scope.terminalDetail = function () {
		if(LoginService.userid == 0){
			window.location.href = '#/login';
		}else{
			//显示用户登录部分
			$scope.$emit('changeshow',false);
		}
		//1 注销， 2 更新
		  $scope.types =1;
      $http.post("api/terminal/getWebApplyDetails", {types:$scope.types,terminalsId:$scope.terminalId,customerId:$scope.customerId}).success(function (data) {  //绑定
          if (data != null && data != undefined) {
              //终端信息
              $scope.applyDetails = data.result.applyDetails;
              //用户收货地址
              $scope.addressList = data.result.address;
            //城市级联
              $scope.getShengcit();
          }
      }).error(function (data) {
    	  alert("获取列表失败");
      });
	}
      
      
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
  	$scope.addressyn = false;
  	$scope.diAddre = function (num) {
  		$scope.addressyn = true;
  		$scope.num = num;
  		}
  	
  //获得省级
	$scope.getShengcit= function(){
		$http.post("api/index/getCity").success(function(data) {
			if (data.code == 1) {
				$scope.cities = data.result;
			} else {
				alert("城市加载失败！");
			}
		})
	};
  	
  //记录citId
 	 
  /*	$scope.shiId = function(citId){
  		$scope.citId = citId;
  	}*/
  	
  //添加地址
  	$scope.addCostometAddress = function(){
  		if(isAddressTen()<10){
  			 $scope.CostometAddress = {
  	  				cityId :Math.ceil($scope.shiList.id),
  	  				receiver :$scope.receiver,
  	  				address :$scope.address,
  	  				moblephone :$scope.moblephone,
  	  				zipCode :$scope.zipCode,
  	  				customerId :$scope.customerId
  	  		 };
  	  		 $http.post("api/terminal/addCostometAddress",  $scope.CostometAddress).success(function (data) {  //绑定
  	  	          if (data != null && data != undefined) {
  	  	        	$scope.terminalDetail();
  	  	          }
  	  	      }).error(function (data) {
  	  	    	  alert("操作失败");
  	  	      });
  		}else{
  			alert("收获地址已满十条！");
  		}
  	}
  	
  	var isAddressTen = function(){
  		return  $scope.addressList.length;
  	}
  	
  //提交
	$scope.subDetail = function () {
		if($scope.addressyn == false){
			for(var i = 0; i<$scope.addressList.length;i++){
				if($scope.addressList[i].isDefault ==1){
					$scope.address = $scope.addressList[i].address;
					$scope.phone = $scope.addressList[i].phone;
					$scope.zipCode = $scope.addressList[i].zipCode;
					$scope.receiver = $scope.addressList[i].receiver;
					$scope.returnAddressId = $scope.addressList[i].id;
				}
			}
		}else if($scope.addressyn == true){
			for(var i = 0; i<$scope.addressList.length;i++){
				if($scope.addressList[i].id ==$scope.num){
					$scope.address = $scope.addressList[i].address;
					$scope.phone = $scope.addressList[i].phone;
					$scope.zipCode = $scope.addressList[i].zipCode;
					$scope.receiver = $scope.addressList[i].receiver;
					$scope.returnAddressId = $scope.addressList[i].id;
				}
			}
		}
		$scope.message = {
				description:$scope.description,
				terminalsId:$scope.terminalId,
				customerId:$scope.customerId,
				address:$scope.address,
				phone:$scope.phone,
				zipCode:$scope.zipCode,
				receiver:$scope.receiver,
				returnAddressId:$scope.returnAddressId,
				status:1
				};
		
      $http.post("api/terminal/subRepair", $scope.message).success(function (data) {  //绑定
          if (data != null && data != undefined) {
            window.location.href ='#/terminalDetail?terminalId='+$scope.terminalId;
          }
      }).error(function (data) {
    	  alert("操作失败");
      });
      
  };
  
  $scope.terminalDetail();
  $scope.citOffOn(false);
};



terminalRepairModule.$inject = ['$scope', '$http', '$cookieStore'];
terminalRepairModule.controller("terminalRepairController", terminalRepairController);
