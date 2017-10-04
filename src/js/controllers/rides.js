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
  vm.edit = ridesEdit;
  vm.isEditable = false;


  Ride
    .get($stateParams)
    .$promise
    .then(response => {
      vm.ride = response;
      vm.rideOwner = vm.ride.createdBy;
    });

  function update() {
    console.log('Logging values sent to the server');
    console.log('$stateParams', $stateParams);
    console.log('vm.ride', vm.ride);
    Ride
      .update($stateParams, vm.ride)
      .$promise
      .then(response => {
        vm.ride = response;
        $scope.updateNeeded = false;
        console.log('reponse from the server', response);
      });
    $scope.updateNeeded = false;
  }



  function ridesDelete() {
    vm.ride
      .$remove()
      .then(() => $state.go('ridesIndex'));
  }

  function ridesEdit() {
    vm.isEditable = !vm.isEditable;
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
        if (!response.id) {
          $state.go('ridesIndex');
        } else {
          $state.go('ridesShow', {id: response.id});
        }
      });
  }

  function addMember() {
    addMember
      .save({ rideId: vm.ride.id }, vm.newMember)
      .$promise
      .then((member) => {
        vm.ride.members.push(member);
        vm.newMember = {};
      });
  }
  vm.addMember = addMember;


  function deleteMember(member) {
    deleteMember
      .delete({ rideId: vm.ride.id, id: member.id })
      .$promise
      .then(() => {
        const index = vm.ride.members.indexOf(member);

        vm.ride.members.splice(index, 1);
      });

  }

  vm.deleteMember = deleteMember;

}
