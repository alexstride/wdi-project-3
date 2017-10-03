/* global google */

angular
  .module('tandem')
  .directive('autocomplete', autocomplete);

function autocomplete(){
  return{
    restrict: 'A',
    scope: {
      location: '='
    },
    require: 'ngModel',
    link(scope, element, attrs, ngModel){
      const input = document.querySelector('#place');
      const autocomplete = new google.maps.places.Autocomplete(input, {location: {lat: 51.515208, lng: -0.072310}}, {radius: 10000}, { types: ['establishment',''] });

      autocomplete.addListener('place_changed', () => {
        scope.location = autocomplete.getPlace().geometry.toJSON();
        ngModel.$setViewValue(element.val());
      });
    }

  };
}
