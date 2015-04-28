'user strict';

// 创建商户
var merchantAddModule = angular.module("merchantAddModule", []);
var merchantAddController = function($scope, $http, $location, LoginService) {
	$scope.merchant={};
	$scope.merchantAdd = function() {
		if($scope.merchant.title =="" || typeof($scope.merchant.title)=="undefined" ){
			alert("请填写商户名称");
			return false;
		}
		
		if($scope.merchant.legalPersonName =="" || typeof($scope.merchant.legalPersonName)=="undefined" ){
			alert("请填写法人姓名");
			return false;
		}
		
		if($scope.merchant.title =="" || typeof($scope.merchant.title)=="undefined" ){
			alert("请填写商户名称");
			return false;
		}
		
		if($scope.merchant.accountBankName =="" || typeof($scope.merchant.accountBankName)=="undefined" ){
			alert("请填写开户行名称");
			return false;
		}
		
		if($scope.merchant.accountBankAddress =="" || typeof($scope.merchant.accountBankAddress)=="undefined" ){
			alert("请填写开户行地址");
			return false;
		}
		
		if($scope.merchant.accountBankNum =="" || typeof($scope.merchant.accountBankNum)=="undefined" ){
			alert("请填写银行账号");
			return false;
		}
		
		if($scope.merchant.businessLicenseNo=="" || typeof($scope.merchant.businessLicenseNo)=="undefined" ){
			alert("请填写营业执照登记号");
			return false;
		}
		
		if($scope.merchant.organizationCodeNo =="" || typeof($scope.merchant.organizationCodeNo)=="undefined" ){
			alert("请填写组织机构代码证号");
			return false;
		}
		
		if($scope.merchant.taxRegisteredNo =="" || typeof($scope.merchant.taxRegisteredNo)=="undefined" ){
			alert("请填写税务登记号");
			return false;
		}
		
		if($scope.merchant.bankOpenAccount =="" || typeof($scope.merchant.bankOpenAccount)=="undefined" ){
			alert("请填写银行开户许可证号");
			return false;
		}
		
		
		var cardId = $scope.merchant.legalPersonCardId;
		   // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
		   var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		   if(reg.test(cardId) === false)
		   {
		       alert("身份证输入不合法");
		       return  false;
		   }
	 if (typeof($scope.merchant.cardIdFrontPhotoPath) == "undefined") { 
            alert("法人身份证照片正面未上传");
            return false;
     }  
	    if (typeof($scope.merchant.cardIdBackPhotoPath) == "undefined") { 
            alert("法人身份证照片背面未上传");
            return false;
     }   
	    if (typeof($scope.merchant.bodyPhotoPath) == "undefined") { 
            alert("法人上半身照片未上传");
            return false;
     }   
	    if (typeof($scope.merchant.licenseNoPicPath) == "undefined") { 
            alert("营业执照照片未上传");
            return false;
     }      
	    if (typeof($scope.merchant.taxNoPicPath) == "undefined") { 
            alert("税务登记证照片未上传");
            return false;
     }    
	    if (typeof($scope.merchant.orgCodeNoPicPath) == "undefined") { 
            alert("组织机构代码证照片未上传");
            return false;
     }     
	    if (typeof($scope.merchant.accountPicPath) == "undefined") { 
            alert("银行开户许可证照片未上传");
            return false;
     }     
		$scope.merchant.customerId = LoginService.userid;
		$http.post("api/merchant/insert", $scope.merchant).success(function(data) {
			if (data.code == 1) {
				window.location.href = '#/merchantList';
			} else {
				alert(data.message);
			}
		}).error(function(data) {

		});
	};
	$scope.init = function() {

		// 判断是否已登录
		if (LoginService.userid == 0) {
			window.location.href = '#/login';
		} else {
			$scope.$emit('changeshow', false);
		}
		
		var vw = "ok";
		$('#cardIdFrontPhotoPath').Huploadify({//法人上半身照片
			fileSizeLimit:9999,
			removeTimeout:9999999,
			uploader:'api/index/upload',
			 simUploadLimit : 1,
			 onUploadStart:function(){
			 },
			onUploadComplete:function(event, response, status){
				var obj = eval( "(" + response + ")" );//转换后的JSON对象
				$scope.merchant.cardIdFrontPhotoPath=obj.result;
				 $("#cardIdFrontPhotoPath_s").html(vw);
					}
			});
		
		$('#cardIdBackPhotoPath').Huploadify({//法人身份证照片背面
			fileSizeLimit:9999,
			removeTimeout:9999999,
			uploader:'api/index/upload',
			 simUploadLimit : 1,
			 onUploadStart:function(){
				 
			 },
			onUploadComplete:function(event, response, status){
				var obj = eval( "(" + response + ")" );//转换后的JSON对象
				$scope.merchant.cardIdBackPhotoPath=obj.result;
				 $("#cardIdBackPhotoPath_s").html(vw);
					}
			});
		
		
		$('#bodyPhotoPath').Huploadify({//法人上半身照片
			fileSizeLimit:9999,
			removeTimeout:9999999,
			uploader:'api/index/upload',
			 simUploadLimit : 1,
			 onUploadStart:function(){
				 
			 },
			onUploadComplete:function(event, response, status){
				var obj = eval( "(" + response + ")" );//转换后的JSON对象
				$scope.merchant.bodyPhotoPath=obj.result;
				 $("#bodyPhotoPath_s").html(vw);
					}
			});
		
		$('#licenseNoPicPath').Huploadify({//营业执照照片
			fileSizeLimit:9999,
			removeTimeout:9999999,
			uploader:'api/index/upload',
			 simUploadLimit : 1,
			 onUploadStart:function(){
				 
			 },
			onUploadComplete:function(event, response, status){
				var obj = eval( "(" + response + ")" );//转换后的JSON对象
				$scope.merchant.licenseNoPicPath=obj.result;
				 $("#licenseNoPicPath_s").html(vw);
					}
			});
		$('#taxNoPicPath').Huploadify({// 
			fileSizeLimit:9999,
			removeTimeout:9999999,
			uploader:'api/index/upload',
			 simUploadLimit : 1,
			 onUploadStart:function(){
				 
			 },
			onUploadComplete:function(event, response, status){
				var obj = eval( "(" + response + ")" );//转换后的JSON对象
				$scope.merchant.taxNoPicPath=obj.result;
				 $("#taxNoPicPath_s").html(vw);
					}
			});
		$('#orgCodeNoPicPath').Huploadify({// 
			fileSizeLimit:9999,
			removeTimeout:9999999,
			uploader:'api/index/upload',
			 simUploadLimit : 1,
			 onUploadStart:function(){
				 
			 },
			onUploadComplete:function(event, response, status){
				var obj = eval( "(" + response + ")" );//转换后的JSON对象
				$scope.merchant.orgCodeNoPicPath=obj.result;
				 $("#orgCodeNoPicPath_s").html(vw);
					}
			});
		$('#accountPicPath').Huploadify({// 
			fileSizeLimit:9999,
			removeTimeout:9999999,
			uploader:'api/index/upload',
			 simUploadLimit : 1,
			 onUploadStart:function(){
				 
			 },
			onUploadComplete:function(event, response, status){
				var obj = eval( "(" + response + ")" );//转换后的JSON对象
				$scope.merchant.accountPicPath=obj.result;
				 $("#accountPicPath_s").html(vw);
					}
			});
	};
	$scope.init();
};
merchantAddModule.controller("merchantAddController", merchantAddController);