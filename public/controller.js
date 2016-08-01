angular.module("meanstackwalkthrough.controllers", [])

    .controller("AppCtrl", function($scope, simpleFactory){
        $scope.people = simpleFactory.getCustomers();
    })
    .controller('IdCtrl', function($scope, $routeParams) {
            $scope.id = $routeParams.id;
            this.$routeParams = $routeParams;
            $scope.people = [{name:'dave',city:'NY'},
                {name:'alice', city:'Boston'},
                {name: 'amy', city:'portland'}];
            $scope.addCustomer = function() {
                $scope.people.push({ name: $scope.newCustomer.name,
                    city: $scope.newCustomer.city});
            };
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
    })

.controller('LinkedInCtrl', function($scope){
    $scope.getProfile = function(profile) {
        IN.Event.on(IN, "auth", getProfileData);
        IN.User.authorize(getProfileData(), $scope);
        // console.log('Success! LINKEDIN profile is:' + profile);
    }
    $scope.getCommitData = function() {
        IN.API.Profile("me").fields(
            [ "id", "firstName", "lastName", "pictureUrl",
                "publicProfileUrl" ]).result(function(result) {
            //set the model
            $scope.$apply(function() {
                $scope.jsondata = result.values[0];
            });
        }).error(function(err) {
            $scope.$apply(function() {
                $scope.error = err;
            });
        });
    };

    // Setup an event listener to make an API call once auth is complete
    function onLinkedInLoad() {
        IN.Event.on(IN, "auth", getProfileData);
    }

    // Use the API call wrapper to request the member's basic profile data
    function getProfileData() {
        IN.API.Raw("/people/~").result(onSuccess).error(onError);
    }

    // Handle the successful return from the API call
    function onSuccess(data) {
        console.log(data);
    }

    // Handle an error response from the API call
    function onError(error) {
        console.log(error);
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

