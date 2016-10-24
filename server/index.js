/* eslint-disable no-process-env, no-console */

import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(morgan('common'));
app.get('/push', (req, res) => {
  res.send('Hello World!');
});

const { SERVER_PORT } = process.env;
app.listen(SERVER_PORT, () => {
  console.log(`Example app listening on port ${SERVER_PORT}!`);
});
