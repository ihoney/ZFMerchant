'user strict';

// 创建商户
var merchantUpdateModule = angular.module("merchantUpdateModule", []);
var merchantUpdateController = function($scope, $http, $location, LoginService) {
	$scope.merchant={};
		var merchantId = $location.search()['merchantId'];
		$scope.req = {id : merchantId};
		$http.post("api/merchant/findMerchantById" , $scope.req ).success(function(data) {
			if (data.code == 1) {
				$scope.merchant = data.result;
			}  
		}).error(function(data) {

		});
	
	$scope.merchantUpdate = function() {
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
		$http.post("api/merchant/update", $scope.merchant).success(function(data) {
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
		
		var vw = "上传成功";
		$('#cardIdFrontPhotoPath').Huploadify({//法人上半身照片
			buttonText:'重新上传',
			onUploadComplete:function(event, response, status){
				var obj = eval( "(" + response + ")" );//转换后的JSON对象
				$scope.merchant.cardIdFrontPhotoPath=obj.result;
				 $("#cardIdFrontPhotoPath_s").html(vw);
					}
			});
		
		$('#cardIdBackPhotoPath').Huploadify({//法人身份证照片背面
			buttonText:'重新上传',
			onUploadComplete:function(event, response, status){
				var obj = eval( "(" + response + ")" );//转换后的JSON对象
				$scope.merchant.cardIdBackPhotoPath=obj.result;
				 $("#cardIdBackPhotoPath_s").html(vw);
					}
			});
		
		
		$('#bodyPhotoPath').Huploadify({//法人上半身照片
			buttonText:'重新上传',
			onUploadComplete:function(event, response, status){
				var obj = eval( "(" + response + ")" );//转换后的JSON对象
				$scope.merchant.bodyPhotoPath=obj.result;
				 $("#bodyPhotoPath_s").html(vw);
					}
			});
		
		$('#licenseNoPicPath').Huploadify({//营业执照照片
			buttonText:'重新上传',
			onUploadComplete:function(event, response, status){
				var obj = eval( "(" + response + ")" );//转换后的JSON对象
				$scope.merchant.licenseNoPicPath=obj.result;
				 $("#licenseNoPicPath_s").html(vw);
					}
			});
		$('#taxNoPicPath').Huploadify({// 
			buttonText:'重新上传',
			onUploadComplete:function(event, response, status){
				var obj = eval( "(" + response + ")" );//转换后的JSON对象
				$scope.merchant.taxNoPicPath=obj.result;
				 $("#taxNoPicPath_s").html(vw);
					}
			});
		$('#orgCodeNoPicPath').Huploadify({// 
			buttonText:'重新上传',
			onUploadComplete:function(event, response, status){
				var obj = eval( "(" + response + ")" );//转换后的JSON对象
				$scope.merchant.orgCodeNoPicPath=obj.result;
				 $("#orgCodeNoPicPath_s").html(vw);
					}
			});
		$('#accountPicPath').Huploadify({// 
			buttonText:'重新上传',
			onUploadComplete:function(event, response, status){
				var obj = eval( "(" + response + ")" );//转换后的JSON对象
				$scope.merchant.accountPicPath=obj.result;
				 $("#accountPicPath_s").html(vw);
					}
			});
	};
	$scope.init();
};
merchantUpdateModule.controller("merchantUpdateController", merchantUpdateController);