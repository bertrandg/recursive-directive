
// http://sporto.github.io/blog/2013/06/24/nested-recursive-directives-in-angular/

var appTest = angular.module('appTest', ['ngAnimate']);

appTest.controller('MainController', function($scope, $rootScope) {
  
    $scope.titi = 'Test 3';
    
    $rootScope.drag = {
        draggedElement: null,
        operationInProgress: false
    };
    
    $scope.dataMainGroup = {
        level: 0,
        position: 1,
        type: 'group',
        id: 'group35848',
        relation: 'and',
        elements: [
            {
                level: 1,
                position: 1,
                type: 'datapoint',
                id: 'datapoint65848',
                datapoint: {id: '754564', name: 'Gender', code: 'v.f.g', price: 60000},
                operator: 'contains',
                value: 'homme',
                mode: 'atLeastOnce',
                thresholdValue: 12,
                thresholdUnit: 'percentage',
                recency: 12
            },
            {
                level: 1,
                position: 4,
                type: 'group',
                id: 'group8979',
                relation: 'or',
                elements: [
                    {
                        level: 2,
                        position: 6,
                        type: 'group',
                        id: 'group2316',
                        relation: 'and',
                        elements: []
                    },
                    {
                        level: 2,
                        position: 4,
                        type: 'segment',
                        id: 'segment871528',
                        segment: {id: '847616', name: 'segment de la muerte', price: 84000}
                    },
                    {
                        level: 2,
                        position: 1,
                        type: 'group',
                        id: 'group21384',
                        relation: 'or',
                        elements: [
                            {
                                level: 3,
                                position: 1,
                                type: 'segment',
                                id: 'segment819954',
                                segment: {id: '51655', name: 'the segment xyz', price: 9100}
                            },
                            {
                                level: 3,
                                position: 3,
                                type: 'datapoint',
                                id: 'datapoint87195',
                                datapoint: {id: '54159', name: 'Keyword', code: 's.w.w', price: 156000},
                                operator: 'contains',
                                value: 'toto',
                                mode: '>',
                                thresholdValue: 51,
                                thresholdUnit: 'time',
                                recency: 51
                            }
                        ]
                    }
                ]
            },
            {
                level: 1,
                position: 2,
                type: 'segment',
                id: 'segment8944',
                segment: {id: '7568468', name: 'mon segment toto', price: 42000}
            },
            {
                level: 1,
                position: 3,
                type: 'group',
                id: 'group54614',
                level: 1,
                relation: 'and',
                elements: []
            },
            {
                level: 1,
                position: 12,
                type: 'datapoint',
                id: 'datapoint68789',
                datapoint: {id: '7413235', name: 'Browser', code: 's.w.b', price: 10000},
                operator: 'contains',
                value: 'opera',
                mode: 'atLeastOnce',
                thresholdValue: 0,
                thresholdUnit: 'time',
                recency: 100
            },
        ]
        
    };
  
});



appTest.directive("segmentBuilderGroup", function($compile) {
    return {
        restrict: "E",
        replace: true,
        scope: {
            data: '=',
            deletePlease: '&'
        },
        template:  '<li class="li-group">\
                        <div class="options">\
                            <span class="glyphicon glyphicon-hand-right"></span>\
                            <p>GROUP: {{ data.id }}</p>\
                            <button ng-click="addCritere()" class="btn btn-xs btn-primary">+CRITERE</button>\
                            <button ng-click="addSegment()" class="btn btn-xs btn-primary">+SEGMENT</button>\
                            <button ng-click="addGroup()" class="btn btn-xs btn-primary">+GROUP</button>\
                            <button ng-click="deletePlease({id: data.id})" class="btn btn-xs btn-danger" ng-if="data.level > 0">DELETE</button>\
                        </div>\
                        <ul>\
                            <li ng-repeat="element in data.elements"\
                                ng-class="{true:\'group-conditions level-1\', false:\'li-condition\'}[element.type == \'group\']">\
                                <span class="special-info">LEVEL {{ element.level }} > POSITION: {{ element.position + \'(\' + element.type + \')\' }}</span>\
                                <div ng-switch="element.type">\
                                    <div ng-switch-when="segment">\
                                        <segment-builder-segment data="element"></segment-builder-segment>\
                                    </div>\
                                    <div ng-switch-when="datapoint">\
                                        <segment-builder-datapoint data="element"></segment-builder-datapoint>\
                                    </div>\
                                    <div ng-switch-when="group">\
                                        <segment-builder-element data="element"></segment-builder-element>\
                                    </div>\
                                </div>\
                            </li>\
                        </ul>\
                    </li>',
    };
});

appTest.directive("segmentBuilderElement", function($compile) {
    return {
        restrict: "E",
        replace: true,
        scope: {
            data: '=',
            deletePlease: '&'
        },
        template: '',
        link: function (scope, element, attrs) {
            
            var collectionSt = '<segment-builder-group data="data"></segment-builder-group>';
            if (angular.isArray(scope.data.elements)) {       
              
                $compile(collectionSt)(scope, function(cloned, scope)   {
                    element.append(cloned); 
                });
            }
            
        },
        controller: function($scope, $rootScope) {
        }
    };
});


appTest.directive('segmentBuilderDatapoint', function() {
    return {
        restrict: 'E',
        replace: true,
        transclude: false,
        scope: {
            data: '=',
            deletePlease: '&'
        },
        template:  '<div class="condition form-inline">\
                        <span>DATAPOINT: {{ data.id }}</span>\
                        <button ng-click="deletePlease({id: data.id})" class="btn btn-sm btn-danger">DELETE</button>\
                    </div>',
        controller: function($scope, $rootScope) {
        },
        link: function(scope, element, attrs) {
        }
    };
});

appTest.directive('segmentBuilderSegment', function() {
    return {
        restrict: 'E',
        replace: true,
        transclude: false,
        scope: {
            data: '=',
            deletePlease: '&'
        },
        template:  '<div class="condition form-inline">\
                        <span>SEGMENT: {{ data.id }}</span>\
                        <button ng-click="deletePlease({id: data.id})" class="btn btn-sm btn-danger">DELETE</button>\
                    </div>',
        controller: function($scope, $rootScope) {
        },
        link: function(scope, element, attrs) {
        }
    };
});