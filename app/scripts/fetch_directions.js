#!/usr/bin/env node

import fetch from 'node-fetch';
import URI from 'urijs';
import path from 'path';
import jsonfile from 'jsonfile';
import { locationToString, checkStatus } from '../lib/utils';
import { provider, requestor } from '../lib/data';

async function getDirectionsAsync(url) {
  return fetch(url)
    .then(checkStatus)
    .then((res) => res.json());
}

export async function runAsync() {
  const directionsUrl = new URI('https://maps.googleapis.com/maps/api/directions/json')
    .search({
      origin: locationToString(provider.location),
      destination: locationToString(requestor.location),
    })
    .toString();

  const OUTPUT_FILE = path.resolve(__dirname, '..', 'lib', 'data', 'directions.json');
  const res = await getDirectionsAsync(directionsUrl);

  jsonfile.writeFileSync(OUTPUT_FILE, res, {
    spaces: 2,
  });
  console.log(`Successfully wrote directions to ${OUTPUT_FILE}`);
}
