'use strict';

// 主页面路由模块，用于控制主页面的菜单导航(注入了登陆服务LoginService)
var loginModule = angular.module("loginModule", [ 'loginServiceModule', 'loginrouteModule', 'ngRoute' ]);

var indexController = function($scope, $location, $http, LoginService,$cookieStore) {
	var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	$scope.loginUserName = LoginService.loginUserName;
	$scope.ridel_xy = false;
	$scope.shopcount=0;
	$scope.shopcartcount=function () {
    	if(LoginService.userid>0){
    		$http.post("api/cart/total", {customerId:LoginService.userid}).success(function (data) {  //绑定
                if (data.code==1) {
                	$scope.shopcount= data.result;
                }
            });
    	}
    };
	$scope.$on('$routeChangeStart', function (scope, next, current) {                          
		if(LoginService.userid == 0){
			loginshow=false;
//			//加载登陆前样式
//			$scope.dynamicLoadingCss("style/global.css");
//			LoginService.unLoginShow();
		}else{
			loginshow=true;
//			LoginService.hadLoginShow();
		}  
		$scope.searchview=true;
		$scope.ngshow=true;
    });
	
	//登陆页面文本框得到光标的时候失去错误提示信息
	 $("#loginUname").focus(function(){
		  // $("#pName").html("");
     	   $("#loginUname").attr("class","");
		});
	 $("#loginImg").focus(function(){
     	   $("#loginImg").attr("class","");
		});
	 
	 
	$scope.RememberPass = false;

	$scope.password1 = "";
	$scope.password2 = "";
	$scope.codeNumber = "";
	$scope.code = "";//图片验证
	$scope.codeBei = "";
	
	$scope.jsons = {
		username : $scope.username,
		password : $scope.password
	};

	
	
//	//登陆前首页跳转登陆页面
//	$scope.goToLogin = function(){
//		LoginService.hideAll();
//		$('#login').show();
//		//加载登陆样式
//		$scope.dynamicLoadingCss("style/login.css");
//	}
	
	//退出页面(清除$cookieStore)
	$scope.escLogin = function(){
		$cookieStore.put("loginUserName",null);
    	$cookieStore.put("loginUserId",0);
    	
    	$scope.password1 = "";
    	$scope.code = "";
    	LoginService.hideAll();
		//登陆前首页
		$('#maintop').show();
		$('#mainindex').show();
	}

	// 登陆前首页跳转手机注册
//	$scope.register = function() {
//		$http.post("api/terminal/getCities").success(function(data) {
//			if (data.code == 1) {
//				$scope.cities = data.result;
//			} else {
//				alert("城市加载失败！");
//			}
//		})
//		
//		$scope.dynamicLoadingCss("style/register.css");
//		LoginService.hideAll();
//		$('#retrieveHtml').show();
//		$("link[href='style/global.css']").remove();
//	};
	
	// 跳转邮箱注册用户
//	$scope.gotoEmailRetrieve = function() {
//		$("#clodeText").hide();
//		$scope.dynamicLoadingCss("style/register.css");
//		LoginService.hideAll();
//		$('#emailRetrieveHtml').show();
//		$("link[href='style/global.css']").remove();
//	}

	// 初始化图片验证码
	$scope.reGetRandCodeImg = function() {
		$(".loginRandCodeImg").attr("src", "api/user/getRandCodeImg?id=" + Math.random());
	};
	

	$scope.reGetRandCodeImg();
	

	// 动态加载css样式
//	$scope.dynamicLoadingCss = function(path) {
//		if (!path || path.length == 0) {
//			throw new Error('argument "path" is required !');
//		}
//		var head = document.getElementsByTagName('head')[0];
//		var link = document.createElement('link');
//		link.href = path;
//		link.rel = 'stylesheet';
//		link.type = 'text/css';
//		head.appendChild(link);
//	};

	 

	// ===============================
	// 注册
	
	
	
	$scope.shopcount=0;
	$scope.$on('shopcartcountchange', function() {
		$scope.shopcartcount();
	});
	$scope.shopcartcount=function () {
    	if(LoginService.userid>0){
    		$http.post("api/cart/total", {customerId:LoginService.userid}).success(function (data) {  //绑定
                if (data.code==1) {
                	$scope.shopcount= data.result;
                }
            });
    	}
    };
    $scope.shopcartcount();
    
    $scope.ngshow=true;
	$scope.$on('changeshow', function(d,data) {
		$scope.ngshow=data;
	});
	$scope.$on('changesearchview', function(d,data) {
		$scope.searchview=data;
	});
	
	$scope.searchShop=function() {
		//$scope.$broadcast('shopsearch',$scope.keys);
		LoginService.keys=$scope.keys;
		window.location.href = '#/shop';
	};
};


var loginController=function($scope, $location, $http, LoginService){
	//隐藏中间搜索
	$scope.$emit('changesearchview',false);
	$scope.RememberPass = false;
	$scope.login = function() {
		LoginService.login($scope);
	};
};

var registerController=function($scope, $location, $http, LoginService){
	$scope.init= function() {
		//隐藏中间搜索
		$scope.$emit('changesearchview',false);
		//获得省级
		$scope.getShengcit();
	};
	// 邮箱注册用户
	$scope.addUserEmail = function() {
		$http.post("api/user/userRegistration", {
			username : $scope.emailname,
			accountType : true,
			cityId : Math.ceil($scope.siId),
			password : $scope.password1
		}).success(function(data) {
			if (data.code == 1) {
				$scope.ridel_xy = false;
				$scope.password1 = "";
				$scope.password2 = "";
				$scope.codeBei = "";
				$("#emailUl").hide();
				$("#butEmail").hide();
				$("#clodeText").show();
			} else if (data.code == -1) {
				alert(data.code);
			}
		})
	};
	
	// 注册用户
	$scope.addUser = function() {
		$http.post("api/user/userRegistration", {
			username : $scope.rename,
			accountType : false,
			code : $scope.codeNumber,
			cityId : Math.ceil($scope.siId),
			password : $scope.password1
		}).success(function(data) {
			if (data.code == 1) {
				$scope.ridel_xy = false;
				LoginService.hideAll();
				$('#login').show();
				$scope.password1 = "";
				$scope.codeNumber = "";
				$scope.code = "";
				$scope.dynamicLoadingCss("style/login.css");
			} else if (data.code == -1) {
				alert(data.message);
			}
		})
	};
	
	//获得省级
	$scope.getShengcit= function(){
		$http.post("api/terminal/getCities").success(function(data) {
			if (data.code == 1) {
				$scope.cities = data.result;
			} else {
				alert("城市加载失败！");
			}
		})
	};
	
	
	//获得市级
	$scope.getShicit = function(parentId){
		$http.post("api/terminal/getShiCities", {
			parentId : parentId
		}).success(function(data) {
			$scope.getShi = data.result;
		})
	};
	
	//获得市ID
	$scope.getsShiId = function(siId){
		$scope.siId = siId;
	};
	
	// 获取手机验证码
	$scope.getRegisterCode = function() {
		$http.post("api/user/sendPhoneVerificationCodeReg", {
			codeNumber : $scope.rename
		}).success(function(data) {
			if(data.code == 1){
				$scope.code = data.result;
			}else{
				alert(data.message);
			}
		})
	};

	// 手机校验图片验证码
	$scope.getImgCode = function() {
		if($scope.ridel_xy == true){
			if($scope.code == $scope.codeNumber){
				if($scope.password1 == $scope.password2){
					$http.post("api/user/sizeUpImgCode", {
						imgnum : $scope.codeBei
					}).success(function(data) {
						if (data.code == 1) {
							$scope.addUser();
						} else if (data.code == -1) {
							alert(data.message);
						}
					})
				}else{
					alert("密码不一致！");
				}
			}else{
				alert("图片验证码错误12");
			}
		}
	};


	// 校验图片验证码
	$scope.getImgEmailCode = function(){
		if($scope.ridel_xy == true){
			$http.post("api/user/jusEmail", {
				username : $scope.emailname
			}).success(function(data) {
				if(data.code == 1){
					if($scope.password1 == $scope.password2){
						$http.post("api/user/sizeUpImgCode", {
							imgnum : $scope.codeBei
						}).success(function(data) {
							if (data.code == 1) {
								$scope.addUserEmail();
							} else if (data.code == -1) {
								alert(data.message);
							}
						})
					}else{
						alert("密码不一致！");
					}
				}else{
					alert(data.message);
				}
			})
		}
	};
	$scope.init();
	
};

var findpassController=function($scope, $location, $http, LoginService){
	
	$scope.init=function() {
		//隐藏中间搜索
		$scope.$emit('changesearchview',false);
		$scope.onestep();
	};
	
	$scope.onestep=function() {
		$scope.one=true;
		$scope.two=false;
		$scope.three=false;
	};
	$scope.twostep=function() {
		$scope.one=false;
		$scope.two=true;
		$scope.three=false;	
	};
	$scope.threestep=function() {
		$scope.one=false;
		$scope.two=false;
		$scope.three=true;
	};
	
	// 找回密码
	$scope.findPass = function() {
		LoginService.hideAll();
		$('#findPassOne').show();
		$scope.reGetRandCodeImg();
		$("link[href='style/global.css']").remove();
		$scope.dynamicLoadingCss("style/retrieve.css");
	};
	

	
	// 找回密码第一步
	$scope.findPassOnes = function() {
		$http.post("api/user/getFindUser", {
			username : $scope.phone_email
		}).success(function(data) {
			if (data.code == -1) {
				alert(data.message);
			} else {
				$http.post("api/user/sizeUpImgCode", {
					imgnum : $scope.code
				}).success(function(data) {
					if (data.code == -1) {
						alert(data.message);
					} else {
						// 下一步
						if (myreg.test($scope.phone_email)) {
							// 向邮箱发送密码重置邮件！
							$http.post("api/user/sendEmailVerificationCode").success(function(data) {
								if (data.code == 1) {
									alert("重置邮件发送成功！");
									LoginService.hideAll();
									$('#findPassTwo').show();
								} else {
									alert("重置密码邮件发送失败！");
								}
							})
						} else {
							$http.post("api/user/sendPhoneVerificationCodeFind", {
								codeNumber : $scope.phone_email,
							}).success(function(data) {
								if (data.code == 1) {
									alert(data.result);
									$scope.code = data.result;
									$scope.codeNumber = "";
									LoginService.hideAll();
									$('#findPassTwo').show();
								} else {
									alert("发送手机验证码失败！");
								}
							})
							$("#emailtext").hide();
						}
					}
				})
			}
		})
	};
	
	// 找回密码第三步
	$scope.findPassThree = function() {
		$http.post("api/user/webFicationCode", {
			code : $scope.codeNumber,
			username : $scope.phone_email
		}).success(function(data) {
			if (data.code == 1) {
				LoginService.hideAll();
				$('#findPassThree').show();
			} else if (data.code == -1) {
				alert(data.message);
			}

		})
	};
	
	// 开始找回
	$scope.findPassEnd = function() {
		if ($scope.password1 != $scope.password2) {
			alert("密码不一致！");
		} else {
			$http.post("api/user/webUpdatePass", {
				password : $scope.password1,
				username : $scope.phone_email
			}).success(function(data) {
				if (data.code == 1) {
					LoginService.hideAll();
					$('#login').show();
					$scope.dynamicLoadingCss("style/login.css");
				} else if (data.code == -1) {
					alert(data.message);
				}
			})
		}
	};
	$scope.init();
};
