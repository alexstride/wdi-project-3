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


RidesShowCtrl.$inject = [ 'Ride', '$stateParams', '$scope' ];
function RidesShowCtrl(Ride, $stateParams, $scope) {
  const vm = this;
  vm.map = null;
  $scope.updateNeeded = false;

  Ride
    .get($stateParams)
    .$promise
    .then(response => {
      if (!response.createdBy) response.createdBy = { name: 'Unknown User' };
      vm.ride = response;
    });

  $scope.$watch('updateNeeded', () => {
    if (!vm.ride) {
      console.log('trying to update before ride loaded');
      return false;
    }

    if($scope.updateNeeded) {
      console.log('updating the database');
      Ride
        .update(vm.ride)
        .$promise
        .then(response => {
          if (!response.createdBy) response.createdBy = { name: 'Unknown User' };
          vm.ride = response;
        });
    }

  });


}
