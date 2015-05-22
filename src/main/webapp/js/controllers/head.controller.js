'user strict';

//系统设置模块
var headModule = angular.module("headModule",['headRouteModule']);

var headController = function ($scope,LoginService) {
	$scope.shopcount=LoginService.shopcount;
	$scope.searchShop=function(){
		window.location.href = '#/shop';
	};
};
var lowstocksController = function ($scope) {
	$scope.$emit('topTitle',"华尔街金融平台-库存不足");
};
var lowstocksController = function ($scope) {
	$scope.$emit('topTitle',"华尔街金融平台-库存不足");
};
var userdownController = function ($scope) {
	$scope.$emit('topTitle',"华尔街金融平台-app下载");
};
var leftController = function ($scope) {
	//左侧样式调整
	$("#left_common li").unbind("click").bind("click", function(){
		$(this).children('a').addClass("hover");
		$(this).siblings().children('a').removeClass("hover");
		if (!$(this).hasClass("second") ){ //判断是否有子节点
			if ( !$(this).parents().hasClass("second") ){
				$(".second").children('ol').children('li').children('a').removeClass("hover");
			}
		}
   });
	
	/*------用户后台导航菜单--------*/
	$("li.second > a:nth-child(1)").click(function(){
		$(this).parent().find("ol").toggle();
		if(!$(this).parent().find("ol").is(":visible")){
			$(this).find("i").removeClass("on").addClass("off");
		}else{
			$(this).find("i").removeClass("off").addClass("on");
		}
	});
};

headController.$inject = ['$scope','LoginService'];
headModule.controller("headController", headController);

