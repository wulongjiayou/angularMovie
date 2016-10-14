(function(angular){
	var app=angular.module('moviecat.jsonp',[]);
	app.service('myService', ['$window', function($window){
		this.jsonp=function(url,obj,fn){
		   //将数据拼接字符串
		   var str='';
		   for(var key in obj){
		   		str += key + "=" + obj[key] + "&"; //a=b&c=d&
		   };
		   // 回调的方法名不能够写死，否则会被覆盖,也就是为了防止浏览器缓存数据,创建执行函数
		   // substr(2)是去掉后面小数点,函数名不能为fn.12  有的后台不支持
		   var functionname='erqi'+$window.Math.random().toString().substr(2);
		   str += 'callback='+functionname;
		   url += '?'+str;
		   //创建回调函数,返回来的数据就会执行这个函数,
		   $window[functionname]=function(data){
		   	 	fn(data);
		   };
		   //创建script标签
		   var ele=$window.document.createElement('script');
		   ele.src=url;
		   $window.document.body.appendChild(ele);
		}
	}])
})(angular);