/* eslint-disable no-process-env, no-console */

import express from 'express';

const app = express();
const { SERVER_PORT } = process.env;

app.get('/push', (req, res) => {
  res.send('Hello World!');
});

app.listen(SERVER_PORT, () => {
  console.log(`Example app listening on port ${SERVER_PORT}!`);
});
