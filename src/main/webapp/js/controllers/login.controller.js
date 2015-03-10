'use strict';

// 主页面路由模块，用于控制主页面的菜单导航(注入了登陆服务LoginService)
var loginModule = angular.module("loginModule", [ 'loginServiceModule', 'loginrouteModule', 'ngRoute' ]);

var loginController = function($scope, $location, $http, LoginService) {
	var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	
	$scope.hideAll = function() {
		$('#login').hide();
		$('#findPassOne').hide();
		$('#findPassTwo').hide();
		$('#findPassThree').hide();
		$('#retrieveHtml').hide();
		$('#emailRetrieveHtml').hide();
		$('#maintopTwo').hide();
		$('#headClear').hide();
		$('#shopmain').hide();
		$('#mainuser').hide();
		$('#mainindex').hide();
		$('#maintop').hide();
		$('#mainindex').hide();
	};
	if(LoginService.userid == 0){
		$scope.hideAll();
		//登陆前首页
		$('#maintop').show();
		$('#mainindex').show();
	}else{
		$scope.hideAll();
		$('#maintopTwo').show();
     	$('#headClear').show();
     	$('#mainuser').show();
	}

	$scope.RememberPass = false;


	$scope.username = "";
	$scope.password1 = "";
	$scope.password2 = "";
	$scope.codeNumber = "";
	$scope.code = "";
	$scope.codeBei = "";
	
	$scope.jsons = {
		username : $scope.username,
		password : $scope.password
	};

	$scope.login = function() {
		LoginService.login($scope);
	};
	
	//登陆前首页跳转登陆页面
	$scope.goToLogin = function(){
		$('#login').show();
		$('#headClear').hide()
		$('#maintop').hide();
		$('#mainindex').hide();
		//加载登陆样式
		$scope.dynamicLoadingCss("style/login.css");
	}

	// 登陆前首页跳转手机注册
	$scope.register = function() {
		$scope.dynamicLoadingCss("style/register.css");
		$('#retrieveHtml').show();
		$('#login').hide();
		$('#headClear').hide()
		$('#maintop').hide();
		$('#mainindex').hide();
		$('#emailRetrieveHtml').hide();
	};

	// 图片验证码
	$scope.reGetRandCodeImg = function() {
		$(".loginRandCodeImg").attr("src", "api/user/getRandCodeImg?id=" + Math.random());
	};
	// 找回密码
	$scope.findPass = function() {
		$('#login').hide();
		$('#findPassOne').show();
		$scope.reGetRandCodeImg();
		$scope.dynamicLoadingCss("style/retrieve.css");
	};

	$scope.reGetRandCodeImg();

	// 找回密码第一步
	$scope.findPassOnes = function() {
		$http.post("api/user/getFindUser", {
			username : $scope.username
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
						if (myreg.test($scope.username)) {
							// 向邮箱发送密码重置邮件！
							$http.post("api/user/sendEmailVerificationCode").success(function(data) {
								if (data.code == 1) {
									alert("重置邮件发送成功！");
									$('#findPassOne').hide();
									$('#findPassTwo').show();
									$("#ulPhone").hide();
									$("#updown").hide();
								} else {
									alert("重置密码邮件发送失败！");
								}

							})
						} else {
							$http.post("api/user/sendPhoneVerificationCodeFind", {
								codeNumber : $scope.username,
							}).success(function(data) {
								if (data.code == 1) {
									alert(data.result);
									$scope.code = data.result;
									$scope.codeNumber = "";
									$('#findPassOne').hide();
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
	}

	// 找回密码第三步
	$scope.findPassThree = function() {
		alert($scope.username);
		$http.post("api/user/webFicationCode", {
			code : $scope.codeNumber,
			username : $scope.username
		}).success(function(data) {
			if (data.code == 1) {
				$('#findPassTwo').hide();
				$('#findPassThree').show();
			} else if (data.code == -1) {
				alert(data.message);
			}

		})
	}

	// 开始找回
	$scope.findPassEnd = function() {
		alert($scope.username);
		if ($scope.password1 != $scope.password2) {
			alert("密码不一致！");
		} else {
			alert($scope.password1);
			$http.post("api/user/webUpdatePass", {
				password : $scope.password1,
				username : $scope.username
			}).success(function(data) {
				if (data.code == 1) {
					$('#findPassThree').hide();
					$('#login').show();
					$scope.dynamicLoadingCss("style/login.css");
				} else if (data.code == -1) {
					alert(data.message);
				}
			})
		}
	}
	// 动态加载css样式
	$scope.dynamicLoadingCss = function(path) {
		if (!path || path.length == 0) {
			throw new Error('argument "path" is required !');
		}
		var head = document.getElementsByTagName('head')[0];
		var link = document.createElement('link');
		link.href = path;
		link.rel = 'stylesheet';
		link.type = 'text/css';
		head.appendChild(link);
	};

	 

	// ===============================
	// 注册
	// 获取手机验证码
	$scope.getRegisterCode = function() {
		$http.post("api/user/sendPhoneVerificationCodeReg", {
			codeNumber : $scope.username
		}).success(function(data) {
			alert(data.result);
			$scope.code = data.result;
		})
	}

	// 校验图片验证码
	$scope.getImgCode = function() {
		$http.post("api/user/sizeUpImgCode", {
			imgnum : $scope.codeBei
		}).success(function(data) {
			if (data.code == 1) {
				alert("图片验证码通过");
				$scope.addUser();
			} else if (data.code == -1) {
				alert(data.message);
			}
		})
	}

	// 注册用户
	$scope.addUser = function() {
		$http.post("api/user/userRegistration", {
			username : $scope.username,
			accountType : false,
			code : $scope.codeNumber,
			cityId : 1,
			password : $scope.password1
		}).success(function(data) {
			if (data.code == 1) {
				$('#login').show();
				$('#retrieveHtml').hide();
				$scope.dynamicLoadingCss("style/login.css");
			} else if (data.code == -1) {
				alert(data.message);
			}
		})
	}
	// 跳转邮箱注册用户
	$scope.gotoEmailRetrieve = function() {
		$('#emailRetrieveHtml').show();
		$('#retrieveHtml').hide();
	}
	
	// 邮箱注册用户
	$scope.addUserEmail = function() {
		$http.post("api/user/userRegistration", {
			username : $scope.username,
			accountType : true,
			cityId : 1,
			password : $scope.password1
		}).success(function(data) {
			if (data.code == 1) {
				$('#login').show();
				$('#emailRetrieveHtml').hide();
				$scope.dynamicLoadingCss("style/login.css");
			} else if (data.code == -1) {
				alert(data.message);
			}
		})
	}

	// 校验图片验证码
	$scope.getImgEmailCode = function() {
		$http.post("api/user/sizeUpImgCode", {
			imgnum : $scope.codeBei
		}).success(function(data) {
			if (data.code == 1) {
				alert("图片验证码通过");
				$scope.addUserEmail();
			} else if (data.code == -1) {
				alert(data.message);
			}
		})
	}

}