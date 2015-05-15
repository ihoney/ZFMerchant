/**
 * 
 */ 
function ckgou_self(dom) {
	if (dom != null) {
		ckgou_comp(null);
	}
	if ($('#_self').attr('src') == 'style/join/checked.png') {
		$('#_self').attr("src", "style/join/radiobtn.png");
		return;
	}
	var rec = $(dom).attr("src");
	if (rec == "style/join/radiobtn.png") {
		$("#ckval").val('');
		$("#ckval").val('个人');
		$(dom).attr("src", "style/join/checked.png");
	} else {
		$("#ckval").val('');
		$(dom).attr("src", "style/join/radiobtn.png");
	}

}

function ckgou_comp(dom) {
	if (dom != null) {
		ckgou_self(null);
	}
	if ($('#_comp').attr('src') == 'style/join/checked.png') {
		$('#_comp').attr("src", "style/join/radiobtn.png");
		return;
	}
	var rec = $(dom).attr("src");
	if (rec == "style/join/radiobtn.png") {
		$("#ckval").val('');
		$("#ckval").val('公司');
		$(dom).attr("src", "style/join/checked.png");
	} else {
		$("#ckval").val('');
		$(dom).attr("src", "style/join/radiobtn.png");
	}

}

var agentMobileApp = angular.module('agentMobileApp', []);
var agentapp = function($scope, $http, $location) {
	var city = null;
	$scope.req = {};
	$scope.selected = {};
	$scope.selected_city = {};
	$scope.city_search = function() {
		$http.post("api/index/getCity").success(function(data) {
			if (data != null && data != undefined) {
				$scope.city_list = data.result;  
				city = data.result;
			}
		});
	};

	$scope.change_city = function() {
		$scope.selected_city = "";
	};

	$scope.commitAppData = function() {
		var flag = $scope.checkData();
		var type = $('#ckval').val();
		$scope.req = {
			"address" : $scope.selected.name + "," + $scope.selected_city.name,
			"agent_type" : type,
			"touchName" : $scope.req.touchName,
			"touchPhone" : $scope.req.touchPhone
		};
		if (flag) {
			$http.post("api/agentjoin/addNewData", $scope.req).success(
					function(data) {
						$("#_comp").attr("src", "style/join/radiobtn.png");
						$("#_self").attr("src", "style/join/radiobtn.png");
						$('#ckval').val("")
						$("#touchname").val("");
						$("#touchphone").val("");
						$scope.req = {};
						if (data.code==1) { 
							alert("我们已经收到您的申请资料，我们将在一个工作日内与您联系，请保持电话畅通。");
						}else if(data.code == -2){
							alert("加盟资料已存在，相同的手机号码和相同的姓名视为同一人。请勿重复提交!"); 
						}else{
							alert("提交失败，请稍候重试!");
						} 
						$scope.city_search();
						$scope.selected.childrens = "--请选择--";
					});
		}
	};

	$scope.checkData = function() {
		var pname = $scope.selected.name;
		var cname = $scope.selected_city.name;
		var touchname = $scope.req.touchName;
		var touchphone = $scope.req.touchPhone;
		var ck = $('#ckval').val();
		if (ck == "" || ck == undefined) {
			alert("请选择代理商类型");
			return false;
		}
		
		if (pname == "" || pname == undefined) {
			$('#p_name').focus();
			alert("请选择所在地");
			return false;
		}
		if (cname == "" || cname == undefined) {
			$('#c_name').focus();
			alert("请选择所在地");
			return false;
		}
		if (touchname == "" || touchname == undefined) {
			$('#touchname').focus();
			alert("请输入联系人");
			return false;
		}
		if (touchphone == "" || touchphone == undefined) {
			$('#touchphone').focus();
			alert("请输入联系人手机号码");
			return false;
		} 

		var reg = /^(13[0-9]|15[0|1|2|3|5|6|7|8|9]|18[0|2|5|6|7|8|9]|14[7])\d{8}$/;
		if (!reg.exec(touchphone)) {
			$('#touchphone').focus();
			alert("请输入正确的联系人手机号码");
			return false;
		}

		return true;
	};

	$scope.city_search(); 
}
agentMobileApp.controller('agentapp', agentapp);