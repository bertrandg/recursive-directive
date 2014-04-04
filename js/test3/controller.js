
app.controller('MainController', function($scope, SegmentBuilder) {
  
    $scope.titi = 'Test 3';
    
    $scope.segment = {
        totalPrice: 546415
    };
    $scope.dataMainGroup = SegmentBuilder.currentSegment;
  
});