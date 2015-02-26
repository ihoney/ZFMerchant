'user strict';

//系统设置模块
var h3Module = angular.module("h3Module",[]);

var h3Controller = function ($scope, $http, LoginService) {
	
	$scope.addmatch=function(){
		alert("新增竞赛");
		window.location.href = '#/h3/addmatch';
	};
	
	$scope.daoru=function(){
		alert("批量导入");
		window.location.href ='#/h3/daoru';
	};
	
	$scope.getInfo = function () {
        $scope.req={customer_id:1};
        
        $http.post("api/order/getMyOrderAll", $scope.req).success(function (data) {  //绑定
            if (data != null && data != undefined) {
                $scope.list = data.result.content;
            }
        }).error(function (data) {
            $("#serverErrorModal").modal({show: true});
        });
    };
    $scope.getInfo();

};



h3Module.$inject = ['$scope', '$http', '$cookieStore'];
h3Module.controller("h3Controller", h3Controller);
