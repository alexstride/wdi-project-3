angular
  .module('tandem')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$auth', '$state'];
function MainCtrl($auth, $state) {
  const vm = this;
  vm.credentials = {};
  vm.isAuthenticated = $auth.isAuthenticated;
  vm.login = login;
  vm.logout = logout;

  function login() {
    if (vm.loginForm.$valid) {
      $auth.login(vm.credentials)
        .then(() => console.log('Logged in!'))
        .catch(() => $state.go('login'));
    }
  }

  function logout() {
    $auth.logout();
    $state.go('login');
  }

}
