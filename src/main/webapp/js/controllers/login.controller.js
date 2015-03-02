'use strict';

//主页面路由模块，用于控制主页面的菜单导航(注入了登陆服务LoginService)
var loginModule = angular.module("loginModule", [ 'loginServiceModule',
		'loginrouteModule', 'ngRoute' ]);

var loginController = function($scope, $location, $http, LoginService) {
	var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	$('#login').hide();
	$('#index').show();
	$('#findPassOne').hide();
	$('#findPassTwo').hide();
	$scope.RememberPass = false;
	$scope.HtmlCss = 'style/login.css';
	$scope.username = "";
	$scope.password = "";
	$scope.codeNumber = "";
	$scope.code = "";
	$scope.jsons = {
		username : $scope.username,
		password : $scope.password
	};
	
	
	
	$scope.login = function() {
		LoginService.login($scope);
	};

	//图片验证码
	$scope.reGetRandCodeImg = function() {
		$(".loginRandCodeImg").attr("src",
				"api/user/getRandCodeImg?id=" + Math.random());
	};
	//找回密码
	$scope.findPass = function() {
		$('#login').hide();
		$('#findPassOne').show();
		$scope.reGetRandCodeImg();
		$scope.dynamicLoadingCss("style/retrieve.css");
	};
	$scope.reGetRandCodeImg();
	
	//找回密码第一步
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
						//下一步
						if (myreg.test($scope.username)) {
							//向邮箱发送密码重置邮件！
							$http.post("api/user/sendEmailVerificationCode"
							).success(function(data) {
								if(data.code == 1){
									alert("重置邮件发送成功！");
									$('#findPassOne').hide();
									$('#findPassTwo').show();
									$("#ulPhone").hide();
									$("#updown").hide();
								}else{
									alert("重置密码邮件发送失败！");
								}
								
							})
						} else {
							$http.post("api/user/sendPhoneVerificationCodeFind", {
								codeNumber : $scope.username,
							}).success(function(data) {
								if(data.code == 1){
									alert(data.result);
									$scope.code = data.result;
									$('#findPassOne').hide();
									$('#findPassTwo').show();
								}else{
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
	
	//找回密码第三步
	$scope.findPassThree = function(){
		$http.post("api/user/webFicationCode", {
			code : $scope.code
		}).success(function(data) {
			if(data.code == 1){
				$('#findPassTwo').hide();
				$('#findPassThree').show();
			}else if(data.code == -1){
				alert(data.message);
			}
			
		})
	}
	
	//动态加载css样式
	$scope.dynamicLoadingCss = function(path){
		if(!path || path.length == 0){
			throw new Error('argument "path" is required !');
		}
		var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.href = path;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        head.appendChild(link);
    };
    
    $scope.dynamicLoadingCss("style/login.css");
}