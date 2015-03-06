'user strict';

//系统设置模块
var terminalOpenModule = angular.module("terminalOpenModule",[]);

var terminalOpenController = function ($scope, $http,$location, LoginService) {
	$scope.terminalId=$location.search()['terminalId'];
	$scope.customerId = 80;
	$scope.img = null;
	$scope.merchantNamed = "";
	$scope.bankCode="";
	$scope.status=0;
	$scope.siClass = "toPrivate";
	$scope.gongClass = "toPublic hover";
	$scope.sex="";
	$scope.shiLian =[];
	$(".leaseExplain_tab").hide();
	//查看终端详情
	$scope.terminalDetail = function () {
      alert($scope.terminalId);
      $http.post("api/terminal/getApplyOpenDetails", {customerId:$scope.customerId,terminalsId:$scope.terminalId}).success(function (data) {  //绑定
          if (data != null && data != undefined) {
              //终端信息
              $scope.applyDetails = data.result.applyDetails;
              //获得商户集合
              $scope.merchantList = data.result.merchants;
              //材料等级
              $scope.MaterialLevel = data.result.MaterialLevel;
              //城市级联
              $scope.Cities = data.result.Cities;
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
  
  //动态显示
  

  $scope.angu = function(obj1,obj2){
	  $scope.merchantNamed = obj1;
	  $scope.merchantId = obj2;
  }
  
  //性别单选
  $scope.butSex = function(num){
		  $scope.sex=num;
  }
  
//级联
  
  $scope.leng = 0;
  $scope.jilianChneg = function(num){
	  for(var i=0;i<$scope.Cities.length;i++){
		  if($scope.Cities[i].parent_id == num){
			  $scope.shiLian[$scope.leng] = {
					  name:$scope.Cities[i].name,
					  id:$scope.Cities[i].id
			  }
			  $scope.leng++;
		  }
	  }
  }
  
  $scope.citiesId = 0;
  $scope.jilianShi = function(num){
	  $scope.citiesId = num;
  }
  
//动态加载银行
  $scope.bankName ="";
  $scope.bank = function(){
	/*  $http.post("api/terminal/ChooseBank", {}).success(function (data) {  //绑定
          if (data != null && data != undefined) {
              //终端信息
              $scope.applyDetails = data.result.applyDetails;
              //获得商户集合
              $scope.merchantList = data.result.merchants;
          }
      }).error(function (data) {
    	  alert("获取列表失败");
          $("#serverErrorModal").modal({show: true});
      });*/
	  $scope.bankCode=[1,2,3,4,5];
  }
  
//动态显示银行代码号
  $scope.bankNum = function(number){
	  $scope.bankCode = "";
	  $scope.bamunber = number;
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
  $scope.addApply = function(){
	  $scope.list = [
	                 {
	                     status:1,
	                     terminalId:$scope.terminalId,
	                     publicPrivateStatus: $scope.publicPrivateStatus,
	                     applyCustomerId: $scope.customerId,
	                     merchantId: $scope.merchantId,
	                     merchantName:$scope.merchantNamed,
	                     sex:$scope.sex,
	                     birthday: $("#selYear").val()+"/"+$("#selMonth").val()+"/"+$("#selDay").val(),
	                     cardId:$("#cirdValue").val(),
	                     phone:$("#phoneValue").val(),
	                     email:$("#emailValue").val(),
	                     cityId:$scope.citiesId
	                 },
	             ];
	  $scope.listOne=[];
	  var countOne=0;
	  for(var i=0;i<$scope.result.length;i++){
		  if($scope.result[i].info_type != 1 || $scope.result[i].name == '结算银行名称'){
			  var keys =($("#b_"+(i+1)).html());
			  keys = keys.replace(":","");
			  var values =($("#a_"+(i+1)).val());
			  $scope.listOne[countOne] = {
					  key:keys,
					  value:values,
					  types:1
			  }
			  countOne++;
		  }
	  }
	  $scope.listTwo=[];
	  var countTwo=0;
	  for(var i=0;i<$scope.result.length;i++){
		  if($scope.result[i].info_type == 1){
			  var keyes =($("#imga_"+(i+1)).html());
			  keyes = keyes.replace(":","");
			  var valuees =($("#imgb_"+(i+1)).val());
			  $scope.listTwo[countTwo] = {
					  key:keyes,
					  value:valuees,
					  types:2
			  }
			  countTwo++;
		  }
	  }
	  $scope.leng = $scope.list.length;
	  for(var i=0;i<$scope.listOne.length;i++){
		  $scope.list[$scope.leng+i] = $scope.listOne[i];
	  }
	  $scope.leng = $scope.list.length;
	  for(var i=0;i<$scope.listTwo.length;i++){
		  $scope.list[$scope.leng+i] = $scope.listTwo[i];
	  }
	  
	  
	  $http.post("api/terminal/addOpeningApply", $scope.list).success(function (data) {  //绑定
          if (data != null && data != undefined) {
        	  alert(data.code);
          }
      }).error(function (data) {
    	  alert("获取列表失败");
          $("#serverErrorModal").modal({show: true});
      });
  }
  $scope.terminalDetail();
  $scope.getMaterialName();

};


terminalOpenModule.$inject = ['$scope', '$http', '$cookieStore'];
terminalOpenModule.controller("terminalOpenController", terminalOpenController);
