'user strict';

//系统设置模块
var terminalExchangeGoodsModule = angular.module("terminalExchangeGoodsModule",['loginServiceModule']);

var terminalExchangeGoodsController = function ($scope, $http,$location, LoginService) {
	$scope.$emit('topTitle',"华尔街金融平台-申请换货");
	$scope.terminalId=Math.ceil($location.search()['terminalId']);
	$scope.customerId = LoginService.userid;
	$scope.shiCities = [];
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
            //用户收货地址
              $scope.addressList = data.result.address;
              //下载模板
              $scope.ReModel = data.result.ReModel;
            //城市级联
              $scope.getShengcit();
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
	$scope.addreyn = false;
  	$scope.diAddre = function (num) {
  		$scope.addreyn = true;
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
  /*	$scope.count = 0;
  	$scope.changCit = function(citid){
  		$http.post("api/terminal/getShiCities", {parentId:citid}).success(function (data) {  //绑定
            if (data != null && data != undefined) {
              //市
                $scope.shiCitie = data.result;
            }
        }).error(function (data) {
      	  alert("获取列表失败");
        });
  	}*/
  	
  	/*//记录citId
  	 
  	$scope.shiId = function(citId){
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
  	  	        	  if(data.code == 1){
  	  	        		$scope.receiver = "";
  	  	        		$scope.address = "";
  	  	        		$scope.moblephone= "";
  	  	        		$scope.zipCode="";
  	  	        		$scope.terminalDetail();
  	  	        	  }
  	  	          }
  	  	      }).error(function (data) {
  	  	    	  alert("操作失败");
  	  	      });
  		}else{
  			alert("收货地址已满十条！");
  		}
  		
  	}
  	
  	var isAddressTen = function(){
  		return $scope.addressList.length;
  	}
  	
  	//下载模板
  	$scope.upModel = function(path){
  		$http.post("api/terminal/addCostometAddress",  $scope.CostometAddress).success(function (data) {  //绑定
	          if (data != null && data != undefined) {
	        	$scope.terminalDetail();
	          }
	      }).error(function (data) {
	    	  alert("操作失败");
	      });
  	}
  	
  	//提交校验
  	$scope.establish = function(){
  		 if($scope.reason  == undefined || $scope.reason == ''){
  			 alert("请填写换货原因！");
  			 return false;
  		 }else if($scope.returnAddressId  == undefined || $scope.returnAddressId == ''){
  			 alert("请选择寄回地址！");
  			 return false;
  		 }
  		 return true;
  		
  	}
  	
  //提交
	$scope.subDetail = function () {
		
		if($scope.addreyn == false){
			for(var i = 0; i<$scope.addressList.length;i++){
				if($scope.addressList[i].isDefault ==1){
					$scope.address = $scope.addressList[i].address;
					$scope.phonee = $scope.addressList[i].phone;
					$scope.zipCodee = $scope.addressList[i].zipCode;
					$scope.receiver = $scope.addressList[i].receiver;
					$scope.returnAddressId = $scope.addressList[i].id;
				}
			}
		}else if($scope.addreyn == true){
			for(var i = 0; i<$scope.addressList.length;i++){
				if($scope.addressList[i].id ==$scope.num){
					$scope.address = $scope.addressList[i].address;
					$scope.phonee = $scope.addressList[i].phone;
					$scope.zipCodee = $scope.addressList[i].zipCode;
					$scope.receiver = $scope.addressList[i].receiver;
					$scope.returnAddressId = $scope.addressList[i].id;
				}
			}
		}
		$scope.array = [];
 		 for(var i=0;i<$scope.ReModel.length;i++){
 				$scope.array[i] = {
 	 					id:$("#upId_"+i).val(),
 	 					path:$("#up_"+i).val()
 			 }
 		 }
		
		$scope.message = {
				reason:$scope.reason,
				terminalsId:Math.ceil($scope.terminalId),
				customerId:Math.ceil($scope.customerId),
				address:$scope.address,
				phone:$scope.phonee,
				zipCode:$scope.zipCodee,
				receiver:$scope.receiver,
				returnAddressId:$scope.returnAddressId,
				status:1,
				templeteInfoXml :JSON.stringify($scope.array),
				type : 3,
				modelStatus : $("#modelStatus").val()
				};
			if($scope.establish()){
				  $http.post("api/terminal/subChange", $scope.message).success(function (data) {  //绑定
		          if (data != null && data != undefined) {
		        	  if(data.code == 1){
		        		  window.location.href ='#/terminalDetail?terminalId='+$scope.terminalId;
		        	  }else{
		        		  alert("换货失败！");
		        	  }
		          }
		      }).error(function (data) {
		    	  alert("操作失败");
		      });
		      
			}
  };
  
  $scope.terminalDetail();
  $scope.citOffOn(false);
};

//改变上传按钮
function setSpanName(obj){
	//改变下载模板初始状态
	
	$(obj).parent("a").parent("form").attr("action","api/terminal/upload/tempExchangFile/"+$("#terid").val());
	
	$(obj).parent("a").parent("form").ajaxSubmit({
		success : function(data) {
			if(data.code == -1){
				alert(data.message);
			}else if(data.code == 1){
				$("#modelStatus").val(1);
				$(obj).parent("a").children("span").html("重新上传")
				$(obj).siblings("span").parent("a").siblings("i").attr("class","on");
				$(obj).siblings("input").val(data.result);
			}
		}
	});
}



terminalExchangeGoodsModule.$inject = ['$scope', '$http', '$cookieStore'];
terminalExchangeGoodsModule.controller("terminalExchangeGoodsController", terminalExchangeGoodsController);
