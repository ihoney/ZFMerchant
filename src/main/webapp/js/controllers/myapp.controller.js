'user strict';

//我的掌富
var myappModule = angular.module("myappModule",[]);

var myappController = function ($scope, $http, LoginService) {
	$("#leftRoute").show();
	$scope.my_message_list = function(){
		$scope.req={customer_id:80};
		$http.post("api/web/message/getAll", $scope.req).success(function (data) {   
            if (data != null && data != undefined) {
                $scope.my_list = data.result.content;
            }
        }).error(function (data) {
            $("#serverErrorModal").modal({show: true});
        });
	};
	$scope.web_message_list = function(){
		$scope.req={customer_id:80};
		$http.post("api/message/receiver/getAll", $scope.req).success(function (data) {   
			if (data != null && data != undefined) {
				$scope.web_list = data.result.content;
			}
		}).error(function (data) {
			$("#serverErrorModal").modal({show: true});
		});
	};
	
	$scope.my_message_list();
	$scope.web_message_list();
};

myappModule.$inject = ['$scope', '$http', '$cookieStore'];
myappModule.controller("myappController", myappController);

