'user strict';

//系统设置模块
var h2Module = angular.module("h2Module",[]);

var h2Controller = function ($scope, $http, LoginService) {
	
};



h2Module.$inject = ['$scope', '$http', '$cookieStore'];
h2Module.controller("h2Controller", h2Controller);
