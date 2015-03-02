'use strict';

//主页面路由模块，用于控制主页面的菜单导航(注入了登陆服务LoginService)
var loginModule = angular.module("loginModule", ['loginServiceModule','loginrouteModule',  'ngRoute']);

var loginController = function ($scope,$location, $http, LoginService) {
	 $('#login').show();
	 $('#index').show();
	 $scope.RememberPass=false;
	 $scope.username = "";
	 $scope.password = "";
	 $scope.code = "";
	 $scope.jsons = {username:$scope.username,password:$scope.password};
	 $scope.login = function(){
		 alert("66");
		 LoginService.login();
		 
	 };
	 //图片验证码
	 $scope.reGetRandCodeImg = function(){
		 $("#loginRandCodeImg").attr("src", "api/user/getRandCodeImg?id=" + Math.random());
	 };
}