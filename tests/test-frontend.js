describe('AngularJS test suite', function() {
    beforeEach(module('meanstackwalkthrough'));

    it('should have tests', function() {
        expect(true).toBe(true);
    });

    var ctrl, scope;

    beforeEach(inject(function($controller, $rootScope){
        scope = $rootScope.$new();
        ctrl = $controller('SimpleController', {
            $scope: scope
        });
    }));
    it('should do this', function(){
        expect(scope.people.length).toBe(3);
    })

    // it('should inject dependencies', function(){
    //     angular.mock.inject(function(LinkedInCtrl){
    //         expect(LinkedInCtrl).toBeDefined();
    //     })
    // });
    //
    // it('should return products list on load', function () {
    //     var $scope = {};
    //     var AppCtrl = $controller('AppCtrl', { $scope: $scope });
    //     expect($scope.people).toEqual([{name:'dave',city:'NY'},
    //         {name:'bbbbb', city:'Boston'},
    //         {name: 'haha', city:'portland'}]);
    // });

});