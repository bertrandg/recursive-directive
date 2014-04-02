
app.controller('MainController', function($scope, SegmentBuilder) {
  
    $scope.titi = 'Test 3';
    
    $scope.dataMainGroup = SegmentBuilder.currentSegment;
  
});