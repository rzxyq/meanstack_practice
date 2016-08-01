angular.module("meanstackwalkthrough.services", [])

    .factory('simpleFactory', ['$http', function($http) {
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
    }])
    .factory('complicatedFactory', ['$http', function($http) {
        var dataFactory = {};
        dataFactory.getCustomers = function () {
            data = $http.get('http://localhost:3000/products');
            return data;
        };
        return dataFactory;
    }])