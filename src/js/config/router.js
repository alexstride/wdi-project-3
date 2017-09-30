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
    });
  

  //add new states when needed

  $urlRouterProvider.otherwise('/');
}
