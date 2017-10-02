angular
  .module('tandem')
  .factory('Ride', Ride);

Ride.$inject = ['$resource'];
function Ride($resource){
  return new $resource('api/rides/:id', { id: '@_id'}, {
    'update': { method: 'PUT'}
  });
}
