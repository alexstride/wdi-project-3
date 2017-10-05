angular
  .module('tandem')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', '$state', '$transitions', '$auth'];
function MainCtrl($rootScope, $state, $transitions, $auth) {
  const vm = this;

  vm.message = {};
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
      //change this to set the text attribute of the message to be err.data.message
      vm.message.text = err.data.message;
      //also set the type attribute of the message to be 'warning'
      vm.message.type = 'danger';
      $state.go('login');
    }

    if(err.status === 422) {
      vm.errors = err.data.errors;
      console.log(vm.errors);
    }
  });

  $rootScope.$on('registered', (event, data) => {
    vm.stateHasChanged = false;
    vm.message.text = `Thanks for registering, ${data}. Please login.`;
    vm.message.type = 'info';
  });

  $transitions.onSuccess({}, (transition) => {
    vm.pageName = transition.$to().name;
    if(vm.stateHasChanged) vm.message = {};
    if(!vm.stateHasChanged) vm.stateHasChanged = true;
  });

}
