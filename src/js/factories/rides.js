angular
  .module('tandem')
  .factory('Ride', Ride);

Ride.$inject = ['$resource'];
function Ride($resource){
  return new $resource('api/rides/:id', { id: '@id'}, {
    'update': { method: 'PUT'}
  });
}

RideMember.$inject = ['$resource'];
function RideMember($resource) {
  return new $resource('/api/rides/:rideId/members/:id', { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
