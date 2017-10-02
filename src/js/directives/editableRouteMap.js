

angular
  .module('tandem')
  .directive('editableRouteMap', editableRouteMap);

editableRouteMap.inject = ['$window'];
function editableRouteMap($window) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'js/views/partials/_editable_map_template.html',
    scope: {
      mapVar: '=',
      rideInfo: '='
    },
    link($scope, element) {
      console.log('first attempt to log data: ', $scope.rideInfo);
      const mapElement = element[0].querySelector('.map-holder');
      console.log($scope);
      $scope.mapVar = new $window.google.maps.Map(mapElement, {
        zoom: 14,
        center: {lat: 0, lng: 0}
      });

      $scope.$watch('rideInfo', () => {
        console.log('running');
        console.log('value of rideInfo: ', $scope.rideInfo);
        if(!$scope.rideInfo) return false;
        $scope.mapVar.setCenter({lat: $scope.rideInfo.startPoint.lat, lng: $scope.rideInfo.startPoint.lng});
        const marker = new $window.google.maps.Marker({
          map: $scope.mapVar
        });
        marker.setPosition({lat: $scope.rideInfo.startPoint.lat, lng: $scope.rideInfo.startPoint.lng});
      }, true);

    }
  };
}
