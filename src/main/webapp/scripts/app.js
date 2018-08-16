'use strict';

angular.module('heroes-forge',['ngRoute','ngResource'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/',{templateUrl:'views/landing.html',controller:'LandingPageController'})
      .when('/Heroes',{templateUrl:'views/Hero/search.html',controller:'SearchHeroController'})
      .when('/Heroes/new',{templateUrl:'views/Hero/detail.html',controller:'NewHeroController'})
      .when('/Heroes/edit/:HeroId',{templateUrl:'views/Hero/detail.html',controller:'EditHeroController'})
      .otherwise({
        redirectTo: '/'
      });
  }])
  .controller('LandingPageController', function LandingPageController() {
  })
  .controller('NavController', function NavController($scope, $location) {
    $scope.matchesRoute = function(route) {
        var path = $location.path();
        return (path === ("/" + route) || path.indexOf("/" + route + "/") == 0);
    };
  });
