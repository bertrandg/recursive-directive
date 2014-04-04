
app.controller('MainController', function($scope, $rootScope, SegmentBuilder) {
  
    $scope.titi = 'Test 3';
    
    $scope.segment = {
        totalPrice: SegmentBuilder.getCurrentSegmentPrice()
    };
    
    $scope.dataMainGroup = SegmentBuilder.currentSegment;
    
    $scope.$on(SegmentBuilder.events.name, function(event, type) {
        console.log('segmentBuilderEvent - event = ', event, ' / type = ', type);
        
        switch(type) {
            case SegmentBuilder.events.type.UPDATE_PRICE:
                $scope.segment.totalPrice = SegmentBuilder.getCurrentSegmentPrice();
                break;
            case SegmentBuilder.events.type.OPEN_SEGMENT_SELECTOR:
                //
                break;
            case SegmentBuilder.events.type.OPEN_DATAPOINT_SELECTOR:
                //
                break;
        }
        
    });
    
});