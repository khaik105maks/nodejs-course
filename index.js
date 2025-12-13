
const express = require('express');
const app = express();

const logger = require('./middleware');
const productsRouter = require('./products');
const errorHandler = require('./error-middleware');

const port = 3000;

app.use(logger);

app.use('/products', productsRouter);

app.get('/', (req, res) => {
  res.send('Express app with modules, middleware, error handling');
});

// має бути останнім
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server start at http://localhost:${port}/`);
});
