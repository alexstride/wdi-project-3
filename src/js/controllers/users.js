angular
  .module('tandem')
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


UsersEditCtrl.$inject = ['User', '$stateParams', '$state'];
function UsersEditCtrl(User, $stateParams, $state) {
  const vm = this;

  vm.user = User.get($stateParams);

  function usersUpdate() {
    vm.user
      .$update()
      .then(() => $state.go('usersShow', $stateParams));
  }

  vm.update = usersUpdate;
}
