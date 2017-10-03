angular
  .module('tandem')
  .controller('UsersEditCtrl', UsersEditCtrl)
  .controller('UsersShowCtrl', UsersShowCtrl);

UsersShowCtrl.$inject = [ 'User', '$state' ];
function UsersShowCtrl(User, $state) {
  const vm = this;

  vm.user = User.get($state.params);

  function usersDelete() {
    vm.user
      .$remove()
      .then(() => $state.go('home'));
  }

  vm.delete = usersDelete;

}


// UsersEditCtrl.$inject = ['User', '$state'];
// function UsersEditCtrl(User, $state) {
//   const vm = this;
//   console.log('inside edit');
//
//   vm.user = User.get($state.params);
//   vm.update = usersUpdate;
//
//
//   function usersUpdate() {
//     console.log('update');
//     vm.user
//       .$update()
//       .then(() => $state.go('home', $state.params));
//   }
//
// }

UsersEditCtrl.$inject = ['$state', 'User'];
function UsersEditCtrl($state, User) {
  const vm = this;
  vm.user = User.get($state.params);
  vm.update = usersUpdate;

  function usersUpdate(){
    console.log('click');
    User
      .update($state.params, vm.user)
      .$promise
      .then(() => $state.go('usersShow', $state.params));
  }
}
