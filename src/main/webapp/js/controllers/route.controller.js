'use strict';

// 主页面路由模块，用于控制主页面的菜单导航(注入了登陆服务LoginService)
var routeModule = angular.module("routeModule", [ 'loginServiceModule', 'ngRoute' ]);

// 路由器的具体分发
function routeConfig($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'views/h1.html'
        }).when('/h1', {
            templateUrl: 'views/h1.html'
        }).when('/order', {
            templateUrl: 'views/order/order.html'
        }).when('/orderinfo', {
        	templateUrl: 'views/order/orderinfo.html'
        }).when('/cs_update', {
        	templateUrl: 'views/cs/update.html'
        }).when('/cs_updateinfo', {
        	templateUrl: 'views/cs/updateinfo.html'
        }).when('/h3', {
            templateUrl: 'views/h3.html'
        }).when('/shop', {
            templateUrl: 'views/shop/shop.html'
        }).when('/shopinfo', {
            templateUrl: 'views/shop/shopinfo.html'
        }).when('/shopcart', {
            templateUrl: 'views/shop/shopcart.html'
        }).when('/tomakeorder', {
            templateUrl: 'views/shop/tomakeorder.html'
        }).when('/findPass', {
    		templateUrl : 'views/login/findPassOne.html'
    	}).when('/findPassTwo', {
    		templateUrl : 'views/login/findPassTwo.html'
    	}).when('/myinfobase', {
    		templateUrl : 'views/customer/myinfobase.html'
    	}).otherwise({
            redirectTo: "/"
        });
};
routeModule.$inject = [ 'LoginService' ];
routeModule.config(routeConfig);