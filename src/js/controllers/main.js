angular
  .module('tandem')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', '$state', '$transitions', '$auth'];
function MainCtrl($rootScope, $state, $transitions, $auth) {
  const vm = this;

  vm.isAuthenticated = $auth.isAuthenticated;

  vm.credentials = {};

  function login() {
    console.log('submit');
    $auth.login(vm.credentials)
      .then(() => $state.go('ridesIndex'))
      .catch(() => $state.go('login'));
  }

  function getCurrentUserId() {
    return $auth.getPayload().userId;
  }

  vm.getCurrentUserId = getCurrentUserId;

  function logout() {
    console.log('attempting to logout');
    $auth.logout();
    $state.go('home');
  }

  vm.login = login;
  vm.logout = logout;

  $rootScope.$on('error', (e, err) => {
    vm.stateHasChanged = false;

    if(err.status === 401 && vm.pageName !== 'login') {
      vm.message = err.data.message;
      $state.go('login');
    }
  });

  $transitions.onSuccess({}, (transition) => {
    vm.pageName = transition.$to().name;
    if(vm.stateHasChanged) vm.message = null;
    if(!vm.stateHasChanged) vm.stateHasChanged = true;
  });

}
