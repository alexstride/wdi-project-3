angular
  .module('tandem')
  .controller('RidesIndexCtrl', RidesIndexCtrl);


RidesIndexCtrl.$inject = [ 'Ride'];
function RidesIndexCtrl(Ride) {
  const vm = this;
  vm.all = Ride.query();
  
}
