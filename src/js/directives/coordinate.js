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
      lng: '='
    },
    link($scope) {
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
