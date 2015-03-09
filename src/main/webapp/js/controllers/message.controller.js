'user strict';

// 系统设置模块
var messageModule = angular.module("messageModule", []);

var messageController = function($scope, $location, $http, LoginService) {
	$scope.req={};
	$scope.req.ids=[];
	$scope.req.q=2;
	$scope.isSelectAll=false;
	$scope.req.customer_id=LoginService.userid;
	$scope.init = function() {
		$("#leftRoute").show();
		$scope.req.id=$location.search()['id'];
		if($scope.req.id>0){
			$scope.getinfo();
		}else{
			$scope.getlist();
		}
		
	};
	$scope.getlist=function() {
		$http.post("api/message/receiver/getAll",$scope.req).success(function(data) {
			if (data.code == 1) {
				$scope.list=data.result.content;
			} 
		});
	};
	$scope.getinfo=function() {
		$http.post("api/message/receiver/getById",$scope.req).success(function(data) {
			if (data.code == 1) {
				$scope.message=data.result;
			} 
		});
	};
	$scope.delone= function(id) {
		$scope.req.id=id;
		$http.post("api/message/receiver/deleteById",$scope.req).success(function(data) {
			if (data.code == 1) {
				window.location.href = '#/message';
			} 
		});
	}
	$scope.delmore= function() {
		$http.post("api/message/receiver/batchDelete",$scope.req).success(function(data) {
			if (data.code == 1) {
				window.location.reload();
			} 
		});
		
	}
	$scope.delall= function() {
		$http.post("api/message/receiver/deleteAll",$scope.req).success(function(data) {
			if (data.code == 1) {
				window.location.reload();
			} 
		});
	}
	
	$scope.checkAll = function() {
		$scope.isSelectAll = !$scope.isSelectAll;
		if ($scope.isSelectAll) {
			angular.forEach($scope.list, function(one) {
				one.checked = true;
			});
		} else {
			angular.forEach($scope.list, function(one) {
				one.checked = false;
			});
		}
		$scope.setCheck();
	}
	$scope.checkOne = function(one) {
		$scope.isSelectAll = false;
		one.checked = !one.checked;
		$scope.setCheck();
	}
	$scope.setCheck = function() {
		$scope.req.ids=[];
		angular.forEach($scope.list, function(one) {
			if (one.checked) {
				$scope.req.ids.push(one.id);
			}
		});
	}
	$scope.unread = function() {
		$scope.req.q=0;
		$scope.getlist();
	}
	$scope.read = function() {
		$scope.req.q=2;
		$scope.getlist();
	}
	$scope.init();
};



messageModule.controller("messageController", messageController);
