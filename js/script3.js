
// http://sporto.github.io/blog/2013/06/24/nested-recursive-directives-in-angular/

var appTest = angular.module('appTest', ['ngAnimate']);

appTest.controller('MainController', function($scope, SegmentBuilder) {
  
    $scope.titi = 'Test 3';
    
    $scope.dataMainGroup = SegmentBuilder.currentSegment;
  
});



appTest.directive("segmentBuilderGroup", function($compile) {
    return {
        restrict: "E",
        replace: true,
        scope: {
            data: '=',
            deletePlease: '&'
        },
        template:  '<li class="">\
                        <div class="options">\
                            <p>GROUP: {{ data.id }}</p>\
                            <button ng-click="addDatapoint()" class="btn btn-xs btn-primary">+CRITERE</button>\
                            <button ng-click="addSegment()" class="btn btn-xs btn-primary">+SEGMENT</button>\
                            <button ng-click="addGroup()" class="btn btn-xs btn-primary">+GROUP</button>\
                            <button ng-click="deletePlease({id: data.id})" class="btn btn-xs btn-danger" ng-if="data.level > 0">DELETE</button>\
                        </div>\
                        <ul ng-show="data.elements.length > 0">\
                            <li ng-repeat="element in data.elements"\
                                class="li-group level-{{ data.level }}"\
                                ng-class="{true:\'group-conditions\', false:\'li-condition\'}[element.type == \'group\']">\
                                <span class="special-info">LEVEL {{ element.level }} > POSITION: {{ element.position + \'(\' + element.type + \')\' }}</span>\
                                <div ng-switch="element.type">\
                                    <div ng-switch-when="segment">\
                                        <segment-builder-segment data="element" delete-please="deleteElement(id)"></segment-builder-segment>\
                                    </div>\
                                    <div ng-switch-when="datapoint">\
                                        <segment-builder-datapoint data="element" delete-please="deleteElement(id)"></segment-builder-datapoint>\
                                    </div>\
                                    <div ng-switch-when="group">\
                                        <segment-builder-element data="element" delete-please="deleteElement(id)"></segment-builder-element>\
                                    </div>\
                                </div>\
                            </li>\
                        </ul>\
                        <div ng-if="data.elements.length == 0">\
                            <h4>EMPTY GROUP > please add a datapoint, a segment, or an other group.</h4>\
                        </div>\
                    </li>',
        controller: function($scope, SegmentBuilder) {
            
            var getPositionNewElement = function() {
                var maxPositionValue = 0;
                angular.forEach($scope.data.elements, function(value, key){
                    if(value.position > maxPositionValue) maxPositionValue = value.position;
                });
                return maxPositionValue + 1;
            }
            
            $scope.addDatapoint = function() {
                $scope.data.elements.push( SegmentBuilder.getNewDatapoint($scope.data.level+1, getPositionNewElement()) );
            }
            $scope.addSegment = function() {
                $scope.data.elements.push( SegmentBuilder.getNewSegment($scope.data.level+1, getPositionNewElement()) );
            }
            $scope.addGroup = function() {
                $scope.data.elements.push( SegmentBuilder.getNewGroup($scope.data.level+1, getPositionNewElement()) );
            }
            
            // id could be a datapoint, segment, or group
            $scope.deleteElement = function(id) {
                var start = $scope.data.elements.length - 1;
                for(var i = start; i >= 0; i--) {
                    if($scope.data.elements[i].id === id) {
                        $scope.data.elements.splice(i, 1);
                    }
                }
            }
        },
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
            
            var subElementsString = '<segment-builder-group data="data" delete-please="deletePlease({id: data.id})"></segment-builder-group>';
            if (angular.isArray(scope.data.elements)) {       
              
                $compile(subElementsString)(scope, function(cloned, scope)   {
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

appTest.factory('SegmentBuilder', function() {
    var currentSegmentDetail = {
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
    
    var new_datapoint = {
        level: -1,
        position: -1,
        type: 'datapoint',
        id: '-1',
        datapoint: {id: '987864', name: 'Resolution', code: 'a.g.r', price: 650000},
        operator: 'contains',
        value: '',
        mode: 'atLeastOnce',
        thresholdValue: 0,
        thresholdUnit: 'time',
        recency: 0
    };
    
    var new_segment = {
        level: -1,
        position: -1,
        type: 'segment',
        id: '-1',
        segment: {id: '648648', name: 'segment bien bien bien', price: 544000}
    };
    
    var new_group = {
        level: -1,
        position: -1,
        type: 'group',
        id: '-1',
        relation: 'and',
        elements: []
    };
    
    
    var getNewDatapoint = function(level, position) {
        var datapoint = angular.copy(new_datapoint);
        datapoint.id = 'datapoint' + Math.floor((Math.random()*100000)+1);
        datapoint.level = level;
        datapoint.position = position;
        return datapoint;
    };
    
    var getNewSegment = function (level, position) {
        var segment = angular.copy(new_segment);
        segment.id = 'segment' + Math.floor((Math.random()*100000)+1);
        segment.level = level;
        segment.position = position;
        return segment;
    };
    
    var getNewGroup = function (level, position) {
        var group = angular.copy(new_group);
        group.id = 'group' + Math.floor((Math.random()*100000)+1);
        group.level = level;
        group.position = position;
        return group;
    };

    return {
        getNewDatapoint: getNewDatapoint,
        getNewSegment: getNewSegment,
        getNewGroup: getNewGroup,
        currentSegment: currentSegmentDetail
    };
});