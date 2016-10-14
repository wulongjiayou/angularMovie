(function(angular){
	var app=angular.module('moviecat.autoactive',[]);
	app.directive('autoAct',['$location',function($location){
		return {
			link:function(scope,element,attributes){
					scope.location=$location;
					scope.$watch('location.url()',function(now,old){
						var hash=element.children()[0].hash.substr(1);
						// 判断锚值是否包含了a标签的href属性
						//  // startsWith判断一个元素是否以另一个元素开始
           					// endsWith 判断是否以另一个元素结束。
						if(now.startsWith(hash)){//判断是哪一个元素
							element.parent().children().removeClass('active');
							element.addClass('active');
						}
						
					})
			}
		}
	}]);
})(angular);