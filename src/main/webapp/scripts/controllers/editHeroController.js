

angular.module('heroes-forge').controller('EditHeroController', function($scope, $routeParams, $location, flash, HeroResource , SubHeroResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.hero = new HeroResource(self.original);
            SubHeroResource.queryAll(function(items) {
                $scope.subherosSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.id
                    };
                    if($scope.hero.subheros){
                        $.each($scope.hero.subheros, function(idx, element) {
                            if(item.id == element.id) {
                                $scope.subherosSelection.push(labelObject);
                                $scope.hero.subheros.push(wrappedObject);
                            }
                        });
                        self.original.subheros = $scope.hero.subheros;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            flash.setMessage({'type': 'error', 'text': 'The hero could not be found.'});
            $location.path("/Heros");
        };
        HeroResource.get({HeroId:$routeParams.HeroId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.hero);
    };

    $scope.save = function() {
        var successCallback = function(){
            flash.setMessage({'type':'success','text':'The hero was updated successfully.'}, true);
            $scope.get();
        };
        var errorCallback = function(response) {
            if(response && response.data && response.data.message) {
                flash.setMessage({'type': 'error', 'text': response.data.message}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        };
        $scope.hero.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Heros");
    };

    $scope.remove = function() {
        var successCallback = function() {
            flash.setMessage({'type': 'error', 'text': 'The hero was deleted.'});
            $location.path("/Heros");
        };
        var errorCallback = function(response) {
            if(response && response.data && response.data.message) {
                flash.setMessage({'type': 'error', 'text': response.data.message}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        }; 
        $scope.hero.$remove(successCallback, errorCallback);
    };
    
    $scope.subherosSelection = $scope.subherosSelection || [];
    $scope.$watch("subherosSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.hero) {
            $scope.hero.subheros = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.hero.subheros.push(collectionItem);
            });
        }
    });
    
    $scope.get();
});