'user strict';

// 系统设置模块
var myinfobaseModule = angular.module("myinfobaseModule", []);
var myinfobaseController = function($scope, $http, LoginService) {
	var customerId = LoginService.userid;
	$scope.init = function() {

		// 判断是否已登录
		if (LoginService.userid == 0) {
			window.location.href = '#/login';
		} else {
			$scope.$emit('changeshow', false);
		}
		$scope.req = {
				customer_id : LoginService.userid
			};
		 $scope.selected={};
		 $scope.selected_city={};
		 $http.post("api/customers/findCustById", $scope.req).success(function (data) {
			if (data.code == 1) {
				$scope.customer = data.result;
			    $scope.selected.id = data.result.parent_id;
			    $scope.selected.name = data.result.p_name;
		        $scope.selected_city.id = data.result.id;
		        $scope.selected_city.name = data.result.c_name;
			}
		}).error(function(data) {

		});

	};
	
	$scope.city_list = function(){
		$http.post("api/index/getCity").success(function (data) {   
            if (data != null && data != undefined) {
                $scope.city_list = data.result;
            }
        });
	};
	
	$scope.ch_city = function(){
//		$scope.selected_city = "";
	};
	$scope.close_show_two = function(){
		$("#show_phone_input_my_t").css('display','none');
		$(".mask").css('display','none');
	};
	//根据手机号发送验证码
	$scope.sendPhoneCode = function(){
		var sMobile = $scope.i_phone_new; 
	    if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(sMobile))){ 
	        alert("不是完整的11位手机号或者正确的手机号前七位"); 
	        $("#i_phone_new").focus(); 
	        return false; 
	    }else{
	    	$scope.req ={phone:sMobile};
	    	$http.post("api/index/getPhoneCode",$scope.req).success(function (data) {   
	            if (data != null && data != undefined) {
	                $scope.phone_code = data.result;
	            	alert("发送成功");
	            }
	        });
	    } 
	};
	
	//第一次发送验证码   //
	$scope.send_code_one = function(){
		var sMobile = $scope.customer.phone; 
		$scope.i_phone_new = ""; 
		$scope.i_phone_code = ""; 
		$scope.phone_code_i_o = ""; 
		$scope.req ={phone:sMobile};
		$http.post("api/index/getPhoneCode",$scope.req).success(function (data) {   
			if (data != null && data != undefined) {
				$scope.phone_code = data.result;
			}
		});
	};
	//确认验证码，（第一次）
	$scope.yz_phone_code = function(){
		var p_code = $scope.phone_code;
		var i_code = $scope.phone_code_i_o;//输入的验证码
		if(p_code == i_code){
			$("#show_phone_input_my_o").css('display','none');
			$(".mask").css('display','none');
			
			var doc_height = $(document).height();
			var doc_width = $(document).width();
			var win_height = $(window).height();
			var win_width = $(window).width();
			
			var layer_height = $("#show_phone_input_my_t").height();
			var layer_width = $("#show_phone_input_my_t").width();
			
			var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
				
		    $(".mask").css({display:'block',height:doc_height});
			$("#show_phone_input_my_t").css('top',(win_height-layer_height)/2);
			$("#show_phone_input_my_t").css('left',(win_width-layer_width)/2);
			$("#show_phone_input_my_t").css('display','block');
			
		}else{
			alert("验证码错误");
		}
	};
	
	//确认验证码，更新手机号
	$scope.change_phone_btn = function(){
		var p_code = $scope.phone_code;
		var i_code = $scope.i_phone_code;//输入的验证码
		if(p_code == i_code){
			var sMobile = $scope.i_phone_new; 
			$scope.req ={phone:sMobile,customer_id:LoginService.userid};
			$http.post("api/index/changePhone",$scope.req).success(function (data) {   
				if (data != null && data != undefined) {
					//重新刷新
					$("#show_phone_input_my_t").css('display','none');
					$(".mask").css('display','none');
					$scope.init();
					alert("修改成功");
				}
			});
		}
	};
	
	$scope.save = function() {
		$scope.req = {
			"id" : LoginService.userid,
			"name" : $scope.customer.name,
			"phone" : $scope.customer.phone,
			"email" : $scope.customer.email,
			"cityId" : $scope.selected_city.id
		};
		$http.post("api/customers/cust_update", $scope.req).success(function(data) {
			if (data.code == 1) {
				alert("保存成功");
			} else {
//				alert(data.message);
			}
		}).error(function(data) {

		});
	};
	$scope.init();
	$scope.city_list();
};
myinfobaseModule.controller("myinfobaseController", myinfobaseController);