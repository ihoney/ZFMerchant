'user strict';

//系统设置模块
var terminalExchangeGoodsModule = angular.module("terminalExchangeGoodsModule",['loginServiceModule']);

var terminalExchangeGoodsController = function ($scope, $http,$location, LoginService) {
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
		//0 注销， 1 更新
		  $scope.types = 0;
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
  	$scope.diAddre = function (num) {
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
  	
  //提交
	$scope.subDetail = function () {
		for(var i = 0; i<$scope.addressList.length;i++){
			if($scope.addressList[i].id ==$scope.num){
				$scope.address = $scope.addressList[i].address;
				$scope.phonee = $scope.addressList[i].phone;
				$scope.zipCodee = $scope.addressList[i].zipCode;
				$scope.receiver = $scope.addressList[i].receiver;
				$scope.returnAddressId = $scope.addressList[i].id;
			}
		}
		$scope.array = [];
 		 for(var i=0;i<$scope.ReModel.length;i++){
 			$scope.array[i] = {
 					id:$scope.terminalId,
 					path:$("#up_"+i).val()
 			};
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
				templeteInfoXml :$scope.array,
				type : 3,
				modelStatus : $("#modelStatus").val()
				};
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
      
  };
  
  $scope.terminalDetail();
  $scope.citOffOn(false);
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



terminalExchangeGoodsModule.$inject = ['$scope', '$http', '$cookieStore'];
terminalExchangeGoodsModule.controller("terminalExchangeGoodsController", terminalExchangeGoodsController);
