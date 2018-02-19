'use strict';

angular.module('heroes-forge',['ngRoute','ngResource'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/',{templateUrl:'views/landing.html',controller:'LandingPageController'})
      .when('/Heros',{templateUrl:'views/Hero/search.html',controller:'SearchHeroController'})
      .when('/Heros/new',{templateUrl:'views/Hero/detail.html',controller:'NewHeroController'})
      .when('/Heros/edit/:HeroId',{templateUrl:'views/Hero/detail.html',controller:'EditHeroController'})
      .when('/SubHeros',{templateUrl:'views/SubHero/search.html',controller:'SearchSubHeroController'})
      .when('/SubHeros/new',{templateUrl:'views/SubHero/detail.html',controller:'NewSubHeroController'})
      .when('/SubHeros/edit/:SubHeroId',{templateUrl:'views/SubHero/detail.html',controller:'EditSubHeroController'})
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
