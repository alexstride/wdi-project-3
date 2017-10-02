//Link every waypoint marker back to which waypoint it is
//make the map center based on the location of all of the markers
//Make the markers draggable

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
      const mapElement = element[0].querySelector('.map-holder');
      console.log($scope);
      $scope.mapVar = new $window.google.maps.Map(mapElement, {
        zoom: 14,
        center: {lat: 0, lng: 0}
      });

      function placeWayPoints() {
        console.log('placeWayPoints is currently empty!');
      }

      function clearWayPoints() {
        console.log('clearWayPoints is currently empty');
      }

      $scope.$watch('rideInfo', () => {
        if(!$scope.rideInfo || $scope.loaded) return false;
        console.log('runnning initial centering function');
        $scope.mapVar.setCenter({lat: $scope.rideInfo.startPoint.lat, lng: $scope.rideInfo.startPoint.lng});

        //creating and setting the initial positions of the start-point marker
        $scope.startPointMarker = new $window.google.maps.Marker({
          map: $scope.mapVar
        });
        $scope.startPointMarker.setPosition({lat: $scope.rideInfo.startPoint.lat, lng: $scope.rideInfo.startPoint.lng});

        //creating and setting the initial positions of the end-point marker
        $scope.endPointMarker = new $window.google.maps.Marker({
          map: $scope.mapVar
        });
        $scope.endPointMarker.setPosition({lat: $scope.rideInfo.endPoint.lat, lng: $scope.rideInfo.endPoint.lng});

        //creating and placing markers for all of the waypoints.
        $scope.wayPointMarkers = {};
        $scope.rideInfo.wayPoints.forEach(point => {
          const marker = new $window.google.maps.Marker({
            map: $scope.mapVar,
            label: 'W',
            position: {lat: point.lat, lng: point.lng}
          });
          $scope.wayPointMarkers[point.id] = marker;
        });


        $scope.loaded = true;
      }, true);

      //watching the position of the startPoint marker to see if it needs to move.
      $scope.$watch('rideInfo.startPoint', () => {
        $scope.startPointMarker.setPosition({lat: $scope.rideInfo.startPoint.lat, lng: $scope.rideInfo.startPoint.lng});
      }, true);

      //watching for changes in the end point
      $scope.$watch('rideInfo.endPoint', () => {
        $scope.endPointMarker.setPosition({lat: $scope.rideInfo.endPoint.lat, lng: $scope.rideInfo.endPoint.lng});
      }, true);

      //watching for changes in any of the waypoints
      $scope.rideInfo.wayPoints.forEach(point => {
        $scope.watch('rideInfo.startPoint', () => console.log('point changed: ', point));
      });
    }
  };
}
