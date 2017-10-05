angular
  .module('tandem')
  .directive('staticMap', staticMap);

staticMap.inject = [];
function staticMap() {
  return {
    restrict: 'E',
    replace: true,
    template: '<img src="{{mapString}}" alt="ride thumbnail">',
    scope: {
      rideInfo: '=',
      size: '@'
    },
    link($scope) {
      //const coordinates = [];
      $scope.rideInfoLoaded = false;
      $scope.$watch('rideInfo', () => {
        if (!$scope.rideInfo) {
          console.log('empty');
          return false;
        }
        console.log('got here');

        const startLat = $scope.rideInfo.startPoint.lat;
        const startLng = $scope.rideInfo.startPoint.lng;
        const endLat = $scope.rideInfo.endPoint.lat;
        const endLng = $scope.rideInfo.endPoint.lng;

        const latAv = (startLat + endLat) / 2;
        const lngAv = (startLng + endLng) / 2;

        const length = Math.sqrt(Math.pow((endLat - startLat), 2) + Math.pow((endLat - startLat), 2));

        const centerPointString = `${latAv.toFixed(4)},${lngAv.toFixed(4)}`;
        const zoomLevel = Math.round((4920/403) - (5000 * length / 403)).toFixed();

        const urlString = `https://maps.googleapis.com/maps/api/staticmap?center=${centerPointString}&zoom=${zoomLevel}&size=${$scope.size}&maptype=roadmap&path=color:teal|weight:5|${$scope.rideInfo.startPoint.lat},${$scope.rideInfo.startPoint.lng}|${$scope.rideInfo.endPoint.lat},${$scope.rideInfo.endPoint.lng}&key=AIzaSyCjKmJQUUQ7XRv49dHxnncboJewMH2MPUI`;

        $scope.mapString = urlString;
      }, true);
    }
  };
}
