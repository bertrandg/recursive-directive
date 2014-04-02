
var appTest = angular.module('appTest', ['ngAnimate']);

appTest.controller('MainController', function($scope, $rootScope) {
  
	$scope.titi = 'Test 1';
	
	$rootScope.drag = {
		draggedElement: null,
//		operationInProgress: false
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


appTest.controller('TestController', function($scope) {
  
  $scope.conditionTest = {id: 'c8277', type: 'segment', data: {name: 'segment drfgkj hergkh'}};
  
  $scope.deleteCondition = function(id) {
    console.log('$scope.deleteCondition > ', id);
  }
  
});


appTest.directive('groupConditions', function($compile) {
	return {
		restrict: 'E',
		replace: true,
		transclude: false,
		terminal: true,
		scope: {
			data: '=',
			deletePlease: '&'
		},
		link: function(scope, element, attrs) {
			var groupsElement = angular.element('\
	          <div class="group-conditions level-{{ data.level  }}" drop>\
	            <div class="options" ng-class="{\'drag-in-progress\': drag.inProgress}" \>\
	    		  <span class="glyphicon glyphicon-hand-right"></span>\
	              <p>GROUPE LEVEL {{ data.level+ \' - \' + data.id }}</p>\
	              <button ng-click="addCritere()" class="btn btn-xs btn-primary">+CRITERE</button>\
	              <button ng-click="addSegment()" class="btn btn-xs btn-primary">+SEGMENT</button>\
	              <button ng-click="addGroup()" class="btn btn-xs btn-primary">+GROUP</button>\
	              <button ng-if="data.level > 0"\
	                      ng-click="deletePlease({id: data.id})"\
	                      class="btn btn-xs btn-danger">DELETE</button>\
	            </div>\
	            <ul>\
	              <li ng-repeat="condition in data.conditions" \
		    		  class="li-condition" \
		    		  ng-class="{\'drag-in-progress\': drag.inProgress}" \
		    		  drag="condition">\
	                <condition  position="$index"\
	                            id="condition.id"\
	                            type="condition.type"\
	                            data="condition.data"\
	                            delete-please="deleteCondition(id)"></condition>\
	              </li>\
	              <li ng-repeat="group in data.groups" class="li-group">\
	                <group-conditions data="group"\
	                                  delete-please="deleteGroup(id)"\></group-conditions>\
	              </li>\
	            </ul>\
	          </div>');
			console.log('COMPILATION DE ', scope.data.id, ' > ', scope);
      
//			$compile(groupsElement)(scope);
//			element.append(groupsElement);
			

	        //compile the view into a function.
	        var compiled = $compile(groupsElement);

	        //append our view to the element of the directive.
	        element.append(groupsElement);

	        //bind our view to the scope!
	        //(try commenting out this line to see what happens!)
	        compiled(scope);
	    },
	    controller: function($scope, $rootScope) {
			  
			var critereModel = {type: 'datapoint', data: {name: 'toto datapoint', delay: 30}};
			var segmentModel = {type: 'segment', data: {name: 'segment de la muerte'}};
			var groupModel = {conditions: [], groups: []};
			
            $scope.drag = {
        		inProgress: false
            };
            
            var cleanup = $rootScope.$on('dragInProgress', function(event, value) {
            	console.log($scope.data.id + ' - dragInProgress = ', value);
            	
            	$scope.$apply(function() {
            		$scope.drag.inProgress = value;
            	});
            });
            
            $scope.$on('$destroy', function() {
				cleanup();
			});
			
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
				$rootScope.$broadcast('dragInProgress', true);
				$rootScope.drag.draggedElement = scope.dragData;
				dragStart(evt, element);
			});
			
			element.bind('dragend', function(evt) {
				$rootScope.$broadcast('dragInProgress', false);
				dragEnd(evt, element);
			});
		}
	}
}]);



appTest.directive("drop", ['$rootScope', function($rootScope) {
		  
	function dragEnter(evt, element) {
		evt.preventDefault();
		element.addClass('drop-in-progress');
	};
	function dragLeave(evt, element) {
		element.removeClass('drop-in-progress');
	};
	function dragOver(evt) {
		evt.preventDefault();
	};
	function drop(evt, element) {
		evt.preventDefault();
		element.removeClass('drop-in-progress');
	};
		  
	return {
		restrict: 'A',
		link: function(scope, element, attrs)  {
			scope.dropData = scope[attrs["drop"]];
			
			element.bind('dragenter', function(evt) { console.log('dragenter');
				dragEnter(evt, element);
			});
			
			element.bind('dragleave', function(evt) { console.log('dragleave');
				dragLeave(evt, element);
			});
			
			element.bind('dragover', dragOver);
			element.bind('drop', function(evt) { console.log('drop');
				drop(evt, element);
				$rootScope.$broadcast('dropEvent', $rootScope.drag.draggedElement, scope.dropData);
			});
		}
	}
}]);
