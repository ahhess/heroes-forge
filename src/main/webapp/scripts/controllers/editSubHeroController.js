

angular.module('heroes-forge').controller('EditSubHeroController', function($scope, $routeParams, $location, flash, SubHeroResource , HeroResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.subHero = new SubHeroResource(self.original);
            HeroResource.queryAll(function(items) {
                $scope.heroSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.name
                    };
                    if($scope.subHero.hero && item.id == $scope.subHero.hero.id) {
                        $scope.heroSelection = labelObject;
                        $scope.subHero.hero = wrappedObject;
                        self.original.hero = $scope.subHero.hero;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            flash.setMessage({'type': 'error', 'text': 'The subHero could not be found.'});
            $location.path("/SubHeros");
        };
        SubHeroResource.get({SubHeroId:$routeParams.SubHeroId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.subHero);
    };

    $scope.save = function() {
        var successCallback = function(){
            flash.setMessage({'type':'success','text':'The subHero was updated successfully.'}, true);
            $scope.get();
        };
        var errorCallback = function(response) {
            if(response && response.data && response.data.message) {
                flash.setMessage({'type': 'error', 'text': response.data.message}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        };
        $scope.subHero.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/SubHeros");
    };

    $scope.remove = function() {
        var successCallback = function() {
            flash.setMessage({'type': 'error', 'text': 'The subHero was deleted.'});
            $location.path("/SubHeros");
        };
        var errorCallback = function(response) {
            if(response && response.data && response.data.message) {
                flash.setMessage({'type': 'error', 'text': response.data.message}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        }; 
        $scope.subHero.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("heroSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.subHero.hero = {};
            $scope.subHero.hero.id = selection.value;
        }
    });
    
    $scope.get();
});