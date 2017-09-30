angular
  .module('tandem')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$auth', '$state'];
function MainCtrl($auth, $state) {
  const vm = this;
  vm.credentials = {};

  vm.loginDetails = {};

  function login() {
    console.log('not yet implemented');


  }
}
