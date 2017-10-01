angular
  .module('tandem')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'js/views/index.html',
      controller: 'HomeCtrl as home'
    })
    .state('ridesIndex', {
      url: '/rides',
      templateUrl: 'js/views/rides/index.html',
      controller: 'RidesIndexCtrl as ridesIndex'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'js/views/login/login.html',
      controller: 'LoginCtrl as login'
    })
    .state('register', {
      url: '/register',
      templateUrl: '/js/views/registration/register.html',
      controller: 'RegisterCtrl as register'
    });


  //add new states when needed

  $urlRouterProvider.otherwise('/');
}
