angular
  .module('tandem')
  .controller('UsersShowCtrl', UsersShowCtrl);

UsersShowCtrl.$inject = [ 'User', '$stateParams' ];
function UsersShowCtrl(User, $stateParams) {
  const vm = this;


  vm.user = User.get($stateParams);

  console.log('Single user: ', vm.user);

}
