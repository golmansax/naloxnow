import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import {
  isExponentPushToken,
  sendPushNotificationAsync,
} from 'exponent-server-sdk';
import { firebaseDB } from './firebase';

const server = express();

server.use(morgan('common'));
server.use(bodyParser.json());
server.get('/push', (req, res, next) => {
  firebaseDB().ref('pushToken').once('value')
    .then((snapshot) => res.send(snapshot.val()))
    .catch(next);
});

export { server };
