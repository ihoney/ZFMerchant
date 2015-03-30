'user strict';

// 积分管理
var myinfointegralModule = angular.module("myinfointegralModule", []);
var myinfointegralController = function($scope, $http, LoginService) {
	initSystemPage($scope);// 初始化分页参数
	$scope.list = function() {
		var query = LoginService.userid + "/" + $scope.indexPage + "/" + $scope.rows;
		$http.post("api/customers/getIntegralList/" + query).success(function(data) {
			if (data.code == 1) {
				$scope.integralList = data.result.list;
				calcSystemPage($scope, data.result.total);// 计算分页
			} else {
				alert(data.message);
			}
		}).error(function(data) {

		});
	};
	$scope.getIntegralTotal = function() {
		var customerId = LoginService.userid;
		$scope.req = {
			customer_id : customerId
		};
		$http.post("api/customers/getjifen" , $scope.req).success(function(data) {
//			$http.post("api/customers/getIntegralTotal/" + customer_id).success(function(data) {
			if (data.code == 1) {
				$scope.integralTotal = data.result;
				$scope.total_jifen = $scope.integralTotal.dh_total;
			} else {
				// 提示错误信息
				alert(data.message);
			}
		}).error(function(data) {

		});
	};
	$scope.openinsertIntegralConvert = function() {
		$scope.integral = {};
		popup(".creditsExchange_tab", ".ce_aaa");// 兑换积分
	};
	$scope.save = function() {
		var p = $scope.integral.price;
		var name = $scope.integral.name;
		var phone = $scope.integral.phone;
		
		  var reg = new RegExp("^[0-9]*\.[0-9]{0,1}$");
		  if(!reg.test(p)){
			 $scope.integral.price = "";
			 alert("兑换金额不正确");
			 return false;
		  } 
		if (typeof(p) == "undefined" || p=="") { 
			alert("没有填写兑换积分");
			return false;
		}  
		if(p >$scope.total_jifen){
			alert("兑换不能超过可兑换的最高金额");
			return false;
		}
		if (typeof(name) == "undefined" || name=="") { 
			alert("没有填写姓名");
			return false;
		}  
		if (typeof(phone) == "undefined" || phone=="") { 
			alert("没有填写电话");
			return false;
		}  else{
			  if(!reg.test(phone)){
				  alert("电话必须是数字");
			  }
		}
	
		if ($scope.integral.id == undefined) {
			$scope.integral.customerId = LoginService.userid;
			$http.post("api/customers/insertIntegralConvert", $scope.integral).success(function(data) {
				if (data.code == 1) {
					$(".close").click();
				} else {
					alert(data.message);
				}
			}).error(function(data) {

			});
		}
	};
	$scope.init = function() {

		// 判断是否已登录
		if (LoginService.userid == 0) {
			window.location.href = '#/login';
		} else {
			$scope.$emit('changeshow', false);
		}

		$scope.list();
		$scope.getIntegralTotal();
	};
	$scope.init();

	// 上一页
	$scope.prev = function() {
		if ($scope.indexPage > 1) {
			$scope.indexPage--;
			$scope.list();
		}
	};

	// 当前页
	$scope.loadPage = function(currentPage) {
		$scope.indexPage = currentPage;
		$scope.list();
	};

	// 下一页
	$scope.next = function() {
		if ($scope.indexPage < $scope.totalPage) {
			$scope.indexPage++;
			$scope.list();
		}
	};

	// 跳转到XX页
	$scope.getPage = function() {
		$scope.indexPage = Math.ceil($scope.gotoPage);
		$scope.list();
	};
};
myinfointegralModule.controller("myinfointegralController", myinfointegralController);