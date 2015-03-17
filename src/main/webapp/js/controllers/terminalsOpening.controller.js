'user strict';

//系统设置模块
var terminalOpenModule = angular.module("terminalOpenModule",['loginServiceModule']);

var terminalOpenController = function ($scope, $http,$location, LoginService) {
	$scope.terminalId=$location.search()['terminalId'];
	$scope.customerId = LoginService.userid;
	$scope.img = null;
	$scope.merchantNamed = "";
	$scope.bankCode="";
	$scope.status=0;
	$scope.siClass = "toPrivate";
	$scope.gongClass = "toPublic hover";
	$scope.sex="";
	$scope.shiLian =[];
	//
	$scope.sex = 1;
	$(".leaseExplain_tab").hide();
	//查看终端详情
	$scope.terminalDetail = function () {
		if(LoginService.userid == 0){
			window.location.href = '#/login';
		}else{
			//显示用户登录部分
			$scope.$emit('changeshow',false);
		}

      $http.post("api/terminal/getApplyOpenDetails", {customerId:$scope.customerId,terminalsId:$scope.terminalId}).success(function (data) {  //绑定
          if (data != null && data != undefined) {
              //终端信息
              $scope.applyDetails = data.result.applyDetails;
            //终端数据回显
              $scope.applyFor = data.result.applyFor;
              $scope.applyMes = data.result.applyFor[0];
              //获得商户集合
              $scope.merchantList = data.result.merchants;
              //材料等级
              $scope.MaterialLevel = data.result.MaterialLevel;
              //城市级联
              $scope.getShengcit();
              //支付通道
              $scope.channels = data.result.channels;
              
              //数据替换
              $scope.merchantNamed = $scope.applyMes.merchant_name;
              $scope.merchantId  = $scope.applyMes.merchant_id;
              $scope.sex = $scope.applyMes.sex;
              $scope.merchant = {
            		  legal_person_name:$scope.applyMes.name,
            		  legal_person_card_id:$scope.applyMes.card_id,
            		  account_bank_num:$scope.applyMes.account_bank_num,
            		  organization_code_no:$scope.applyMes.organization_code_no,
            		  tax_registered_no:$scope.applyMes.tax_registered_no
              };
              $scope.birthday = $scope.applyMes.birthday;
              $scope.nian = Math.ceil($scope.birthday.split("-")[0]);
              $scope.yue = Math.ceil($scope.birthday.split("-")[1]);
              $scope.day = Math.ceil($scope.birthday.split("-")[2]);
          }
      }).error(function (data) {
    	  alert("获取列表失败");
      });
  };
  
//弹出层
  $scope.popup = function(t,b){
	  $(".mask").show();
	  $(".leaseExplain_tab").show();
  }
  
  //动态显示商户
  $scope.angu = function(obj1,obj2){
	  $scope.merchantNamed = obj1;
	  $scope.merchantId = obj2;//商户Id
	  //获得商户详情
	  $http.post("api/terminal/getMerchant", {merchantId:Math.ceil( $scope.merchantId)}).success(function (data) {  //绑定
          if (data != null && data != undefined) {
        	  if(data.code == 1){
        		//终端信息
                  $scope.merchant = data.result;
        	  }else{
        		  alert("商户信息加载失败！");
        	  }
          }
      }).error(function (data) {
    	  alert("获取列表失败");
      });
  }
  
  //性别单选
  $scope.butSex = function(num){
		  $scope.sex=num;
  }
  
  //获得通道ID
 /* $scope.getChannels = function(chanId){
	  $scope.chanId = Math.ceil(chanId);
	  for(var i=0;i<$scope.channels.length;i++){
		  if($scope.channels[i].id == $scope.chanId){
			  $scope.chanTs = $scope.channels[i].billings;
		  }
	  }
  }*/
  
  //获得通道周期时间ID
  /*$scope.getChannelT = function(Tid){
	  $scope.Tid = Math.ceil(Tid);
  }*/
  
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
	//更具省获得市
	/*$scope.shiSelectList = {};
	$scope.citfunction = function(citId){
		for(var i=0;i<$scope.cities.length;i++){
			if($scope.cities[i].id == citId){
				$scope.shiSelectList = $scope.cities[i].childrens;
			}
		}
	}*/
	//获得市ID
	/*$scope.shifunction = function(shiId){
		$scope.shiId = shiId;
	}*/
	
	//根据通道获得通道周期
	/*$scope.tsSelectList = {};
	$scope.chanfunction = function(chanId){
		
		for(var i=0;i<$scope.channels.length;i++){
			if($scope.channels[i].id == chanId){
				$scope.chanId = chanId;
				$scope.tsSelectList = $scope.channels[i].billings;
			}
		}
	}*/
	//获得通道周期ID
	/*$scope.tsfunction = function(tsId){
		$scope.tsId = tsId;
	}*/
//动态加载银行
  $scope.bankName ="";
  $scope.bank = function(obj){
	  $http.post("api/terminal/ChooseBank", null).success(function (data) {  //绑定
          if (data != null && data != undefined) {
        	  if(data.code == 1){
        		  $scope.bankCode = data.result;
        	  }else{
        		  alert("获取银行失败！");
        	  }
          }
      }).error(function (data){
    	  alert("银行加载失败！");
      });
	  $("#div_"+obj).show();
  }
//动态显示银行代码号
  $scope.bankNum = function(obj,number,backName){
	  $scope.bankCode = "";
	  $("#"+obj).siblings("input").val(number)
	  $("#"+obj).parent("div").hide();
	  $("#"+obj).parent("div").siblings("div").children("input[type='text']").val(backName)
  }
  
//对私按钮
  $scope.changgSiStatus = function(num){
	  $scope.publicPrivateStatus=1;
	  $scope.status = num;
	  $scope.siClass = "toPublic hover";
	  $scope.gongClass = "toPrivate";
	  $scope.getMaterialName();
  }
//对公按钮
  $scope.changGongStatus = function(num){
	  $scope.publicPrivateStatus=0;
	  $scope.status = num;
	  $scope.siClass = "toPrivate";
	  $scope.gongClass = "toPublic hover";
	  $scope.getMaterialName();
  }
  
//根据对公对私不同显示不同资料
  $scope.getMaterialName = function(){
	  $scope.map = {
			  terminalId:$scope.terminalId,
			  status:$scope.status
	  }
	  
	  $http.post("api/terminal/getMaterialName", $scope.map).success(function (data) {  //绑定
          if (data != null && data != undefined) {
        	  $scope.result=data.result;
          }
      }).error(function (data) {
    	  alert("获取列表失败");
          /*$("#serverErrorModal").modal({show: true});*/
      });
  }
//提交申请
  $scope.req={};
  
  $scope.chan={};
  $scope.tln={};
  $scope.birthday = $("#selYear").val()+"-"+$("#selMonth").val()+"-"+$("#selDay").val();
  $scope.addApply = function(){
	  
	  $scope.list = [
	                 {
	                     status:1,
	                     terminalId:Math.ceil($scope.terminalId),
	                     publicPrivateStatus: Math.ceil($scope.publicPrivateStatus),
	                     applyCustomerId: Math.ceil($scope.customerId),
	                     merchantId: Math.ceil($scope.merchantId),
	                     merchantName:$scope.merchantNamed,
	                     sex:Math.ceil($scope.sex),
	                     birthday: $scope.birthday,
	                     cardId:$("#cirdValue").val(),
	                     phone:$("#phoneValue").val(),
	                     email:$("#emailValue").val(),
	                     cityId:Math.ceil($scope.req.shiList.id),
	                     name:$("#valueName").val(),
	                     channel:Math.ceil($scope.chan.chanList.id),
	                     billingId:Math.ceil($scope.tln.chanTs.id),
	                     bankNum:$("#bankNumValue").val(),
	                     bankName:$("#bankNameValue").val(),
	                     bankCode:$("#bankCodeValue").val(),
	                     organizationNo:$("#organizationNoValue").val(),
	                     registeredNo:$("#registeredNoValue").val()
	                 }
	             ];
	  
	  $scope.listOne=[];
	  var countOne=0;
	  for(var i=0;i<$scope.MaterialLevel.length;i++){
		  for(var y=0;y<$scope.result.length;y++){
			  if($scope.result[y].opening_requirements_id == $scope.MaterialLevel[i].id){
				  var id =($('#id_'+$scope.MaterialLevel[i].level+'_'+y).val());
				  			  var keys =($('#key_'+$scope.MaterialLevel[i].level+'_'+y).html()).replace(":","");
				  			  var values =($('#value_'+$scope.MaterialLevel[i].level+'_'+y).val());
				  			  $scope.listOne[countOne] = {
				  					  key:keys,
				  					  value:values,
				  					  types:Math.ceil($scope.result[y].info_type),
				  					  openingRequirementId:Math.ceil($scope.MaterialLevel[i].id),
				  					  targetId:Math.ceil(id)
				  			  }
				  			  countOne++;
			  }
		  }
	  }
	  $scope.leng = $scope.list.length;
	  for(var i=0;i<$scope.listOne.length;i++){
		  $scope.list[$scope.leng+i] = $scope.listOne[i];
	  }
	  
	  
	  $http.post("api/terminal/addOpeningApply", $scope.list).success(function (data) {  //绑定
          if (data != null && data != undefined) {
        	  if(data.code == 1){
        		  //跳转
        		  window.location.href = '#/terminal';
        	  }
        	  
          }
      }).error(function (data) {
    	  alert("获取列表失败");
          $("#serverErrorModal").modal({show: true});
      });
  }
  $scope.terminalDetail();
  $scope.getMaterialName();

};
$(".suggest").hide();


terminalOpenModule.$inject = ['$scope', '$http', '$cookieStore'];
terminalOpenModule.controller("terminalOpenController", terminalOpenController);
