'use strict';

// 登陆服务模块
var loginServiceModule = angular.module("loginServiceModule", []);

var loginService = function($http, $rootScope, $cookieStore) {
	return {
		// 定义当前用户是否被授权
		// isAuthorized: typeof($cookieStore.get("loginInfo")) == 'undefined' ? false : true,
		isAuthorized : true,
		// 当前登陆的用户名
		loginUserName : typeof ($cookieStore.get("loginUserName")) == 'undefined' ? "" : $cookieStore.get("loginUserName"),
		userid : typeof ($cookieStore.get("loginUserId")) == 'undefined' ? 0 : $cookieStore.get("loginUserId"),
		city : typeof ($cookieStore.get("city_id")) == 'undefined' ? 0 : $cookieStore.get("city_id"),
		cityName : typeof ($cookieStore.get("cityName")) == 'undefined' ? "" : $cookieStore.get("cityName"),
		subusername : typeof ($cookieStore.get("subusername")) == 'undefined' ? 0 : $cookieStore.get("subusername"),
		goods : [],
		tradeTypeId : 0,
		// 用户登陆功能
		login : function($scope, $http) {
			$http.post("api/user/sizeUpImgCode", {
				imgnum : $scope.code
			}).success(function(data) {
				if (data.code == -1) {
					$scope.codeClass = true;
					alert("验证码错误")
					$scope.reGetRandCodeImg();
				} else {
					$http.post("api/user/studentWebLogin", {
						username : $scope.username,
						password : $scope.password1
					}).success(function(data) { // 绑定
						if (data.code == -1) {// 用户或者密码错误！
							/* $scope.nameMessage = data.message; */
							/* $scope.unameClass = true; */
							alert("用户或者密码错误！");
						} else {
							$scope.nameMessag = "";
							$scope.code = "";
							// 记住密码
							if ($scope.RememberPass == true) {
								setCookie("userPass", $scope.password1);
								setCookie("userName", $scope.username);
							} else {
								delCookie("userPass");
								delCookie("userName");
							}
							$cookieStore.put("loginUserName", data.result.username);
							$cookieStore.put("loginUserId", data.result.id);
							$cookieStore.put("subusername", data.result.subusername);
							$cookieStore.put("cityName", data.result.cityName);
							$cookieStore.put("city_name",data.result.cityName)
							// 更新购物车
							var shopcart2x = [];
							shopcart2x = typeof ($cookieStore.get("shopcart")) == 'undefined' ? [] : $cookieStore.get("shopcart");
							if (shopcart2x.length > 0) {
								$http.post("api/cart/bigupdate", {
									cart : shopcart2x,
									customerId:data.result.id
								}).success(function(data) {
									if(data.code==1){
										$cookieStore.put("shopcart",[]);
										location.reload();
									}else{
										location.reload();
									}
								});
							}else{
								location.reload();
							}
							
						}
					}).error(function(data) {
						alert("登陆异常！");
						/* $scope.message = "登陆异常！" */
					});
				}
			}).error(function(data) {
				alert("获取验证码失败！");
				/* $scope.message = "获取验证码失败！" */
			});
		},
		// 用户登出功能
		logout : function() {
			$cookieStore.remove("loginInfo");
			$cookieStore.remove("loginUserName");
			$cookieStore.remove("loginSmsPauseFlag");
			$cookieStore.remove("shopLogo");
			$cookieStore.remove("shopName");
			$cookieStore.remove("userCoverPicCD");
			this.isAuthorized = false;
			$("#loginModal").modal({
				keyboard : false,
				backdrop : 'static'
			}); // 登出之后，则显示登陆界面，并隐藏主页面
			$("#resetPwd-success-msg").hide();
			$("#indexDiv").hide();
		},

		// 创建订单传值
		tomakeorder : function(val) {
			var self = this;
			self.goods = val;
		},

		// 隐藏所有
		hideAll : function() {
			$('#login').hide();
			$('#findPassOne').hide();
			$('#findPassTwo').hide();
			$('#findPassThree').hide();
			$('#retrieveHtml').hide();
			$('#emailRetrieveHtml').hide();
			$('#maintop').hide();
			$('#maintopTwo').hide();
			$('#headClear').hide();
			$('#shopmain').hide();
			$('#mainuser').hide();
			$('#mainindex').hide();
		},

		// 检验当前是否为已登录状态，或Cookie中仍存在登陆记录
		checkAuthorization : function() {
			var self = this;
			// 必须从Cookie中校验(Cookie)
			this.isAuthorized = typeof ($cookieStore.get("loginInfo")) == 'undefined' ? false : true,
			// 根据是否已登录，设置登陆窗口和主页面的显示与否
			$("#loginModal").modal(this.isAuthorized == true ? 'hide' : {
				keyboard : false,
				backdrop : 'static'
			});
			if (this.isAuthorized == true) {
				self.mobile = $cookieStore.get("loginInfo");
				self.fullName = $cookieStore.get("loginUserName");
				// self.loginSmsPauseFlag = $cookieStore.get("loginSmsPauseFlag");
				self.shopLogo = $cookieStore.get("shopLogo");
				// self.shopName = $cookieStore.get("shopName");
				// self.userCoverPicCD = $cookieStore.get("userCoverPicCD");
				$("#indexDiv").show();
			} else {
				$("#indexDiv").hide();
			}
		}
	};
};

// 写cookies
function setCookie(name, value) {
	var Days = 30;
	var exp = new Date();
	exp.setTime(exp.getTime() + 30 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

// 删除cookies
function delCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if (cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

loginServiceModule.$inject = [ '$http', '$rootScope', '$cookieStore' ];
loginServiceModule.service("LoginService", loginService);