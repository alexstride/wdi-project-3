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
      console.log('value of showDelete: ', $scope.showDelete);
      $scope.$watchGroup(['lat', 'lng'], () => {
        if (!$scope.lat || !$scope.lng) return false;
        $scope.lat = parseFloat($scope.lat.toFixed(4));
        $scope.lng = parseFloat($scope.lng.toFixed(4));
      });

      $scope.isEditing = false;
      $scope.edit = edit;
      $scope.update = update;

      function edit() {
        $scope.isEditing = true;
      }

      function update() {
        $scope.isEditing = false;
      }
    }

  };
}
