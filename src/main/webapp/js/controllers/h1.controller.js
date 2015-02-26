'user strict';

//系统设置模块
var h1Module = angular.module("h1Module",[]);

var h1Controller = function ($scope, $http, LoginService) {

};

h1Module.$inject = ['$scope', '$http', '$cookieStore'];
h1Module.controller("h1Controller", h1Controller);

