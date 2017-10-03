angular
  .module('tandem')
  .controller('RidesIndexCtrl', RidesIndexCtrl)
  .controller('RidesShowCtrl', RidesShowCtrl);


RidesIndexCtrl.$inject = [ 'Ride' ];
function RidesIndexCtrl(Ride) {
  const vm = this;
  vm.all = Ride.query();
  

}


RidesShowCtrl.$inject = [ 'Ride', '$stateParams' ];
function RidesShowCtrl(Ride, $stateParams) {
  const vm = this;
  vm.map = null;

  Ride
    .get($stateParams)
    .$promise
    .then(response => {
      if (!response.createdBy) response.createdBy = { name: 'Unknown User' };
      vm.ride = response;
    });



}
