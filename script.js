
var appTest = angular.module('appTest', []);

appTest.controller('MainController', function($scope) {
  
  $scope.titi = 'FUCK';
  $scope.dataMainGroup = {
        level: 0,
        conditions: [{type: 'datapoint', data: {name: 'toto datapoint', delay: 30}},
                     {type: 'segment', data: {name: 'segment de la muerte', id: 654}}, 
                     {type: 'datapoint', data: {name: 'bibi datapoint', id: 654}}],
        groups: [{
          level: 1,
          conditions: [{type: 'segment', data: {name: 'segment drfgkj hergkh', id: 78}}],
          groups: [{
            level: 2,
            conditions: [],
            groups: []
          }, 
          {
            level: 2,
            conditions: [{type: 'segment', data: {name: 'dg segment dtg', id: 54}}],
            groups: []
          }]
        }, 
        {
          level: 1,
          conditions: [],
          groups: []
        }]
  };
  
});


appTest.directive('groupConditions', function($compile) {
  return {
    restrict: 'E',
    replace: false,
    transclude: false,
    scope: {
      data: '='
    },
    controller: function($scope) {},
    link: function(scope, element, attrs) {
      
      var template = '<div class="group-conditions">\
                        <div class="options">GROUPE LEVEL {{ data.level }}</div>\
                        <ul>\
                          <li ng-repeat="condition in data.conditions">\
                            <condition position="$index" type="condition.type" data="condition.data"></condition>\
                          </li>';
      
      if(scope.data.groups.length > 0) {
        template +=       '<li ng-repeat="group in data.groups">\
                            <group-conditions data="group"></group-conditions>\
                          </li>';
      }
      
      template +=      '</ul>\
                      </div>';
      
      var groupsElement = angular.element(template);
      $compile(groupsElement)(scope);
      element.append(groupsElement);
      
    }
  };
});

appTest.directive('condition', function() {
  return {
    restrict: 'E',
    replace: false,
    transclude: false,
    scope: {
      position: '=',
      type: '=',
      data: '='
    },
    template: '<div class="condition">\
                  <span>{{ position + " > " + data.name + " - " + data.type }}</span>\
                  <input type="text" name="condition"/>\
              </div>',
    controller: function($scope) {
      console.log('condition - data = ', $scope.data, ' / type=', $scope.type);
    },
    link: function() {}
  };
});