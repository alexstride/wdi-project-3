/* global google */


angular
  .module('tandem')
  .directive('routeMap', routeMap);

routeMap.inject = ['$window'];
function routeMap($window) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'js/views/partials/_route_map_template.html',
    scope: {
      mapVar: '=',
      rideInfo: '='
    },
    link($scope, element) {
      //bringing in the directions service
      const directionsService = new google.maps.DirectionsService();
      let directionsDisplay = null;
      $scope.updateDirections = renderDirections;

      function renderDirections() {
        if (directionsDisplay) directionsDisplay.setMap(null);
        directionsDisplay = new google.maps.DirectionsRenderer({
          suppressBicyclingLayer: true,
          suppressMarkers: true,
          polylineOptions: {
            strokeColor: 'blue',
            strokeOpacity: 1.0
          }
        });

        directionsDisplay.setMap($scope.mapVar);

        const wayPointArray = $scope.rideInfo.wayPoints.map(point => {
          return {
            location: new google.maps.LatLng(point.lat, point.lng),
            stopover: true
          };
        });

        directionsService.route({
          origin: new google.maps.LatLng($scope.rideInfo.startPoint.lat, $scope.rideInfo.startPoint.lng),
          destination: new google.maps.LatLng($scope.rideInfo.endPoint.lat, $scope.rideInfo.endPoint.lng),
          waypoints: wayPointArray,
          travelMode: 'BICYCLING',
          optimizeWaypoints: true
        }, response => {
          console.log(response);
          directionsDisplay.setDirections(response);
        });
      }


      //creating a variable to inform of unsaved changes
      $scope.pendingChanges = false;


      //creating the google map
      const mapElement = element[0];
      $scope.mapVar = new $window.google.maps.Map(mapElement, {
        zoom: 14,
        center: {lat: 0, lng: 0}
      });

      $scope.removeAllWayPointMarkers = removeAllWayPointMarkers;

      function refreshWayPoints() {
        if ($scope.wayPointMarkers  && $scope.wayPointMarkers.length > 0) removeAllWayPointMarkers();
        $scope.wayPointMarkers = [];
        $scope.rideInfo.wayPoints.forEach(point => {
          const marker = new $window.google.maps.Marker({
            map: $scope.mapVar,
            icon: {
              url: '/images/blue-icon.png',
              scaledSize: new google.maps.Size(35,35)
            },
            position: {lat: point.lat, lng: point.lng}
          });
          $scope.wayPointMarkers.push(marker);
        });
      }

      function removeAllWayPointMarkers() {
        for (const key in $scope.wayPointMarkers) {
          deleteMarker(key);
        }
      }

      function deleteMarker(id) {
        $scope.wayPointMarkers[id].setMap(null);
      }

      $scope.$watch('rideInfo', () => {
        if(!$scope.rideInfo) return false;
        $scope.mapVar.setCenter({lat: $scope.rideInfo.startPoint.lat, lng: $scope.rideInfo.startPoint.lng});

        //creating and setting the initial positions of the start-point marker
        $scope.startPointMarker = new $window.google.maps.Marker({
          map: $scope.mapVar,
          icon: {
            url: '/images/green-icon.png',
            scaledSize: new google.maps.Size(35,35)
          }
        });
        $scope.startPointMarker.setPosition({lat: $scope.rideInfo.startPoint.lat, lng: $scope.rideInfo.startPoint.lng});

        //creating and setting the initial positions of the end-point marker
        $scope.endPointMarker = new $window.google.maps.Marker({
          map: $scope.mapVar,
          icon: {
            url: '/images/red-icon.png',
            scaledSize: new google.maps.Size(35,35)
          }
        });
        $scope.endPointMarker.setPosition({lat: $scope.rideInfo.endPoint.lat, lng: $scope.rideInfo.endPoint.lng});

        //creating and placing markers for all of the waypoints.
        refreshWayPoints();

        //putting a watch on each of the wayPoints
        // $scope.$watch('rideInfo.wayPoints', () => {
        //   //grabbing the relevant marker out of the wayPointMarkers object;
        //   refreshWayPoints();
        // }, true);

        renderDirections();
        $scope.loaded = true;
      }, true);


    }
  };
}
