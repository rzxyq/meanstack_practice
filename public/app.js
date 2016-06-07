/**
 * Created by ruoyanqin on 6/6/16.
 */
var msw = angular.module("meanstackwalkthrough", ['ngRoute']);
msw.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        controller: 'AppCtrl',
        templateUrl: 'View1.html'
    }).when('/partial2', {
        controller: 'AppCtrl',
        templateUrl: 'View2.html'
    }).otherwise({
        redirectTo: '/'
    });
        $locationProvider.html5Mode(true);
}])
    .factory('simpleFactory', function($http) {
        // $http.get('http://localhost:3000/products').then(function(res){
        //     var factory = {};
        //     var people = [{name:'dave',city:'NY'},
        //         {name:'bbbbb', city:'Boston'},
        //         {name: 'haha', city:'portland'}];
        //     factory.getCustomers = function() {
        //         return json;
        //     }
        //     return factory;
        // });
        var factory = {};
        var people = [{name:'dave',city:'NY'},
            {name:'bbbbb', city:'Boston'},
            {name: 'haha', city:'portland'}];
        factory.getCustomers = function() {
            return people;
        }
        return factory;
    })
    .controller("AppCtrl", function($scope, simpleFactory){
    $scope.people = simpleFactory.getCustomers();
})
    .controller('ControllerWithoutFactory', function($scope) {
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
