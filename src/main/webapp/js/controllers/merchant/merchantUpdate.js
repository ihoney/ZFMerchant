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
				alert("更新成功");
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
		
		  $("#cardIdFrontPhotoPath").uploadify({
			  buttonText:'重新上传',
	            'queueID':    'file',     
	            'multi':       false,
	            onUploadStart:function(){//上传开始时的动作
					 var doc_height = $(document).height();
					 $("#mer_mask").css({//显示遮罩loading
							display : 'block',
							height : doc_height
						});
					 $("#mer_mask").show();
					 $("#mer_upImgLoading").show();
				 },
	            //检测FLASH失败调用
	                'onFallback':function()
	               {
	                alert("您未安装FLASH控件，无法上传图片！请安装FLASH控件后再试。");
	               },
	                //上传到服务器，服务器返回相应信息到data里
	                'onUploadSuccess':function(file, data, response)
	                {
		                $("#mer_mask").hide();
			   			 $("#mer_upImgLoading").hide();
			   			$scope.merchant.cardIdFrontPhotoPath=data;
						$("#cardIdFrontPhotoPath_m").attr("imgPath",data);
						 $("#cardIdFrontPhotoPath_s").html(vw);
	                }
	        });
		  
			//法人身份证照片背面
		  $("#cardIdBackPhotoPath").uploadify({
			  buttonText:'重新上传',
	            'queueID':    'file',     
	            'multi':       false,
	            onUploadStart:function(){//上传开始时的动作
					 var doc_height = $(document).height();
					 $("#mer_mask").css({//显示遮罩loading
							display : 'block',
							height : doc_height
						});
					 $("#mer_mask").show();
					 $("#mer_upImgLoading").show();
				 },
	            //检测FLASH失败调用
	                'onFallback':function()
	               {
	                alert("您未安装FLASH控件，无法上传图片！请安装FLASH控件后再试。");
	               },
	                //上传到服务器，服务器返回相应信息到data里
	                'onUploadSuccess':function(file, data, response)
	                {
	                    $("#mer_mask").hide();
			   			 $("#mer_upImgLoading").hide();
			   			$scope.merchant.cardIdBackPhotoPath=data;
						$("#cardIdBackPhotoPath_m").attr("imgPath",data);
						 $("#cardIdBackPhotoPath_s").html(vw);
	                }
	        });

		  $("#bodyPhotoPath").uploadify({
			  buttonText:'重新上传',
	            'queueID':    'file',     
	            'multi':       false,
	            onUploadStart:function(){//上传开始时的动作
					 var doc_height = $(document).height();
					 $("#mer_mask").css({//显示遮罩loading
							display : 'block',
							height : doc_height
						});
					 $("#mer_mask").show();
					 $("#mer_upImgLoading").show();
				 },
	            //检测FLASH失败调用
	                'onFallback':function()
	               {
	                alert("您未安装FLASH控件，无法上传图片！请安装FLASH控件后再试。");
	               },
	                //上传到服务器，服务器返回相应信息到data里
	                'onUploadSuccess':function(file, data, response)
	                {
	                    $("#mer_mask").hide();
			   			 $("#mer_upImgLoading").hide();
			   			$scope.merchant.bodyPhotoPath=data;
						$("#bodyPhotoPath_m").attr("imgPath",data);
						 $("#bodyPhotoPath_s").html(vw);
	                }
	        });
		   
		  $("#licenseNoPicPath").uploadify({ 
			  buttonText:'重新上传',
	            'queueID':    'file',     
	            'multi':       false,
	            onUploadStart:function(){//上传开始时的动作
					 var doc_height = $(document).height();
					 $("#mer_mask").css({//显示遮罩loading
							display : 'block',
							height : doc_height
						});
					 $("#mer_mask").show();
					 $("#mer_upImgLoading").show();
				 },
	            //检测FLASH失败调用
	                'onFallback':function()
	               {
	                alert("您未安装FLASH控件，无法上传图片！请安装FLASH控件后再试。");
	               },
	                //上传到服务器，服务器返回相应信息到data里
	                'onUploadSuccess':function(file, data, response)
	                {
	                    $("#mer_mask").hide();
			   			 $("#mer_upImgLoading").hide();
			   			$scope.merchant.licenseNoPicPath=data;
						$("#licenseNoPicPath_m").attr("imgPath",data);
						 $("#licenseNoPicPath_s").html(vw);
	                }
	        });

		  $("#taxNoPicPath").uploadify({ 
			  buttonText:'重新上传',
	            'queueID':    'file',     
	            'multi':       false,
	            onUploadStart:function(){//上传开始时的动作
					 var doc_height = $(document).height();
					 $("#mer_mask").css({//显示遮罩loading
							display : 'block',
							height : doc_height
						});
					 $("#mer_mask").show();
					 $("#mer_upImgLoading").show();
				 },
	            //检测FLASH失败调用
	                'onFallback':function()
	               {
	                alert("您未安装FLASH控件，无法上传图片！请安装FLASH控件后再试。");
	               },
	                //上传到服务器，服务器返回相应信息到data里
	                'onUploadSuccess':function(file, data, response)
	                {
	                    $("#mer_mask").hide();
			   			 $("#mer_upImgLoading").hide();
			   			$scope.merchant.taxNoPicPath=data;
						$("#taxNoPicPath_m").attr("imgPath",data);
						 $("#taxNoPicPath_s").html(vw);
	                }
	        });
		  
		  $("#orgCodeNoPicPath").uploadify({ 
			  buttonText:'重新上传',
	            'queueID':    'file',     
	            'multi':       false,
	            onUploadStart:function(){//上传开始时的动作
					 var doc_height = $(document).height();
					 $("#mer_mask").css({//显示遮罩loading
							display : 'block',
							height : doc_height
						});
					 $("#mer_mask").show();
					 $("#mer_upImgLoading").show();
				 },
	            //检测FLASH失败调用
	                'onFallback':function()
	               {
	                alert("您未安装FLASH控件，无法上传图片！请安装FLASH控件后再试。");
	               },
	                //上传到服务器，服务器返回相应信息到data里
	                'onUploadSuccess':function(file, data, response)
	                {
	                    $("#mer_mask").hide();
			   			 $("#mer_upImgLoading").hide();
			   			$scope.merchant.orgCodeNoPicPath=data;
						$("#orgCodeNoPicPath_m").attr("imgPath",data);
						 $("#orgCodeNoPicPath_s").html(vw);
	                }
	        });
		  
		  $("#accountPicPath").uploadify({ 
			  buttonText:'重新上传',
	            'queueID':    'file',     
	            'multi':       false,
	            onUploadStart:function(){//上传开始时的动作
					 var doc_height = $(document).height();
					 $("#mer_mask").css({//显示遮罩loading
							display : 'block',
							height : doc_height
						});
					 $("#mer_mask").show();
					 $("#mer_upImgLoading").show();
				 },
	            //检测FLASH失败调用
	                'onFallback':function()
	               {
	                alert("您未安装FLASH控件，无法上传图片！请安装FLASH控件后再试。");
	               },
	                //上传到服务器，服务器返回相应信息到data里
	                'onUploadSuccess':function(file, data, response)
	                {
	                    $("#mer_mask").hide();
			   			 $("#mer_upImgLoading").hide();
			   			$scope.merchant.accountPicPath=data;
						$("#accountPicPath_m").attr("imgPath",data);
						 $("#accountPicPath_s").html(vw);
	                }
	        });
		
	};
	$scope.init();
};
merchantUpdateModule.controller("merchantUpdateController", merchantUpdateController);