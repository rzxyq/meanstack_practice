/**
 * Created by ruoyanqin on 6/6/16.
 */

angular.module("meanstackwalkthrough", ['ngRoute', 'meanstackwalkthrough.services', 'meanstackwalkthrough.controllers'])

    .config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/view1/:id', {
            controller: 'AppCtrl',
            templateUrl: 'View1.html'
        }).when('/view2', {
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
    }]);

