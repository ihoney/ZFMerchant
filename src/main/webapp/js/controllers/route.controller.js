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
        }).when('/shop', {
            templateUrl: 'views/shop/shop.html'
        }).when('/shopinfo', {
            templateUrl: 'views/shop/shopinfo.html'
        }).when('/shopcart', {
            templateUrl: 'views/shop/shopcart.html'
        }).when('/cartmakeorder', {
            templateUrl: 'views/shop/cartmakeorder.html'
        }).when('/shopmakeorder', {
            templateUrl: 'views/shop/shopmakeorder.html'
        }).when('/leasemakeorder', {
            templateUrl: 'views/shop/leasemakeorder.html'
        }).when('/findPass', {
    		templateUrl : 'views/login/findPassOne.html'
    	}).when('/findPassTwo', {
    		templateUrl : 'views/login/findPassTwo.html'
    	}).when('/myinfobase', {
    		templateUrl : 'views/customer/myinfobase.html'
    	}).when('/myinfoupdatepassword', {
    		templateUrl : 'views/customer/myinfoupdatepassword.html'
    	}).when('/myinfoAddresses', {
    		templateUrl : 'views/customer/myinfoAddresses.html'
    	}).when('/myinfointegral', {
    		templateUrl : 'views/customer/myinfointegral.html'
    	 }).when('/cs_cencel', {
         	templateUrl: 'views/cs/cencel.html'
         }).when('/cs_cencelinfo', {
         	templateUrl: 'views/cs/cencelinfo.html'
         }).when('/cs_change', {
         	templateUrl: 'views/cs/change.html'
         }).when('/cs_changeinfo', {
         	templateUrl: 'views/cs/changeinfo.html'
         }).when('/cs_lease', {
         	templateUrl: 'views/cs/lease.html'
         }).when('/cs_leaseinfo', {
         	templateUrl: 'views/cs/leaseinfo.html'
         }).when('/cs_repair', {
         	templateUrl: 'views/cs/repair.html'
         }).when('/cs_repairinfo', {
         	templateUrl: 'views/cs/repairinfo.html'
         }).when('/cs_return', {
         	templateUrl: 'views/cs/return.html'
         }).when('/cs_returninfo', {
         	templateUrl: 'views/cs/returninfo.html'
         }).when('/cs_update', {
         	templateUrl: 'views/cs/update.html'
         }).when('/cs_updateinfo', {
         	templateUrl: 'views/cs/updateinfo.html'
    	}).when('/terminal', {
            templateUrl: 'views/terminals/terminalsList.html'
        }).when('/terminalDetail', {
            templateUrl: 'views/terminals/terminalDetail.html'
        }).when('/terminalToUpdate', {
            templateUrl: 'views/terminals/terminalToUpdate.html'
        }).when('/terminalOpening', {
            templateUrl: 'views/terminals/terminalOpening.html'
        }).when('/terminalCancellation', {
            templateUrl: 'views/terminals/terminalCancellation.html'
        }).when('/terminalRentalReturn', {
            templateUrl: 'views/terminals/terminalRentalReturn.html'
        }).when('/terminalRepair', {
            templateUrl: 'views/terminals/terminalRepair.html'
        }).when('/terminalExchangeGoods', {
            templateUrl: 'views/terminals/terminalExchangeGoods.html'
        }).when('/terminalReturnGood', {
            templateUrl: 'views/terminals/terminalReturnGood.html'
        }).when('/message', {
            templateUrl: 'views/message/message.html'
        }).when('/messageinfo', {
            templateUrl: 'views/message/messageinfo.html'
        }).otherwise({
            redirectTo: "/"
        });
};
routeModule.$inject = [ 'LoginService' ];
routeModule.config(routeConfig);