angular
  .module('tandem')
  .directive('googleMap', googleMap);

googleMap.inject = ['$window'];
function googleMap($window) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map">GOOGLE MAP GOES HERE</div>',
    scope: {
      center: '='
    },
    link(scope, element) {
      console.log(scope);
      new $window.google.maps.Map(element[0], {
        zoom: 14,
        center: scope.center
      });
    }
  };
}
