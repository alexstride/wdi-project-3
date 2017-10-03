angular
  .module('tandem')
  .controller('RidesIndexCtrl', RidesIndexCtrl)
  .controller('RidesShowCtrl', RidesShowCtrl)
  .controller('RidesNewCtrl', RidesNewCtrl);


RidesIndexCtrl.$inject = [ 'Ride' ];
function RidesIndexCtrl(Ride) {
  const vm = this;
  vm.all = Ride.query();


}


RidesShowCtrl.$inject = [ 'Ride', '$stateParams', '$scope', '$state' ];
function RidesShowCtrl(Ride, $stateParams, $scope, $state) {
  const vm = this;
  vm.map = null;
  $scope.updateNeeded = false;
  vm.update = update;
  vm.delete = ridesDelete;

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



  function ridesDelete() {
    vm.ride
      .$remove()
      .then(() => $state.go('ridesIndex'));
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
