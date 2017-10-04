angular
  .module('tandem')
  .controller('DarkSkyIndexCtrl', DarkSkyIndexCtrl);





DarkSkyIndexCtrl.$inject = ['$http', 'API'];
function DarkSkyIndexCtrl ($http, API) {
  const vm = this;

  function getWeather(latitude, longitude) {
    // make an http request to our Express API, and pass in lat and lng as query params
    $http
      .get(`${API}/weather`, { params: { latitude, longitude } })
      .then((response) => {
        vm.weather = response.data;
        console.log('weather data', vm.weather);
      });
  }
  getWeather(51, 0);
}
