describe('Friends Unit Tests', function(){
    var Friends;
    beforeEach(module('meanstackwalkthrough.services'));

    beforeEach(inject(function (_simpleFactory_) {
        simpleFactory = _simpleFactory_;
    }));

    it('can get an instance of my factory', inject(function(simpleFactory) {
        expect(simpleFactory).toBeDefined();
    }));

    it('has 5 chats', inject(function(simpleFactory) {
        expect(simpleFactory.getCustomers().length).toEqual(3);
    }));

    // it('has Max as friend with id 1', inject(function(Friends) {
    //     var oneFriend = {
    //         id: 1,
    //         name: 'Max Lynx',
    //         notes: 'Odd obsession with everything',
    //         face: 'https://avatars3.githubusercontent.com/u/11214?v=3&amp;s=460'
    //     };
    //
    //     expect(Friends.get(1).name).toEqual(oneFriend.name);
    // }));
});

describe('SimpleController', function() {
    beforeEach(module('meanstackwalkthrough.controllers'));
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

