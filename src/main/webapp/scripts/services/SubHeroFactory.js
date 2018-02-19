angular.module('heroes-forge').factory('SubHeroResource', function($resource){
    var resource = $resource('rest/subheros/:SubHeroId',{SubHeroId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});