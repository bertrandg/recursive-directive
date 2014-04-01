
// CHECK http://jsfiddle.net/DsvX6/7/ + http://stackoverflow.com/questions/19125551/angularjs-understanding-a-recursive-directive

var appTest = angular.module('appTest', ['ngAnimate']);

appTest.controller('MainController', function($scope, $rootScope) {
  
	$scope.titi = 'whisky a gogo';
	
	$rootScope.drag = {
		draggedElement: null,
		operationInProgress: false
	};
  
	$scope.dataMainGroup = {
		id: 'g3254',
		level: 0,
		conditions: [	{id: 'c8274', type: 'datapoint', data: {name: 'toto datapoint', delay: 30}},
						{id: 'c8275', type: 'segment', data: {name: 'segment de la muerte', id: 654}}, 
						{id: 'c8276', type: 'datapoint', data: {name: 'bibi datapoint'}}],
		groups: [{
			id: 'g154',
			level: 1,
			conditions: [{id: 'c8277', type: 'segment', data: {name: 'segment drfgkj hergkh'}}],
			groups: [
			    {
					id: 'g867',
					level: 2,
					conditions: [],
					groups: []
				}, 
				{
					id: 'g156',
					level: 2,
					conditions: [{id: 'c8278', type: 'segment', data: {name: 'dg segment dtg'}}],
					groups: []
				}]
		}, 
		{
			id: 'g8785',
			level: 1,
			conditions: [],
			groups: []
		}]
	};
});



appTest.directive("groupConditions", function($compile) {
    return {
        restrict: "E",
        //We are stating here the HTML in the element the directive is applied to is going to be given to the template with a ng-transclude directive to be compiled when processing the directive
        transclude: true,
		terminal: true,
        scope: {
        	data: '=',
			deletePlease: '&',
			bDragging: '='
        },
        template: '\
        	<div class="group-conditions">\
	        	<div ng-transclude></div>\
	            <ul>\
	        		<li ng-repeat="group in data.groups" class="li-group">\
	            		<group-conditions data="group"\
        								  delete-please="deleteGroup(id)"\
        	 							  b-dragging="bDragging">\
	                		<div ng-transclude></div>\
	                	</group-conditions>\
	                </li>\
	            </ul>\
            <div>',
        compile: function(tElement, tAttr, transclude) {
            // We are removing the contents/innerHTML from the element we are going to be applying the  directive to and saving it to adding it below to the $compile call as the template
            var contents = tElement.contents().remove();
            var compiledContents;
            
            return function(scope, iElement, iAttr) {
                if(!compiledContents) {
                    //Get the link function with the contents frome top level template with the transclude
                    compiledContents = $compile(contents, transclude);
                }
                // Call the link function to link the given scope and a Clone Attach Function, http://docs.angularjs.org/api/ng.$compile :
                // "Calling the linking function returns the element of the template. It is either the original element passed in, or the clone of the element if the cloneAttachFn is provided."
                compiledContents(scope, function(clone, scope) {
                    //Appending the cloned template to the instance element, "iElement", on which the directive is to used.
                	iElement.append(clone); 
                    iElement.find('.group-conditions').addClass('level-' + scope.data.level);
                });
            };
        },
        controller: function($scope, $rootScope) {
        	console.log('CONTROLLER $scope.bDragging = ', $scope.bDragging);
        	
        	
			var critereModel = {type: 'datapoint', data: {name: 'toto datapoint', delay: 30}};
			var segmentModel = {type: 'segment', data: {name: 'segment de la muerte'}};
			var groupModel = {conditions: [], groups: []};
			
			$scope.addCritere = function() {
				var data = angular.copy(critereModel);
				data.id = 'c' + Math.floor((Math.random()*100000)+1);
				$scope.data.conditions.push(data);
			}
			$scope.addSegment = function() {
				var data = angular.copy(segmentModel);
				data.id = 'c' + Math.floor((Math.random()*100000)+1);
				$scope.data.conditions.push(data);
			}
			
			$scope.addGroup = function() {
				var data = angular.copy(groupModel);
				data.id = 'g' + Math.floor((Math.random()*100000)+1);
				data.level = $scope.data.level+1;
				$scope.data.groups.push(data);
			}
			
			$scope.deleteCondition = function(id) {
				var start = $scope.data.conditions.length - 1;
				for(var i = start; i >= 0; i--) {
					if($scope.data.conditions[i].id === id) {
						$scope.data.conditions.splice(i, 1);
					}
				}
			}
			
			$scope.deleteGroup = function(id) {
				var start = $scope.data.groups.length - 1;
				for(var i = start; i >= 0; i--) {
					if($scope.data.groups[i].id === id) {
						$scope.data.groups.splice(i, 1);
					}
				}
			}
        }
    };
});


appTest.directive('condition', function() {
	return {
	    restrict: 'E',
	    replace: true,
	    transclude: false,
	    scope: {
			id: '=',
			position: '=',
			type: '=',
			data: '=',
			deletePlease: '&',
	    },
	    template: '<div class="condition form-inline">\
  		  			  <span class="glyphicon glyphicon-hand-right"></span>\
	                  <span>{{ position + " > " + type + " - " + id }}</span>\
	                  <input type="text" class="form-control input-sm" name="name" ng-model="data.name"/>\
	                  <input type="text" class="form-control input-sm" name="condition"/>\
	                  <button ng-click="deletePlease({id: id})" class="btn btn-sm btn-danger">DELETE</button>\
	              </div>',
	    controller: function($scope, $rootScope) {
	    },
	    link: function(scope, element, attrs) {
	    }
  };
});


appTest.directive("drag", ["$rootScope", function($rootScope) {
	  
	function dragStart(evt, element) {
		element.addClass('drag-in-progress');
		evt.originalEvent.dataTransfer.setData("id", evt.target.id);
		evt.originalEvent.dataTransfer.effectAllowed = 'move';
	};
	function dragEnd(evt, element) {
		element.removeClass('drag-in-progress');
	};

	return {
		restrict: 'A',
		link: function(scope, element, attrs)  {
			attrs.$set('draggable', 'true');
			scope.dragData = scope[attrs["drag"]];
			
			element.bind('dragstart', function(evt) {
				scope.$apply(function() {
		    		$rootScope.drag.operationInProgress = true;
		    		$rootScope.drag.draggedElement = scope.dragData;
		    		dragStart(evt, element);
		    	});
			});
			
			element.bind('dragend', function(evt) {
				scope.$apply(function() {
					$rootScope.drag.operationInProgress = false;
					dragEnd(evt, element);
				});
			});
		}
	}
}]);
