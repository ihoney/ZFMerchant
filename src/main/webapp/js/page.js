/**
 * 初始化分页
 */
function initSystemPage($scope) {
	$scope.rows = 2;// 每页条数
	$scope.indexPage = 1;// 起始页
	$scope.totalPage = 1;// 总页数
	$scope.total = 0;// 总条数
	$scope.pages = [];// 页码集合
	$scope.gotoPage = 1; // init gotoPage
}

/**
 * 计算分页
 * 
 * @param collectons
 */
function calcSystemPage($scope, total) {
	if (total != null && total > 0) {
		$scope.total = total;
	}
	$scope.totalPage = Math.ceil($scope.total / $scope.rows); // 获取总页数
	console.log("totalPage==>"+$scope.totalPage);
	if ($scope.indexPage >= 1 && $scope.indexPage < $scope.totalPage) { // 生成数字链接
		if ($scope.totalPage <= 10) {
			for (var i = 0; i < $scope.totalPage; i++) {
				console.log("==>>if ++>>"+i);
				$scope.pages[i] = (i + 1);
			}
		} else if ($scope.totalPage > 10 && $scope.indexPage <= 5) {
			console.log("==>>else if ++>>"+i);
			for (var i = 0; i < 10; i++) {
				$scope.pages[i] = (i + 1);
			}
		} else if ($scope.totalPage > 10 && $scope.indexPage > 5) {
			console.log("==>>else if  else if ++>>"+i);
			if (($scope.totalPage - $scope.indexPage) >= 5) {
				for (var i = 0; i < 10; i++) {
					$scope.pages[i] = $scope.indexPage - 5 + i + 1;
				}
			} else if (($scope.totalPage - $scope.indexPage) < 5) {
				for (var i = 0; i < 10; i++) {
					$scope.pages[i] = $scope.totalPage - 10 + i + 1;
				}
			}
		}
	} else if ($scope.indexPage == 1 && $scope.totalPage > 1) {
		if ($scope.totalPage <= 10) {
			for (var i = 0; i < $scope.totalPage; i++) {
				$scope.pages[i] = $scope.indexPage + i;
			}
		} else if ($scope.totalPage > 10) {
			for (var i = 0; i < 10; i++) {
				$scope.pages[i] = $scope.totalPage - 10 + i;
			}
		}
	} else if ($scope.indexPage == $scope.totalPage && $scope.totalPage > 1) {
		if ($scope.totalPage <= 10) {
			for (var i = 0; i < $scope.totalPage; i++) {
				$scope.pages[i] = i + 1;
			}
		} else if ($scope.totalPage > 10) {
			for (var i = 0; i < 10; i++) {
				$scope.pages[i] = $scope.totalPage - 10 + i + 1;
			}
		}
	}
}
