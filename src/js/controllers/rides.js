angular
  .module('tandem')
  .controller('RidesIndexCtrl', RidesIndexCtrl)
  .controller('RidesShowCtrl', RidesShowCtrl);


RidesIndexCtrl.$inject = [ 'Ride' ];
function RidesIndexCtrl(Ride) {
  const vm = this;
  console.log('got here');
  vm.all = Ride.query();
  console.log('logging vm.all', vm.all);
  // Ride
  //   .query()
  //   .$promise
  //   .then(response => {
  //     console.log('got inside here');
  //     console.log('reponse from the database: ', response);
  //     vm.all = response;
  //     console.log('Full Index: ', vm.all);
  //   });

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
