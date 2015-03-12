'use strict';

// 主页面路由模块，用于控制主页面的菜单导航(注入了登陆服务LoginService)
var routeModule = angular.module("routeModule", [ 'loginServiceModule', 'ngRoute' ]);

// 路由器的具体分发
function routeConfig($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : 'views/index/mainindex.html'
	}).when('/login', {
		templateUrl : 'views/index/login.html'
	}).when('/register', {
		templateUrl : 'views/index/register.html'
	}).when('/findpass', {
		templateUrl : 'views/index/findpass.html'
	}).when('/order', {
		templateUrl : 'views/order/order.html'
	}).when('/orderinfo', {
		templateUrl : 'views/order/orderinfo.html'
	}).when('/shop', {
		templateUrl : 'views/shop/shop.html'
	}).when('/shopinfo', {
		templateUrl : 'views/shop/shopinfo.html'
	}).when('/shopcart', {
		templateUrl : 'views/shop/shopcart.html'
	}).when('/cartmakeorder', {
		templateUrl : 'views/shop/cartmakeorder.html'
	}).when('/shopmakeorder', {
		templateUrl : 'views/shop/shopmakeorder.html'
	}).when('/leasemakeorder', {
		templateUrl : 'views/shop/leasemakeorder.html'
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
	}).when('/traderecord1', {
		templateUrl : 'views/traderecord/traderecord1.html'
	}).when('/traderecord2', {
		templateUrl : 'views/traderecord/traderecord2.html'
	}).when('/traderecord3', {
		templateUrl : 'views/traderecord/traderecord3.html'
	}).when('/traderecord4', {
		templateUrl : 'views/traderecord/traderecord4.html'
	}).when('/traderecord5', {
		templateUrl : 'views/traderecord/traderecord5.html'
	}).when('/traderecord1One', {
		templateUrl : 'views/traderecord/traderecord1One.html'
	}).when('/traderecord2One', {
		templateUrl : 'views/traderecord/traderecord2One.html'
	}).when('/traderecord3One', {
		templateUrl : 'views/traderecord/traderecord3One.html'
	}).when('/traderecord4One', {
		templateUrl : 'views/traderecord/traderecord4One.html'
	}).when('/traderecord5One', {
		templateUrl : 'views/traderecord/traderecord5One.html'
	}).when('/merchantList', {
		templateUrl : 'views/merchant/merchantList.html'
	}).when('/merchantAdd', {
		templateUrl : 'views/merchant/merchantAdd.html'
	}).when('/merchantUpdate', {
		templateUrl : 'views/merchant/merchantUpdate.html'
	}).when('/merchantOne', {
		templateUrl : 'views/merchant/merchantOne.html'
	}).when('/cs_cencel', {
		templateUrl : 'views/cs/cencel.html'
	}).when('/cs_cencelinfo', {
		templateUrl : 'views/cs/cencelinfo.html'
	}).when('/cs_change', {
		templateUrl : 'views/cs/change.html'
	}).when('/cs_changeinfo', {
		templateUrl : 'views/cs/changeinfo.html'
	}).when('/cs_lease', {
		templateUrl : 'views/cs/lease.html'
	}).when('/cs_leaseinfo', {
		templateUrl : 'views/cs/leaseinfo.html'
	}).when('/cs_repair', {
		templateUrl : 'views/cs/repair.html'
	}).when('/cs_repairinfo', {
		templateUrl : 'views/cs/repairinfo.html'
	}).when('/cs_return', {
		templateUrl : 'views/cs/return.html'
	}).when('/cs_returninfo', {
		templateUrl : 'views/cs/returninfo.html'
	}).when('/cs_update', {
		templateUrl : 'views/cs/update.html'
	}).when('/cs_updateinfo', {
		templateUrl : 'views/cs/updateinfo.html'
	}).when('/terminal', {
		templateUrl : 'views/terminals/terminalsList.html'
	}).when('/terminalDetail', {
		templateUrl : 'views/terminals/terminalDetail.html'
	}).when('/terminalToUpdate', {
		templateUrl : 'views/terminals/terminalToUpdate.html'
	}).when('/terminalOpening', {
		templateUrl : 'views/terminals/terminalOpening.html'
	}).when('/terminalCancellation', {
		templateUrl : 'views/terminals/terminalCancellation.html'
	}).when('/terminalRentalReturn', {
		templateUrl : 'views/terminals/terminalRentalReturn.html'
	}).when('/terminalRepair', {
		templateUrl : 'views/terminals/terminalRepair.html'
	}).when('/terminalExchangeGoods', {
		templateUrl : 'views/terminals/terminalExchangeGoods.html'
	}).when('/terminalReturnGood', {
		templateUrl : 'views/terminals/terminalReturnGood.html'
	}).when('/message', {
		templateUrl : 'views/message/message.html'
	}).when('/messageinfo', {
		templateUrl : 'views/message/messageinfo.html'
	}).when('/lowstocks', {
		templateUrl : 'views/shop/lowstocks.html'
	}).when('/pay', {
		templateUrl : 'views/shop/pay.html'
	}).when('/myapp', {
		templateUrl : 'views/myapp.html'
	}).when('/webmessageinfo', {
		templateUrl : 'views/message/webmessageinfo.html'
	}).otherwise({
		redirectTo : "/"
	});
};
routeModule.$inject = [ 'LoginService' ];
routeModule.config(routeConfig);