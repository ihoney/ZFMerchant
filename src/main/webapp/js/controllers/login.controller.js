'use strict';

// 主页面路由模块，用于控制主页面的菜单导航(注入了登陆服务LoginService)
//var indexModule = angular.module("indexModule", [ 'loginServiceModule', 'loginrouteModule', 'ngRoute' ]);

var indexController = function($scope, $location, $http, LoginService,$cookieStore) {
	$scope.loginUserName=LoginService.loginUserName;
	$scope.ngshow=true;
	$scope.ngshow2=false;
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
    $scope.$on('$locationChangeStart', function (scope, next, current) {                          
		var strs= new Array(); //定义一数组
		strs=next.split("/#/"); //字符分割
		strs=strs[1].split("?")
		//alert(strs[0]);
		if(LoginService.userid == 0){
			$scope.loginshow=false;
		}else{
			$scope.loginshow=true;
		}  
		$scope.searchview=true;
		if(check(strs[0])){
			$scope.ngshow=false;
			$scope.ngshow2=true;
		}else{
			$scope.ngshow=true;
			$scope.ngshow2=false;
		}
    });
	
	var check=function(str){
		var arry=["myapp","webmessageinfo","traderecord1One",
		          "order","orderinfo",
		          "terminal","terminalOpening","terminalDetail",
		          "cs_cencel","cs_return","cs_change","cs_repair","cs_update","cs_lease",
		          "cs_cencelinfo","cs_returninfo","cs_changeinfo","cs_repairinfo","cs_updateinfo","cs_leaseinfo",
		          "traderecord1","traderecord2","traderecord3","traderecord4","traderecord5",
		          "myinfobase","myinfoupdatepassword","myinfoAddresses","myinfointegral",
		          "merchantList","merchantOne",
		          "message","messageinfo"];
		for (var i = 0; i < arry.length; i++) {
			if(str==arry[i]){
				return true;
			}
		}
		return false;
	}
	
	
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
    
    
    
	$scope.$on('changeshow', function(d,data) {
		$scope.ngshow=data;
	});
	$scope.$on('changesearchview', function(d,data) {
		$scope.searchview=data;
	});
	
	$scope.searchShop=function() {
		LoginService.keys=$scope.keys;
		window.location.href = '#/shop';
	};
};


var loginController=function($scope, $location, $http, LoginService){
	//隐藏中间搜索
	$scope.$emit('changesearchview',false);
	$scope.RememberPass = false;
	
	//登陆
	$scope.login = function() {
		//移除样式
		$("link[href='style/global.css']").remove();
		LoginService.login($scope,$http);
	};
	
	var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	$scope.loginUserName = LoginService.loginUserName;
	//勾选协议
	$scope.ridel_xy = false;
	
	//登陆页面文本框得到光标的时候失去错误提示信息
	$scope.RememberPass = false;

	$scope.password1 = "";
	$scope.password2 = "";
	$scope.codeNumber = "";
	$scope.code = "";//图片验证
	
	$scope.jsons = {
		username : $scope.username,
		password : $scope.password
	};

	/*//退出页面(清除$cookieStore)
	$scope.escLogin = function(){
		$cookieStore.put("loginUserName",null);
    	$cookieStore.put("loginUserId",0);
    	
    	$scope.password1 = "";
    	$scope.code = "";
    	LoginService.hideAll();
		//登陆前首页
		$('#maintop').show();
		$('#mainindex').show();
	}*/

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
};

var registerController=function($scope, $location, $http, LoginService){
	//手机邮箱注册显示
	$scope.show = true;
	//勾选协议
	$scope.ridel_xy = false;
	//邮箱注册显示状态
	$scope.successEmailShow = false;
	
	// 初始化图片验证码
	$scope.reGetRandCodeImg = function() {
		$(".loginRandCodeImg").attr("src", "api/user/getRandCodeImg?id=" + Math.random());
	};
	
	$scope.init= function() {
		//移除样式
		$("link[href='style/global.css']").remove();
		//隐藏中间搜索
		$scope.$emit('changesearchview',false);
		//获得省级
		$scope.getShengcit();
	};
	
	// 跳转手机注册
	$scope.register = function() {
		$scope.show = true;
		$http.post("api/terminal/getCities").success(function(data) {
			if (data.code == 1) {
				$scope.cities = data.result;
			} else {
				alert("城市加载失败！");
			}
		})
	};
	
	// 跳转邮箱注册用户
	$scope.gotoEmailRetrieve = function() {
		$scope.show = false;
		$scope.successEmailShow = false;
	}
	
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
		if($scope.ridel_xy != true){
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
				alert("验证码错误!");
			}
		}
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
				$scope.password1 = "";
				$scope.password2 = "";
				$scope.codeNumber = "";
				$scope.code = "";
				$scope.codeBei = "";
				window.location.href = '#/login';
			} else if (data.code == -1) {
				alert(data.message);
			}
		})
	};
	
	// 校验图片验证码
	$scope.getImgEmailCode = function(){
		if($scope.ridel_xy != true){
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
				$scope.successEmailShow = true;
			} else if (data.code == -1) {
				alert(data.code);
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
	

	$scope.reGetRandCodeImg();
	$scope.init();
};
	
var findpassController=function($scope, $location, $http, LoginService){
	//检验邮箱格式
	var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	//隐藏想邮箱发送邮件状态
	$scope.songToEmail = false;
	// 初始化图片验证码
	$scope.reGetRandCodeImg = function() {
		$(".loginRandCodeImg").attr("src", "api/user/getRandCodeImg?id=" + Math.random());
	};
	
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
	
	//移除样式
	$("link[href='style/global.css']").remove();
	
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
							$http.post("api/user/sendEmailVerificationCode", {
								codeNumber : $scope.phone_email,
							}).success(function(data) {
								if (data.code == 1) {
									alert("重置邮件发送成功！");
									$scope.songToEmail = true;
									$scope.twostep();
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
									$scope.twostep();
								} else {
									alert("发送手机验证码失败！");
								}
							})
						}
					}
				})
			}
		})
	};
	
	// 找回密码第三步
	$scope.findPassThree = function() {
		if($scope.code == $scope.codeNumber){
			$http.post("api/user/webFicationCode", {
			code : $scope.codeNumber,
			username : $scope.phone_email
			}).success(function(data) {
			if (data.code == 1) {
				$scope.threestep();
			} else if (data.code == -1) {
				alert(data.message);
			}
			})
		}else{
			alert("验证码错误！");
		}
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
					$('#login').show();
					 window.location.href = '#/login';
				} else if (data.code == -1) {
					alert(data.message);
				}
			})
		}
	};
	
	$scope.reGetRandCodeImg();
	$scope.init();
};


indexModule.controller("indexController", indexController);
indexModule.controller("loginController", loginController);
indexModule.controller("registerController", registerController);
indexModule.controller("findpassController", findpassController);