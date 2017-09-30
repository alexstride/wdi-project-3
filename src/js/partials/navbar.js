angular
  .module('tandem')
  .directive('navBar', navBar);

function navBar(){
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/js/views/partials/_navBar.html'
  };
}
