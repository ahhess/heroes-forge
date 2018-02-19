angular.module('heroes-forge').factory('HeroResource', function($resource){
    var resource = $resource('rest/heros/:HeroId',{HeroId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});