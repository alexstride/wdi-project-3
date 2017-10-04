angular
  .module('tandem')
  .directive('coordinate', coordinate);

coordinate.inject = [];
function coordinate() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'js/views/partials/_coordinate.html',
    scope: {
      lat: '=',
      lng: '=',
      showDelete: '@',
      delete: '&'
    },
    link($scope) {
      $scope.receivedLatLng = 'blablabla';

      console.log('value of showDelete: ', $scope.showDelete);
      $scope.$watchGroup(['lat', 'lng'], () => {
        console.log('lat or lng changing');
        if (!$scope.lat || !$scope.lng) return false;
        $scope.lat = parseFloat($scope.lat.toFixed(4));
        $scope.lng = parseFloat($scope.lng.toFixed(4));
      });

      $scope.isEditing = false;
      $scope.edit = edit;
      $scope.update = update;
      $scope.discard = discard;
      let valueBuffer = {};

      function edit() {
        $scope.isEditing = true;
        valueBuffer = {lat: $scope.lat, lng: $scope.lng};
      }

      function update() {
        $scope.isEditing = false;
        valueBuffer = {};
      }

      function discard() {
        console.log('discarding');
        $scope.lat = valueBuffer.lat;
        $scope.lng = valueBuffer.lng;
        valueBuffer = {};
        $scope.isEditing = false;
      }
    }

  };
}
