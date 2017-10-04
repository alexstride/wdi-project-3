/* global google */


//Get rid of bugs with deleting waypoint.
//allow user to add a waypoint by clicking on the map.


//make the map center based on the location of all of the markers
//Plot a directions line through the points
//make the map save to the database periodically


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
      rideInfo: '=',
      pendingChanges: '=',
      update: '&'
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
          directionsDisplay.setDirections(response);
        });
      }


      //creating a variable to inform of unsaved changes
      $scope.pendingChanges = false;


      //creating the google map
      const mapElement = element[0].querySelector('.map-holder');
      $scope.mapVar = new $window.google.maps.Map(mapElement, {
        zoom: 14,
        center: {lat: 0, lng: 0}
      });

      //declaring a function to add a new wayPoints
      $scope.newWayPoint = {};
      $scope.displayNewWayPoint = false;
      $scope.addWayPoint = addWayPoint;
      $scope.wayPointMarkers = [];
      $scope.removeAllWayPointMarkers = removeAllWayPointMarkers;

      function refreshWayPoints() {
        removeAllWayPointMarkers();
        $scope.wayPointMarkers = $scope.rideInfo.wayPoints.map(point => {
          point.tempId = point.id || (Math.random() * 100000).toFixed();
          const marker = new $window.google.maps.Marker({
            map: $scope.mapVar,
            icon: {
              url: '/images/blue-icon.png',
              scaledSize: new google.maps.Size(20,20)
            },
            position: {lat: point.lat, lng: point.lng},
            draggable: true
          });
          marker.addListener('dragend', e => {
            const pointToChange = $scope.rideInfo.wayPoints.find(element => element === point);
            pointToChange.lat = e.latLng.lat();
            pointToChange.lng = e.latLng.lng();
            $scope.pendingChanges = true;
            $scope.$apply();
            renderDirections();
          });

          return marker;
        });
      }

      function addWayPoint() {
        $scope.displayNewWayPoint = false;
        $scope.rideInfo.wayPoints.push($scope.newWayPoint);
        $scope.newWayPoint = {};
        $scope.pendingChanges = true;
        refreshWayPoints();
        renderDirections();
      }

      function removeAllWayPointMarkers() {
        $scope.wayPointMarkers.forEach(marker => marker.setMap(null));
        $scope.wayPointMarkers = [];
      }

      $scope.$watch('rideInfo.$resolved', () => {
        if(!$scope.rideInfo.$resolved) return false;
        if ($scope.wayPointMarkers) $scope.removeAllWayPointMarkers();
        $scope.mapVar.setCenter({lat: $scope.rideInfo.startPoint.lat, lng: $scope.rideInfo.startPoint.lng});

        //creating and setting the initial positions of the start-point marker
        $scope.startPointMarker = new $window.google.maps.Marker({
          map: $scope.mapVar,
          icon: {
            url: '/images/green-icon.png',
            scaledSize: new google.maps.Size(20,20)
          },
          draggable: true
        });
        $scope.startPointMarker.setPosition({lat: $scope.rideInfo.startPoint.lat, lng: $scope.rideInfo.startPoint.lng});
        $scope.startPointMarker.addListener('dragend', e => {
          $scope.rideInfo.startPoint.lat = e.latLng.lat();
          $scope.rideInfo.startPoint.lng = e.latLng.lng();
          $scope.pendingChanges = true;
          $scope.$apply();
          renderDirections();
        });

        //creating and setting the initial positions of the end-point marker
        $scope.endPointMarker = new $window.google.maps.Marker({
          map: $scope.mapVar,
          icon: {
            url: '/images/red-icon.png',
            scaledSize: new google.maps.Size(20,20)
          },
          draggable: true
        });
        $scope.endPointMarker.setPosition({lat: $scope.rideInfo.endPoint.lat, lng: $scope.rideInfo.endPoint.lng});
        $scope.endPointMarker.addListener('dragend', e => {
          $scope.rideInfo.endPoint.lat = e.latLng.lat();
          $scope.rideInfo.endPoint.lng = e.latLng.lng();
          $scope.pendingChanges = true;
          $scope.$apply();
          renderDirections();
        });

        //creating and placing markers for all of the waypoints.
        refreshWayPoints();

        renderDirections();
        $scope.loaded = true;
      });

      // //putting a watch on each of the wayPoints
      // $scope.$watch('rideInfo.wayPoints', () => {
      //   console.log('wayPoints changed...');
      //   //grabbing the relevant marker out of the wayPointMarkers object;
      //   refreshWayPoints();
      // });

      //watching the position of the startPoint marker to see if it needs to move.
      $scope.$watch('rideInfo.startPoint', () => {
        $scope.startPointMarker.setPosition({lat: $scope.rideInfo.startPoint.lat, lng: $scope.rideInfo.startPoint.lng});
        $scope.pendingChanges = true;
      }, true);

      //watching for changes in the end point
      $scope.$watch('rideInfo.endPoint', () => {
        $scope.endPointMarker.setPosition({lat: $scope.rideInfo.endPoint.lat, lng: $scope.rideInfo.endPoint.lng});
        $scope.pendingChanges = true;
      }, true);

    }
  };
}
