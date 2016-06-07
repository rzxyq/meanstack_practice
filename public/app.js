/**
 * Created by ruoyanqin on 6/6/16.
 */
//1st way to do it
var msw = angular.module("meanstackwalkthrough", []);
msw.controller("AppCtrl", function($http){
    $scope.people = [{name:'dave',city:'NY'},
        {name:'alice', city:'Boston'},
        {name: 'amy', city:'portland'}];
})

//2nd way to do ti
angular.module('meanstackwalkthrough', []).controller('SimpleController', function($scope) {
    $scope.people = [{name:'dave',city:'NY'},
        {name:'alice', city:'Boston'},
        {name: 'amy', city:'portland'}];
});

// //3rd way
// var myapp = angular.module("meanstackwalkthrough", []);
// var controllers = {}
// controllers.SimpleController2 = function($scope) {
//     $scope.people = [{name:'dave',city:'NY'},
//         {name:'alice', city:'Boston'},
//         {name: 'amy', city:'portland'}];
// };
// myapp.controller(controllers);