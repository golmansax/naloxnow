/* eslint-disable no-process-env, no-console */

require('dotenv').config();
require('babel-register');
const server = require('./index').server;

const { SERVER_PORT } = process.env;

server.listen(SERVER_PORT, () => {
  console.log(`Example server listening on port ${SERVER_PORT}!`);
});
