const express     = require('express');
const app         = express();

const morgan =  require('morgan');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.plugin(require('./lib/globalToJSON'));
mongoose.Promise = require('bluebird');
const routes = require('./config/routes');
const customResponses = require('./lib/customResponses');
const errorHandler = require('./lib/errorHandler');

app.use(morgan('dev'));


const { port }    = require('./config/environment');


app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.json());

app.use(customResponses);
app.use('/api', routes);

app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.use(errorHandler);

app.listen(port, () => console.log(`Express has started on port: ${port}`));
