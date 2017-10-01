/* global google */

angular
  .module('tandem')
  .directive('autocomplete', autocomplete);

function autocomplete(){
  return{
    restrict: 'A',
    location: '='
  },




  document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('#place');
    const autocomplete = new google.maps.places.Autocomplete(input, { types: ['establishment'] });

    autocomplete.addListener('place_changed', () => {
      console.log(autocomplete.getPlace());
    });
  });
}
