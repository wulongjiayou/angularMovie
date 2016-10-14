(function(angular){
	var app=angular.module('movie_theaters',['ngRoute','moviecat.jsonp']);
	 // 路由配置
	app.config(['$routeProvider',function($routeProvider){
		 $routeProvider.when('/:moves/:page?',{
			templateUrl:'movies/movie.html',
			controller:'moviecontraoller'
		})
	}]);
	// 创建控制器
	app.controller('moviecontraoller', ['$scope', '$http','myService','$routeParams','$route',
		function($scope,$http,myService,$routeParams,$route){
			$scope.loading=true;
		var count =5;// 表示每页要显示的数据量
		$scope.page=$routeParams.page*1 || 1;// 表示当前要显示第几页
		var start=($scope.page-1)*count // 得到想获取的数据是从第几开始

		//发送异步请求
		// http://api.douban.com/v2/movie/search?q=成龙
		myService.jsonp("http://api.douban.com/v2/movie/"+$routeParams.moves
			,{count:count,start:start,q:$routeParams.q}
			,function(data){
				// console.log(data);
	// 在angular中,$scope是一个双向数据绑定也是有个全局的变量,ng-model='name',在js中
    // 可以通过$scope.name拿到值也可以给他赋值,在js中$scope.age就是一个全局变量,在哪里都可以
    // 通过$scope.age来获取值,同时他声明的age也可以在html行拿到
				$scope.totalpages=Math.ceil(data.total/count); // 暴露总页数
				$scope.total=data.total;
				$scope.data=data;
				$scope.loading=false;
				$scope.$apply();
				//如果在异步中操作了数据模型的值，需要调用这个方法通知angular.
			});

    		$scope.getpage=function(unm){
    			//判断上一张和下一张
    			var nowpages=$scope.page+unm;
    			if($scope.page>$scope.totalpages || $scope.page<1 ){return}; 
    			// 过滤，不请求不符合条件的页码
    			$route.updateParams({page:nowpages});
    			//更新路由参数；page对应的值,page就是路由参数,对应的值就是url后面的page匹配的值
    		};
		
	}]);
}(angular));