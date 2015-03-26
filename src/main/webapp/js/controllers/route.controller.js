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
	}).when('/registerAgent', {
		templateUrl : 'views/index/registerAgent.html'
	}).when('/findpass', {
		templateUrl : 'views/index/findpass.html'
	}).when('/userdown', {
		templateUrl : 'views/index/userdown.html'
	}).when('/findpassEmail', {
		templateUrl : 'views/index/findpassEmail.html'
	}).when('/registerEmail', {
		templateUrl : 'views/index/registerEmail.html'
	}).when('/order', {
		templateUrl : 'views/order/order.html'
	}).when('/orderinfo', {
		templateUrl : 'views/order/orderinfo.html'
	}).when('/ordermark', {
		templateUrl : 'views/order/ordermark.html'
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
	}).when('/traderecord', {
		templateUrl : 'views/traderecord/traderecord.html' 
	}).when('/tradeinfo', {
		templateUrl : 'views/traderecord/tradeinfo.html'
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
	}).when('/repair_pay', {
		templateUrl : 'views/cs/repair_pay.html'
	}).when('/email_up', {
		templateUrl : 'views/customer/up_email.html'
	}).when('/order_appraise', {
		templateUrl : 'views/order/order_appraise.html'
	}).otherwise({
		redirectTo : "/"
	});
};
routeModule.$inject = [ 'LoginService' ];
routeModule.config(routeConfig);