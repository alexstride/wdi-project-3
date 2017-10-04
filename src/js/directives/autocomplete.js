/* global google */

angular
  .module('tandem')
  .directive('autocomplete', autocomplete);

function autocomplete(){
  return{
    restrict: 'A',
    require: 'ngModel',
    replace: false,
    scope: {
      lat: '=',
      lng: '='
    },
    link($scope, element, attrs, model){

      const autocomplete = new google.maps.places.Autocomplete(element[0]);

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        console.log('Changing location');
        const latLng = place.geometry.location.toJSON();
        $scope.lat = latLng.lat;
        $scope.lng = latLng.lng;
        // update the value of ng-model on the element to be the latLng
        model.$setViewValue(latLng);
      });
    }

  };
}
