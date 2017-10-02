//Change the reliance on id, so that the newly added wayPoints can be properly added
// Allow user to remove wayPoints

//make the map center based on the location of all of the markers
//Plot a direction through the points


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

      //declaring a function to add a new wayPoints
      $scope.newWayPoint = {};
      $scope.displayNewWayPoint = false;
      $scope.addWayPoint = addWayPoint;
      $scope.removeAllMarkers = removeAllMarkers;

      function addWayPoint() {
        $scope.loaded = false;
        $scope.rideInfo.wayPoints.push($scope.newWayPoint);
        $scope.displayNewWayPoint = false;
        $scope.newWayPoint = {};
      }

      function removeAllMarkers() {
        for (const key in $scope.wayPointMarkers) {
          $scope.wayPointMarkers[key].setMap(null);
        }
      }

      $scope.$watch('rideInfo', () => {
        if(!$scope.rideInfo || $scope.loaded) return false;
        if ($scope.wayPointMarkers) $scope.removeAllMarkers();
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
            position: {lat: point.lat, lng: point.lng},
            draggable: true
          });
          $window.google.maps.event.addListener(marker, 'dragend', e => {
            const pointToChange = $scope.rideInfo.wayPoints.find(element => element === point);
            console.log(pointToChange);
            pointToChange.lat = e.latLng.lat();
            pointToChange.lng = e.latLng.lng();
            console.log($scope.rideInfo.wayPoints);
            $scope.$apply();
          });
          $scope.wayPointMarkers[point.id] = marker;
        });

        //putting a watch on each of the wayPoints
        $scope.rideInfo.wayPoints.forEach((element, index) => {
          $scope.$watchCollection(`rideInfo.wayPoints[${index}]`, (newCollection) => {
            //grabbing the relevant marker out of the wayPointMarkers object;
            $scope.wayPointMarkers[newCollection.id].setPosition({lat: newCollection.lat, lng: newCollection.lng});
          });
        });

        $scope.loaded = true;
      }, true);

      //watching the position of the startPoint marker to see if it needs to move.
      $scope.$watch('rideInfo.startPoint', () => {
        $scope.startPointMarker.setPosition({lat: $scope.rideInfo.startPoint.lat, lng: $scope.rideInfo.startPoint.lng});
      }, true);

      //watching for changes in the end point
      $scope.$watch('rideInfo.endPoint', () => {
        console.log('moving endPoint marker');
        $scope.endPointMarker.setPosition({lat: $scope.rideInfo.endPoint.lat, lng: $scope.rideInfo.endPoint.lng});
      }, true);

      //watching for changes in any of the waypoints


    }
  };
}
