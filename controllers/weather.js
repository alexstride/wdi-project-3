// https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/51,-0.12

const rp = require('request-promise');

function darkSkyProxy(req, res) {
  rp({
    url: `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${req.query.latitude},${req.query.longitude}`,
    method: 'GET',
    json: true
  })

    .then((response) => res.json(response))
    .catch((err) => res.json(err));
}

module.exports = {
  proxy: darkSkyProxy
};
