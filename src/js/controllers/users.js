angular
  .module('tandem')
  .controller('UsersShowCtrl', UsersShowCtrl)
  .controller('UsersEditCtrl', UsersEditCtrl);

UsersShowCtrl.$inject = [ 'User', '$state', '$auth' ];
function UsersShowCtrl(User, $state, $auth) {
  const vm = this;

  vm.user = User.get($state.params);

  function usersDelete() {
    vm.user
      .$remove()
      .then(() =>
        $auth.logout() && $state.go('home'));
  }

  vm.delete = usersDelete;

}

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
