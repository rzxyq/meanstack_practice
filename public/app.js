/**
 * Created by ruoyanqin on 6/6/16.
 */
var msw = angular.module("meanstackwalkthrough", ['ngRoute']);
msw.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        controller: 'SimpleController',
        templateUrl: 'View1.html'
    }).when('/partial2', {
        controller: 'SimpleController',
        templateUrl: 'View2.html'
    }).otherwise({
        redirectTo: '/'
    });
        $locationProvider.html5Mode(true);
}])
    .factory('simpleFactory', function() {
        var factory = {};
        var customers = ['alice', 'bob'];
        factory.getCustomers = function() {
            return customers;
        }
        return factory;
    })
    .controller("AppCtrl", function($scope, simpleFactory){
    $scope.customers = simpleFactory.getCustomers();
})
    .controller('SimpleController', function($scope) {
    $scope.people = [{name:'dave',city:'NY'},
        {name:'alice', city:'Boston'},
        {name: 'amy', city:'portland'}];
    $scope.addCustomer = function() {
        $scope.people.push({ name: $scope.newCustomer.name,
                                city: $scope.newCustomer.city});
    };
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
