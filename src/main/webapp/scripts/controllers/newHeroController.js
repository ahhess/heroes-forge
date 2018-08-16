
angular.module('heroes-forge').controller('NewHeroController', function ($scope, $location, locationParser, flash, HeroResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.hero = $scope.hero || {};
    
    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            flash.setMessage({'type':'success','text':'The hero was created successfully.'});
            $location.path('/Heroes');
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
        $location.path("/Heroes");
    };
});