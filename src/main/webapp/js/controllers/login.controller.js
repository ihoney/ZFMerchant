'use strict';

//主页面路由模块，用于控制主页面的菜单导航(注入了登陆服务LoginService)
var loginModule = angular.module("loginModule", ['loginServiceModule','loginrouteModule',  'ngRoute']);

var loginController = function ($scope,$location, $http, LoginService) {
	var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	 $('#login').show();
	 $('#index').show();
	 $('#findPassOne').hide();
	 $('#findPassTwo').hide();
	 $scope.RememberPass=false;
	 $scope.username = "";
	 $scope.password = "";
	 $scope.code = "";
	 $scope.jsons = {username:$scope.username,password:$scope.password};
	 $scope.login = function(){
		 LoginService.login($scope);
	 };
	 
	//图片验证码
	 $scope.reGetRandCodeImg = function(){
		 $(".loginRandCodeImg").attr("src", "api/user/getRandCodeImg?id=" + Math.random());
	 };
	 //找回密码
	 $scope.findPass = function(){
		 $('#login').hide();
		 $('#findPassOne').show();
		 $scope.reGetRandCodeImg();
	 };
	 $scope.reGetRandCodeImg();
	 //找回密码第一步
	 $scope.findPassOnes = function () {
   		 $http.post("api/user/getFindUser", {username:$scope.username}).success(function(data){
   			 if(data.code == -1){
   				 alert(data.message);
   			 }else{
   				 $http.post("api/user/sizeUpImgCode", {imgnum:$scope.code}).success(function(data){
   					if(data.code == -1){
   	   				alert(data.message);
   	   			 }else{
   	   			 //下一步
   	   			
   	   	  if(myreg.test($scope.username))
   	   	  {
   	   		  $("#ulPhone").hide();
   	   		  $("#updown").hide();
   	   	   alert('提示\n\n请输入有效的E_mail！');
   	   	  }else{
   	   	$("#emailtext").show();
   	   	  }
   	   				$('#findPassOne').hide();
   	   				$('#findPassTwo').show();
   	   			 }
   				 })
   			 }
   		 })
	 }
}