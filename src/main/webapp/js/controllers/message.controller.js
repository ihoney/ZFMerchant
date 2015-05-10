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
		initSystemPage($scope.req);// 初始化分页参数
		$scope.getlist();
		
	};
	$scope.getlist=function() {
		$scope.req.page=$scope.req.indexPage;
		$http.post("api/message/receiver/getAll",$scope.req).success(function(data) {
			if (data.code == 1) {
				$scope.list=data.result.content;
				calcSystemPage($scope.req, data.result.total);// 计算分页
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
		$scope.isSelectAll=false;
		$scope.req.indexPage=1;
		$scope.req.q=0;
		$scope.getlist();
	}
	$scope.read = function() {
		$scope.isSelectAll=false;
		$scope.req.indexPage=1;
		$scope.req.q=2;
		$scope.getlist();
	}
	$scope.init();
	
	 // 上一页
	$scope.prev = function() {
		if ($scope.req.indexPage > 1) {
			$scope.req.indexPage--;
			$scope.getlist();
		}
	};

	// 当前页
	$scope.loadPage = function(currentPage) {
		$scope.req.indexPage = currentPage;
		$scope.getlist();
	};

	// 下一页
	$scope.next = function() {
		if ($scope.req.indexPage < $scope.req.totalPage) {
			$scope.req.indexPage++;
			$scope.getlist();
		}
	};

	// 跳转到XX页
	$scope.getPage = function() {
		$scope.req.indexPage = Math.ceil($scope.req.gotoPage);
		$scope.getlist();
	};
};

var messageinfoController = function($scope, $location, $http, LoginService) {
	
	$scope.init = function() {
		$scope.req={};
		$scope.req.customer_id=LoginService.userid;
		$scope.req.id=$location.search()['id'];
		$scope.getinfo();
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
	$scope.init();
	
};

messageModule.controller("messageController", messageController);
messageModule.controller("messageinfoController", messageinfoController);