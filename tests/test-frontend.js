describe('SimpleController', function() {
    beforeEach(module('meanstackwalkthrough'));
    var ctrl, scope;
    beforeEach(inject(function($controller, $rootScope){
        scope = $rootScope.$new(); //reset rootscope
        ctrl = $controller('SimpleController', {
            $scope: scope
        });
    }));

    it('should have tests', function() {
        expect(true).toBe(true);
    });

    it('should give people back', function(){
        expect(scope.people.length).toBe(3);
    })
});

describe('AppCtrl', function() {
    beforeEach(module('meanstackwalkthrough'));
    var ctrl, scope;
    var testservice;
    var q;
    var deferred;
    beforeEach(function(){
        testservice = {
            getCustomers:function(){
                return [{name:'test1',city:'NY'},
                    {name:'test2', city:'Boston'}];
            }
        }
    });
    beforeEach(inject(function($controller, $rootScope){
        scope = $rootScope.$new();
        ctrl = $controller('AppCtrl', {
            $scope: scope,
            simpleFactory: testservice
        });
    }));

    it('should have tests', function() {
        expect(true).toBe(true);
    });

    it('should give people back', function(){
        expect(scope.people.length).toBe(2);
    });

    it('test spy', function(){
        spyOn(testservice, 'getCustomers');
        scope.init();
        expect(testservice.getCustomers).toHaveBeenCalled();
    })
});

