angular
  .module('tandem')
  .controller('UsersShowCtrl', UsersShowCtrl);

UsersShowCtrl.$inject = [ 'User', '$state' ];
function UsersShowCtrl(User, $stateParams) {
  const vm = this;


  vm.user = User.get($stateParams);


}
