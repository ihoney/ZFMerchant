'user strict';

//系统设置模块
var mainindexModule = angular.module("shopModule",[]);

var mainindexController = function ($scope, $http) {
	
	$scope.req={};
	
	$scope.addBuy= function(){
		$http.post("api/paychannel/intention/add", $scope.req).success(function (data) {  //绑定
            if (data.code==1) {
            	$('.buyIntention_tab').hide();
            	$('.mask').hide();
            }
        });
	}
	
	$scope.searchhh= function(){
		$scope.req.id=80;
		$http.post("api/terminal/openStatus", $scope.req).success(function (data) {  //绑定
            if (data.code==1) {
            	$('.tab').show();
            	alert(0);
            	$('#qwert').show();
            }
        });
	}
    
    

};



mainindexModule.controller("mainindexController", mainindexController);
