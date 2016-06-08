/**
 * Created by ruoyanqin on 6/6/16.
 */
var msw = angular.module("meanstackwalkthrough", ['ngRoute','ui.router']);
msw.config(
    function($routeProvider) {
    $routeProvider.when('/', {
        controller: 'AppCtrl',
        templateUrl: 'View1.html'
    }).when('/partial2', {
        controller: 'AppCtrl',
        templateUrl: 'View2.html'
    }).otherwise({
        redirectTo: '/'
    });
        // $urlRouteProvider.otherwise('/');
        // $stateProvider
        //     .state('home', {
        //         url:'/',
        //         templateUrl: 'View1.html',
        //     })
        //     .state('home2', {
        //         url:'/yeah',
        //         templateUrl: 'View1.html',
        //     })
})
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
    .factory('complicatedFactory', function($http) {
        var dataFactory = {};
        dataFactory.getCustomers = function () {
            data = $http.get('http://localhost:4000/products');

            console.log(data);
            return data;
        };
        return dataFactory;
    })
    .controller("AppCtrl", function($scope, simpleFactory){
    $scope.people = simpleFactory.getCustomers();
})
    .controller("ComplicatedCtrl", function($scope, complicatedFactory){
        complicatedFactory.getCustomers().success(function(response){
            $scope.people = response;
        });
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
