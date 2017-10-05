angular
  .module('tandem')
  .controller('RegisterCtrl', RegisterCtrl)
  .controller('LoginCtrl', LoginCtrl);

RegisterCtrl.$inject = ['$auth', '$state', '$rootScope'];
function RegisterCtrl($auth, $state, $rootScope) {
  const vm = this;
  vm.user = {};
  function submit() {
    $auth
      .signup(vm.user)
      .then(response => {
        if (response.status === 201) {
          $rootScope.$emit('registered', vm.user.name);
        }
        $state.go('home');
      });
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
