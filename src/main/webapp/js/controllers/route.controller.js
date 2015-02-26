'use strict';

//主页面路由模块，用于控制主页面的菜单导航(注入了登陆服务LoginService)
var routeModule = angular.module("routeModule", ['loginServiceModule',  'ngRoute']);

//路由器的具体分发
function routeConfig($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'views/h1.html'
        }).when('/h1', {
            templateUrl: 'views/h1.html'
        }).when('/h2', {
            templateUrl: 'views/h2.html'
        }).when('/h3', {
            templateUrl: 'views/h3.html'
        }).otherwise({
            redirectTo: "/"
        });
};
routeModule.$inject = ['LoginService'];
routeModule.config(routeConfig);