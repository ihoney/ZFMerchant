'user strict';

//系统设置模块
var terminalModule = angular.module("terminalModule",[]);

var terminalController = function ($scope, $http, LoginService) {
	
	  $scope.pageNum = 2;
	  $scope.indexPage = 1;
	  $scope.totalPage = 1;
	  $scope.totalSize = 0;
	  $scope.pages = [];

	
	//获得终端列表
	$scope.getInfo = function () {
      $scope.req={
    		  customersId:80,
    		  indexPage:$scope.indexPage,
    		  pageNum:$scope.pageNum
    		  };
      
      $http.post("api/terminal/getApplyList", $scope.req).success(function (data) {  //绑定
          if (data != null && data != undefined) {
              $scope.list = data.result.list;
              $scope.totalSize = data.result.totalSize;
          }
          $scope.GenerationNum();
      }).error(function (data) {
    	  alert("获取列表失败");
      });
	}  
	
	$scope.GenerationNum = function (){
		
		 //获取总页数
	    	  $scope.totalPage =  Math.ceil($scope.totalSize / $scope.pageNum);
    	//生成数字链接
          if ($scope.indexPage > 1 && $scope.indexPage < $scope.totalPage) {
        	  if($scope.totalPage<=10){
        		  for(var i=0;i<$scope.totalPage;i++){
        			  $scope.pages[i] =(i+1);
        		  }
        	  }else if($scope.totalPage>10 && $scope.indexPage<=5){
        		  for(var i=0;i<10;i++){
        			  $scope.pages[i] =(i+1);
        		  }
        	  }else if($scope.totalPage>10 && $scope.indexPage>5){
        		  if(($scope.totalPage - $scope.indexPage)>=5){
        			  for(var i=0;i<10;i++){
            			  $scope.pages[i] = $scope.indexPage-5+i+1;
            		  }
        		  }else if(($scope.totalPage - $scope.indexPage)<5){
        			  for(var i=0;i<10;i++){
            			  $scope.pages[i] = $scope.totalPage-10+i+1;
            		  }
        		  }
        		  
        	  }
          } else if ($scope.indexPage == 1 && $scope.totalPage > 1) {
        	  if($scope.totalPage<=10){
        		  for(var i=0;i<$scope.totalPage;i++){
        			  $scope.pages[i] = $scope.indexPage + i;
        		  }
        	  }else if($scope.totalPage>10){
        		  for(var i=0;i<10;i++){
        			  $scope.pages[i] =$scope.totalPage -10 + i;
        		  }
        	  }
          } else if ($scope.indexPage == $scope.totalPage && $scope.totalPage > 1) {
        	  if($scope.totalPage<=10){
        		  for(var i=0;i<$scope.totalPage;i++){
        			  $scope.pages[i] = i+1;
        		  }
        	  }else if($scope.totalPage>10){
            		  for(var i=0;i<10;i++){
            			  $scope.pages[i] = $scope.totalPage -10 + i +1;
            		  }
        	  }
          }
      }

  $scope.next = function () {
      if ($scope.indexPage < $scope.totalPage) {
          $scope.indexPage++;
          $scope.getInfo();
      }
  };

  $scope.prev = function () {
      if ($scope.indexPage > 1) {
          $scope.indexPage--;
          $scope.getInfo();
      }
  };

  $scope.loadPage = function (page) {
      $scope.indexPage = page;
      $scope.getInfo();
  };
  
  
  $scope.getInfo();

};

terminalModule.$inject = ['$scope', '$http', '$cookieStore'];
terminalModule.controller("terminalController", terminalController);
