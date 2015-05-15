'user strict';

// 创建商户
var merchantAddModule = angular.module("merchantAddModule", []);
var merchantAddController = function($scope, $http, $location, LoginService) {
	$scope.merchant={};
//	$scope.merchant.cardIdFrontPhotoPath==null ?'':$scope.merchant.cardIdFrontPhotoPath;
//	$scope.merchant.cardIdBackPhotoPath==null ?'':$scope.merchant.cardIdBackPhotoPath;
//	$scope.merchant.bodyPhotoPath==null ?'':$scope.merchant.bodyPhotoPath;
//	$scope.merchant.licenseNoPicPath==null ?'':$scope.merchant.licenseNoPicPath;
//	$scope.merchant.taxNoPicPath==null ?'':$scope.merchant.taxNoPicPath;
//	$scope.merchant.orgCodeNoPicPath==null ?'':$scope.merchant.orgCodeNoPicPath;
//	$scope.merchant.accountPicPath==null ?'':$scope.merchant.accountPicPath;
//	
//	$("#cardIdFrontPhotoPath_m").attr("imgPath",$scope.merchant.cardIdFrontPhotoPath);
//	$("#cardIdBackPhotoPath_m").attr("imgPath",$scope.merchant.cardIdBackPhotoPath);
//	$("#bodyPhotoPath_m").attr("imgPath",$scope.merchant.bodyPhotoPath);
//	$("#licenseNoPicPath_m").attr("imgPath",$scope.merchant.licenseNoPicPath);
//	$("#taxNoPicPath_m").attr("imgPath",$scope.merchant.taxNoPicPath);
//	$("#orgCodeNoPicPath_m").attr("imgPath",$scope.merchant.orgCodeNoPicPath);
//	$("#accountPicPath_m").attr("imgPath",$scope.merchant.accountPicPath);
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
				alert("创建成功");
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
			// 鼠标经过小图提示大图
				infoTab('.cover', '.img_info');
		}
		
		var vw = "上传成功";
			//法人上半身照片
			  $("#cardIdFrontPhotoPath").uploadify({
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
				   			 if(data != "-1"){
				   				$scope.merchant.cardIdFrontPhotoPath=data;
								$("#cardIdFrontPhotoPath_m").attr("imgPath",data);
								 $("#cardIdFrontPhotoPath_s").html(vw);
				   			 }else{
				   				 alert("上传失败，请重新再试！");
				   			 }
				   		
		                }
		        });
			  
				//法人身份证照片背面
			  $("#cardIdBackPhotoPath").uploadify({
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
				   			 if(data !="-1"){
				   				$scope.merchant.cardIdBackPhotoPath=data;
								$("#cardIdBackPhotoPath_m").attr("imgPath",data);
								 $("#cardIdBackPhotoPath_s").html(vw);
				   			 }else{
				   				 alert("上传失败，请重新再试！");
				   			 }
				   		
		                }
		        });
	 
			  $("#bodyPhotoPath").uploadify({
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
				   			 if(data !="-1"){
				   				$scope.merchant.bodyPhotoPath=data;
								$("#bodyPhotoPath_m").attr("imgPath",data);
								 $("#bodyPhotoPath_s").html(vw);
				   			 }else{
				   				 alert("上传失败，请重新再试！");
				   			 }
				   			
		                }
		        });
			   
			  $("#licenseNoPicPath").uploadify({ 
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
				   			 if(data!="-1"){
				   				$scope.merchant.licenseNoPicPath=data;
								$("#licenseNoPicPath_m").attr("imgPath",data);
								 $("#licenseNoPicPath_s").html(vw);
				   			 }else{
				   				 alert("上传失败，请重新再试！");
				   			 }
		                }
		        });
 
			  $("#taxNoPicPath").uploadify({ 
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
				   			 if(data != "-1"){
				   				$scope.merchant.taxNoPicPath=data;
								$("#taxNoPicPath_m").attr("imgPath",data);
								 $("#taxNoPicPath_s").html(vw);
				   			 }else{
				   				 alert("上传失败，请重新再试");
				   			 }
				   		
		                }
		        });
			  
			  $("#orgCodeNoPicPath").uploadify({ 
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
				   			 if(data != "-1"){
				   				$scope.merchant.orgCodeNoPicPath=data;
								$("#orgCodeNoPicPath_m").attr("imgPath",data);
								 $("#orgCodeNoPicPath_s").html(vw);
				   			 }else{
				   				 alert("上传失败，请重新再试！");
				   			 }
		                }
		        });
			  
			  $("#accountPicPath").uploadify({ 
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
				   			 if(data !="-1"){
				   				 $scope.merchant.accountPicPath=data;
				   				 $("#accountPicPath_m").attr("imgPath",data);
				   				 $("#accountPicPath_s").html(vw);
				   			 }else{
				   				 alert("上传失败，请重新再试！");
				   			 }
		                }
		        });
	};
	
	function infoTab(i_tab, i_box) {
		$(i_tab).hover(
				function(e) { 
					var val = $(this).attr("imgPath");
					if(val != undefined && val != ""){
						$(i_box).children("img").attr("src", $(this).attr("imgPath"));  
						$(i_box).css('display', 'block');
						$(i_box).css('top',
								$(this).offset().top - $(i_box).height() + 'px');
		
						if ($(this).offset().left + $(i_box).width() > $(document)
								.width()) {
							$(i_box).css('left',
									($(this).offset().left) - $(i_box).width() + 'px');
						} else {
							$(i_box).css('left',
									($(this).offset().left) + $(this).width() + 'px');
						}
					}
				}, function(e) {
					$(i_box).children("img").attr("src", "");
					$(i_box).css('display', 'none');
					$(i_box).css({
						'top' : 0 + 'px',
						'left' : 0 + 'px'
				}); 
		});  
	}
	$scope.init();
};
merchantAddModule.controller("merchantAddController", merchantAddController);