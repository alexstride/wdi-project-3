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
      rideArray: '='
    },
    link($scope, element) {
      let infowindow = null;
      const numColors = 40;
      let colorArray = [];
      function randomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return 'rgb(' + r + ', ' + g + ', ' + b + ')';
      }
      function generateRandomColors(num) {
        const arr = [];
        for (let i = 0; i < num; i++) {
          arr.push(randomColor());
        }
        return arr;
      }
      colorArray = generateRandomColors(numColors);
      const map = new $window.google.maps.Map(element[0], {
        zoom: 14,
        center: {lat: 51.51724, lng: -0.09728}
      });

      const directionsService = new google.maps.DirectionsService();

      $scope.$watch('rideArray', () => {
        if(!$scope.rideArray) return false;
        map.setCenter({ lat: 51.51724, lng: -0.09728});

        console.log('ride array from directive', $scope.rideArray);
        $scope.rideArray.forEach((ride, i) => {

          const start = new $window.google.maps.Marker({
            map: map,
            animation: google.maps.Animation.DROP,
            icon: {
              url: 'https://cdn.shopify.com/s/files/1/1061/1924/files/Poop_Emoji.png?9898922749706957214',
              scaledSize: new google.maps.Size(30,30)
            },
            position: { lat: ride.startPoint.lat, lng: ride.startPoint.lng }
          });

          start.addListener('click', () => {
            createInfoWindow(start, ride);
          });

          const end = new $window.google.maps.Marker({
            map: map,
            animation: google.maps.Animation.DROP,
            icon: {
              url: '../images/bike-icon.png',
              scaledSize: new google.maps.Size(50,50)
            },
            position: { lat: ride.endPoint.lat, lng: ride.endPoint.lng }
          });

          end.addListener('click', () => {
            createInfoWindow(end, ride);
          });

          const directionsDisplay = new google.maps.DirectionsRenderer({
            suppressBicyclingLayer: true,
            suppressMarkers: true,
            polylineOptions: {
              strokeColor: colorArray[i],
              strokeOpacity: 1.0
            }
          });

          directionsDisplay.setMap(map);

          directionsService.route({
            origin: start.getPosition(),
            destination: end.getPosition(),
            travelMode: 'BICYCLING'
          }, response => {
            console.log(response);
            directionsDisplay.setDirections(response);
            // calculate here
            ride.distance = response.routes[0].legs[0].distance.text;
            ride.duration = response.routes[0].legs[0].duration.text;
          });
        });
      }, true);

      // write the addInfoWindow function
      function createInfoWindow(marker, ride) {
        console.log(ride);
        if(infowindow) infowindow.close();
        infowindow = new google.maps.InfoWindow({
          content: `
          <div class="infowindow">
            <p> hello my name is ${ride.createdBy.name} and i'm very polite</p>
            <p>route distance is ${ride.distance}</p>
            <p>route length is ${ride.duration}</p>
            <a href="/rides/${ride.id}"><h3>Link to ride</h3></a>
          </div>
          `
        });

        infowindow.open(map, marker);

      }


    }
  };
}
