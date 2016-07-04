angular.module("meanstackwalkthrough.controllers", [])

    .controller("AppCtrl", function($scope, simpleFactory){
        $scope.people = simpleFactory.getCustomers();
    })
    .controller("ComplicatedCtrl", function($scope, complicatedFactory){
        complicatedFactory.getCustomers().success(function(response){
            $scope.people = response;
        });
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