angular
  .module('tandem')
  .factory('Ride', Ride)
  .factory('RideMember', RideMember)
  .factory('RideComment', RideComment);

Ride.$inject = ['$resource'];
function Ride($resource){
  return new $resource('api/rides/:id', { id: '@id'}, {
    'update': { method: 'PUT'}
  });
}

RideMember.$inject = ['$resource'];
function RideMember($resource) {
  return new $resource('/api/rides/:rideId/members/:id', { id: '@id', rideId: '@rideId' }, {
    update: { method: 'PUT' }
  });
}

RideComment.$inject = ['$resource'];
function RideComment($resource) {
  return new $resource('/api/rides/:rideId/comments/:id', { id: '@id' }, { //maybe add commentID and @commentid
    update: { method: 'PUT' }
  });
}
