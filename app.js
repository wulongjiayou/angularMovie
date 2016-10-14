(function (angular) {
    "use strict";

    // start your ride
    var app = angular.module('moviecat',['ngRoute','moviecat.home_page'
    	,'movie.detail'
    	,'movie_theaters'
    	,'moviecat.autoactive'
    	]);
    
    app.controller('searchController', ['$scope','$route','$location', function($scope,$route,$location){
    	$scope.query='';
    	$scope.search=function(){
    		// $route.updateParams({moves:'search',page:'1',q:$scope.query});
    		$location.url('/search/1?q='+$scope.query)
    	}
    }])
})(angular);