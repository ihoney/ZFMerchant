'use strict';

//登陆服务模块
var loginServiceModule = angular.module("loginServiceModule", []);


var loginService = function ($http, $rootScope, $cookieStore) {
    return {
        //定义当前用户是否被授权
        //isAuthorized: typeof($cookieStore.get("loginInfo")) == 'undefined' ? false : true,
    	isAuthorized:true,
    	//当前登陆的用户名
        loginUserName: typeof($cookieStore.get("loginUserName")) == 'undefined' ? "" : $cookieStore.get("loginUserName"),
    	shopcount: "123",
        userPower : "11",
        userid: typeof($cookieStore.get("loginUserId")) == 'undefined' ? 0 : $cookieStore.get("loginUserId"),
        userLogo:"123",
        city:1,
        goods: [],
        //用户登陆功能
        login: function ($scope) {
        	
   		 $http.post("api/user/sizeUpImgCode", {imgnum:$scope.code}).success(function(data){
   			 if(data.code == -1){
   				$scope.imgMessage = data.message;
   				 $("#loginImg").attr("class","l error");
   			 }else{
   				 $("#loginImg").attr("class","");
   				 $http.post("api/user/studentLogin", {username:$scope.username,password:$scope.password1}).success(function (data) {  //绑定
   			           if(data.code == -1){//用户或者密码错误！
   			        	$scope.nameMessage = data.message; 
   			        	   $("#loginUname").attr("class","error");
   			           }else{
   			        	 $("#loginUname").attr("class","");
   			        	   $scope.nameMessag = "";
   			        	   $scope.code = "";
   			        	   //记住密码
   			        	   if($scope.RememberPass == true){
   			        		   $cookieStore.put("loginPass",data.result.password);
   			        	   }else{
   			        		   $cookieStore.remove("loginPass");
   			        	   }
   			        	   $cookieStore.put("loginUserName",data.result.username);
   			        	   $cookieStore.put("loginUserId",data.result.id);
   			        	   //刷新
   			        	   location.reload();
   			        	   $scope.message = data.message; //登陆成功，跳转页面
   			        	   $('#login').hide();
   			        	   $('#maintopTwo').show();
   			        	   $('#headClear').show();
   			        	   $('#mainuser').show();
   			        	   $("link[href='style/global.css']").remove();
   			        	   $scope.dynamicLoadingCss("style/global.css");
   			        	   
   			           }
   			        }).error(function (data) {
   			        	$scope.message = "登陆异常！"
   			        });
   			 }
   		 }).error(function(data){
   			 $scope.message = "获取验证码失败！"
   		 });
        	
        	
        	
//        	alert("login");
//            var self = this;
//            $http.post("api/user/studentLogin", $scope).success(function (data) {
//            	if (data.code != 10) {
//                    self.mobile = user.mobile;
//                    self.isAuthorized = true;
//                    self.userCD = data.userinfo.userCD;
//                    self.fullName = data.userinfo.fullName;
//                    self.userLogo = data.userinfo.picurl;
//                    $cookieStore.put("loginInfo", user.mobile);
//                    $cookieStore.put("loginUserName", self.fullName);
//                    $cookieStore.put("shopLogo", self.userLogo);
//                    $("#loginModal").modal('hide'); //登陆成功，则隐藏登陆窗口，并且显示主页面
//                    $("#userPwd").val("");
//                    $("#indexDiv").show();
//                    $rootScope.$broadcast('Login.Success', self.mobile);
//                } else {
//                    $("#resetPwd-success-msg").hide();
//                    $("#login-danger-msg").show();
//                }
//        }).error(function (data) {
//            console.log("Login error!");
//        });
        },

        //用户登出功能
        logout: function () {
            $cookieStore.remove("loginInfo");
            $cookieStore.remove("loginUserName");
            $cookieStore.remove("loginSmsPauseFlag");
            $cookieStore.remove("shopLogo");
            $cookieStore.remove("shopName");
            $cookieStore.remove("userCoverPicCD");
            this.isAuthorized = false;
            $("#loginModal").modal({keyboard:false,backdrop:'static'}); //登出之后，则显示登陆界面，并隐藏主页面
            $("#resetPwd-success-msg").hide();
            $("#indexDiv").hide();
        },
        
        //创建订单传值
        tomakeorder: function (val) {
            var self = this;
            self.goods=val;
        },
        //隐藏所有
        hideAll: function () {
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
        //未登录
        unLoginShow: function () {
        	$('#login').hide();
    		$('#findPassOne').hide();
    		$('#findPassTwo').hide();
    		$('#findPassThree').hide();
    		$('#retrieveHtml').hide();
    		$('#emailRetrieveHtml').hide();
    		//$('#maintop').hide();
    		$('#maintopTwo').hide();
    		//$('#headClear').hide();
    		$('#shopmain').hide();
    		$('#mainuser').hide();
    		//$('#mainindex').hide();
    		$('#maintop').show();
    		$('#headClear').show();
    		$('#mainindex').show();
        },
        //已登录
        hadLoginShow: function () {
        	$('#login').hide();
    		$('#findPassOne').hide();
    		$('#findPassTwo').hide();
    		$('#findPassThree').hide();
    		$('#retrieveHtml').hide();
    		$('#emailRetrieveHtml').hide();
    		$('#maintop').hide();
    		//$('#maintopTwo').hide();
    		//$('#headClear').hide();
    		$('#shopmain').hide();
    		//$('#mainuser').hide();
    		$('#mainindex').hide();
    		$('#maintopTwo').show();
    		$('#headClear').show();
    		$('#mainuser').show();
        },
        //检验当前是否为已登录状态，或Cookie中仍存在登陆记录
        checkAuthorization: function () {
            var self = this;
            //必须从Cookie中校验(Cookie)
            this.isAuthorized = typeof($cookieStore.get("loginInfo")) == 'undefined' ? false : true,
                //根据是否已登录，设置登陆窗口和主页面的显示与否
                $("#loginModal").modal(this.isAuthorized == true ? 'hide' : {keyboard:false,backdrop:'static'});
            if (this.isAuthorized == true) {
                self.mobile = $cookieStore.get("loginInfo");
                self.fullName = $cookieStore.get("loginUserName");
               // self.loginSmsPauseFlag = $cookieStore.get("loginSmsPauseFlag");
                self.shopLogo = $cookieStore.get("shopLogo");
               // self.shopName = $cookieStore.get("shopName");
                //self.userCoverPicCD = $cookieStore.get("userCoverPicCD");
                $("#indexDiv").show();
            } else {
                $("#indexDiv").hide();
            }
        }
    };
};

loginServiceModule.$inject = ['$http', '$rootScope', '$cookieStore'];
loginServiceModule.service("LoginService", loginService);