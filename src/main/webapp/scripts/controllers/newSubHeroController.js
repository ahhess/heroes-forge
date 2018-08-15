
angular.module('heroes-forge').controller('NewSubHeroController', function ($scope, $location, locationParser, flash, SubHeroResource , HeroResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.subHero = $scope.subHero || {};
    
    $scope.heroList = HeroResource.queryAll(function(items){
        $scope.heroSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.name
            });
        });
    });
    $scope.$watch("heroSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.subHero.hero = {};
            $scope.subHero.hero.id = selection.value;
        }
    });
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            flash.setMessage({'type':'success','text':'The subHero was created successfully.'});
            $location.path('/SubHeros');
        };
        var errorCallback = function(response) {
            if(response && response.data) {
                flash.setMessage({'type': 'error', 'text': response.data.message || response.data}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        };
        SubHeroResource.save($scope.subHero, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/SubHeros");
    };
});