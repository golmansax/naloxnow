import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { sendPushNotificationAsync } from './push_notifications';

const server = express();

server.use(morgan('common'));
server.use(bodyParser.json());
server.get('/push', async function(req, res) {
  const response = await sendPushNotificationAsync();
  res.send(response);
});
server.get('/', (req, res) => res.send('OK'));

export { server };
