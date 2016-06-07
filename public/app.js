/**
 * Created by ruoyanqin on 6/6/16.
 */
var msw = angular.module("meanstackwalkthrough", []);
msw.config(function($routeProvider){
    $routeProvider.when('/', {
        controller: 'SimpleController',
        templateUrl1: 'View1.html'
    }).when('partial2', {
        controller: 'SimpleController',
        templateUrl1: 'View2.html'
    }).otherwise({
        redirectTo: '/'
    });
})
//1st way to do it
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
    $scope.addCustomer = function() {
        $scope.customers.push({ name: $scope.newCustomer.name, city: $scope.newCustomer.city});
    }
});

// //3rd way
// var myapp = angular.module("meanstackwalkthrough", []);
// var controllers = {};
// controllers.SimpleController2 = function($scope) {
//     $scope.people = [{name:'dave',city:'NY'},
//         {name:'alice', city:'Boston'},
//         {name: 'amy', city:'portland'}];
// };
// myapp.controller(controllers);

