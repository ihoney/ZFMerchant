'user strict';

//系统设置模块
var terminalOpenModule = angular.module("terminalOpenModule",['loginServiceModule']);

var terminalOpenController = function ($scope, $http,$location, LoginService) {
	//已有商户，点击样式
	$scope._br = false;
	
	//检验邮箱格式
	var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	//手机格式
	var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
	//英文数字校验
	var numCh = /[^a-zA-Z0-9]/g;

	$scope.terminalId=$location.search()['terminalId'];
	$scope.openstatus=$location.search()['status'];
	$scope.customerId = LoginService.userid;
	$scope.img = null;
	$scope.MaterialLevel = [];
	$scope.merchantNamed = "";
	$scope.bankCode="";
	$scope.sex="";
	$scope.shiLian =[];
	$scope.applyFor = [];
	//申请方式（1.开通 2.重新开通）
	$scope.appStatus = 1;
	//对公对私（1.公 2.私）
	$scope.status=1;
	//显示对公对私按钮
	$scope.siClass = "toPrivate";
	$scope.gongClass = "toPublic hover";
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
              $scope.applyDetails = data.result.applyDetails != null?data.result.applyDetails:"";
              
              if($scope.applyDetails.appId != null){
            	  if($scope.applyDetails.appId != undefined){
                	  $scope.appStatus = 2;
                  }
              }
              //终端动态数据回显
              $scope.applyFor = data.result.applyFor;
              //终端基本数据回显
              $scope.openingInfos = data.result.openingInfos;
              //获得商户集合
              $scope.merchantList = data.result.merchants;
              //材料等级
              $scope.MaterialLevel = data.result.MaterialLevel;
              //城市级联
              $scope.getShengcit();
              //所有省
              $scope.CitieChen= data.result.CitieChen;
              //支付通道
              $scope.channels = data.result.channels;
              if($scope.openingInfos != null && $scope.openingInfos!= undefined){
            	//数据替换
                  $scope.status = $scope.openingInfos.types;
                //根据对公对私状态显示按钮
                  if($scope.status == 1){
                	  $scope.siClass = "toPrivate";
                	  $scope.gongClass = "toPublic hover";
                  }else if($scope.status == 2){
                	  $scope.siClass = "toPublic hover";
                	  $scope.gongClass = "toPrivate";
                  }
                  $scope.merchantNamed = $scope.openingInfos.merchant_name
                  $scope.merchantId  = $scope.openingInfos.merchant_id;
                  $scope.sex = $scope.openingInfos.sex;
                  $scope.merchant = {
                		  legal_person_name:$scope.openingInfos.name,
                		  legal_person_card_id:$scope.openingInfos.card_id,
                		  account_bank_num:$scope.openingInfos.account_bank_num,
                		  organization_code_no:$scope.openingInfos.organization_code_no,
                		  tax_registered_no:$scope.openingInfos.tax_registered_no
                  };
                  //生日
                  $scope.birthday = $scope.openingInfos.birthdays;
                  $scope.nian = Math.ceil($scope.birthday.split("-")[0]);
                  $scope.yue = Math.ceil($scope.birthday.split("-")[1]);
                  $scope.day = Math.ceil($scope.birthday.split("-")[2]);
                  
                  //获得城市
                  $scope.cityId = $scope.openingInfos.city_id;
                  for(var i=0;i<$scope.CitieChen.length;i++){
                	  if($scope.CitieChen[i].id == $scope.cityId){
                		  $scope.addressShi = $scope.CitieChen[i].name;
                		  for(var y=0;y<$scope.CitieChen.length;y++){
                			  if($scope.CitieChen[i].parent_id == $scope.CitieChen[y].id){
                				  $scope.addressShen = $scope.CitieChen[y].name;
                			  }
                		  }
                	  }
                  }
                  //通道Id
                  $scope.channel = $scope.openingInfos.pay_channel_id;
              	  $scope.billingId = $scope.openingInfos.billing_cyde_id;
              	  for(var i=0;i<$scope.channels.length;i++){
              		  if($scope.channels[i].id == $scope.channel){
              			$scope.channelName = $scope.channels[i].name;
              			
              			if($scope.channels[i].billings !=""){
              				for(var y=0;y<$scope.channels[i].billings.length;y++){
              				if($scope.channels[i].billings[y].id == $scope.billingId){
              					 $scope.channelTsName = $scope.channels[i].billings[y].name;
              				}
              			}
              			}
              		  }
              	  }
              }  
              $scope.getMaterialName();
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
  $scope.angu = function(obj1,obj2,curr){
	  $scope.merchantNamed = obj1;
	  $scope.merchantId = obj2;//商户Id
	  //获得商户详情
	  $http.post("api/terminal/getMerchant", {merchantId:Math.ceil( $scope.merchantId)}).success(function (data) {  //绑定
          if (data != null && data != undefined) {
        	  if(data.code == 1){
        		//终端信息
                  $scope.merchant = data.result;
                  $scope._br = curr; 
                  console.info($scope._br);
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
  $scope.channelName = "请选择";
  $scope.channelTsName = "请选择";
  $scope.addressShen = "请选择";
  $scope.addressShi = "请选择";
  $scope.cities = [];
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
	//取消城市数据回显值
	$scope.delectChit = function(){
		$scope.addressShen = "请选择";
		$scope.addressShi = "请选择";
		$scope.cityId = null;
	}
	$scope.delectShi = function(){
		$scope.addressShi = "请选择";
		$scope.cityId = null;
	}
	//取消通道数据回显
	$scope.delectChanl = function(){
		$scope.channelName = "请选择";
		$scope.channelTsName = "请选择";
		$scope.channel = null;
		$scope.billingId = null;
	}
	$scope.delectChanlTs = function(){
		$scope.channelTsName = "请选择";
		$scope.billingId = null;
	}
	
	
//动态加载银行
  //$scope.bankName ="";
  $scope.bankObj={bankName:"",bankCode:0,code:0};
  $scope.bank = function(obj){
	  $scope.bankjson = {keyword:$scope.bankObj.bankName,page:1,pageSize:10,terminalId:$scope.terminalId};
	  $http.post("api/terminal/ChooseBank", $scope.bankjson).success(function (data) {  //绑定
          if (data != null && data != undefined) {
        	  if(data.code == 1){
        		  $scope.bankObj.bankCode = data.result.content;
        		  $("#suggestDiv").parent().addClass("overflow");
        		  if(data.result.total!=0){ 
        			  $("#suggestDiv").show(); 
        		  }else{
        			  $("#suggestDiv").hide();
        		  }
        	  }else{
        		  //alert("获取银行失败！");
        	  }
          }
      }).error(function (data){
    	  //alert("银行加载失败！");
      });
	  //$("#div_"+obj).show();
  }
//动态显示银行代码号
  $scope.bankNum = function(obj,number,backName){
	  $scope.bankCode = "";
	  $("#"+obj).siblings("input").val(number)
	  $("#"+obj).parent("div").hide();
	  $("#"+obj).parent("div").siblings("div").children("input[type='text']").val(backName)
  }
  $scope.selectBank = function(code,name){
	  $scope.bankObj.bankName = name;
	  $scope.bankObj.code = code;
	  $("#suggestDiv").hide();
  }
  
//对私按钮
  $scope.changgSiStatus = function(num){
	  $scope.publicPrivateStatus=num;
	  $scope.status = num;
	  $scope.siClass = "toPublic hover";
	  $scope.gongClass = "toPrivate";
	  $scope.getMaterialName();
  }
//对公按钮
  $scope.changGongStatus = function(num){
	  $scope.publicPrivateStatus=num;
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
        	  if(data.code == 1){
        		  $scope.result=data.result;
        		  if($scope.openingInfos != null){
        			  $scope.bankObj.bankName = $scope.openingInfos.bank_name;
        		  }
        	  }
          }
      }).error(function (data) {
    	  alert("获取列表失败");
      });
  }
  	//提交申请
  	$scope.req={};
  	$scope.chan={};
  	$scope.tln={};
  	//生日
  	$scope.birthday = null;
  	$scope.nian = "请选择";
    $scope.yue = "请选择";
    $scope.day = "请选择";
  	//城市回显ID
	$scope.cityId = null;
	//通道数据回显ID
	$scope.channel = null;
	$scope.billingId = null;
  $scope.addApply = function(){
	  if($scope.openstatus == 6){
		  alert("你当前的信息正在第三方审核,请耐心等待...");
		  return false;
	  }
	  if($scope.req.shiList != undefined){
		  $scope.cityId = Math.ceil($scope.req.shiList.id);
	  }
	  if($scope.chan.chanList != undefined){
		  $scope.channel = Math.ceil($scope.chan.chanList.id);
	  }
	  if($scope.tln.chanTs != undefined){
		  $scope.billingId = Math.ceil($scope.tln.chanTs.id);
	  }
	  $scope.birthday = $("#selYear").val()+"-"+$("#selMonth").val()+"-"+$("#selDay").val();
	  if($scope.levelCheck()){
		  
		  $scope.list = [
		                 {
		                     terminalId:Math.ceil($scope.terminalId),
		                     publicPrivateStatus: Math.ceil($scope.status),
		                     applyCustomerId: Math.ceil($scope.customerId),
		                     merchantId: Math.ceil($scope.merchantId),
		                     merchantName:$scope.merchantNamed,
		                     sex:Math.ceil($scope.sex),
		                     birthday: $scope.birthday,
		                     cardId:$("#cirdValue").val(),
		                     phone:$("#phoneValue").val(),
		                     email:$("#emailValue").val(),
		                     cityId:$scope.cityId,
		                     name:$("#valueName").val(),
		                     channel:$scope.channel,
		                     billingId:$scope.billingId,
		                     bankNum:$("#bankNumValue").val(),
		                     bankName:$("#bankNameValue").val(),
		                     bankCode:$scope.bankObj.code.toString(),
		                     organizationNo:$("#organizationNoValue").val(),
		                     registeredNo:$("#registeredNoValue").val(),
		                     needPreliminaryVerify:Math.ceil($scope.applyDetails.needPreliminaryVerify),
		                     bank_name:$scope.bankObj.bankName.toString()
		                 }
		             ];
		  
		  $scope.listOne=[];
		  var countOne=0;
		  for(var i=0;i<$scope.MaterialLevel.length;i++){
			  for(var y=0;y<$scope.result.length;y++){
				  if($scope.result[y].opening_requirements_id == $scope.MaterialLevel[i].id){
					  var id =($('#id_'+$scope.MaterialLevel[i].level+'_'+y).val());
					  			  var keys =($('#key_'+$scope.MaterialLevel[i].level+'_'+y).html()).replace(":","").replace("：","");
					  			  var values =($('#value_'+$scope.MaterialLevel[i].level+'_'+y).val());
					  			  if(values != null && values != ""){
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
	        	  }else{
	        		  alert(data.message);
	        	  }
	          }
	      }).error(function (data) {
	    	  alert("获取列表失败");
	          $("#serverErrorModal").modal({show: true});
	      });
	  }
	  }
  //对等级一模块进行校验
  $scope.levelCheck = function(){
	  if($scope.merchantNamed == ""){
		  alert("请选择或填写商户！");
		  return false;
	  }else if($("#valueName").val() == ""){
		  alert("请输入姓名！");
		  return false;
	  }else if($("#selYear").val() == "? string: ?"||$("#selMonth").val() == "? string: ?"||$("#selDay").val() == "? string: ?" || $("#selYear").val() == "? object:null ?"||$("#selMonth").val() == "? object:null ?"||$("#selDay").val() == "? object:null ?"|| $("#selYear").val() == "? string:请选择 ?"||$("#selMonth").val() == "? string:请选择 ?"||$("#selDay").val() == "? string:请选择 ?"){
		  alert("请选择出生日期！");
		  return false;
	  }else if($("#cirdValue").val() == ""){
		  alert("请输入身份证号！");
		  return false;
	  }else if(numCh.test($("#cirdValue").val())){
		  alert("身份证含有非法字符！");
		  return false;
	  }else if($("#cirdValue").val().length != 18){
		  alert("请输入18位二代有效身份证！");
		  return false;
	  }/*else if(!(/^(?=.*[a-z])[a-z0-9]+/ig.test($("#cirdValue").val()))){
	  	  alert("身份证含有非法字符！");
	  	  return false;
	  }*/else if($("#phoneValue").val() == ""){
		  alert("请填写电话号码！");
		  return false;
	  }else if(!reg.test($("#phoneValue").val())){
		  alert("手机格式不正确！");
		  return false;
	  }else if($("#emailValue").val() == ""){
		  alert("请填写邮箱！");
		  return false;
	  }else if(!myreg.test($("#emailValue").val())){
		  alert("邮箱格式不正确！");
		  return false;
	  }else if($scope.cityId == null || $scope.cityId == ""){
		  alert("请选择城市！");
		  return false;
	  }else if($scope.channel == null || $scope.channel == ""){
		  alert("请选择支付通道！");
		  return false;
	  }else if($scope.billingId == null || $scope.billingId  == ""){
		  alert("请选择通道日期");
		  return false;
	  }else if($("#bankNumValue").val() == null || $("#bankNumValue").val() == ""){
		  alert("请填写结算银行账号！");
		  return false;
	  }/*else if(isNaN(Number($("#bankNumValue").val()))){
		  alert("银行账号只能输数字！");
	  }*/else if($("#bankNameValue").val() == null || $("#bankNameValue").val() == ""){
		  alert("请填写结算银行帐户名！");
		  return false;
	  }else if($scope.bankObj.bankName == null || $scope.bankObj.bankName == ""){
		  alert("请填写结算银行名称！");
		  return false;
	  }else if($("#organizationNoValue").val() == null || $("#organizationNoValue").val() == ""){
		  alert("请填写组织登记号！");
		  return false;
	  }else if(numCh.test($("#organizationNoValue").val())){
		  alert("组织登记号字母和数字组成！");
		  return false;
	  }else if($("#registeredNoValue").val() == null || $("#registeredNoValue").val() == ""){
		  alert("请填写税务登记号！");
		  return false;
	  }else if(numCh.test($("#registeredNoValue").val())){
		  alert("税务登记号由字母和数字组成！");
		  return false;
	  }
	  else{
		  if($scope.MaterialLevel.length>0){
			  for(var i=0;i<$scope.MaterialLevel.length;i++){
				  if(i==0){
					  for(var y=0;y<$scope.result.length;y++){
						  if($scope.result[y].opening_requirements_id == $scope.MaterialLevel[i].id){
							  var id =($('#id_'+$scope.MaterialLevel[i].level+'_'+y).val());
							  			  var keys =($('#key_'+$scope.MaterialLevel[i].level+'_'+y).html()).replace(":","");
							  			  var values =($('#value_'+$scope.MaterialLevel[i].level+'_'+y).val());
							  			  if(values == null || values == ""){
							  				if($scope.result[y].info_type != 2){
							  					 alert("请输入"+keys+"!");
							  					 return false;
							  				}else{
							  					 alert("请选择上传"+keys+"!");
							  					 return false;
							  				}
							  			  }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
						  }
					  }
				  }
				  return true;
			  }
		  }else{
			  return true;
		  }
	 }
	  
  }
  
  $scope.onmousover = function(){
	  infoTab('.cover','.img_info'); 
  }
  
//鼠标经过小图提示大图
function infoTab(i_tab,i_box){ 
	$(i_tab).hover(
		function(e){
		       /* $(i_box).children("img").attr("src", $(this).attr("data-src"));*/
		        $(i_box).children("img").attr("src", $(this).siblings("a").children("input[name='hidden']").val());
				$(i_box).css('display','block');
				$(i_box).css('top',$(this).offset().top - $(i_box).height() +'px');
				if($(this).offset().left+$(i_box).width() > $(document).width()){
					$(i_box).css( 'left',($(this).offset().left)-$(i_box).width()+'px');
				}else {
					$(i_box).css('left',($(this).offset().left)+$(this).width()+'px');
				}
		},
		function(e){
			$(i_box).children("img").attr("src", "");
			$(i_box).css('display','none');
			$(i_box).css({'top':0+'px', 'left':0+'px'});
		}
	);  			
}
  
  $scope.terminalDetail();
  $scope.onmousover();
};
$(".suggest").hide();


terminalOpenModule.$inject = ['$scope', '$http', '$cookieStore'];
terminalOpenModule.controller("terminalOpenController", terminalOpenController);
