
angular.module('heroes-forge').controller('NewHeroController', function ($scope, $location, locationParser, flash, HeroResource , SubHeroResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.hero = $scope.hero || {};
    
    $scope.subherosList = SubHeroResource.queryAll(function(items){
        $scope.subherosSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.name
            });
        });
    });
    $scope.$watch("subherosSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.hero.subheros = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.hero.subheros.push(collectionItem);
            });
        }
    });


    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            flash.setMessage({'type':'success','text':'The hero was created successfully.'});
            $location.path('/Heros');
        };
        var errorCallback = function(response) {
            if(response && response.data) {
                flash.setMessage({'type': 'error', 'text': response.data.message || response.data}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        };
        HeroResource.save($scope.hero, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Heros");
    };
});