angular
  .module('tandem')
  .controller('RidesIndexCtrl', RidesIndexCtrl)
  .controller('RidesShowCtrl', RidesShowCtrl)
  .controller('RidesNewCtrl', RidesNewCtrl);


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


RidesShowCtrl.$inject = [ 'Ride', '$stateParams', '$scope' ];
function RidesShowCtrl(Ride, $stateParams, $scope) {
  const vm = this;
  vm.map = null;
  $scope.updateNeeded = false;
  vm.update = update;

  Ride
    .get($stateParams)
    .$promise
    .then(response => {
      vm.ride = response;
    });

  function update() {
    Ride
      .update($stateParams, vm.ride)
      .$promise
      .then(response => {
        vm.ride = response;
        $scope.updateNeeded = false;
      });
    $scope.updateNeeded = false;
  }


}


RidesNewCtrl.$inject = ['Ride', '$state', '$auth'];
function RidesNewCtrl(Ride, $state, $auth) {
  const vm = this;
  vm.newRide = {};
  vm.newRide.wayPoints = [];
  vm.newRide.createdBy = $auth.getPayload().userId;
  vm.add = add;


  function add() {
    console.log('Running add function');
    Ride
      .save(vm.newRide)
      .$promise
      .then(response => {
        console.log('response from server', response);
        if (!response.id) {
          console.log('going to ridesIndex');
          $state.go('ridesIndex');
        } else {
          console.log('going to ridesShow');
          $state.go('ridesShow', {id: response.id});
        }
      });
  }



}
