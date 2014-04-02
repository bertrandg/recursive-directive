
// help > http://sporto.github.io/blog/2013/06/24/nested-recursive-directives-in-angular/

app.directive("segmentBuilderGroup", function() {
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
                            <li ng-repeat="element in data.elements | orderBy:\'position\'"\
                                class="level-{{ data.level }}"\
                                ng-class="{true:\'li-group group-conditions\', false:\'li-condition\'}[element.type == \'group\']">\
                                <span class="special-info">LEVEL {{ element.level }} > POSITION: {{ element.position + \' (\' + element.id + \')\' }}</span>\
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
                            <h4 class="empty-group">Please add a datapoint, a segment, or an other group.</h4>\
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

app.directive("segmentBuilderElement", function($compile) {
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
        controller: function($scope) {}
    };
});


app.directive('segmentBuilderDatapoint', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            data: '=',
            deletePlease: '&'
        },
        template:  '<div class="condition form-inline">\
                        <dp-selector data="data.datapoint"></dp-selector>\
                        <dp-operator data="data.operator"></dp-operator>\
                        <dp-value data="data.value"></dp-value>\
                        <dp-mode data="data.mode"></dp-mode>\
                        <dp-threshold data1="data.thresholdValue" data2="data.thresholdUnit"></dp-threshold>\
                        <button ng-click="deletePlease({id: data.id})" class="btn btn-sm btn-danger">DELETE</button>\
                    </div>',
        controller: function($scope) {},
        link: function(scope, element, attrs) {}
    };
});


app.directive('dpSelector', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            data: '='
        },
        template:  '<span>\
                        <input type="text" class="form-control input-sm" name="name" ng-model="data.name"/>\
                    </span>',
        controller: function($scope) {},
        link: function(scope, element, attrs) {}
    };
});

app.directive('dpOperator', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            data: '='
        },
        template:  '<span>\
                        <select class="form-control input-sm">\
                            <option ng-repeat="item in listOperator" ng-selected="item.value == data">{{ item.name }}</option>\
                        </select>\
                    </span>',
        controller: function($scope, SegmentBuilder) {
            $scope.listOperator = SegmentBuilder.datapointInfo.operator;
        },
        link: function(scope, element, attrs) {}
    };
});

app.directive('dpValue', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            data: '='
        },
        template:  '<span>\
                        <input type="text" class="form-control input-sm" name="name" ng-model="data"/>\
                    </span>',
        controller: function($scope) {},
        link: function(scope, element, attrs) {}
    };
});

app.directive('dpMode', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            data: '='
        },
        template:  '<span>\
                        <select class="form-control input-sm">\
                            <option ng-repeat="item in listMode" ng-selected="item.value == data">{{ item.name }}</option>\
                        </select>\
                    </span>',
        controller: function($scope, SegmentBuilder) {
            $scope.listMode = SegmentBuilder.datapointInfo.mode;
        },
        link: function(scope, element, attrs) {}
    };
});

app.directive('dpThreshold', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            data1: '=',
            data2: '='
        },
        template:  '<span>\
                        <input type="text" class="form-control input-sm" name="name" ng-model="data1"/>\
                        <select class="form-control input-sm">\
                            <option ng-repeat="item in listThresholdUnit" ng-selected="item.value == data2">{{ item.name }}</option>\
                        </select>\
                    </span>',
        controller: function($scope, SegmentBuilder) {
            $scope.listThresholdUnit = SegmentBuilder.datapointInfo.thresholdUnit;
        },
        link: function(scope, element, attrs) {}
    };
});

app.directive('dpRecency', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            data: '='
        },
        template:  '<span>\
                        <input type="text" class="form-control input-sm" name="recency" ng-model="data"/>\
                    </span>',
        controller: function($scope) {},
        link: function(scope, element, attrs) {}
    };
});







app.directive('segmentBuilderSegment', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            data: '=',
            deletePlease: '&'
        },
        template:  '<div class="condition form-inline">\
                        <span>SEGMENT: {{ data.id }}</span>\
                        <input type="text" class="form-control input-sm" name="name" ng-model="data.segment.name"/>\
                        <button ng-click="deletePlease({id: data.id})" class="btn btn-sm btn-danger">DELETE</button>\
                    </div>',
        controller: function($scope) {},
        link: function(scope, element, attrs) {}
    };
});
