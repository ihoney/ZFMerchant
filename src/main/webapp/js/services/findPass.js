'use strict';

//登陆服务模块
var findPassOneServiceModule = angular.module("findPassOneServiceModule", []);

//登陆服务
var findPassService = function ($scope,$http){
	var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	$scope.username = "";
	$scope.hidenum = "";
	$scope.getUser = function(){
		$http.post("api/user/getFindUser",{username:$scope.username}).success(function(data){
			//下一步
			window.location.href="findPassTwo.html";
		}).error(function(data){
			//账号不存在
			alert(data.code);
		});
	};
}

loginServiceModule.$inject = ['$http', '$rootScope', '$cookieStore'];
loginServiceModule.service("findPassService", findPassService);