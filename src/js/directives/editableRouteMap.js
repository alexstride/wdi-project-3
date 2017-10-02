

angular
  .module('tandem')
  .directive('editableRouteMap', editableRouteMap);

editableRouteMap.inject = ['$window'];
function editableRouteMap($window) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="editable-map row"><div class="map-holder col-sm-9">GOOGLE MAP GOES HERE</div><div class="map-aside col-sm-3"></div></div>',
    scope: {
      mapVar: '=',
      rideInfo: '='
    },
    link($scope, element) {
      console.log(element[0].querySelector('.map-holder'));
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
      });

    }
  };
}
