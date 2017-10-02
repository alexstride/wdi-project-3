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
      pendingChanges: '='
    },
    link($scope, element) {
      //creating a variable to inform of unsaved changes
      $scope.pendingChanges = false;


      //creating the google map
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
        $scope.pendingChanges = true;
      }

      function removeAllMarkers() {
        for (const key in $scope.wayPointMarkers) {
          deleteMarker(key);
        }
      }

      function deleteMarker(id) {
        $scope.wayPointMarkers[id].setMap(null);
      }

      //declaring deleteWayPoint function for removing a wayPoint and its marker
      $scope.deleteWayPoint = deleteWayPoint;

      function deleteWayPoint(point) {
        $scope.rideInfo.wayPoints.splice($scope.rideInfo.wayPoints.indexOf(point), 1);
        deleteMarker(point.tempId);
        $scope.pendingChanges = true;
      }

      $scope.$watch('rideInfo', () => {
        if(!$scope.rideInfo || $scope.loaded) return false;
        if ($scope.wayPointMarkers) $scope.removeAllMarkers();
        console.log('runnning initial centering function');
        $scope.mapVar.setCenter({lat: $scope.rideInfo.startPoint.lat, lng: $scope.rideInfo.startPoint.lng});

        //creating and setting the initial positions of the start-point marker
        $scope.startPointMarker = new $window.google.maps.Marker({
          map: $scope.mapVar,
          label: 'S',
          draggable: true
        });
        $scope.startPointMarker.setPosition({lat: $scope.rideInfo.startPoint.lat, lng: $scope.rideInfo.startPoint.lng});
        $window.google.maps.event.addListener($scope.startPointMarker, 'dragend', e => {
          $scope.rideInfo.startPoint.lat = e.latLng.lat();
          $scope.rideInfo.startPoint.lng = e.latLng.lng();
          $scope.pendingChanges = true;
          $scope.$apply();
        });

        //creating and setting the initial positions of the end-point marker
        $scope.endPointMarker = new $window.google.maps.Marker({
          map: $scope.mapVar,
          label: 'F',
          draggable: true
        });
        $scope.endPointMarker.setPosition({lat: $scope.rideInfo.endPoint.lat, lng: $scope.rideInfo.endPoint.lng});
        $window.google.maps.event.addListener($scope.endPointMarker, 'dragend', e => {
          $scope.rideInfo.endPoint.lat = e.latLng.lat();
          $scope.rideInfo.endPoint.lng = e.latLng.lng();
          $scope.pendingChanges = true;
          $scope.$apply();
        });

        //creating and placing markers for all of the waypoints.
        $scope.wayPointMarkers = {};
        $scope.rideInfo.wayPoints.forEach(point => {
          point.tempId = point.id || (Math.random() * 100000).toFixed();
          const marker = new $window.google.maps.Marker({
            map: $scope.mapVar,
            label: 'W',
            position: {lat: point.lat, lng: point.lng},
            draggable: true
          });
          $window.google.maps.event.addListener(marker, 'dragend', e => {
            const pointToChange = $scope.rideInfo.wayPoints.find(element => element === point);
            pointToChange.lat = e.latLng.lat();
            pointToChange.lng = e.latLng.lng();
            $scope.pendingChanges = true;
            $scope.$apply();
          });
          $scope.wayPointMarkers[point.tempId] = marker;
        });

        //putting a watch on each of the wayPoints
        $scope.rideInfo.wayPoints.forEach((element, index) => {
          $scope.$watchCollection(`rideInfo.wayPoints[${index}]`, (newCollection) => {
            //grabbing the relevant marker out of the wayPointMarkers object;
            $scope.wayPointMarkers[newCollection.tempId].setPosition({lat: newCollection.lat, lng: newCollection.lng});
            $scope.pendingChanges = true;
          });
        });

        $scope.loaded = true;
      }, true);

      //watching the position of the startPoint marker to see if it needs to move.
      $scope.$watch('rideInfo.startPoint', () => {
        $scope.startPointMarker.setPosition({lat: $scope.rideInfo.startPoint.lat, lng: $scope.rideInfo.startPoint.lng});
        $scope.pendingChanges = true;
      }, true);

      //watching for changes in the end point
      $scope.$watch('rideInfo.endPoint', () => {
        console.log('moving endPoint marker');
        $scope.endPointMarker.setPosition({lat: $scope.rideInfo.endPoint.lat, lng: $scope.rideInfo.endPoint.lng});
        $scope.pendingChanges = true;
      }, true);

    }
  };
}
