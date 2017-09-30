const express     = require('express');
const app         = express();

const mongoose = require('mongoose');
mongoose.plugin(require('./lib/globalToJSON'));
mongoose.Promise = require('bluebird');

const morgan =  require('morgan');
const bodyParser = require('body-parser');
const routes = require('./config/routes');
const { port, dbURI }    = require('./config/environment');
// const customResponses = require('./lib/customResponses');
// const errorHandler = require('./lib/errorHandler');
mongoose.connect( dbURI, {useMongoClient: true});
app.use(morgan('dev'));

app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.json());

// app.use(customResponses);
app.use('/api', routes);

app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

// app.use(errorHandler);

app.listen(port, () => console.log(`Express has started on port: ${port}`));
