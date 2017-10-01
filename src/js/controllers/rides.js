angular
  .module('tandem')
  .controller('RidesIndexCtrl', RidesIndexCtrl)
  .controller('RidesShowCtrl', RidesShowCtrl);


RidesIndexCtrl.$inject = [ 'Ride' ];
function RidesIndexCtrl(Ride) {
  const vm = this;
  vm.all = Ride.query();
  console.log('Full Index: ', vm.all);

}


RidesShowCtrl.$inject = [ 'Ride', '$stateParams' ];
function RidesShowCtrl(Ride, $stateParams) {
  const vm = this;

  vm.ride = Ride.get($stateParams);
  console.log('Single ride: ', vm.ride);

}
