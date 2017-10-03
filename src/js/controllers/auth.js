angular
  .module('tandem')
  .controller('RegisterCtrl', RegisterCtrl)
  .controller('LoginCtrl', LoginCtrl);

RegisterCtrl.$inject = ['$auth', '$state'];
function RegisterCtrl($auth, $state) {
  const vm = this;
  vm.user = {};
  function submit() {
    $auth.signup(vm.user)
      .then(() => $state.go('home'));
  }
  vm.submit = submit;
}

LoginCtrl.$inject = ['$auth', '$state'];

function LoginCtrl($auth, $state) {
  console.log('running the login controller');
  const vm = this;
  vm.credentials = {};

  function login() {
    $auth.login(vm.credentials)
      .then(() => $state.go('ridesIndex'))
      .catch(() => $state.go('login'));
  }

  vm.login = login;
}
