'use strict';

var indexController = function($scope, $location, $http, LoginService, $cookieStore) {
	$scope.loginUserName = LoginService.loginUserName;
	$scope.city_name = $cookieStore.get("city_name") == null ? "上海市" : $cookieStore.get("city_name");
	$scope.ngshow = true;
	$scope.ngshow2 = false;
	$scope.shopcart1 = true;
	$scope.shopcart2 = true;
	$scope.shopcount = 0;
	$scope.shopcartcount = function() {
		if (LoginService.userid > 0) {
			$http.post("api/cart/total", {
				customerId : LoginService.userid
			}).success(function(data) { // 绑定
				if (data.code == 1) {
					$scope.shopcount = data.result;
				}
			});
		}
	};
	$scope.$on('$locationChangeStart', function(scope, next, current) {
		$(".foot").show();
		var strs = new Array(); // 定义一数组
		strs = next.split("/#/"); // 字符分割
		if (LoginService.userid == 0) {
			$scope.loginshow = false;
			$scope.ngshow = true;
			$scope.ngshow2 = false;
		} else {
			$scope.loginshow = true;
			if (strs.length == 2) {
				strs = strs[1].split("?");
				if (strs[0] == 'login') {
					if (LoginService.userid > 0) {
						window.location.href = '#/';
					}
				}
				if (check(strs[0])) {
					$scope.ngshow = false;
					$scope.ngshow2 = true;
				} else {
					$scope.ngshow = true;
					$scope.ngshow2 = false;
				}
			} else {
				$scope.ngshow = true;
				$scope.ngshow2 = false;
			}
		}

		var strs2 = new Array(); // 定义一数组
		strs2 = next.split("/#/"); // 字符分割
		if (strs2.length == 2) {
			strs2 = strs2[1].split("?");
			if (checkcart1(strs2[0])) {
				$scope.shopcart1 = false;
			} else {
				$scope.shopcart1 = true;
			}
			if (checkcart2(strs2[0])) {
				$scope.shopcart2 = false;
			} else {
				$scope.shopcart2 = true;
			}
		} else {
			$scope.shopcart1 = true;
			$scope.shopcart2 = true;
		}

		// $scope.searchview=true;
	});

	var check = function(str) {
		var arry = [ "myapp", "webmessageinfo", "order", "orderinfo", "merchantAdd", "terminalRepair", "terminalExchangeGoods", "terminalToUpdate", "terminalCancellation",
				"terminalReturnGood", "terminal", "terminalOpening", "terminalDetail", "cs_cencel", "cs_return", "cs_change", "cs_repair", "cs_update", "cs_lease", "cs_cencelinfo",
				"cs_returninfo", "cs_changeinfo", "cs_repairinfo", "cs_updateinfo", "cs_leaseinfo", "traderecord", "tradeinfo", "terminalRentalReturn", "myinfobase", "myinfoupdatepassword",
				"myinfoAddresses", "myinfointegral", "merchantList", "merchantOne", "merchantUpdate", "message", "messageinfo" ];
		for (var i = 0; i < arry.length; i++) {
			if (str == arry[i]) {
				return true;
			}
		}
		return false;
	}
	var checkcart1 = function(str) {
		var arry = [ "login", "shop", "register", "findpass" ,"findpassEmail"];
		for (var i = 0; i < arry.length; i++) {
			if (str == arry[i]) {
				return true;
			}
		}
		return false;
	}
	var checkcart2 = function(str) {
		var arry = [ "shopcart", "cartmakeorder", "shopmakeorder", "leasemakeorder", "lowstocks", "pay" ];
		for (var i = 0; i < arry.length; i++) {
			if (str == arry[i]) {
				return true;
			}
		}
		return false;
	}

	// 退出页面(清除$cookieStore)
	$scope.escLogin = function() {
		$cookieStore.put("loginUserName", null);
		$cookieStore.put("loginUserId", 0);
		$scope.password1 = "";
		$scope.code = "";
		location.reload();
		window.location.href = '#/';

	}

	$scope.shopcount = 0;
	$scope.$on('shopcartcountchange', function() {
		$scope.shopcartcount();
	});
	$scope.shopcartcount = function() {
		if (LoginService.userid > 0) {
			$http.post("api/cart/total", {
				customerId : LoginService.userid
			}).success(function(data) { // 绑定
				if (data.code == 1) {
					$scope.shopcount = data.result;
				}
			});
		}
	};
	$scope.shopcartcount();

	// $scope.$on('changeshow', function(d,data) {
	// $scope.ngshow=data;
	// });
	$scope.$on('changesearchview', function(d, data) {
		$scope.searchview = data;
	});

	$scope.index = function() {
		window.location.href = '#/';
	};

};

var headerController = function($scope, $location, $http, LoginService, $cookieStore) {
	$scope.loginUserName = LoginService.subusername;
	$scope.city_name = $cookieStore.get("city_name") == null ? "上海市" : $cookieStore.get("city_name");

	$scope.index = function() {
		window.location.href = '#/';
	};

	$scope.city_list = function() {
		$http.post("api/index/getCity").success(function(data) {
			if (data != null && data != undefined) {
				$scope.city_list = data.result;
			}
		});
	};

	$scope.submit_city = function() {
		$cookieStore.put("city_name", $scope.selected_city.name);
		$cookieStore.put("city_id", $scope.selected_city.id);
		LoginService.city = $scope.selected_city.id;
		$scope.city_name = $scope.selected_city.name;
	};

	// 跳转代理商登陆页面
	$scope.gotoagentlogin = function() {
		$http.post("api/user/goToAgentLogin").success(function(data) {
			if (data.code == 1) {
				window.location.href = data.result;
			}
			if (data.code == -1) {
				alert("链接失败！");
			}
		});
	};
	$scope.gotoagentlogin1 = function() {
		$http.post("api/user/goToAgentLogin1").success(function(data) {
			if (data.code == 1) {
				window.location.href = data.result;
			}
			if (data.code == -1) {
				alert("链接失败！");
			}
		});
	};

	$scope.city_list();
};

var searchController = function($scope, LoginService) {
	$scope.searchShop = function() {
		LoginService.keys = $scope.haha;
		window.location.href = '#/shop';
	};
	$scope.hotwords = function(xx) {
		LoginService.keys = xx;
		window.location.href = '#/shop';
	};

};

var loginController = function($scope, $location, $http, LoginService) {

	$scope.codeClass= false;
	$scope.RememberPass = false;
	// 登陆
	$scope.login = function() {
		$scope.unameClass = false;
		$scope.passClass = false;
		$scope.codeClass= false;
		if ($scope.username == undefined||$.trim($scope.username) == ''  ) {
			$scope.unameClass = true;
			$scope.nameMessage="请输入用户名";
		} else if ($scope.password1 == undefined||$.trim($scope.password1) == ''  ) {
			$scope.passClass = true;
			$scope.passMessage="请输入密码";
		} else if ($scope.code == undefined||$.trim($scope.code) == ''  ) {
			$scope.codeClass = true;
			$scope.passMessage="请输入验证码";
		}else {
			LoginService.login($scope, $http);
		}
	};

	var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	$scope.loginUserName = LoginService.loginUserName;
	// 勾选协议
	$scope.ridel_xy = false;

	// 登陆页面文本框得到光标的时候失去错误提示信息
	$scope.RememberPass = false;

	$scope.password1 = "";
	$scope.password2 = "";
	$scope.codeNumber = "";
	$scope.code = "";// 图片验证

	$scope.jsons = {
		username : $scope.username,
		password : $scope.password
	};

	// 初始化图片验证码
	$scope.reGetRandCodeImg = function() {
		$("#pppcode").attr("src", "api/user/getRandCodeImg?id=" + Math.random());
	};

	// 删除错误提示消息
	$scope.deleteerror = function() {
		$scope.unameClass = false;
		$scope.nameMessage = null;
	}
	$scope.deleteerrord = function() {
		$scope.unameClass = false;
		$scope.passClass = false;
		$scope.nameMessage = null;
	}

	// 跳转代理商登陆页面
	$scope.gotoagentlogin = function() {
		$http.post("api/user/goToAgentLogin").success(function(data) {
			if (data.code == 1) {
				window.location.href = data.result;
			}
			if (data.code == -1) {
				alert("链接失败！");
			}
		});
	};

	// cooke初始化
	$scope.cookeStark = function() {
		if (getCookie("userName") != undefined)
			$scope.username = getCookie("userName");
		if (getCookie("userPass") != undefined)
			$scope.password1 = getCookie("userPass");
	}

	$scope.reGetRandCodeImg();
	$scope.cookeStark();
};

// 读取cookies
function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}

var registerController = function($scope, $location, $http, LoginService) {
	$scope.usernameLocal = $location.search()['sendusername'];
	$scope.sendStatus = Math.ceil($location.search()['sendStatus']);
	// 检验邮箱格式
	var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	// 手机格式
	var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
	// 发送邮件倒计时
	window.clearInterval(window.one);
	// 发送手机验证码倒计时
	window.clearInterval(window.two);
	//手机错误提示消息
	$scope.phoneerroe = false;
	//密码不一致
	$scope.passIsOn = false;
	//手机验证码校验
	$scope.phoneCode = false;
	//累计发送短信
	$scope.sendnumber = 0;
	//弹窗
	$scope.windowboolean = false;
	//图片校验
	$scope.imgisorboolean = false;
	// 邮箱激活链接判断
	if ($scope.sendStatus == -1) {
		clearInterval(window.one);
		$scope.show = false;
		$http.post("api/user/activationEmail", {
			username : $scope.usernameLocal
		}).success(function(data) {
			if (data.code == 1) {
				$scope.sendEmailShow = false;
				$scope.miao = 5;
				window.one = window.setInterval(function() {
					if ($scope.miao == 0) {
						$scope.sendStatus = null;
						$scope.usernameLocal = null;
						clearInterval(window.one);
						window.location.href = '#/login';
					} else {
						$(".winSkip").html("账号激活成功！<span>" + $scope.miao + "秒</span>后跳转至登录页！");
						$scope.miao--;
					}
				}, 1000);
			} else {
				alert("激活失败！");
			}
		})
	} else {
		// 手机邮箱注册显示
		$scope.show = true;
		// 发送邮件状态
		$scope.sendEmailShow = true;
	}

	// 勾选协议
	$scope.ridel_xy = true;
	// 邮箱注册显示状态
	$scope.successEmailShow = false;

	// 初始化图片验证码
	$scope.reGetRandCodeImg = function() {
		$(".loginRandCodeImg").attr("src", "api/user/getRandCodeImg?id=" + Math.random());
	};

	$scope.init = function() {
		// 移除样式
		// $("link[href='style/global.css']").remove();
		// 隐藏中间搜索
		$scope.$emit('changesearchview', false);
		// 获得省级
		$scope.getShengcit();
	};

	// 密码样式优化
	$scope.isnanpass = function() {
		if($scope.password1 == '' || $scope.password1 == null || $scope.password1 == undefined){
			$scope.inputclass = "input_false";
			return false;
		}else if ($scope.password1.length < 6 || $scope.password1.length > 20) {
			$scope.inputclass = "input_false";
			return false;
		} else {
			$scope.inputclass = "input_true";
			return true;
		}
	}
	$scope.isnanpassme = function() {
		if($scope.password2 == '' || $scope.password2 == null || $scope.password2 == undefined){
			$scope.inputclassme = "input_false";
			return false;
		}else if ($scope.password2.length < 6 || $scope.password2.length > 20) {
			$scope.inputclassme = "input_false";
			return false;
		}else if ($scope.password1 != $scope.password2) {
			$scope.inputclassme = "input_false";
			$scope.passIsOn = true;
			return false;
		}  else {
			$scope.inputclassme = "input_true";
			return true;
		}
	}

	// 跳转手机注册
	$scope.register = function() {
		$scope.emailname = null;
		$scope.name = null;
		$scope.password1 = null;
		$scope.password2 = null;
		$scope.codeBei = null;
		$scope.show = true;
		$scope.reGetRandCodeImg();
		// 发送邮件倒计时
		window.clearInterval(window.one);
		// 发送手机验证码倒计时
		window.clearInterval(window.two);
		$scope.intDiff = 120;
		$('#time_show').html("获取验证码！");
		$scope.registreTime = true;
		// 获得省级
		$scope.getShengcit();
	};

	// 跳转邮箱注册用户
	$scope.gotoEmailRetrieve = function() {
		$scope.rename = null;
		$scope.codeNumber = null;
		$scope.name = null;
		$scope.password1 = null;
		$scope.password2 = null;
		$scope.codeBei = null;
		$scope.show = false;
		$scope.sendEmailShow = true;
		$scope.successEmailShow = false;
		$scope.reGetRandCodeImg();
		// 发送邮件倒计时
		window.clearInterval(window.one);
		// 发送手机验证码倒计时
		window.clearInterval(window.two);
		$scope.intDiff = 120;
		$('#time_show').html("获取验证码！");
		$scope.registreTime = true;

	}
	// 获取验证码后动态显示倒计时
	$scope.registreTime = true;
	// 获取手机验证码
	$scope.getRegisterCode = function() {
		if($scope.rename == undefined || $scope.rename == ''){
			$scope.phoneInputFalse = true;
		}else if (!reg.test($scope.rename)) {
			$scope.phoneInputFalse = true;
			$scope.phoneerroe = true;
		} else if ($scope.registreTime == true) {
			window.clearInterval(window.two);
			$scope.registreTime = false;
			if($scope.sendnumber > 4){
				$scope.windowfind();
			}else {
				$scope.sendnumber = $scope.sendnumber+1;
				$http.post("api/user/sendPhoneVerificationCodeReg", {
					codeNumber : $scope.rename
				}).success(function(data) {
					if (data.code == 1) {
						$scope.code = data.result;
						setCookie("send_phone_code", $scope.code);
						$scope.intDiff = 119;
						$("#time_show").attr("style", "background-color:#AAAAAA");
						window.two = window.setInterval(function() {
							if ($scope.intDiff == 0) {
								$('#time_show').html("获取验证码！");
								$scope.registreTime = true;
								window.clearInterval(window.two);
								$("#time_show").attr("style", "background-color:#ff5f2b");
							} else {
								$('#time_show').html("重新发送（" + $scope.intDiff + "秒）");
								$scope.intDiff--;
							}
						}, 1000);
					} else {
						$scope.registreTime = true
						alert(data.message);
					}
				})
			}
			
		}
	};
	$scope.deleteShiId = function() {
		$scope.shiId = "";
	}
	// 手机校验图片验证码
	$scope.getImgCode = function() {
		if($scope.rename == undefined || $scope.rename ==''){
			$scope.phoneInputFalse = true;
		}else if (!reg.test($scope.rename)) {
			$scope.phoneInputFalse = true;
			$scope.phoneerroe = true;
		}else if ($scope.codeNumber == undefined || $scope.codeNumber == '') {
			$scope.codeInputFalse = true;
		}else if (getCookie("send_phone_code") == $scope.codeNumber) {
		 if($scope.isnanpass()){
				if($scope.isnanpassme()){
				if ($scope.selected == undefined || $scope.phoneShiList == undefined) {
						alert("请选择城市！");
					}else if ($scope.ridel_xy == true) {// 勾选协议
										//alert("hahah");
										$scope.addUser();
									} else {
										alert("请勾选《华尔街金融平台用户使用协议》");
									}
				}
			}
		} else {
			$scope.codeInputFalse = true;
			$scope.phoneCode = true;
		}
	};

	// 注册用户
	$scope.addUser = function() {
		$http.post("api/user/userWebRegistration", {
			username : $scope.rename,
			accountType : false,
			code : $scope.codeNumber,
			cityId : Math.ceil($scope.phoneShiList.id),
			password : $scope.password1,
			name : $scope.name
		}).success(function(data) {
			if (data.code == 1) {
				$scope.ridel_xy = false;
				$scope.password1 = "";
				$scope.password2 = "";
				$scope.codeNumber = "";
				$scope.code = "";
				$scope.codeBei = "";
				alert("注册成功！");
				window.location.href = '#/login';
			} else if (data.code == -1) {
				alert(data.message);
			}
		})
	};
	// 邮箱注册优化
	$scope.emailpassa = function() {
		if ($scope.password1.length < 6 || $scope.password1.length > 20) {
			$scope.inputemaila = "input_false";
			return false;
		} else {
			$scope.inputemaila = "input_true";
			return true;
		}
	}
	$scope.emailpassb = function() {
		if ($scope.password2.length < 6 || $scope.password2.length > 20 || $scope.password1 != $scope.password2) {
			$scope.inputemailb = "input_false";
			return false;
		} else {
			$scope.inputemailb = "input_true";
			return true;
		}
	}
	// 校验图片验证码
	$scope.getImgEmailCode = function() {
		if ($scope.selected == undefined || $scope.emailShiList == undefined) {
			alert("请选择城市！");
		} else if (!myreg.test($scope.emailname)) {
			alert("请输入合法邮箱！");
		} else if ($scope.password1 == '' || $scope.password1 == null) {
			$scope.inputemaila = "input_false";
		} else if ($scope.password2 == '' || $scope.password2 == null) {
			$scope.inputemailb = "input_false";
		} else if ($scope.emailpassa() == false) {
			$scope.inputemaila = "input_false";
		} else if ($scope.emailpassb() == false) {
			$scope.inputemailb = "input_false";
		} else {
			$http.post("api/user/sizeUpImgCode", {
				imgnum : $scope.codeBei
			}).success(function(data) {
				if (data.code == 1) {// 图片验证
					if ($scope.ridel_xy != true) {// 勾选协议
						$http.post("api/user/jusEmail", {
							username : $scope.emailname
						}).success(function(data) {
							if (data.code == 1) {// 检验用户是否存在
								$scope.addUserEmail();
							} else {
								alert(data.message);
							}
						})
					} else {
						alert("请勾选《华尔街金融平台用户使用协议》");
					}
				} else if (data.code == -1) {
					alert(data.message);
					$scope.reGetRandCodeImg();
				}
			})
		}
	};

	// 邮箱注册用户
	$scope.addUserEmail = function() {
		$http.post("api/user/userWebRegistration", {
			username : $scope.emailname,
			accountType : true,
			cityId : Math.ceil($scope.emailShiList.id),
			password : $scope.password1,
			name : $scope.name
		}).success(function(data) {
			if (data.code == 1) {
				$scope.ridel_xy = false;
				$scope.password1 = "";
				$scope.password2 = "";
				$scope.codeBei = "";
				$scope.successEmailShow = true;
			} else if (data.code == -1) {
				alert(data.message);
			}
		})
	};

	// 获得省级
	$scope.getShengcit = function() {
		$http.post("api/index/getCity").success(function(data) {
			if (data.code == 1) {
				$scope.cities = data.result;
			} else {
				alert("城市加载失败！");
			}
		})
	};
	
	
	//弹窗
	$scope.windowfind = function(){
		  $(".mask").css({display:'block',height: $(document).height()});
		$scope.windowboolean = true;
	}
	//关闭弹窗
	
	$scope.closewindow = function(){
	$scope.imgisorboolean = false;
	$scope.windowboolean = false;
	$scope.registreTime = true
	$(".mask").css('display','none');
	}
	
	//图片验证码从新获得
	$scope.perimgcode = function(){
		$scope.imgisorboolean = false;
	}
	
	//图片验证码校验
	$scope.imgcodesub = function(){
		$http.post("api/user/sizeUpImgCode", {
		imgnum : $scope.codeBei
			}).success(function(data) {
		if (data.code == -1) {
			$scope.imgisorboolean = true;
			$scope.reGetRandCodeImg();
		} else {
			$scope.sendnumber = 0;
			$scope.imgisorboolean = false;
			$scope.registreTime = true
			$scope.closewindow();
		}
			})
	}

	$scope.toIndex = function() {
		window.location.href = '#/';
		location.reload();
	};

	// 写cookies
	function setCookie(name, value) {
		var Days = 30;
		var exp = new Date();
		exp.setTime(exp.getTime() + 30 * 60 * 1000);
		document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
	}
	// 读取cookies
	function getCookie(name) {
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		if (arr = document.cookie.match(reg))
			return unescape(arr[2]);
		else
			return null;
	}
	// 删除cookies
	function delCookie(name) {
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval = getCookie(name);
		if (cval != null)
			document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
	}

	$scope.reGetRandCodeImg();
	$scope.init();
};

var findpassController = function($scope, $location, $http, LoginService, $timeout) {
	$scope.usernameLocal = $location.search()['sendusername'];
	$scope.sendStatus = Math.ceil($location.search()['sendStatus']);
	// 检验邮箱格式
	var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	// 手机格式
	var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
	// 隐藏想邮箱发送邮件状态
	$scope.songToEmail = false;
	$scope.intDiff = 120;
	window.clearInterval(window.a);
	window.clearInterval(window.b);
	//找回密码第一步错误提示红框
	$scope.findpassone = false;
	$scope.findpassoneesage = false;
	$scope.findpassoneesageto = false;
	
	//邮箱注册状态
	$scope.emailboolean = false;
	//弹窗
	$scope.windowboolean = false;
	//累计发送短信
	$scope.sendnumber = 0;
	//图片验证码错误
	$scope.imgboolean = false;
	//第三步
	$scope.therefindpass1 = false;
	$scope.therefindpass2 = false;
	$scope.equlsepass = false;
	$scope.quana = false;
	$scope.quanb = false;
	$scope.endshow = false;
	
	// 初始化图片验证码
	$scope.reGetRandCodeImg = function() {
		$(".loginRandCodeImg").attr("src", "api/user/getRandCodeImg?id=" + Math.random());
	};

	$scope.init = function() {
		// 隐藏中间搜索
		$scope.$emit('changesearchview', false);
		if ($scope.sendStatus == -1) {
			$scope.phone_email = $scope.usernameLocal;
			$scope.threestep();
		} else {
			$scope.onestep();
		}
	};

	$scope.onestep = function() {
		$scope.one = true;
		$scope.two = false;
		$scope.three = false;
	};
	$scope.twostep = function() {
		$scope.one = false;
		$scope.two = true;
		$scope.three = false;
	};
	$scope.threestep = function() {
		$scope.one = false;
		$scope.two = false;
		$scope.three = true;
	};
	// 从新获得验证码
	$scope.codeStatus = false;
	$scope.newCode = function() {
		if ($scope.codeStatus == true) {
			$scope.codeStatus = false;
			//$scope.sendnumber = 5;
			if($scope.sendnumber >= 4){
				$scope.windowfind();
			}else{
				$scope.sendnumber = $scope.sendnumber+1;
				$http.post("api/user/sendPhoneVerificationCodeFind", {
					codeNumber : $scope.phone_email,
				}).success(function(data) {
					if (data.code == 1) {
						window.clearInterval(window.a);
						window.clearInterval(window.b);
						$scope.code = data.result;
						$scope.codeNumber = "";
						$scope.intDiff = 119;
						window.b = window.setInterval(function(){
					    	if($scope.intDiff == 0){
					    		$('#day_show').html("点击获得验证码！");
					    		$scope.codeStatus = true;
					    		window.clearInterval(window.b);
					    	}else{
					    		$('#day_show').html("重新发送验证码（"+$scope.intDiff+"秒）");
					    	    $scope.intDiff--;
					    	}
					    }, 1000);
						intervalThree;
					} else {
						alert("发送手机验证码失败！");
					}
				})
			}			
		}
	};

	// 移除样式
	$("link[href='style/global.css']").remove();

	// 找回密码第一步
	$scope.findPassOnes = function() {
		$scope.intDiff = 120;
		if(!reg.test($scope.phone_email)&&!myreg.test($scope.phone_email)){
			$scope.findpassone = true;
			$scope.findpassoneesage = true;
		}else{
			$http.post("api/user/getFindUser", {
				username : $scope.phone_email
			}).success(function(data) {
				if (data.code == -1) {// 检验账号存在
					alert(data.message);
				} else {
							// 下一步
							if (myreg.test($scope.phone_email)) {
								// 向邮箱发送密码重置邮件！
								$http.post("api/user/sendEmailVerificationCode", {
									codeNumber : $scope.phone_email,
								}).success(function(data) {
									if (data.code == 1) {
										$scope.emailboolean = true;
										$scope.twostep();
									} else {
										alert("重置密码邮件发送失败！");
									}
								})
							} else {
								$http.post("api/user/sendPhoneVerificationCodeFind", {
									codeNumber : $scope.phone_email,
								}).success(function(data) {
									if (data.code == 1) {
										window.clearInterval(window.a);
										$scope.code = data.result;
										$scope.codeNumber = "";
										// 倒计时
										$scope.intDiff = 119;
										$scope.twostep();
										window.a = window.setInterval(function() {
											if ($scope.intDiff == 0) {
												$('#day_show').html("点击获得验证码！");
												$scope.codeStatus = true;
												window.clearInterval(window.a);
											} else {
												$('#day_show').html("重新发送验证码（" + $scope.intDiff + "秒）");
												$scope.intDiff--;
											}
										}, 1000);
									} else {
										alert(data.message);
									}
								})
							}

						}
					});
				}
			};
	

	
	//跳转邮箱登陆
	$scope.gotoemail = function(){
		var t=$scope.phone_email.lastIndexOf('@')+1;
		var str = "http://mail."+$scope.phone_email.substring(t);
		window.location.href=str;
	}
	

	// 找回密码第三步
	$scope.findPassThree = function() {
		//$scope.threestep();
		if($scope.code == $scope.codeNumber){
			$http.post("api/user/webFicationCode", {
				code : $scope.codeNumber,
				username : $scope.phone_email
			}).success(function(data) {
				if (data.code == 1) {
					$scope.threestep();
				} else if (data.code == -1) {
					alert(data.message);
				}
			})
		}else{
			$("#codeclass").attr('class','m input_false');
			$scope.findpassoneesageto = true;
		}
	};
	//第二步错误信息
	$scope.deletecodeerror = function(){
		$("#codeclass").attr('class','m input_true');
	}
	
	//弹窗
	$scope.windowfind = function(){
		$scope.windowboolean = true;
	}
	//关闭弹窗
	
	$scope.closewindow = function(){
	$scope.windowboolean = false;
	$scope.codeStatus = true
	}
	
	//图片验证码从新获得
	$scope.perimgcode = function(){
		$scope.imgboolean = false;
		$scope.reGetRandCodeImg();
	}
	
	//图片验证码校验
	$scope.imgcodesub = function(){
		$http.post("api/user/sizeUpImgCode", {
		imgnum : $scope.imgcode
			}).success(function(data) {
		if (data.code == -1) {
			$scope.imgboolean = true;
		} else {
			$scope.sendnumber = 0;
			$scope.imgboolean = false;
			$scope.codeStatus = true
			$scope.closewindow();
		}
			})
	}
	
	// 开始找回
	$scope.findPassEnd = function() {
		if($scope.password1==''||$scope.password1==null){
			$scope.therefindpass1 = true;
		}else if ($scope.password1.length<6||$scope.password1.length>20) {
			$scope.therefindpass1 = true;
		}else if(true){
			$scope.quana = true;
			if($scope.password2==''||$scope.password2==null){
				$scope.therefindpass2 = true;
			}else if(true){
				$scope.quanb = true;
				 if ($scope.password1 != $scope.password2) {
					 $scope.quana = false;
					 $scope.quanb = false;
					 $scope.equlsepass = true;
					 $scope.therefindpass2 = true;
					} else {
						$http.post("api/user/webUpdatePass", {
							password : $scope.password1,
							username : $scope.phone_email
						}).success(function(data) {
							if (data.code == 1) {
								$scope.endshow = true;
							} else if (data.code == -1) {
								alert(data.message);
							}
						})
					}
			}
			
		} 
	};

	$scope.reGetRandCodeImg();
	$scope.init();
};

indexModule.controller("indexController", indexController);
indexModule.controller("headerController", headerController);
indexModule.controller("loginController", loginController);
indexModule.controller("registerController", registerController);
indexModule.controller("findpassController", findpassController);
