/* global google */

angular
  .module('tandem')
  .directive('googleMapIndex', googleMapIndex);

googleMapIndex.inject = ['$window'];
function googleMapIndex($window) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map">GOOGLE MAP GOES HERE</div>',
    scope: {
      mapVar: '=',
      rideArray: '='
    },
    link($scope, element) {
      console.log($scope);
      $scope.mapVar = new $window.google.maps.Map(element[0], {
        zoom: 14,
        center: {lat: 51.51724, lng: -0.09728}
      });

      $scope.$watch('rideArray', () => {
        console.log('running');
        console.log('value of rideArray: ', $scope.rideArray);
        if(!$scope.rideArray) return false;
        $scope.mapVar.setCenter({lat: 51.51724, lng: -0.09728});
        const marker = new $window.google.maps.Marker({
          map: $scope.mapVar,
          animation: google.maps.Animation.BOUNCE,
          icon: {
            url: 'https://cdn.shopify.com/s/files/1/1061/1924/files/Poop_Emoji.png?9898922749706957214',
            scaledSize: new google.maps.Size(10,10)
          }

        });
        marker.setPosition({lat: 51.51724, lng: -0.09728});
      });

    }
  };
}
