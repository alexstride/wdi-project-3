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
      const map = new $window.google.maps.Map(element[0], {
        zoom: 14,
        center: {lat: 0, lng: 0}
      });

      scope.$watch('center', () => {
        if(!scope.center) return false;
        map.setCenter({lat: scope.center.lat, lng: scope.center.lng});
      });
    }
  };
}
