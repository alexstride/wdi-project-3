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


RidesShowCtrl.$inject = [ 'Ride', '$stateParams', '$scope', '$state', 'RideMember', '$auth', 'RideComment'];
function RidesShowCtrl(Ride, $stateParams, $scope, $state, RideMember, $auth, RideComment) {
  const vm = this;
  vm.newComment = {};
  vm.map = null;
  $scope.updateNeeded = false;
  vm.update = update;
  vm.delete = ridesDelete;
  vm.edit = ridesEdit;
  vm.isEditable = false;
  const userId = $auth.getPayload().userId;

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
        vm.isEditable = false;
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

  function addMember() {
    RideMember
      .save({ rideId: vm.ride.id })
      .$promise
      .then((member) => {
        vm.ride.members.push(member);
        vm.newMember = {};
      });
  }
  vm.addMember = addMember;

  function deleteMember(memberId) {
    RideMember
      .delete({ rideId: vm.ride.id, id: memberId })
      .$promise
      .then(() => {
        vm.ride.members = vm.ride.members.filter(member => member.id !== memberId);
      });

  }

  vm.deleteMember = deleteMember;

  function isMember() {
    // check that user is logged in, that the ride exists, that the ride promise has resolved, and that the current user is in the ride.members array
    // if all are truthy, the function will return true
    return $auth.isAuthenticated() && vm.ride && vm.ride.$resolved && vm.ride.members.find((member) => member.id === userId);
  }

  vm.isMember = isMember;

  function addComment() {
    console.log('hello');
    RideComment
      .save({ rideId: vm.ride.id }, vm.newComment)
      .$promise
      .then((comment) => {
        vm.ride.comments.push(comment);
        vm.newComment = {};
      });
  }
  vm.addComment = addComment;

  function deleteComment(comment) {
    RideComment
      .delete({ rideId: vm.ride.id, id: comment.id })
      .$promise
      .then(() => {
        const index = vm.ride.comments.indexOf(comment);
        // splice it from the array, take 1 element starting from that index
        vm.ride.comments.splice(index, 1);
      });

  }

  vm.deleteComment = deleteComment;

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

}
