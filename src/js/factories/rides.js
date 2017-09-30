angular
  .module('tandem')
  .factory('Ride', Ride);

Ride.$inject = ['$resource', 'API'];
function Ride($resource, API){
  return $resource(`${API}/rides/:id`, { id: '@_id'}, {
    'update': { method: 'PUT'}
  });
}
