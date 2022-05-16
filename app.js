const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');
const port = config.get('port');
const kurzovyListokController = require('./app/controllers/kurzovy-listok-controller');

const app = express();

app.use('/kurzovy-listok', bodyParser.json(), kurzovyListokController.index);

app.use((req, res, next) => {
  res.status(404).send('Page does not exists');
});

app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(error.status || 500).send(error.message);
});

app.listen(port, () => {
  console.log(`App listening on port: ${port} !`);
});

module.exports = app;
