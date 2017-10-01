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
  const vm = this;
  console.log('Running a Login controller which currently has nothing in it!!');
}
