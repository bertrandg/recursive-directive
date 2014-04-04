
// help > http://sporto.github.io/blog/2013/06/24/nested-recursive-directives-in-angular/

app.directive("segmentBuilderGroup", function() {
    return {
        restrict: "E",
        replace: true,
        scope: {
            data: '=',
            level: '=',
            duplicatePlease: '&',
            deletePlease: '&'
        },
        templateUrl:  'segmentBuilderGroupTpl',
        controller: function($scope, $rootScope, SegmentBuilder) {
            
            var getPositionNewElement = function() {
                var maxPositionValue = 0;
                angular.forEach($scope.data.elements, function(value, key) {
                    if(value.position > maxPositionValue) maxPositionValue = value.position;
                });
                return maxPositionValue + 1;
            }
            
            var getElement = function(id) {
                var elem = null;
                angular.forEach($scope.data.elements, function(value, key) {
                    if(value.id == id) elem = value;
                });
                return elem;
            }
            
            $scope.addElement = function(type) {
                var newElem,
                    newPosition = getPositionNewElement();
                
                switch(type) {
                    case 'criterion':
                        newElem = SegmentBuilder.getNewCriterion(newPosition);
                        break;
                    case 'segment':
                        newElem = SegmentBuilder.getNewSegment(newPosition);
                        break;
                    case 'group':
                        newElem = SegmentBuilder.getNewGroup(newPosition);
                        break;
                }
                $scope.data.elements.push(newElem);
                
                $rootScope.$broadcast(SegmentBuilder.events.name, SegmentBuilder.events.type.UPDATE_PRICE);
            }
            
            // id could be a criterion, segment, or group
            $scope.duplicateElement = function(id) {
                var element = getElement(id);
                
                if(element) {
                    var duplicate_element = SegmentBuilder.duplicateElement(element, getPositionNewElement());
                    $scope.data.elements.push(duplicate_element);
                }
                
                $rootScope.$broadcast(SegmentBuilder.events.name, SegmentBuilder.events.type.UPDATE_PRICE);
            }
            
            // id could be a criterion, segment, or group
            $scope.deleteElement = function(id) {
                var start = $scope.data.elements.length - 1;
                for(var i = start; i >= 0; i--) {
                    if($scope.data.elements[i].id === id) {
                        $scope.data.elements.splice(i, 1);
                    }
                }
                
                $rootScope.$broadcast(SegmentBuilder.events.name, SegmentBuilder.events.type.UPDATE_PRICE);
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
            level: '=',
            duplicatePlease: '&',
            deletePlease: '&'
        },
        template: '',
        link: function (scope, element, attrs) {
            var subElementsString = '<segment-builder-group data="data"\
                                                            level="level"\
                                                            delete-please="deletePlease({id: data.id})"\
                                                            duplicate-please="duplicatePlease({id: data.id})"></segment-builder-group>';
            
            if (angular.isArray(scope.data.elements)) {       
                $compile(subElementsString)(scope, function(cloned, scope) {
                    element.append(cloned); 
                });
            }
        },
        controller: function($scope) {}
    };
});

app.directive('groupRelation', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            data: '='
        },
        template:  '<span>\
                        <select ng-model="data"\
                                ng-options="item.value as item.name for item in listRelation"\
                                class="form-control input-sm">\
                        </select>\
                    </span>',
        controller: function($scope, SegmentBuilder) {
            $scope.listRelation = SegmentBuilder.groupInfo.relation;
        },
        link: function(scope, element, attrs) {}
    };
});


app.directive('segmentBuilderCriterion', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            data: '=',
            duplicatePlease: '&',
            deletePlease: '&'
        },
        template:  '<div class="condition form-inline">\
                        <dp-selector data="data.criterion"></dp-selector>\
                        <dp-operator data="data.operator"></dp-operator>\
                        <dp-value data="data.value"></dp-value>\
                        <dp-mode data="data.mode"></dp-mode>\
                        <dp-threshold data1="data.thresholdValue" data2="data.thresholdUnit" ng-show="showThreshold()"></dp-threshold>\
                        <dp-recency data="data.recency"></dp-recency>\
                        <element-price data="data.criterion.price"></element-price>\
                        <button ng-click="deletePlease({id: data.id})" class="btn btn-sm btn-danger align-right"><span class="glyphicon glyphicon-trash"></span></button>\
                        <button ng-click="duplicatePlease({id: data.id})" class="btn btn-sm btn-primary align-right"><span class="glyphicon glyphicon-tags"></span></button>\
                    </div>',
        controller: function($scope) {
            
            $scope.showThreshold = function() {
                return ['at_least_one', 'none', 'all'].indexOf($scope.data.mode) < 0;
            }
        },
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
                        <select ng-model="data"\
                                ng-options="item.value as item.name for item in listOperator"\
                                class="form-control input-sm">\
                        </select>\
                    </span>',
        controller: function($scope, SegmentBuilder) {
            $scope.listOperator = SegmentBuilder.criterionInfo.operator;
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
                        <select ng-model="data"\
                                ng-options="item.value as item.name for item in listMode"\
                                class="form-control input-sm">\
                        </select>\
                    </span>',
        controller: function($scope, SegmentBuilder) {
            $scope.listMode = SegmentBuilder.criterionInfo.mode;
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
        template:  '<span class="threshold">\
                        <input type="text" class="form-control input-sm" name="name" ng-model="data1"/>\
                        <select ng-model="data2"\
                                ng-options="item.value as item.name for item in listThresholdUnit"\
                                class="form-control input-sm">\
                        </select>\
                    </span>',
        controller: function($scope, SegmentBuilder) {
            $scope.listThresholdUnit = SegmentBuilder.criterionInfo.thresholdUnit;
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

app.directive('elementPrice', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            data: '='
        },
        template:  '<span>\
                        <span class="label label-info">{{ data | currency }}</span>\
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
            duplicatePlease: '&',
            deletePlease: '&'
        },
        template:  '<div class="condition form-inline">\
                        <span>SEGMENT: {{ data.id }}</span>\
                        <input type="text" class="form-control input-sm" name="name" ng-model="data.segment.name"/>\
                        <element-price data="data.segment.price"></element-price>\
                        <button ng-click="deletePlease({id: data.id})" class="btn btn-sm btn-danger align-right"><span class="glyphicon glyphicon-trash"></span></button>\
                        <button ng-click="duplicatePlease({id: data.id})" class="btn btn-sm btn-primary align-right"><span class="glyphicon glyphicon-tags"></span></button>\
                    </div>',
        controller: function($scope) {},
        link: function(scope, element, attrs) {}
    };
});
