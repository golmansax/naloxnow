#!/usr/bin/env node

import fetch from 'node-fetch';
import URI from 'urijs';
import path from 'path';
import jsonfile from 'jsonfile';
import { checkStatus } from '../lib/utils';
import { providerLocation, responderLocation } from '../lib/data';

function locationToString({ latitude, longitude }) {
  return `${latitude},${longitude}`;
}

async function getDirectionsAsync(url) {
  return fetch(url)
    .then(checkStatus)
    .then((res) => res.json());
}

export async function runAsync() {
  const directionsUrl = new URI('https://maps.googleapis.com/maps/api/directions/json')
    .search({
      origin: locationToString(providerLocation),
      destination: locationToString(responderLocation),
    })
    .toString();

  const OUTPUT_FILE = path.resolve(__dirname, '..', 'lib', 'data', 'directions.json');
  const res = await getDirectionsAsync(directionsUrl);

  jsonfile.writeFileSync(OUTPUT_FILE, res);
  console.log(`Successfully wrote directions to ${OUTPUT_FILE}`);
}
