(function(angular){
	var app=angular.module('movie.detail',['ngRoute','moviecat.jsonp']);
	 // 路由配置
	app.config(['$routeProvider',function($routeProvider){
		$routeProvider.when('/details/:id?',{
			templateUrl:'./detail/detail.html',
			controller:'detailContraller'
		})
		
	}]);

	// 创建控制器
		app.controller('detailContraller', ['$scope','myService','$routeParams', function($scope,myService,$routeParams){
			// http://api.douban.com/v2/movie/subject/1764796
			myService.jsonp('http://api.douban.com/v2/movie/subject/'+$routeParams.id,
				{},function(data){
					$scope.data=data;
					console.log(data);
					$scope.$apply();//一定要加这一步才能渲出来,告知angular这是跨域请求回来的额
				})
		}]);
})(angular);