angular
  .module('tandem')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$auth', '$state', '$transitions', '$rootScope'];

function MainCtrl($auth, $state, $transitions, $rootScope) {
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


  $transitions.onSuccess({}, (transition) => {
    vm.pageName = transition.$to().name;
    vm.menuIsOpen = false;
  });

  $rootScope.$on('error', (e, err) => {
    vm.stateHasChanged = false;
    vm.message = err.data.message;
    if(err.status === 401 && vm.pageName !== 'login'){
      $state.go('login');
    }
  });

}
