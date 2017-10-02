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
        if(!$scope.rideArray) return false;
        $scope.mapVar.setCenter({ lat: 51.51724, lng: -0.09728});

        console.log('ride array from directive', $scope.rideArray);
        $scope.rideArray.forEach(ride => {
          console.log('INSIDE LOOP!');
          const marker = new $window.google.maps.Marker({
            map: $scope.mapVar,
            animation: google.maps.Animation.BOUNCE,
            icon: {
              url: 'https://cdn.shopify.com/s/files/1/1061/1924/files/Poop_Emoji.png?9898922749706957214',
              scaledSize: new google.maps.Size(30,30)
            }
          // const marker = new $window.google.maps.Marker({
          //   map: $scope.mapVar,
          //   animation: google.maps.Animation.BOUNCE,
          //   icon: {
          //     url: 'https://cdn.shopify.com/s/files/1/1061/1924/files/Poop_Emoji.png?9898922749706957214',
          //     scaledSize: new google.maps.Size(30,30)
          //   }

          });

          const markerTwo = new $window.google.maps.Marker({
            map: $scope.mapVar,
            animation: google.maps.Animation.BOUNCE,
            icon: {
              url: 'https://cdn.shopify.com/s/files/1/1061/1924/files/Poop_Emoji.png?9898922749706957214',
              scaledSize: new google.maps.Size(30,30)
            }
          // const marker = new $window.google.maps.Marker({
          //   map: $scope.mapVar,
          //   animation: google.maps.Animation.BOUNCE,
          //   icon: {
          //     url: 'https://cdn.shopify.com/s/files/1/1061/1924/files/Poop_Emoji.png?9898922749706957214',
          //     scaledSize: new google.maps.Size(30,30)
          //   }

          });


          marker.setPosition({ lat: ride.endPoint.lat, lng: ride.endPoint.lng });
          markerTwo.setPosition({ lat: ride.startPoint.lat, lng: ride.startPoint.lng });
        });

      }, true);

    }
  };
}
